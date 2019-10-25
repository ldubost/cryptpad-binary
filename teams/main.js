// Load #1, load as little as possible because we are in a race to get the loading screen up.
define([
    '/bower_components/nthen/index.js',
    '/api/config',
    '/common/dom-ready.js',
    '/common/requireconfig.js',
    '/common/sframe-common-outer.js',
], function (nThen, ApiConfig, DomReady, RequireConfig, SFCommonO) {
    var requireConfig = RequireConfig();

    // Loaded in load #2
    nThen(function (waitFor) {
        DomReady.onReady(waitFor());
    }).nThen(function (waitFor) {
        var req = {
            cfg: requireConfig,
            req: [ '/common/loading.js' ],
            pfx: window.location.origin
        };
        window.rc = requireConfig;
        window.apiconf = ApiConfig;
        document.getElementById('sbox-iframe').setAttribute('src',
            ApiConfig.httpSafeOrigin + '/teams/inner.html?' + requireConfig.urlArgs +
                '#' + encodeURIComponent(JSON.stringify(req)));

        // This is a cheap trick to avoid loading sframe-channel in parallel with the
        // loading screen setup.
        var done = waitFor();
        var onMsg = function (msg) {
            var data = JSON.parse(msg.data);
            if (data.q !== 'READY') { return; }
            window.removeEventListener('message', onMsg);
            var _done = done;
            done = function () { };
            _done();
        };
        window.addEventListener('message', onMsg);
    }).nThen(function (/*waitFor*/) {
        var teamId;
        var addRpc = function (sframeChan, Cryptpad) {
            sframeChan.on('Q_SET_TEAM', function (data, cb) {
                teamId = data;
                cb();
            });

            sframeChan.on('Q_DRIVE_USEROBJECT', function (data, cb) {
                if (!teamId) { return void cb({error: 'EINVAL'}); }
                data.teamId = teamId;
                Cryptpad.userObjectCommand(data, cb);
            });
            sframeChan.on('Q_DRIVE_GETOBJECT', function (data, cb) {
                if (!teamId) { return void cb({error: 'EINVAL'}); }
                if (data && data.sharedFolder) {
                    Cryptpad.getSharedFolder({
                        teamId: teamId,
                        id: data.sharedFolder
                    }, function (obj) {
                        cb(obj);
                    });
                    return;
                }
                Cryptpad.getUserObject(teamId, function (obj) {
                    cb(obj);
                });
            });
            sframeChan.on('EV_DRIVE_SET_HASH', function () {
                return;
            });
            Cryptpad.onNetworkDisconnect.reg(function () {
                sframeChan.event('EV_NETWORK_DISCONNECT');
            });
            Cryptpad.onNetworkReconnect.reg(function (data) {
                sframeChan.event('EV_NETWORK_RECONNECT', data);
            });
            Cryptpad.universal.onEvent.reg(function (obj) {
                // Intercept events for the team drive and send them the required way
                if (obj.type !== 'team' ||
                    ['DRIVE_CHANGE', 'DRIVE_LOG', 'DRIVE_REMOVE'].indexOf(obj.data.ev) === -1) { return; }
                sframeChan.event('EV_'+obj.data.ev, obj.data.data);
            });
        };
        SFCommonO.start({
            noHash: true,
            noRealtime: true,
            //driveEvents: true,
            addRpc: addRpc,
            isDrive: true, // Used for history...
        });
    });
});
