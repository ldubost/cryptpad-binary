define([
    'json.sortify',
    '/common/userObject.js',
    '/common/proxy-manager.js',
    '/common/migrate-user-object.js',
    '/common/common-hash.js',
    '/common/common-util.js',
    '/common/common-constants.js',
    '/common/common-feedback.js',
    '/common/common-realtime.js',
    '/common/common-messaging.js',
    '/common/outer/sharedfolder.js',
    '/common/outer/cursor.js',
    '/common/outer/onlyoffice.js',
    '/common/outer/mailbox.js',
    '/common/outer/profile.js',
    '/common/outer/team.js',
    '/common/outer/messenger.js',
    '/common/outer/network-config.js',
    '/customize/application_config.js',

    '/bower_components/chainpad-crypto/crypto.js',
    '/bower_components/chainpad/chainpad.dist.js',
    '/bower_components/chainpad-netflux/chainpad-netflux.js',
    '/bower_components/chainpad-listmap/chainpad-listmap.js',
    '/bower_components/nthen/index.js',
    '/bower_components/saferphore/index.js',
], function (Sortify, UserObject, ProxyManager, Migrate, Hash, Util, Constants, Feedback,
             Realtime, Messaging,
             SF, Cursor, OnlyOffice, Mailbox, Profile, Team, Messenger,
             NetConfig, AppConfig,
             Crypto, ChainPad, CpNetflux, Listmap, nThen, Saferphore) {

    var create = function () {
        var Store = window.Cryptpad_Store = {};
        var postMessage = function () {};
        var broadcast = function () {};
        var sendDriveEvent = function () {};
        var registerProxyEvents = function () {};

        var storeHash, storeChannel;

        var store = window.CryptPad_AsyncStore = {
            modules: {}
        };

        var getStore = function (teamId) {
            if (!teamId) { return store; }
            try {
                var teams = store.modules['team'];
                var team = teams.getTeam(teamId);
                if (!team) {
                    console.error('Team not found', teamId);
                    return;
                }
                return team;
            } catch (e) {
                console.error(e);
                console.error('Team not found', teamId);
                return;
            }
        };

        var onSync = Store.onSync = function (teamId, cb) {
            var s = getStore(teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            nThen(function (waitFor) {
                Realtime.whenRealtimeSyncs(s.realtime, waitFor());
                if (s.sharedFolders && typeof (s.sharedFolders) === "object") {
                    for (var k in s.sharedFolders) {
                        Realtime.whenRealtimeSyncs(s.sharedFolders[k].realtime, waitFor());
                    }
                }
            }).nThen(function () { cb(); });
        };

        // OKTEAM
        Store.get = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            cb(Util.find(s.proxy, data.key));
        };
        Store.set = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            var path = data.key.slice();
            var key = path.pop();
            var obj = Util.find(s.proxy, path);
            if (!obj || typeof(obj) !== "object") { return void cb({error: 'INVALID_PATH'}); }
            if (typeof data.value === "undefined") {
                delete obj[key];
            } else {
                obj[key] = data.value;
            }
            if (!data.teamId) {
            broadcast([clientId], "UPDATE_METADATA");
                if (Array.isArray(path) && path[0] === 'profile' && store.messenger) {
                    Messaging.updateMyData(store);
                }
            }
            onSync(data.teamId, cb);
        };

        Store.getSharedFolder = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            var id = data.id;
            if (!s || !s.manager) { return void cb({ error: 'ENOTFOUND' }); }
            if (s.manager.folders[id]) {
                // If it is loaded, return the shared folder proxy
                return void cb(s.manager.folders[id].proxy);
            } else {
                // Otherwise, check if we know this shared folder
                var shared = Util.find(s.proxy, ['drive', UserObject.SHARED_FOLDERS]) || {};
                if (shared[id]) {
                    // If we know the shared folder, load it and return the proxy
                    return void Store.loadSharedFolder(data.teamId, id, shared[id], function () {
                        cb(s.manager.folders[id].proxy);
                    });
                }
            }
            cb({});
        };

        Store.restoreSharedFolder = function (clientId, data, cb) {
            if (!data.sfId || !data.drive) { return void cb({error:'EINVAL'}); }
            var s = getStore(data.teamId);
            if (s.sharedFolders[data.sfId]) {
                Object.keys(data.drive).forEach(function (k) {
                    s.sharedFolders[data.sfId].proxy[k] = data.drive[k];
                });
                Object.keys(s.sharedFolders[data.sfId].proxy).forEach(function (k) {
                    if (data.drive[k]) { return; }
                    delete s.sharedFolders[data.sfId].proxy[k];
                });
            }
            onSync(data.teamId, cb);
        };

        Store.hasSigningKeys = function () {
            if (!store.proxy) { return; }
            return typeof(store.proxy.edPrivate) === 'string' &&
                   typeof(store.proxy.edPublic) === 'string';
        };

        Store.hasCurveKeys = function () {
            if (!store.proxy) { return; }
            return typeof(store.proxy.curvePrivate) === 'string' &&
                   typeof(store.proxy.curvePublic) === 'string';
        };

        var getUserChannelList = function () {
            // start with your userHash...
            var userHash = storeHash;
            if (!userHash) { return null; }

            // No password for drive
            var secret = Hash.getSecrets('drive', userHash);
            var userChannel = secret.channel;
            if (!userChannel) { return null; }

            // Get the list of pads' channel ID in your drive
            // This list is filtered so that it doesn't include pad owned by other users
            // It now includes channels from shared folders
            var list = store.manager.getChannelsList('pin');

            // Get the avatar
            var profile = store.proxy.profile;
            if (profile) {
                var profileChan = profile.edit ? Hash.hrefToHexChannelId('/profile/#' + profile.edit, null) : null;
                if (profileChan) { list.push(profileChan); }
                var avatarChan = profile.avatar ? Hash.hrefToHexChannelId(profile.avatar, null) : null;
                if (avatarChan) { list.push(avatarChan); }
            }

            if (store.proxy.friends) {
                var fList = Messaging.getFriendChannelsList(store.proxy);
                list = list.concat(fList);
            }

            if (store.proxy.mailboxes) {
                var mList = Object.keys(store.proxy.mailboxes).map(function (m) {
                    return store.proxy.mailboxes[m].channel;
                });
                list = list.concat(mList);
            }

            list.push(userChannel);
            list.sort();

            return list;
        };

        var getExpirableChannelList = function () {
            return store.manager.getChannelsList('expirable');
        };

        var getCanonicalChannelList = function (expirable) {
            var list = expirable ? getExpirableChannelList() : getUserChannelList();
            return Util.deduplicateString(list).sort();
        };

        //////////////////////////////////////////////////////////////////
        /////////////////////// RPC //////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        // pinPads needs to support the old format where data is an array of channel IDs
        // and the new format where data is an object with "teamId" and "pads"
        Store.pinPads = function (clientId, data, cb) {
            if (!data) { return void cb({error: 'EINVAL'}); }

            var s = getStore(data && data.teamId);
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }

            if (typeof(cb) !== 'function') {
                console.error('expected a callback');
                cb = function () {};
            }

            var pads = data.pads || data;
            s.rpc.pin(pads, function (e, hash) {
                if (e) { return void cb({error: e}); }
                cb({hash: hash});
            });
        };

        // unpinPads needs to support the old format where data is an array of channel IDs
        // and the new format where data is an object with "teamId" and "pads"
        Store.unpinPads = function (clientId, data, cb) {
            if (!data) { return void cb({error: 'EINVAL'}); }

            var s = getStore(data && data.teamId);
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }

            var pads = data.pads || data;
            s.rpc.unpin(pads, function (e, hash) {
                if (e) { return void cb({error: e}); }
                cb({hash: hash});
            });
        };

        var account = {};

        Store.getPinnedUsage = function (clientId, data, cb) {
            var s = getStore(data && data.teamId);
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }

            s.rpc.getFileListSize(function (err, bytes) {
                if (!s.id && typeof(bytes) === 'number') {
                    account.usage = bytes;
                }
                cb({bytes: bytes});
            });
        };

        // Update for all users from accounts and return current user limits
        Store.updatePinLimit = function (clientId, data, cb) {
            if (!store.rpc) { return void cb({error: 'RPC_NOT_READY'}); }
            store.rpc.updatePinLimits(function (e, limit, plan, note) {
                if (e) { return void cb({error: e}); }
                account.limit = limit;
                account.plan = plan;
                account.note = note;
                cb(account);
            });
        };
        // Get current user limits
        Store.getPinLimit = function (clientId, data, cb) {
            var s = getStore(data && data.teamId);
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }

            var ALWAYS_REVALIDATE = true;
            if (ALWAYS_REVALIDATE || typeof(account.limit) !== 'number' ||
                typeof(account.plan) !== 'string' ||
                typeof(account.note) !== 'string') {
                return void s.rpc.getLimit(function (e, limit, plan, note) {
                    if (e) { return void cb({error: e}); }
                    var data = s.id ? {} : account;
                    data.limit = limit;
                    data.plan = plan;
                    data.note = note;
                    cb(data);
                });
            }
            cb(account);
        };

        // clearOwnedChannel is only used for private chat at the moment
        Store.clearOwnedChannel = function (clientId, data, cb) {
            if (!store.rpc) { return void cb({error: 'RPC_NOT_READY'}); }
            store.rpc.clearOwnedChannel(data, function (err) {
                cb({error:err});
            });
        };

        Store.removeOwnedChannel = function (clientId, data, cb) {
            // "data" used to be a string (channelID), now it can also be an object
            // data.force tells us we can safely remove the drive ID
            var channel = data;
            var force = false;
            var teamId;
            if (data && typeof(data) === "object") {
                channel = data.channel;
                force = data.force;
                teamId = data.teamId;
            }

            if (channel === storeChannel && !force) {
                return void cb({error: 'User drive removal blocked!'});
            }

            var s = getStore(teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }

            s.rpc.removeOwnedChannel(channel, function (err) {
                cb({error:err});
            });
        };

        var arePinsSynced = function (cb) {
            if (!store.rpc) { return void cb({error: 'RPC_NOT_READY'}); }

            var list = getCanonicalChannelList(false);
            var local = Hash.hashChannelList(list);
            store.rpc.getServerHash(function (e, hash) {
                if (e) { return void cb(e); }
                cb(null, hash === local);
            });
        };

        var resetPins = function (cb) {
            if (!store.rpc) { return void cb({error: 'RPC_NOT_READY'}); }

            var list = getCanonicalChannelList(false);
            store.rpc.reset(list, function (e, hash) {
                if (e) { return void cb(e); }
                cb(null, hash);
            });
        };

        Store.uploadComplete = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }
            if (data.owned) {
                // Owned file
                s.rpc.ownedUploadComplete(data.id, function (err, res) {
                    if (err) { return void cb({error:err}); }
                    cb(res);
                });
                return;
            }
            // Normal upload
            s.rpc.uploadComplete(data.id, function (err, res) {
                if (err) { return void cb({error:err}); }
                cb(res);
            });
        };

        Store.uploadStatus = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }
            s.rpc.uploadStatus(data.size, function (err, res) {
                if (err) { return void cb({error:err}); }
                cb(res);
            });
        };

        Store.uploadCancel = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }
            s.rpc.uploadCancel(data.size, function (err, res) {
                if (err) { return void cb({error:err}); }
                cb(res);
            });
        };

        Store.uploadChunk = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            if (!s.rpc) { return void cb({error: 'RPC_NOT_READY'}); }
            s.rpc.send.unauthenticated('UPLOAD', data.chunk, function (e, msg) {
                cb({
                    error: e,
                    msg: msg
                });
            });
        };

        Store.writeLoginBlock = function (clientId, data, cb) {
            store.rpc.writeLoginBlock(data, function (e, res) {
                cb({
                    error: e,
                    data: res
                });
            });
        };

        Store.removeLoginBlock = function (clientId, data, cb) {
            store.rpc.removeLoginBlock(data, function (e, res) {
                cb({
                    error: e,
                    data: res
                });
            });
        };

        var initRpc = function (clientId, data, cb) {
            if (!store.loggedIn) { return cb(); }
            if (store.rpc) { return void cb(account); }
            require(['/common/pinpad.js'], function (Pinpad) {
                Pinpad.create(store.network, store.proxy, function (e, call) {
                    if (e) { return void cb({error: e}); }

                    store.rpc = call;

                    Store.getPinLimit(null, null, function (obj) {
                        if (obj.error) { console.error(obj.error); }
                        account.limit = obj.limit;
                        account.plan = obj.plan;
                        account.note = obj.note;
                        cb(obj);
                    });
                });
            });
        };

        //////////////////////////////////////////////////////////////////
        ////////////////// ANON RPC //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        Store.anonRpcMsg = function (clientId, data, cb) {
            if (!store.anon_rpc) { return void cb({error: 'ANON_RPC_NOT_READY'}); }
            store.anon_rpc.send(data.msg, data.data, function (err, res) {
                if (err) { return void cb({error: err}); }
                cb(res);
            });
        };

        Store.getFileSize = function (clientId, data, cb) {
            if (!store.anon_rpc) { return void cb({error: 'ANON_RPC_NOT_READY'}); }

            var channelId = Hash.hrefToHexChannelId(data.href, data.password);
            store.anon_rpc.send("GET_FILE_SIZE", channelId, function (e, response) {
                if (e) { return void cb({error: e}); }
                if (response && response.length && typeof(response[0]) === 'number') {
                    return void cb({size: response[0]});
                } else {
                    cb({error: 'INVALID_RESPONSE'});
                }
            });
        };

        Store.isNewChannel = function (clientId, data, cb) {
            if (!store.anon_rpc) { return void cb({error: 'ANON_RPC_NOT_READY'}); }
            var channelId = Hash.hrefToHexChannelId(data.href, data.password);
            store.anon_rpc.send("IS_NEW_CHANNEL", channelId, function (e, response) {
                if (e) { return void cb({error: e}); }
                if (response && response.length && typeof(response[0]) === 'boolean') {
                    return void cb({
                        isNew: response[0]
                    });
                } else {
                    cb({error: 'INVALID_RESPONSE'});
                }
            });
        };

        Store.getMultipleFileSize = function (clientId, data, cb) {
            if (!store.anon_rpc) { return void cb({error: 'ANON_RPC_NOT_READY'}); }
            if (!Array.isArray(data.files)) {
                return void cb({error: 'INVALID_FILE_LIST'});
            }

            store.anon_rpc.send('GET_MULTIPLE_FILE_SIZE', data.files, function (e, res) {
                if (e) { return void cb({error: e}); }
                if (res && res.length && typeof(res[0]) === 'object') {
                    cb({size: res[0]});
                } else {
                    cb({error: 'UNEXPECTED_RESPONSE'});
                }
            });
        };

        Store.getDeletedPads = function (clientId, data, cb) {
            if (!store.anon_rpc) { return void cb({error: 'ANON_RPC_NOT_READY'}); }
            var list = (data && data.list) || getCanonicalChannelList(true);
            if (!Array.isArray(list)) {
                return void cb({error: 'INVALID_FILE_LIST'});
            }

            store.anon_rpc.send('GET_DELETED_PADS', list, function (e, res) {
                if (e) { return void cb({error: e}); }
                if (res && res.length && Array.isArray(res[0])) {
                    cb(res[0]);
                } else {
                    cb({error: 'UNEXPECTED_RESPONSE'});
                }
            });
        };

        var initAnonRpc = function (clientId, data, cb) {
            if (store.anon_rpc) { return void cb(); }
            require([
                '/common/rpc.js',
            ], function (Rpc) {
                Rpc.createAnonymous(store.network, function (e, call) {
                    if (e) { return void cb({error: e}); }
                    store.anon_rpc = call;
                    cb();
                });
            });
        };

        //////////////////////////////////////////////////////////////////
        /////////////////////// Store ////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        var getAllStores = function () {
            var stores = [store];
            var teamModule = store.modules['team'];
            if (teamModule) {
                var teams = teamModule.getTeams().map(function (id) {
                    return teamModule.getTeam(id);
                });
                Array.prototype.push.apply(stores, teams);
            }
            return stores;
        };

        // Get or create the user color for the cursor position
        var getRandomColor = function () {
            var getColor = function () {
                return Math.floor(Math.random() * 156) + 70;
            };
            return '#' + getColor().toString(16) +
                         getColor().toString(16) +
                         getColor().toString(16);
        };
        var getUserColor = function () {
            var color = Util.find(store.proxy, ['settings', 'general', 'cursor', 'color']);
            if (!color) {
                color = getRandomColor();
                Store.setAttribute(null, {
                    attr: ['general', 'cursor', 'color'],
                    value: color
                }, function () {});
            }
            return color;
        };

        // Get the metadata for sframe-common-outer
        Store.getMetadata = function (clientId, data, cb) {
            var disableThumbnails = Util.find(store.proxy, ['settings', 'general', 'disableThumbnails']);
            var teams = store.modules['team']  && store.modules['team'].getTeamsData();
            var metadata = {
                // "user" is shared with everybody via the userlist
                user: {
                    name: store.proxy[Constants.displayNameKey] || "",
                    uid: store.proxy.uid,
                    avatar: Util.find(store.proxy, ['profile', 'avatar']),
                    profile: Util.find(store.proxy, ['profile', 'view']),
                    color: getUserColor(),
                    notifications: Util.find(store.proxy, ['mailboxes', 'notifications', 'channel']),
                    curvePublic: store.proxy.curvePublic,
                },
                // "priv" is not shared with other users but is needed by the apps
                priv: {
                    clientId: clientId,
                    edPublic: store.proxy.edPublic,
                    friends: store.proxy.friends || {},
                    settings: store.proxy.settings,
                    thumbnails: disableThumbnails === false,
                    isDriveOwned: Boolean(Util.find(store, ['driveMetadata', 'owners'])),
                    support: Util.find(store.proxy, ['mailboxes', 'support', 'channel']),
                    pendingFriends: store.proxy.friends_pending || {},
                    supportPrivateKey: Util.find(store.proxy, ['mailboxes', 'supportadmin', 'keys', 'curvePrivate']),
                    teams: teams
                }
            };
            cb(JSON.parse(JSON.stringify(metadata)));
        };

        var makePad = function (href, roHref, title) {
            var now = +new Date();
            return {
                href: href,
                roHref: roHref,
                atime: now,
                ctime: now,
                title: title || UserObject.getDefaultName(Hash.parsePadUrl(href)),
            };
        };

        Store.addPad = function (clientId, data, cb) {
            if (!data.href && !data.roHref) { return void cb({error:'NO_HREF'}); }
            var secret;
            if (!data.roHref) {
                var parsed = Hash.parsePadUrl(data.href);
                if (parsed.hashData.type === "pad") {
                    secret = Hash.getSecrets(parsed.type, parsed.hash, data.password);
                    data.roHref = '/' + parsed.type + '/#' + Hash.getViewHashFromKeys(secret);
                }
            }
            var pad = makePad(data.href, data.roHref, data.title);
            if (data.owners) { pad.owners = data.owners; }
            if (data.expire) { pad.expire = data.expire; }
            if (data.password) { pad.password = data.password; }
            if (data.channel || secret) { pad.channel = data.channel || secret.channel; }

            var s = getStore(data.teamId);
            if (!s || !s.manager) { return void cb({ error: 'ENOTFOUND' }); }

            s.manager.addPad(data.path, pad, function (e) {
                if (e) { return void cb({error: e}); }
                // Send a CHANGE events to all the teams because we may have just
                // added a pad to a shared folder stored in multiple teams
                getAllStores().forEach(function (_s) {
                    var send = _s.id ? _s.sendEvent : sendDriveEvent;
                    send('DRIVE_CHANGE', {
                        path: ['drive', UserObject.FILES_DATA]
                    }, clientId);
                });
                onSync(data.teamId, cb);
            });
        };

        var getOwnedPads = function () {
            var list = store.manager.getChannelsList('owned');
            if (store.proxy.todo) {
                // No password for todo
                list.push(Hash.hrefToHexChannelId('/todo/#' + store.proxy.todo, null));
            }
            if (store.proxy.profile && store.proxy.profile.edit) {
                // No password for profile
                list.push(Hash.hrefToHexChannelId('/profile/#' + store.proxy.profile.edit, null));
            }
            if (store.proxy.mailboxes) {
                Object.keys(store.proxy.mailboxes || {}).forEach(function (id) {
                    if (id === 'supportadmin') { return; }
                    var m = store.proxy.mailboxes[id];
                    list.push(m.channel);
                });
            }
            if (store.proxy.teams) {
                Object.keys(store.proxy.teams || {}).forEach(function (id) {
                    var t = store.proxy.teams[id];
                    if (t.owner) {
                        list.push(t.channel);
                        list.push(t.keys.roster.channel);
                        list.push(t.keys.chat.channel);
                    }
                });
            }
            return list;
        };
        var removeOwnedPads = function (waitFor) {
            // Delete owned pads
            var edPublic = Util.find(store, ['proxy', 'edPublic']);
            var ownedPads = getOwnedPads();
            var sem = Saferphore.create(10);
            ownedPads.forEach(function (c) {
                var w = waitFor();
                sem.take(function (give) {
                    var otherOwners = false;
                    nThen(function (_w) {
                        Store.anonRpcMsg(null, {
                            msg: 'GET_METADATA',
                            data: c
                        }, _w(function (obj) {
                            if (obj && obj.error) {
                                give();
                                return void _w.abort();
                            }
                            var md = obj[0];
                            var isOwner = md && Array.isArray(md.owners) && md.owners.indexOf(edPublic) !== -1;
                            if (!isOwner) {
                                give();
                                return void _w.abort();
                            }
                            otherOwners = md.owners.some(function (ed) { return ed !== edPublic; });
                        }));
                    }).nThen(function (_w) {
                        if (otherOwners) {
                            Store.setPadMetadata(null, {
                                channel: c,
                                command: 'RM_OWNERS',
                                value: [edPublic],
                            }, _w());
                            return;
                        }
                        // We're the only owner: delete the pad
                        store.rpc.removeOwnedChannel(c, _w(function (err) {
                            if (err) { console.error(err); }
                        }));
                    }).nThen(function () {
                        give();
                        w();
                    });
                });
            });
        };

        Store.deleteAccount = function (clientId, data, cb) {
            var edPublic = store.proxy.edPublic;
            // No password for drive
            var secret = Hash.getSecrets('drive', storeHash);
            Store.anonRpcMsg(clientId, {
                msg: 'GET_METADATA',
                data: secret.channel
            }, function (data) {
                var metadata = data[0];
                // Owned drive
                if (metadata && metadata.owners && metadata.owners.length === 1 &&
                    metadata.owners.indexOf(edPublic) !== -1) {
                    nThen(function (waitFor) {
                        var token = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
                        store.proxy[Constants.tokenKey] = token;
                        postMessage(clientId, "DELETE_ACCOUNT", token, waitFor());
                    }).nThen(function (waitFor) {
                        removeOwnedPads(waitFor);
                    }).nThen(function (waitFor) {
                        // Delete Pin Store
                        store.rpc.removePins(waitFor(function (err) {
                            if (err) { console.error(err); }
                        }));
                    }).nThen(function (waitFor) {
                        // Delete Drive
                        Store.removeOwnedChannel(clientId, {
                            channel: secret.channel,
                            force: true
                        }, waitFor());
                    }).nThen(function () {
                        store.network.disconnect();
                        cb({
                            state: true
                        });
                    });
                    return;
                }

                // Not owned drive
                var toSign = {
                    intent: 'Please delete my account.'
                };
                toSign.drive = secret.channel;
                toSign.edPublic = edPublic;
                var signKey = Crypto.Nacl.util.decodeBase64(store.proxy.edPrivate);
                var proof = Crypto.Nacl.sign.detached(Crypto.Nacl.util.decodeUTF8(Sortify(toSign)), signKey);

                var check = Crypto.Nacl.sign.detached.verify(Crypto.Nacl.util.decodeUTF8(Sortify(toSign)),
                    proof,
                    Crypto.Nacl.util.decodeBase64(edPublic));

                if (!check) { console.error('signed message failed verification'); }

                var proofTxt = Crypto.Nacl.util.encodeBase64(proof);
                cb({
                    proof: proofTxt,
                    toSign: JSON.parse(Sortify(toSign))
                });
            });
        };

        /**
         * add a "What is CryptPad?" pad in the drive
         * data
         *   - driveReadme
         *   - driveReadmeTitle
         */
        Store.createReadme = function (clientId, data, cb) {
            require(['/common/cryptget.js'], function (Crypt) {
                var hash = Hash.createRandomHash('pad');
                Crypt.put(hash, data.driveReadme, function (e) {
                    if (e) {
                        return void cb({ error: "Error while creating the default pad:"+ e});
                    }
                    var href = '/pad/#' + hash;
                    var channel = Hash.hrefToHexChannelId(href, null);
                    var fileData = {
                        href: href,
                        channel: channel,
                        title: data.driveReadmeTitle,
                        owners: [ store.proxy.edPublic ],
                    };
                    Store.addPad(clientId, fileData, cb);
                }, {
                    metadata: {
                        owners: [ store.proxy.edPublic ],
                    },
                });
            });
        };


        /**
         * Merge the anonymous drive into the user drive at registration
         * data
         *   - anonHash
         */
        Store.migrateAnonDrive = function (clientId, data, cb) {
            require(['/common/mergeDrive.js'], function (Merge) {
                var hash = data.anonHash;
                Merge.anonDriveIntoUser(store, hash, cb);
            });
        };

        // Set the display name (username) in the proxy
        Store.setDisplayName = function (clientId, value, cb) {
            if (store.modules['profile']) {
                store.modules['profile'].setName(value);
            }
            store.proxy[Constants.displayNameKey] = value;
            broadcast([clientId], "UPDATE_METADATA");
            Messaging.updateMyData(store);
            onSync(null, cb);
        };

        // Reset the drive part of the userObject (from settings)
        Store.resetDrive = function (clientId, data, cb) {
            nThen(function (waitFor) {
                removeOwnedPads(waitFor);
            }).nThen(function () {
                store.proxy.drive = store.userObject.getStructure();
                sendDriveEvent('DRIVE_CHANGE', {
                    path: ['drive', 'filesData']
                }, clientId);
                onSync(null, cb);
            });
        };

        /**
         * Settings & pad attributes
         * data
         *   - href (String)
         *   - attr (Array)
         *   - value (String)
         */
        Store.setPadAttribute = function (clientId, data, cb) {
            nThen(function (waitFor) {
                getAllStores().forEach(function (s) {
                    s.manager.setPadAttribute(data, waitFor(function () {
                        var send = s.id ? s.sendEvent : sendDriveEvent;
                        send('DRIVE_CHANGE', {
                            path: ['drive', UserObject.FILES_DATA]
                        }, clientId);
                        onSync(s.id, waitFor());
                    }));
                });
            }).nThen(cb); // cb when all managers are synced
        };
        Store.getPadAttribute = function (clientId, data, cb) {
            var res = {};
            nThen(function (waitFor) {
                getAllStores().forEach(function (s) {
                    s.manager.getPadAttribute(data, waitFor(function (err, val) {
                        if (err) { return; }
                        if (!val || typeof(val) !== "object") { return void console.error("Not an object!"); }
                        if (!res.value || res.atime < val.atime) {
                            res.atime = val.atime;
                            res.value = val.value;
                        }
                    }));
                });
            }).nThen(function () {
                cb(res.value);
            });
        };

        var getAttributeObject = function (attr) {
            if (typeof attr === "string") {
                console.error('DEPRECATED: use setAttribute with an array, not a string');
                return {
                    path: ['settings'],
                    obj: store.proxy.settings,
                    key: attr
                };
            }
            if (!Array.isArray(attr)) { return void console.error("Attribute must be string or array"); }
            if (attr.length === 0) { return void console.error("Attribute can't be empty"); }
            var obj = store.proxy.settings;
            attr.forEach(function (el, i) {
                if (i === attr.length-1) { return; }
                if (!obj[el]) {
                    obj[el] = {};
                }
                else if (typeof obj[el] !== "object") { return void console.error("Wrong attribute"); }
                obj = obj[el];
            });
            return {
                path: ['settings'].concat(attr),
                obj: obj,
                key: attr[attr.length-1]
            };
        };
        Store.setAttribute = function (clientId, data, cb) {
            try {
                var object = getAttributeObject(data.attr);
                object.obj[object.key] = data.value;
            } catch (e) { return void cb({error: e}); }
            onSync(null, function () {
                cb();
                broadcast([], "UPDATE_METADATA");
            });
        };
        Store.getAttribute = function (clientId, data, cb) {
            var object;
            try {
                object = getAttributeObject(data.attr);
            } catch (e) { return void cb({error: e}); }
            cb(object.obj[object.key]);
        };

        // Tags
        Store.listAllTags = function (clientId, data, cb) {
            var tags = {};
            getAllStores().forEach(function (s) {
                var l = s.manager.getTagsList();
                Object.keys(l).forEach(function (tag) {
                    tags[tag] = (tags[tag] || 0) + l[tag];
                });
            });
            cb(tags);
        };

        // Templates
        // Note: maybe we should get templates "per team" to avoid creating a document with a template
        // from a different team
        Store.getTemplates = function (clientId, data, cb) {
            // No templates in shared folders: we don't need the manager here
            var res = [];
            var channels = [];
            getAllStores().forEach(function (s) {
                var templateFiles = s.userObject.getFiles(['template']);
                templateFiles.forEach(function (f) {
                    var data = s.userObject.getFileData(f);
                    // Don't push duplicates
                    if (channels.indexOf(data.channel) !== -1) { return; }
                    channels.push(data.channel);
                    // Puhs a copy of the data
                    res.push(JSON.parse(JSON.stringify(data)));
                });
            });
            cb(res);
        };
        Store.incrementTemplateUse = function (clientId, href) {
            // No templates in shared folders: we don't need the manager here
            getAllStores().forEach(function (s) {
                s.userObject.getPadAttribute(href, 'used', function (err, data) {
                    // This is a not critical function, abort in case of error to make sure we won't
                    // create any issue with the user object or the async store
                    if (err) { return; }
                    var used = typeof data === "number" ? ++data : 1;
                    s.userObject.setPadAttribute(href, 'used', used);
                });
            });
        };

        // Pads
        Store.isOnlyInSharedFolder = function (clientId, channel, cb) {
            var res = false;

            // The main drive doesn't have an fId (folder ID)
            var isInMainDrive = function (obj) { return !obj.fId; };

            // A pad is only in a shared folder if it is in one of our managers
            // AND if if it not in any "main" drive
            getAllStores().some(function (s) {
                var _res = s.manager.findChannel(channel);

                // Not in this manager: go the the next one
                if (!_res.length) { return; }

                // if the pad is in the main drive, cb(false)
                if (_res.some(isInMainDrive)) {
                    res = false;
                    return true;
                }

                // Otherwise the pad is only in a shared folder in this manager:
                // set the result to true and check the next manager
                res = true;
            });

            return cb (res);
        };
        Store.moveToTrash = function (clientId, data, cb) {
            var href = Hash.getRelativeHref(data.href);
            nThen(function (waitFor) {
                getAllStores().forEach(function (s) {
                    var deleted = s.userObject.forget(href);
                    if (!deleted) { return; }
                    var send = s.id ? s.sendEvent : sendDriveEvent;
                    send('DRIVE_CHANGE', {
                        path: ['drive', UserObject.FILES_DATA]
                    }, clientId);
                    onSync(s.id, waitFor());
                });
            }).nThen(cb);
        };
        Store.setPadTitle = function (clientId, data, cb) {
            var title = data.title;
            var href = data.href;
            var channel = data.channel;
            var p = Hash.parsePadUrl(href);
            var h = p.hashData;

            if (title.trim() === "") { title = UserObject.getDefaultName(p); }

            if (AppConfig.disableAnonymousStore && !store.loggedIn) { return void cb(); }
            if (p.type === "debug") { return void cb(); }

            var channelData = Store.channels && Store.channels[channel];

            var owners;
            if (channelData && channelData.wc && channel === channelData.wc.id) {
                owners = channelData.data.owners || undefined;
            }
            if (data.owners) {
                owners = data.owners;
            }

            var expire;
            if (channelData && channelData.wc && channel === channelData.wc.id) {
                expire = +channelData.data.expire || undefined;
            }
            if (data.expire) {
                expire = data.expire;
            }

            var storeLocally = data.teamId === -1;
            if (data.teamId === -1) { data.teamId = undefined; }

            // If a teamId is provided, it means we want to store the pad in a specific
            // team drive. In this case, we just need to check if the pad is already
            // stored in this team drive.
            // If no team ID is provided, this may be a pad shared with its URL.
            // We need to check if the pad is stored in any managers (user or teams).
            // If it is stored, update its data, otherwise ask the user if they want to store it
            var allData = [];
            var sendTo = [];
            var inMyDrive;
            getAllStores().forEach(function (s) {
                if (data.teamId && s.id !== data.teamId) { return; }
                if (storeLocally && s.id) { return; }

                var res = s.manager.findChannel(channel);
                if (res.length) {
                    sendTo.push(s.id);
                }

                // If we've just accepted ownership for a pad stored in a shared folder,
                // we need to make a copy of this pad in our drive. We're going to check
                // if the pad is stored in our MAIN drive.
                // We only need to check this if the current manager is the target (data.teamId)
                if (data.teamId === s.id) {
                    inMyDrive = res.some(function (obj) {
                        return !obj.fId;
                    });
                }

                Array.prototype.push.apply(allData, res);
            });
            var contains = allData.length !== 0;
            allData.forEach(function (obj) {
                var pad = obj.data;
                pad.atime = +new Date();
                pad.title = title;
                if (owners || h.type !== "file") {
                    // OWNED_FILES
                    // Never remove owner for files
                    pad.owners = owners;
                }
                pad.expire = expire;
                if (h.mode === 'view') { return; }

                // If we only have rohref, it means we have a stronger href
                if (!pad.href) {
                    // If we have a stronger url, remove the possible weaker from the trash.
                    // If all of the weaker ones were in the trash, add the stronger to ROOT
                    obj.userObject.restoreHref(href);
                }
                pad.href = href;
            });

            // Pads owned by us ("us" can be a user or a team) that are not in our "main" drive
            // (meaning they are stored in a shared folder) must be added to the "main" drive.
            // This is to make sure owners always have control over owned data.
            var edPublic = data.teamId ?
                    Util.find(store.proxy, ['teams', data.teamId, 'keys', 'edPublic']) :
                    store.proxy.edPublic;
            var ownedByMe = Array.isArray(owners) && owners.indexOf(edPublic) !== -1;

            // Add the pad if it does not exist in our drive
            if (!contains || (ownedByMe && !inMyDrive)) {
                var autoStore = Util.find(store.proxy, ['settings', 'general', 'autostore']);
                if (autoStore !== 1 && !data.forceSave && !data.path && !ownedByMe) {
                    // send event to inner to display the corner popup
                    postMessage(clientId, "AUTOSTORE_DISPLAY_POPUP", {
                        autoStore: autoStore
                    });
                    return void cb();
                } else {
                    var roHref;
                    if (h.mode === "view") {
                        roHref = href;
                        href = undefined;
                    }
                    Store.addPad(clientId, {
                        teamId: data.teamId,
                        href: href,
                        roHref: roHref,
                        channel: channel,
                        title: title,
                        owners: owners,
                        expire: expire,
                        password: data.password,
                        path: data.path
                    }, cb);
                    // Let inner know that dropped files shouldn't trigger the popup
                    postMessage(clientId, "AUTOSTORE_DISPLAY_POPUP", {
                        stored: true
                    });
                    return;
                }
            }

            sendTo.forEach(function (teamId) {
                var send = teamId ? getStore(teamId).sendEvent : sendDriveEvent;
                send('DRIVE_CHANGE', {
                    path: ['drive', UserObject.FILES_DATA]
                }, clientId);
            });
            // Let inner know that dropped files shouldn't trigger the popup
            postMessage(clientId, "AUTOSTORE_DISPLAY_POPUP", {
                stored: true
            });
            nThen(function (waitFor) {
                sendTo.forEach(function (teamId) {
                    onSync(teamId, waitFor());
                });
            }).nThen(cb);
        };

        // Filepicker app

        // Get a map of file data corresponding to the given filters.
        // The keys used in the map represent the ID of the "files"
        // TODO maybe we shouldn't mix results from teams and from the user?
        Store.getSecureFilesList = function (clientId, query, cb) {
            var list = {};
            var types = query.types;
            var where = query.where;
            var filter = query.filter || {};
            var isFiltered = function (type, data) {
                var filtered;
                var fType = filter.fileType || [];
                if (type === 'file' && fType.length) {
                    if (!data.fileType) { return true; }
                    filtered = !fType.some(function (t) {
                        return data.fileType.indexOf(t) === 0;
                    });
                }
                return filtered;
            };
            var channels = [];
            getAllStores().forEach(function (s) {
                s.manager.getSecureFilesList(where).forEach(function (obj) {
                    var data = obj.data;
                    if (channels.indexOf(data.channel) !== -1) { return; }
                    var id = obj.id;
                    var parsed = Hash.parsePadUrl(data.href || data.roHref);
                    if ((!types || types.length === 0 || types.indexOf(parsed.type) !== -1) &&
                        !isFiltered(parsed.type, data)) {
                        list[id] = data;
                    }
                });
            });
            cb(list);
        };
        // Get the first pad we can find in any of our managers and return its file data
        Store.getPadData = function (clientId, id, cb) {
            var res = {};
            getAllStores().some(function (s) {
                var d = s.userObject.getFileData(id);
                if (!d.roHref && !d.href) { return; }
                res = d;
                return true;
            });
            cb(res);
        };


        // Messaging (manage friends from the userlist)
        Store.answerFriendRequest = function (clientId, obj, cb) {
            var value = obj.value;
            var data = obj.data;
            if (data.type !== 'notifications') { return void cb ({error: 'EINVAL'}); }
            var hash = data.content.hash;
            var msg = data.content.msg;

            var dismiss = function (cb) {
                cb = cb || function () {};
                store.mailbox.dismiss({
                    hash: hash,
                    type: 'notifications'
                }, cb);
            };

            // If we accept the request, add the friend to the list
            if (value) {
                Messaging.acceptFriendRequest(store, msg.content, function (obj) {
                    if (obj && obj.error) { return void cb(obj); }
                    Messaging.addToFriendList({
                        proxy: store.proxy,
                        realtime: store.realtime,
                        pinPads: function (data, cb) { Store.pinPads(null, data, cb); },
                    }, msg.content, function (err) {
                        if (store.messenger) {
                            store.messenger.onFriendAdded(msg.content);
                        }
                        broadcast([], "UPDATE_METADATA");
                        if (err) { return void cb({error: err}); }
                        dismiss(cb);
                    });
                });
                return;
            }
            // Otherwise, just remove the notification
            store.mailbox.sendTo('DECLINE_FRIEND_REQUEST', {
                displayName: store.proxy['cryptpad.username']
            }, {
                channel: msg.content.notifications,
                curvePublic: msg.content.curvePublic
            }, function (obj) {
                broadcast([], "UPDATE_METADATA");
                cb(obj);
            });
            dismiss();
        };
        Store.sendFriendRequest = function (clientId, data, cb) {
            var friend = Messaging.getFriend(store.proxy, data.curvePublic);
            if (friend) { return void cb({error: 'ALREADY_FRIEND'}); }
            if (!data.notifications || !data.curvePublic) { return void cb({error: 'INVALID_USER'}); }

            store.proxy.friends_pending = store.proxy.friends_pending || {};

            var twoDaysAgo = +new Date() - (2 * 24 * 3600 * 1000);
            if (store.proxy.friends_pending[data.curvePublic] &&
                    store.proxy.friends_pending[data.curvePublic] > twoDaysAgo) {
                return void cb({error: 'TIMEOUT'});
            }

            store.proxy.friends_pending[data.curvePublic] = +new Date();
            broadcast([], "UPDATE_METADATA");

            var myData = Messaging.createData(store.proxy);
            store.mailbox.sendTo('FRIEND_REQUEST', myData, {
                channel: data.notifications,
                curvePublic: data.curvePublic
            }, function (obj) {
                cb(obj);
            });
        };

        // Get hashes for the share button
        // If we can find a stronger hash
        Store.getStrongerHash = function (clientId, data, cb) {
            var found = getAllStores().some(function (s) {
                var allPads = Util.find(s.proxy, ['drive', 'filesData']) || {};

                // If we have a stronger version in drive, add it and add a redirect button
                var stronger = Hash.findStronger(data.href, data.channel, allPads);
                if (stronger) {
                    var parsed2 = Hash.parsePadUrl(stronger.href);
                    cb(parsed2.hash);
                    return true;
                }
            });
            if (!found) {
                cb();
            }
        };

        // Universal
        Store.universal = {
            execCommand: function (clientId, obj, cb) {
                var type = obj.type;
                var data = obj.data;
                if (store.modules[type]) {
                    store.modules[type].execCommand(clientId, data, cb);
                } else {
                    return void cb({error: type + ' is disabled'});
                }
            }
        };
        var loadUniversal = function (Module, type, waitFor) {
            if (store.modules[type]) { return; }
            store.modules[type] = Module.init({
                Store: Store,
                store: store,
                updateMetadata: function () {
                    broadcast([], "UPDATE_METADATA");
                },
                pinPads: function (data, cb) { Store.pinPads(null, data, cb); },
            }, waitFor, function (ev, data, clients) {
                clients.forEach(function (cId) {
                    postMessage(cId, 'UNIVERSAL_EVENT', {
                        type: type,
                        data: {
                            ev: ev,
                            data: data
                        }
                    });
                });
            });
        };

        // OnlyOffice
        Store.onlyoffice = {
            execCommand: function (clientId, data, cb) {
                if (!store.onlyoffice) { return void cb({error: 'OnlyOffice is disabled'}); }
                store.onlyoffice.execCommand(clientId, data, cb);
            }
        };

        // Cursor
        Store.cursor = {
            execCommand: function (clientId, data, cb) {
                if (!store.cursor) { return void cb ({error: 'Cursor channel is disabled'}); }
                store.cursor.execCommand(clientId, data, cb);
            }
        };

        // Mailbox
        Store.mailbox = {
            execCommand: function (clientId, data, cb) {
                if (!store.loggedIn) { return void cb(); }
                if (!store.mailbox) { return void cb ({error: 'Mailbox is disabled'}); }
                store.mailbox.execCommand(clientId, data, cb);
            }
        };

        // Admin
        Store.adminRpc = function (clientId, data, cb) {
            store.rpc.adminRpc(data, function (err, res) {
                if (err) { return void cb({error: err}); }
                cb(res);
            });
        };
        Store.addAdminMailbox = function (clientId, data, cb) {
            var priv = data;
            var pub = Hash.getBoxPublicFromSecret(priv);
            if (!priv || !pub) { return void cb({error: 'EINVAL'}); }
            var channel = Hash.getChannelIdFromKey(pub);
            var mailboxes = store.proxy.mailboxes = store.proxy.mailboxes || {};
            var box = mailboxes.supportadmin = {
                channel: channel,
                viewed: [],
                lastKnownHash: '',
                keys: {
                    curvePublic: pub,
                    curvePrivate: priv
                }
            };
            Store.pinPads(null, [channel], function () {});
            store.mailbox.open('supportadmin', box, function () {
                console.log('ready');
            });
            onSync(null, cb);
        };

        //////////////////////////////////////////////////////////////////
        /////////////////////// PAD //////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        var channels = Store.channels = store.channels = {};

        Store.joinPad = function (clientId, data) {
            var isNew = typeof channels[data.channel] === "undefined";
            var channel = channels[data.channel] = channels[data.channel] || {
                queue: [],
                data: {},
                clients: [],
                bcast: function (cmd, data, notMe) {
                    channel.clients.forEach(function (cId) {
                        if (cId === notMe) { return; }
                        postMessage(cId, cmd, data);
                    });
                },
                history: [],
                pushHistory: function (msg, isCp) {
                    if (isCp) {
                        // the current message is a checkpoint.
                        // push it to your worker's history, prepending it with cp|
                        // cp| and anything else related to checkpoints has already
                        // been stripped by chainpad-netflux-worker or within async store
                        // when the message was outgoing.
                        channel.history.push('cp|' + msg);
                        // since the latest message is a checkpoint, we are able to drop
                        // some of the older history, but we can't rely on checkpoints being
                        // correct, as they might be checkpoints from different forks
                        var i;
                        for (i = channel.history.length - 101; i > 0; i--) {
                            if (/^cp\|/.test(channel.history[i])) { break; }
                        }
                        channel.history = channel.history.slice(Math.max(i, 0));
                        return;
                    }
                    channel.history.push(msg);
                }
            };
            if (channel.clients.indexOf(clientId) === -1) {
                channel.clients.push(clientId);
            }

            if (!isNew && channel.wc) {
                postMessage(clientId, "PAD_CONNECT", {
                    myID: channel.wc.myID,
                    id: channel.wc.id,
                    members: channel.wc.members
                });
                channel.wc.members.forEach(function (m) {
                    postMessage(clientId, "PAD_JOIN", m);
                });
                channel.history.forEach(function (msg) {
                    postMessage(clientId, "PAD_MESSAGE", {
                        msg: CpNetflux.removeCp(msg),
                        user: channel.wc.myID,
                        validateKey: channel.data.validateKey
                    });
                });
                postMessage(clientId, "PAD_READY");

                return;
            }
            var conf = {
                onReady: function (pad) {
                    var padData = pad.metadata || {};
                    channel.data = padData;
                    if (padData && padData.validateKey && store.messenger) {
                        store.messenger.storeValidateKey(data.channel, padData.validateKey);
                    }
                    postMessage(clientId, "PAD_READY");
                },
                onMessage: function (m, user, validateKey, isCp) {
                    channel.pushHistory(m, isCp);
                    channel.bcast("PAD_MESSAGE", {
                        user: user,
                        msg: m,
                        validateKey: validateKey
                    });
                },
                onJoin: function (m) {
                    channel.bcast("PAD_JOIN", m);
                },
                onLeave: function (m) {
                    channel.bcast("PAD_LEAVE", m);
                },
                onError: function (err) {
                    channel.bcast("PAD_ERROR", err);
                    delete channels[data.channel];
                },
                onChannelError: function (err) {
                    channel.bcast("PAD_ERROR", err);
                    delete channels[data.channel];
                },
                onConnectionChange: function (info) {
                    if (!info.state) {
                        channel.bcast("PAD_DISCONNECT");
                    }
                },
                onMetadataUpdate: function (metadata) {
                    channel.data = metadata || {};
                    getAllStores().forEach(function (s) {
                        var allData = s.manager.findChannel(data.channel);
                        allData.forEach(function (obj) {
                            obj.data.owners = metadata.owners;
                            obj.data.atime = +new Date();
                            if (metadata.expire) {
                                obj.data.expire = +metadata.expire;
                            }
                        });
                        var send = s.sendEvent || sendDriveEvent;
                        send('DRIVE_CHANGE', {
                            path: ['drive', UserObject.FILES_DATA]
                        });
                    });
                    channel.bcast("PAD_METADATA", metadata);
                },
                crypto: {
                    // The encryption and decryption is done in the outer window.
                    // This async-store only deals with already encrypted messages.
                    encrypt: function (m) { return m; },
                    decrypt: function (m) { return m; }
                },
                noChainPad: true,
                channel: data.channel,
                metadata: data.metadata,
                network: store.network,
                //readOnly: data.readOnly,
                onConnect: function (wc, sendMessage) {
                    channel.sendMessage = function (msg, cId, cb) {
                        // Send to server
                        sendMessage(msg, function () {
                            // Broadcast to other tabs
                            channel.pushHistory(CpNetflux.removeCp(msg), /^cp\|/.test(msg));
                            channel.bcast("PAD_MESSAGE", {
                                user: wc.myID,
                                msg: CpNetflux.removeCp(msg),
                                validateKey: channel.data.validateKey
                            }, cId);
                            cb();
                        });
                    };
                    channel.wc = wc;
                    channel.queue.forEach(function (data) {
                        channel.sendMessage(data.message, clientId);
                    });
                    channel.queue = [];
                    channel.bcast("PAD_CONNECT", {
                        myID: wc.myID,
                        id: wc.id,
                        members: wc.members
                    });
                }
            };
            channel.cpNf = CpNetflux.start(conf);
        };
        Store.leavePad = function (clientId, data, cb) {
            var channel = channels[data.channel];
            if (!channel || !channel.cpNf) { return void cb ({error: 'EINVAL'}); }
            channel.cpNf.stop();
            delete channels[data.channel];
            cb();
        };
        Store.sendPadMsg = function (clientId, data, cb) {
            var msg = data.msg;
            var channel = channels[data.channel];
            if (!channel) {
                return; }
            if (!channel.wc) {
                channel.queue.push(msg);
                return void cb();
            }
            channel.sendMessage(msg, clientId, cb);
        };

        // requestPadAccess is used to check if we have a way to contact the owner
        // of the pad AND to send the request if we want
        // data.send === false ==> check if we can contact them
        // data.send === true  ==> send the request
        Store.requestPadAccess = function (clientId, data, cb) {
            var owner = data.owner;
            var owners = data.owners;

            // If the owner was not is the pad metadata, check if it is a friend.
            // We'll contact the first owner for whom we know the mailbox
            if (!owner && Array.isArray(owners)) {
                var friends = store.proxy.friends || {};
                // If we have friends, check if an owner is one of them (with a mailbox)
                if (Object.keys(friends).filter(function (curve) { return curve !== 'me'; }).length) {
                    owners.some(function (edPublic) {
                        return Object.keys(friends).some(function (curve) {
                            if (curve === "me") { return; }
                            if (edPublic === friends[curve].edPublic &&
                                friends[curve].notifications) {
                                owner = friends[curve];
                                return true;
                            }
                        });
                    });
                }
            }

            // If send is true, send the request to the owner.
            if (owner) {
                if (data.send) {
                    var myData = Messaging.createData(store.proxy);
                    delete myData.channel;
                    store.mailbox.sendTo('REQUEST_PAD_ACCESS', {
                        channel: data.channel,
                        user: myData
                    }, {
                        channel: owner.notifications,
                        curvePublic: owner.curvePublic
                    }, function () {
                        cb({state: true});
                    });
                    return;
                }
                return void cb({state: true});
            }
            cb({state: false});
        };
        Store.givePadAccess = function (clientId, data, cb) {
            var edPublic = store.proxy.edPublic;
            var channel = data.channel;
            var res = store.manager.findChannel(channel);

            if (!data.user || !data.user.notifications || !data.user.curvePublic) {
                return void cb({error: 'EINVAL'});
            }

            var href, title;

            if (!res.some(function (obj) {
                if (obj.data &&
                    Array.isArray(obj.data.owners) && obj.data.owners.indexOf(edPublic) !== -1 &&
                    obj.data.href) {
                        href = obj.data.href;
                        title = obj.data.title;
                        return true;
                }
            })) { return void cb({error: 'ENOTFOUND'}); }

            var myData = Messaging.createData(store.proxy);
            delete myData.channel;
            store.mailbox.sendTo("GIVE_PAD_ACCESS", {
                channel: channel,
                href: href,
                title: title,
                user: myData
            }, {
                channel: data.user.notifications,
                curvePublic: data.user.curvePublic
            });
            cb();
        };

        // Fetch the latest version of the metadata on the server and return it.
        // If the pad is stored in our drive, update the local values of "owners" and "expire"
        Store.getPadMetadata = function (clientId, data, cb) {
            if (!data.channel) { return void cb({ error: 'ENOTFOUND'}); }
            store.anon_rpc.send('GET_METADATA', data.channel, function (err, obj) {
                if (err) { return void cb({error: err}); }
                var metadata = (obj && obj[0]) || {};
                cb(metadata);

                // Update owners and expire time in the drive
                getAllStores().forEach(function (s) {
                    var allData = s.manager.findChannel(data.channel);
                    var changed = false;
                    allData.forEach(function (obj) {
                        if (Sortify(obj.data.owners) !== Sortify(metadata.owners)) {
                            changed = true;
                        }
                        obj.data.owners = metadata.owners;
                        obj.data.atime = +new Date();
                        if (metadata.expire) {
                            obj.data.expire = +metadata.expire;
                        }
                    });
                    // If we had to change the "owners" field, redraw the drive UI
                    if (!changed) { return; }
                    var send = s.sendEvent || sendDriveEvent;
                    send('DRIVE_CHANGE', {
                        path: ['drive', UserObject.FILES_DATA]
                    });
                });
            });
        };
        Store.setPadMetadata = function (clientId, data, cb) {
            if (!data.channel) { return void cb({ error: 'ENOTFOUND'}); }
            if (!data.command) { return void cb({ error: 'EINVAL' }); }
            var s = getStore(data.teamId);
            s.rpc.setMetadata(data, function (err, res) {
                if (err) { return void cb({ error: err }); }
                if (!Array.isArray(res) || !res.length) { return void cb({}); }
                cb(res[0]);
            });
        };

        // GET_FULL_HISTORY from sframe-common-outer
        Store.getFullHistory = function (clientId, data, cb) {
            var network = store.network;
            var hkn = network.historyKeeper;
            //var crypto = Crypto.createEncryptor(data.keys);
            // Get the history messages and send them to the iframe
            var parse = function (msg) {
                try {
                    return JSON.parse(msg);
                } catch (e) {
                    return null;
                }
            };
            var msgs = [];
            var completed = false;
            var onMsg = function (msg) {
                if (completed) { return; }
                var parsed = parse(msg);
                if (parsed[0] === 'FULL_HISTORY_END') {
                    cb(msgs);
                    completed = true;
                    return;
                }
                if (parsed[0] !== 'FULL_HISTORY') { return; }
                if (parsed[1] && parsed[1].validateKey) { // First message
                    return;
                }
                if (parsed[1][3] !== data.channel) { return; }
                msg = parsed[1][4];
                if (msg) {
                    msg = msg.replace(/cp\|(([A-Za-z0-9+\/=]+)\|)?/, '');
                    //var decryptedMsg = crypto.decrypt(msg, true);
                    msgs.push(msg);
                }
            };
            network.on('message', onMsg);
            network.sendto(hkn, JSON.stringify(['GET_FULL_HISTORY', data.channel, data.validateKey]));
        };

        Store.getHistoryRange = function (clientId, data, cb) {
            var network = store.network;
            var hkn = network.historyKeeper;
            var parse = function (msg) {
                try {
                    return JSON.parse(msg);
                } catch (e) {
                    return null;
                }
            };
            var msgs = [];
            var first = true;
            var fullHistory = false;
            var completed = false;
            var lastKnownHash;
            var txid = Util.uid();

            var onMsg = function (msg) {
                if (completed) { return; }
                var parsed = parse(msg);
                if (parsed[1] !== txid) { console.log('bad txid'); return; }
                if (parsed[0] === 'HISTORY_RANGE_END') {
                    cb({
                        messages: msgs,
                        isFull: fullHistory,
                        lastKnownHash: lastKnownHash
                    });
                    completed = true;
                    return;
                }
                if (parsed[0] !== 'HISTORY_RANGE') { return; }
                if (parsed[2] && parsed[1].validateKey) { // Metadata
                    return;
                }
                if (parsed[2][3] !== data.channel) { return; }
                msg = parsed[2][4];
                if (msg) {
                    if (first) {
                        // If the first message if not a checkpoint, it means it is the first
                        // message of the pad, so we have the full history!
                        if (!/^cp\|/.test(msg)) { fullHistory = true; }
                        lastKnownHash = msg.slice(0,64);
                        first = false;
                    }
                    msg = msg.replace(/cp\|(([A-Za-z0-9+\/=]+)\|)?/, '');
                    msgs.push(msg);
                }
            };

            network.on('message', onMsg);
            network.sendto(hkn, JSON.stringify(['GET_HISTORY_RANGE', data.channel, {
                from: data.lastKnownHash,
                cpCount: 2,
                txid: txid
            }]));
        };

        // SHARED FOLDERS
        var addSharedFolderHandler = function () {
            store.sharedFolders = {};
            store.handleSharedFolder = function (id, rt) {
                store.sharedFolders[id] = rt;
                if (store.driveEvents) {
                    registerProxyEvents(rt.proxy, id);
                }
            };
        };
        Store.loadSharedFolder = function (teamId, id, data, cb) {
            var s = getStore(teamId);
            if (!s) { return void cb({ error: 'ENOTFOUND' }); }
            var rt = SF.load({
                network: store.network,
                store: s
            }, id, data, cb);
            return rt;
        };
        var loadSharedFolder = function (id, data, cb) {
            Store.loadSharedFolder(null, id, data, cb);
        };
        Store.loadSharedFolderAnon = function (clientId, data, cb) {
            Store.loadSharedFolder(null, data.id, data.data, function () {
                cb();
            });
        };
        Store.addSharedFolder = function (clientId, data, cb) {
            var s = getStore(data.teamId);
            s.manager.addSharedFolder(data, function (id) {
                var send = data.teamId ? s.sendEvent : sendDriveEvent;
                send('DRIVE_CHANGE', {
                    path: ['drive', UserObject.FILES_DATA]
                }, clientId);
                cb(id);
            });
        };

        // Drive
        Store.userObjectCommand = function (clientId, cmdData, cb) {
            if (!cmdData || !cmdData.cmd) { return; }
            //var data = cmdData.data;
            var s = getStore(cmdData.teamId);
            var cb2 = function (data2) {
                // Send the CHANGE event to all the stores because the command may have
                // affected data from a shared folder used by multiple teams.
                getAllStores().forEach(function (_s) {
                    var send = _s.id ? _s.sendEvent : sendDriveEvent;
                    send('DRIVE_CHANGE', {
                        path: ['drive', UserObject.FILES_DATA]
                    }, clientId);
                });
                onSync(cmdData.teamId, function () {
                    cb(data2);
                });
            };
            s.manager.command(cmdData, cb2);
        };

        // Clients management
        var driveEventClients = [];

        var dropChannel = function (chanId) {
            try {
                store.messenger.leavePad(chanId);
            } catch (e) { console.error(e); }
            try {
                store.cursor.leavePad(chanId);
            } catch (e) { console.error(e); }
            try {
                store.onlyoffice.leavePad(chanId);
            } catch (e) { console.error(e); }

            if (!Store.channels[chanId]) { return; }

            if (Store.channels[chanId].cpNf) {
                Store.channels[chanId].cpNf.stop();
            }

            delete Store.channels[chanId];
        };
        Store._removeClient = function (clientId) {
            var driveIdx = driveEventClients.indexOf(clientId);
            if (driveIdx !== -1) {
                driveEventClients.splice(driveIdx, 1);
            }
            try {
                store.cursor.removeClient(clientId);
            } catch (e) { console.error(e); }
            try {
                store.onlyoffice.removeClient(clientId);
            } catch (e) { console.error(e); }
            try {
                store.mailbox.removeClient(clientId);
            } catch (e) { console.error(e); }
            Object.keys(store.modules).forEach(function (key) {
                try {
                    store.modules[key].removeClient(clientId);
                } catch (e) { console.error(e); }
            });

            Object.keys(Store.channels).forEach(function (chanId) {
                var chanIdx = Store.channels[chanId].clients.indexOf(clientId);
                if (chanIdx !== -1) {
                    Store.channels[chanId].clients.splice(chanIdx, 1);
                }
                if (Store.channels[chanId].clients.length === 0) {
                    dropChannel(chanId);
                }
            });
        };

        // Special events

        sendDriveEvent = function (q, data, sender) {
            driveEventClients.forEach(function (cId) {
                if (cId === sender) { return; }
                postMessage(cId, q, data);
            });
        };
        registerProxyEvents = function (proxy, fId) {
            proxy.on('change', [], function (o, n, p) {
                if (fId) {
                    // Pin the new pads
                    if (p[0] === UserObject.FILES_DATA && typeof(n) === "object" && n.channel && !n.owners) {
                        var toPin = [n.channel];
                        // Also pin the onlyoffice channels if they exist
                        if (n.rtChannel) { toPin.push(n.rtChannel); }
                        if (n.lastVersion) { toPin.push(n.lastVersion); }
                        Store.pinPads(null, toPin, function (obj) { console.error(obj); });
                    }
                    // Unpin the deleted pads (deleted <=> changed to undefined)
                    if (p[0] === UserObject.FILES_DATA && typeof(o) === "object" && o.channel && !n) {
                        var toUnpin = [o.channel];
                        var c = store.manager.findChannel(o.channel);
                        var exists = c.some(function (data) {
                            return data.fId !== fId;
                        });
                        if (!exists) { // Unpin
                            // Also unpin the onlyoffice channels if they exist
                            if (o.rtChannel) { toUnpin.push(o.rtChannel); }
                            if (o.lastVersion) { toUnpin.push(o.lastVersion); }
                            Store.unpinPads(null, toUnpin, function (obj) { console.error(obj); });
                        }
                    }
                }
                sendDriveEvent('DRIVE_CHANGE', {
                    id: fId,
                    old: o,
                    new: n,
                    path: p
                });
            });
            proxy.on('remove', [], function (o, p) {
                sendDriveEvent('DRIVE_REMOVE', {
                    id: fId,
                    old: o,
                    path: p
                });
            });
        };

        Store._subscribeToDrive = function (clientId) {
            if (driveEventClients.indexOf(clientId) === -1) {
                driveEventClients.push(clientId);
            }
            if (!store.driveEvents) {
                store.driveEvents = true;
                registerProxyEvents(store.proxy);
                Object.keys(store.manager.folders).forEach(function (fId) {
                    var proxy = store.manager.folders[fId].proxy;
                    registerProxyEvents(proxy, fId);
                });
            }
        };


/*
        var loadProfile = function (waitFor) {
            store.profile = Profile.init({
                store: store,
                updateMetadata: function () {
                    broadcast([], "UPDATE_METADATA");
                },
                pinPads: function (data, cb) { Store.pinPads(null, data, cb); },
            }, waitFor, function (ev, data, clients) {
                clients.forEach(function (cId) {
                    postMessage(cId, 'PROFILE_EVENT', {
                        ev: ev,
                        data: data
                    });
                });
            });
        };
*/
        var loadCursor = function () {
            store.cursor = Cursor.init(store, function (ev, data, clients) {
                clients.forEach(function (cId) {
                    postMessage(cId, 'CURSOR_EVENT', {
                        ev: ev,
                        data: data
                    });
                });
            });
        };

        var loadOnlyOffice = function () {
            store.onlyoffice = OnlyOffice.init(store, function (ev, data, clients) {
                clients.forEach(function (cId) {
                    postMessage(cId, 'OO_EVENT', {
                        ev: ev,
                        data: data
                    });
                });
            });
        };

        var loadMailbox = function (waitFor) {
            if (!store.loggedIn || !store.proxy.edPublic) {
                return;
            }
            store.mailbox = Mailbox.init({
                store: store,
                updateMetadata: function () {
                    broadcast([], "UPDATE_METADATA");
                },
                pinPads: function (data, cb) { Store.pinPads(null, data, cb); },
            }, waitFor, function (ev, data, clients, _cb) {
                var cb = Util.once(_cb || function () {});
                clients.forEach(function (cId) {
                    postMessage(cId, 'MAILBOX_EVENT', {
                        ev: ev,
                        data: data
                    }, cb);
                });
            });
        };

        var cleanFriendRequests = function () {
            try {
                if (!store.proxy.friends_pending) { return; }
                var twoDaysAgo = +new Date() - (2 * 24 * 3600 * 1000);
                Object.keys(store.proxy.friends_pending).forEach(function (curve) {
                    if (store.proxy.friends_pending[curve] < twoDaysAgo) {
                        delete store.proxy.friends_pending[curve];
                    }
                });
            } catch (e) {}
        };

        //////////////////////////////////////////////////////////////////
        /////////////////////// Init /////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        var onReady = function (clientId, returned, cb) {
            var proxy = store.proxy;
            var unpin = function (data, cb) {
                if (!store.loggedIn) { return void cb(); }
                Store.unpinPads(null, data, cb);
            };
            var pin = function (data, cb) {
                if (!store.loggedIn) { return void cb(); }
                Store.pinPads(null, data, cb);
            };
            if (!proxy.settings) { proxy.settings = {}; }
            var manager = store.manager = ProxyManager.create(proxy.drive, {
                onSync: function (cb) { onSync(null, cb); },
                edPublic: proxy.edPublic,
                pin: pin,
                unpin: unpin,
                loadSharedFolder: loadSharedFolder,
                settings: proxy.settings
            }, {
                outer: true,
                removeOwnedChannel: function (channel, cb) { Store.removeOwnedChannel('', channel, cb); },
                edPublic: store.proxy.edPublic,
                loggedIn: store.loggedIn,
                log: function (msg) {
                    // broadcast to all drive apps
                    sendDriveEvent("DRIVE_LOG", msg);
                }
            });
            var userObject = store.userObject = manager.user.userObject;
            addSharedFolderHandler();

            nThen(function (waitFor) {
                postMessage(clientId, 'LOADING_DRIVE', {
                    state: 2
                });
                userObject.migrate(waitFor());
            }).nThen(function (waitFor) {
                initAnonRpc(null, null, waitFor());
                initRpc(null, null, waitFor());
            }).nThen(function (waitFor) {
                loadMailbox(waitFor);
                Migrate(proxy, waitFor(), function (version, progress) {
                    postMessage(clientId, 'LOADING_DRIVE', {
                        state: (2 + (version / 10)),
                        progress: progress
                    });
                }, store);
            }).nThen(function (waitFor) {
                postMessage(clientId, 'LOADING_DRIVE', {
                    state: 3
                });
                userObject.fixFiles();
                SF.loadSharedFolders(Store, store.network, store, userObject, waitFor);
                loadCursor();
                loadOnlyOffice();
                loadUniversal(Messenger, 'messenger', waitFor);
                store.messenger = store.modules['messenger'];
                loadUniversal(Profile, 'profile', waitFor);
                loadUniversal(Team, 'team', waitFor);
                cleanFriendRequests();
            }).nThen(function () {
                var requestLogin = function () {
                    broadcast([], "REQUEST_LOGIN");
                };

                if (store.loggedIn) {
                    arePinsSynced(function (err, yes) {
                        if (!yes) {
                            resetPins(function (err) {
                                if (err) { return console.error(err); }
                                console.log('RESET DONE');
                            });
                        }
                    });

                    /*  This isn't truly secure, since anyone who can read the user's object can
                        set their local loginToken to match that in the object. However, it exposes
                        a UI that will work most of the time. */

                    // every user object should have a persistent, random number
                    if (typeof(proxy.loginToken) !== 'number') {
                        proxy[Constants.tokenKey] = Math.floor(Math.random()*Number.MAX_SAFE_INTEGER);
                    }
                    returned[Constants.tokenKey] = proxy[Constants.tokenKey];

                    if (store.data.localToken && store.data.localToken !== proxy[Constants.tokenKey]) {
                        // the local number doesn't match that in
                        // the user object, request that they reauthenticate.
                        return void requestLogin();
                    }
                }

                if (!proxy.settings || !proxy.settings.general ||
                        typeof(proxy.settings.general.allowUserFeedback) !== 'boolean') {
                    proxy.settings = proxy.settings || {};
                    proxy.settings.general = proxy.settings.general || {};
                    proxy.settings.general.allowUserFeedback = true;
                }
                returned.feedback = proxy.settings.general.allowUserFeedback;

                if (typeof(cb) === 'function') { cb(returned); }

                if (typeof(proxy.uid) !== 'string' || proxy.uid.length !== 32) {
                    // even anonymous users should have a persistent, unique-ish id
                    console.log('generating a persistent identifier');
                    proxy.uid = Hash.createChannelId();
                }

                // if the user is logged in, but does not have signing keys...
                if (store.loggedIn && (!Store.hasSigningKeys() ||
                    !Store.hasCurveKeys())) {
                    return void requestLogin();
                }

                proxy.on('change', [Constants.displayNameKey], function (o, n) {
                    if (typeof(n) !== "string") { return; }
                    broadcast([], "UPDATE_METADATA");
                });
                proxy.on('change', ['profile'], function () {
                    // Trigger userlist update when the avatar has changed
                    broadcast([], "UPDATE_METADATA");
                });
                proxy.on('change', ['friends'], function (o, n, p) {
                    // Trigger userlist update when the friendlist has changed
                    broadcast([], "UPDATE_METADATA");

                    if (!store.messenger) { return; }
                    if (o !== undefined) { return; }
                    var curvePublic = p.slice(-1)[0];
                    var friend = proxy.friends && proxy.friends[curvePublic];
                    store.messenger.onFriendAdded(friend);
                });
                proxy.on('remove', ['friends'], function (o, p) {
                    broadcast([], "UPDATE_METADATA");

                    if (!store.messenger) { return; }
                    var curvePublic = p[1];
                    if (!curvePublic) { return; }
                    if (p[2] !== 'channel') { return; }
                    store.messenger.onFriendRemoved(curvePublic, o);
                });
                proxy.on('change', ['friends_pending'], function () {
                    // Trigger userlist update when the friendlist has changed
                    broadcast([], "UPDATE_METADATA");
                });
                proxy.on('remove', ['friends_pending'], function () {
                    broadcast([], "UPDATE_METADATA");
                });
                proxy.on('change', ['settings'], function () {
                    broadcast([], "UPDATE_METADATA");
                });
                proxy.on('change', [Constants.tokenKey], function () {
                    broadcast([], "UPDATE_TOKEN", { token: proxy[Constants.tokenKey] });
                });
            });
        };

        var connect = function (clientId, data, cb) {
            var hash = data.userHash || data.anonHash || Hash.createRandomHash('drive');
            storeHash = hash;
            if (!hash) {
                return void cb({error: '[Store.init] Unable to find or create a drive hash. Aborting...'});
            }
            // No password for drive
            var secret = Hash.getSecrets('drive', hash);
            storeChannel = secret.channel;
            var listmapConfig = {
                data: {},
                websocketURL: NetConfig.getWebsocketURL(),
                channel: secret.channel,
                readOnly: false,
                validateKey: secret.keys.validateKey || undefined,
                crypto: Crypto.createEncryptor(secret.keys),
                userName: 'fs',
                logLevel: 1,
                ChainPad: ChainPad,
                classic: true,
            };
            var rt = window.rt = Listmap.create(listmapConfig);
            store.proxy = rt.proxy;
            store.loggedIn = typeof(data.userHash) !== "undefined";

            var returned = {};
            rt.proxy.on('create', function (info) {
                store.realtime = info.realtime;
                store.network = info.network;
                if (!data.userHash) {
                    returned.anonHash = Hash.getEditHashFromKeys(secret);
                }
            }).on('ready', function (info) {
                if (store.userObject) { return; } // the store is already ready, it is a reconnection
                store.driveMetadata = info.metadata;
                if (!rt.proxy.drive || typeof(rt.proxy.drive) !== 'object') { rt.proxy.drive = {}; }
                var drive = rt.proxy.drive;
                // Creating a new anon drive: import anon pads from localStorage
                if ((!drive[Constants.oldStorageKey] || !Array.isArray(drive[Constants.oldStorageKey]))
                    && !drive['filesData']) {
                    drive[Constants.oldStorageKey] = [];
                }
                postMessage(clientId, 'LOADING_DRIVE', { state: 1 });
                // Drive already exist: return the existing drive, don't load data from legacy store
                onReady(clientId, returned, cb);
            })
            .on('change', ['drive', 'migrate'], function () {
                var path = arguments[2];
                var value = arguments[1];
                if (path[0] === 'drive' && path[1] === "migrate" && value === 1) {
                    rt.network.disconnect();
                    rt.realtime.abort();
                    broadcast([], 'NETWORK_DISCONNECT');
                }
            });

            rt.proxy.on('disconnect', function () {
                broadcast([], 'NETWORK_DISCONNECT');
            });
            rt.proxy.on('reconnect', function (info) {
                broadcast([], 'NETWORK_RECONNECT', {myId: info.myId});
            });

            // Ping clients regularly to make sure one tab was not closed without sending a removeClient()
            // command. This allow us to avoid phantom viewers in pads.
            var PING_INTERVAL = 120000;
            var MAX_PING = 30000;
            var MAX_FAILED_PING = 2;

            setInterval(function () {
                var clients = [];
                Object.keys(Store.channels).forEach(function (chanId) {
                    var c = Store.channels[chanId].clients;
                    Array.prototype.push.apply(clients, c);
                });
                clients = Util.deduplicateString(clients);
                clients.forEach(function (cId) {
                    var nb = 0;
                    var ping = function () {
                        if (nb >= MAX_FAILED_PING) {
                            Store._removeClient(cId);
                            postMessage(cId, 'TIMEOUT');
                            console.error('TIMEOUT', cId);
                            return;
                        }
                        nb++;
                        var to = setTimeout(ping, MAX_PING);
                        postMessage(cId, 'PING', null, function (err) {
                            if (err) { console.error(err); }
                            clearTimeout(to);
                        });
                    };
                    ping();
                });
            }, PING_INTERVAL);
        };

        /**
         * Data:
         *   - userHash or anonHash
         * Todo in cb
         *   - LocalStore.setFSHash if needed
         *   - sessionStorage.User_Hash
         *   - stuff with tokenKey
         * Event to outer
         *   - requestLogin
         */
        var initialized = false;

        var whenReady = function (cb) {
            if (store.returned) { return void cb(); }
            setTimeout(function() {
                whenReady(cb);
            }, 100);
        };

        Store.init = function (clientId, data, _callback) {
            var callback = Util.once(_callback);
            if (initialized) {
                return void whenReady(function () {
                    callback({
                        state: 'ALREADY_INIT',
                        returned: store.returned
                    });
                });
            }
            initialized = true;
            postMessage = function (clientId, cmd, d, cb) {
                data.query(clientId, cmd, d, cb);
            };
            broadcast = function (excludes, cmd, d, cb) {
                data.broadcast(excludes, cmd, d, cb);
            };

            store.data = data;
            connect(clientId, data, function (ret) {
                if (Object.keys(store.proxy).length === 1) {
                    Feedback.send("FIRST_APP_USE", true);
                }
                if (ret && ret.error) {
                    initialized = false;
                } else {
                    store.returned = ret;
                }

                callback(ret);
            });
        };

        Store.disconnect = function () {
            if (!store.network) { return; }
            store.network.disconnect();
        };
        return Store;
    };

    return {
        create: create
    };
});
