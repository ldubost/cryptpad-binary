/*
 * This is an internal language file.
 * If you want to change some translations in your CryptPad instance, use the '/customize/translations/messages.{LANG}.js'
 * file (make a copy from /customize.dist/translations/messages.{LANG}.js)
 */
define(function () {
    var out = {};

    out.main_title = "CryptPad: Zero Knowledge, Collaborative Real Time Editing";

    out.type = {};
    out.type.pad = 'Rich text';
    out.type.code = 'Code';
    out.type.poll = 'Poll';
    out.type.kanban = 'Kanban';
    out.type.slide = 'Presentation';
    out.type.drive = 'CryptDrive';
    out.type.whiteboard = 'Whiteboard';
    out.type.file = 'File';
    out.type.media = 'Media';
    out.type.todo = "Todo";
    out.type.contacts = 'Contacts';
    out.type.sheet = 'Spreadsheet (Beta)';
    //out.type.ooslide = 'OnlyOffice Slide';
    //out.type.oodoc = 'OnlyOffice Doc';

    out.button_newpad = 'New Rich Text pad';
    out.button_newcode = 'New Code pad';
    out.button_newpoll = 'New Poll';
    out.button_newslide = 'New Presentation';
    out.button_newwhiteboard = 'New Whiteboard';
    out.button_newkanban = 'New Kanban';

    // NOTE: Remove updated_0_ if we need an updated_1_
    out.updated_0_common_connectionLost = "<b>Server Connection Lost</b><br>You're now in read-only mode until the connection is back.";
    out.common_connectionLost = out.updated_0_common_connectionLost;

    out.websocketError = 'Unable to connect to the websocket server...';
    out.typeError = "This pad is not compatible with the selected application";
    out.onLogout = 'You are logged out, {0}click here{1} to log in<br>or press <em>Escape</em> to access your pad in read-only mode.';
    out.wrongApp = "Unable to display the content of that realtime session in your browser. Please try to reload that page.";
    out.padNotPinned = 'This pad will expire after 3 months of inactivity, {0}login{1} or {2}register{3} to preserve it.';
    out.anonymousStoreDisabled = "The webmaster of this CryptPad instance has disabled the store for anonymous users. You have to log in to be able to use CryptDrive.";
    out.expiredError = 'This pad has reached its expiration time and is no longer available.';
    out.deletedError = 'This pad has been deleted by its owner and is no longer available.';
    out.inactiveError = 'This pad has been deleted due to inactivity. Press Esc to create a new pad.';
    out.chainpadError = 'A critical error occurred when updating your content. This page is in read-only mode to make sure you won\'t lose your work.<br>' +
                        'Hit <em>Esc</em> to continue to view this pad, or reload to try editing again.';
    out.errorCopy = ' You can still copy the content to another location by pressing <em>Esc</em>.<br>Once you leave this page, it will disappear forever!';
    out.errorRedirectToHome = 'Press <em>Esc</em> to be redirected to your CryptDrive.';
    out.newVersionError = "A new version of CryptPad is available.<br>" +
                          "<a href='#'>Reload</a> to use the new version, or press escape to access your content in <b>offline mode</b>.";

    out.loading = "Loading...";
    out.error = "Error";
    out.saved = "Saved";
    out.synced = "Everything is saved";
    out.deleted = "Pad deleted from your CryptDrive";
    out.deletedFromServer = "Pad deleted from the server";

    out.mustLogin = "You must be logged in to access this page";
    out.disabledApp = "This application has been disabled. Contact the administrator of this CryptPad for more information.";

    out.realtime_unrecoverableError = "An unrecoverable error has occurred. Click OK to reload.";

    out.disconnected = 'Disconnected';
    out.synchronizing = 'Synchronizing';
    out.reconnecting = 'Reconnecting';
    out.typing = "Editing";
    out.initializing = "Initializing...";
    out.forgotten = 'Moved to the trash';
    out.errorState = 'Critical error: {0}';
    out.lag = 'Lag';
    out.readonly = 'Read only';
    out.anonymous = "Anonymous";
    out.yourself = "Yourself";
    out.anonymousUsers = "anonymous editors";
    out.anonymousUser = "anonymous editor";
    out.users = "Users";
    out.and = "And";
    out.viewer = "viewer";
    out.viewers = "viewers";
    out.editor = "editor";
    out.editors = "editors";
    out.userlist_offline = "You're currently offline, the user list is not available.";

    out.language = "Language";

    out.comingSoon = "Coming soon...";

    out.newVersion = '<b>CryptPad has been updated!</b><br>' +
                     'Check out what\'s new in the latest version:<br>'+
                     '<a href="https://github.com/xwiki-labs/cryptpad/releases/tag/{0}" target="_blank">Release notes for CryptPad {0}</a>';

    out.upgrade = "Upgrade";
    out.upgradeTitle = "Upgrade your account to increase the storage limit";

    out.upgradeAccount = "Upgrade account";
    out.MB = "MB";
    out.GB = "GB";
    out.KB = "KB";

    out.supportCryptpad = "Support CryptPad";

    out.formattedMB = "{0} MB";
    out.formattedGB = "{0} GB";
    out.formattedKB = "{0} KB";

    out.greenLight = "Everything is working fine";
    out.orangeLight = "Your slow connection may impact your experience";
    out.redLight = "You are disconnected from the session";

    out.pinLimitReached = "You've reached your storage limit";
    out.updated_0_pinLimitReachedAlert = "You've reached your storage limit. New pads won't be stored in your CryptDrive.<br>" +
        'You can either remove pads from your CryptDrive or <a href="https://accounts.cryptpad.fr/#!on={0}" target="_blank">subscribe to a premium offer</a> to increase your limit.';
    out.pinLimitReachedAlert = out.updated_0_pinLimitReachedAlert;
    out.pinLimitReachedAlertNoAccounts = out.pinLimitReached;
    out.pinLimitNotPinned = "You've reached your storage limit.<br>"+
                            "This pad is not stored in your CryptDrive.";
    out.pinLimitDrive = "You've reached your storage limit.<br>" +
                        "You can't create new pads.";

    out.moreActions = "More actions";

    out.importButton = "Import";
    out.importButtonTitle = 'Import a pad from a local file';

    out.exportButton = "Export";
    out.exportButtonTitle = 'Export this pad to a local file';
    out.exportPrompt = 'What would you like to name your file?';

    out.changeNamePrompt = 'Change your name (leave empty to be anonymous): ';
    out.user_rename = "Change display name";
    out.user_displayName = "Display name";
    out.user_accountName = "Account name";

    out.clickToEdit = "Click to edit";
    out.saveTitle = "Save the title (enter)";

    out.forgetButton = "Delete";
    out.forgetButtonTitle = 'Move this pad to the trash';
    out.forgetPrompt = 'Clicking OK will move this pad to your trash. Are you sure?';
    out.movedToTrash = 'That pad has been moved to the trash.<br><a href="/drive/">Access my Drive</a>';

    out.shareButton = 'Share';
    out.shareSuccess = 'Copied link to clipboard';

    out.userListButton = "User list";

    out.chatButton = "Chat";

    out.userAccountButton = "Your account";

    out.newButton = 'New';
    out.newButtonTitle = 'Create a new pad';
    out.uploadButton = 'Upload files';
    out.uploadButtonTitle = 'Upload a new file to the current folder';

    out.saveTemplateButton = "Save as template";
    out.saveTemplatePrompt = "Choose a title for the template";
    out.templateSaved = "Template saved!";
    out.selectTemplate = "Select a template or press escape";
    out.useTemplate = "Start with a template?"; //Would you like to "You have available templates for this type of pad. Do you want to use one?";
    out.useTemplateOK = 'Pick a template (Enter)';
    out.useTemplateCancel = 'Start fresh (Esc)';
    out.template_import = "Import a template";
    out.template_empty = "No template available";

    out.previewButtonTitle = "Display or hide the Markdown preview mode";

    out.presentButtonTitle = "Enter presentation mode";

    out.backgroundButtonTitle = 'Change the background color in the presentation';
    out.colorButtonTitle = 'Change the text color in presentation mode';

    out.propertiesButton = "Properties";
    out.propertiesButtonTitle = 'Get pad properties';

    out.printText = "Print";
    out.printButton = "Print (enter)";
    out.printButtonTitle2 = "Print your document or export it as a PDF file";
    out.printOptions = "Layout options";
    out.printSlideNumber = "Display the slide number";
    out.printDate = "Display the date";
    out.printTitle = "Display the pad title";
    out.printCSS = "Custom style rules (CSS):";
    out.printTransition = "Enable transition animations";
    out.printBackground = "Use a background image";
    out.printBackgroundButton = "Pick an image";
    out.printBackgroundValue = "<b>Current background:</b> <em>{0}</em>";
    out.printBackgroundNoValue = "<em>No background image displayed</em>";
    out.printBackgroundRemove = "Remove this background image";

    out.filePickerButton = "Embed a file stored in CryptDrive";
    out.filePicker_close = "Close";
    out.filePicker_description = "Choose a file from your CryptDrive to embed it or upload a new one";
    out.filePicker_filter = "Filter files by name";
    out.or = 'or';

    out.tags_title = "Tags (for you only)";
    out.tags_add = "Update this page's tags";
    out.tags_searchHint = "Find files by their tags by searching in your CryptDrive";
    out.tags_searchHint = "Start a search with # in your CryptDrive to find your tagged pads.";
    out.tags_notShared = "Your tags are not shared with other users";
    out.tags_duplicate = "Duplicate tag: {0}";
    out.tags_noentry = "You can't tag a deleted pad!";

    out.slideOptionsText = "Options";
    out.slideOptionsTitle = "Customize your slides";
    out.slideOptionsButton = "Save (enter)";
    out.slide_invalidLess = "Invalid custom style";

    out.languageButton = "Language";
    out.languageButtonTitle = "Select the language to use for the syntax highlighting";
    out.themeButton = "Theme";
    out.themeButtonTitle = "Select the color theme to use for the code and slide editors";

    out.editShare = "Editing link";
    out.editShareTitle = "Copy the editing link to clipboard";
    out.editOpen = "Open editing link in a new tab";
    out.editOpenTitle = "Open this pad in editing mode in a new tab";
    out.viewShare = "Read-only link";
    out.viewShareTitle = "Copy the read-only link to clipboard";
    out.viewOpen = "Open read-only link in a new tab";
    out.viewOpenTitle = "Open this pad in read-only mode in a new tab";
    out.fileShare = "Copy link";
    out.getEmbedCode = "Get embed code";
    out.viewEmbedTitle = "Embed the pad in an external page";
    out.viewEmbedTag = "To embed this pad, include this iframe in your page wherever you want. You can style it using CSS or HTML attributes.";
    out.fileEmbedTitle = "Embed the file in an external page";
    out.fileEmbedScript = "To embed this file, include this script once in your page to load the Media Tag:";
    out.fileEmbedTag = "Then place this Media Tag wherever in your page you would like to embed:";

    out.notifyJoined = "{0} has joined the collaborative session";
    out.notifyRenamed = "{0} is now known as {1}";
    out.notifyLeft = "{0} has left the collaborative session";

    out.ok = 'OK';
    out.okButton = 'OK (enter)';

    out.cancel = "Cancel";
    out.cancelButton = 'Cancel (esc)';
    out.doNotAskAgain = "Don't ask me again (Esc)";

    out.show_help_button = "Show help";
    out.hide_help_button = "Hide help";
    out.help_button = "Help";

    out.historyText = "History";
    out.historyButton = "Display the document history";
    out.history_next = "Newer version";
    out.history_prev = "Older version";
    out.history_loadMore = "Load more history";
    out.history_closeTitle = "Close the history";
    out.history_restoreTitle = "Restore the selected version of the document";
    out.history_restorePrompt = "Are you sure you want to replace the current version of the document by the displayed one?";
    out.history_restoreDone = "Document restored";
    out.history_version = "Version:";

    // Ckeditor
    out.openLinkInNewTab = "Open Link in New Tab";
    out.pad_mediatagTitle = "Media-Tag settings";
    out.pad_mediatagWidth = "Width (px)";
    out.pad_mediatagHeight = "Height (px)";
    out.pad_mediatagRatio = "Keep ratio";
    out.pad_mediatagBorder = "Border width (px)";
    out.pad_mediatagPreview = "Preview";
    out.pad_mediatagImport = 'Save in your CryptDrive';
    out.pad_mediatagOptions = 'Image properties';

    // Kanban
    out.kanban_newBoard = "New board";
    out.kanban_item = "Item {0}"; // Item number for initial content
    out.kanban_todo = "To Do";
    out.kanban_done = "Done";
    out.kanban_working = "In progress";
    out.kanban_deleteBoard = "Are you sure you want to delete this board?";
    out.kanban_addBoard = "Add a board";
    out.kanban_removeItem = "Remove this item";
    out.kanban_removeItemConfirm = "Are you sure you want to delete this item?";

    // Polls

    out.poll_title = "Zero Knowledge Date Picker";
    out.poll_subtitle = "Zero Knowledge, <em>realtime</em> scheduling";

    out.poll_p_save = "Your settings are updated instantly, so you never need to save.";
    out.poll_p_encryption = "All your input is encrypted so only people who have the link can access it. Even the server cannot see what you change.";

    out.wizardLog = "Click the button in the top left to return to your poll";
    out.wizardTitle = "Use the wizard to create your poll";
    out.wizardConfirm = "Are you really ready to add these options to your poll?";

    out.poll_publish_button = "Publish";
    out.poll_admin_button = "Admin";
    out.poll_create_user = "Add a new user";
    out.poll_create_option = "Add a new option";
    out.poll_commit = "Submit";

    out.poll_closeWizardButton = "Close wizard";
    out.poll_closeWizardButtonTitle = "Close wizard";
    out.poll_wizardComputeButton = "Compute Options";
    out.poll_wizardClearButton = "Clear Table";
    out.poll_wizardDescription = "Automatically create a number of options by entering any number of dates and times segments";
    out.poll_wizardAddDateButton = "+ Dates";
    out.poll_wizardAddTimeButton = "+ Times";

    out.poll_optionPlaceholder = "Option";
    out.poll_userPlaceholder = "Your name";
    out.poll_removeOption = "Are you sure you'd like to remove this option?";
    out.poll_removeUser = "Are you sure you'd like to remove this user?";

    out.poll_titleHint = "Title";
    out.poll_descriptionHint = "Describe your poll, and use the ✓ (publish) button when you're done.\n" +
                               "The description can be written using markdown syntax and you can embed media elements from your CryptDrive.\n" +
                               "Anyone with the link can change the description, but this is discouraged.";

    out.poll_remove = "Remove";
    out.poll_edit = "Edit";
    out.poll_locked = "Locked";
    out.poll_unlocked = "Unlocked";

    out.poll_bookmark_col = 'Bookmark this column so that it is always unlocked and displayed at the beginning for you';
    out.poll_bookmarked_col = 'This is your bookmarked column. It will always be unlocked and displayed at the beginning for you.';
    out.poll_total = 'TOTAL';

    out.poll_comment_list = "Comments";
    out.poll_comment_add = "Add a comment";
    out.poll_comment_submit = "Send";
    out.poll_comment_remove = "Delete this comment";
    out.poll_comment_placeholder = "Your comment";

    out.poll_comment_disabled = "Publish this poll using the ✓ button to enable the comments.";

    // OnlyOffice
    out.oo_reconnect = "The server connection is back. Click OK to reload and continue the edition.";

    // Canvas
    out.canvas_clear = "Clear";
    out.canvas_delete = "Delete selection";
    out.canvas_disable = "Disable draw";
    out.canvas_enable = "Enable draw";
    out.canvas_width = "Width";
    out.canvas_opacity = "Opacity";
    out.canvas_opacityLabel = "Opacity: {0}";
    out.canvas_widthLabel = "Width: {0}";
    out.canvas_saveToDrive = "Save this image as a file in your CryptDrive";
    out.canvas_currentBrush = "Current brush";
    out.canvas_chooseColor = "Choose a color";
    out.canvas_imageEmbed = "Embed an image from your computer";

    // Profile
    out.profileButton = "Profile"; // dropdown menu
    out.profile_urlPlaceholder = 'URL';
    out.profile_namePlaceholder = 'Name displayed in your profile';
    out.profile_avatar = "Avatar";
    out.profile_upload = " Upload a new avatar";
    out.profile_uploadSizeError = "Error: your avatar must be smaller than {0}";
    out.profile_uploadTypeError = "Error: your avatar type is not allowed. Allowed types are: {0}";
    out.profile_error = "Error while creating your profile: {0}";
    out.profile_register = "You have to sign up to create a profile!";
    out.profile_create = "Create a profile";
    out.profile_description = "Description";
    out.profile_fieldSaved = 'New value saved: {0}';

    out.profile_inviteButton = "Connect";
    out.profile_inviteButtonTitle ='Create a link that will invite this user to connect with you.';
    out.profile_inviteExplanation = "Clicking <strong>OK</strong> will create a link to a secure messaging session that <em>only {0} will be able to redeem.</em><br><br>The link will be copied to your clipboard and can be shared publicly.";
    out.profile_viewMyProfile = "View my profile";

    // contacts/userlist
    out.userlist_addAsFriendTitle = 'Add "{0}" as a contact';
    out.userlist_thisIsYou = 'This is you ("{0}")';
    out.userlist_pending = "Pending...";
    out.contacts_title = "Contacts";
    out.contacts_addError = 'Error while adding that contact to the list';
    out.contacts_added = 'Contact invite accepted.';
    out.contacts_rejected = 'Contact invite rejected';
    out.contacts_request = '<em>{0}</em> would like to add you as a contact. <b>Accept<b>?';
    out.contacts_send = 'Send';
    out.contacts_remove = 'Remove this contact';
    out.contacts_confirmRemove = 'Are you sure you want to remove <em>{0}</em> from your contacts?';
    out.contacts_typeHere = "Type a message here...";
    out.contacts_warning = "Everything you type here is persistent and available to all the existing and future users of this pad. Be careful with sensitive information!";
    out.contacts_padTitle = "Chat";

    out.contacts_info1 = "These are your contacts. From here, you can:";
    out.contacts_info2 = "Click your contact's icon to chat with them";
    out.contacts_info3 = "Double-click their icon to view their profile";
    out.contacts_info4 = "Either participant can clear permanently a chat history";

    out.contacts_removeHistoryTitle = 'Clean the chat history';
    out.contacts_confirmRemoveHistory = 'Are you sure you want to permanently remove your chat history? Data cannot be restored';
    out.contacts_removeHistoryServerError = 'There was an error while removing your chat history. Try again later';
    out.contacts_fetchHistory = "Retrieve older history";

    out.contacts_friends = "Friends";
    out.contacts_rooms = "Rooms";
    out.contacts_leaveRoom = "Leave this room";

    out.contacts_online = "Another user from this room is online";

    // File manager

    out.fm_rootName = "Documents";
    out.fm_trashName = "Trash";
    out.fm_unsortedName = "Unsorted files";
    out.fm_filesDataName = "All files";
    out.fm_templateName = "Templates";
    out.fm_searchName = "Search";
    out.fm_recentPadsName = "Recent pads";
    out.fm_ownedPadsName = "Owned";
    out.fm_tagsName = "Tags";
    out.fm_sharedFolderName = "Shared folder";
    out.fm_searchPlaceholder = "Search...";
    out.fm_newButton = "New";
    out.fm_newButtonTitle = "Create a new pad or folder, import a file in the current folder";
    out.fm_newFolder = "New folder";
    out.fm_newFile = "New pad";
    out.fm_folder = "Folder";
    out.fm_sharedFolder = "Shared folder";
    out.fm_folderName = "Folder name";
    out.fm_numberOfFolders = "# of folders";
    out.fm_numberOfFiles = "# of files";
    out.fm_fileName = "File name";
    out.fm_title = "Title";
    out.fm_type = "Type";
    out.fm_lastAccess = "Last access";
    out.fm_creation = "Creation";
    out.fm_forbidden = "Forbidden action";
    out.fm_originalPath = "Original path";
    out.fm_openParent = "Show in folder";
    out.fm_noname = "Untitled Document";
    out.fm_emptyTrashDialog = "Are you sure you want to empty the trash?";
    out.fm_removeSeveralPermanentlyDialog = "Are you sure you want to permanently remove these {0} elements from your CryptDrive?";
    out.fm_removePermanentlyNote = "Owned pads will be removed from the server if you continue.";
    out.fm_removePermanentlyDialog = "Are you sure you want to permanently remove that element from your CryptDrive?";
    out.fm_removeSeveralDialog = "Are you sure you want to move these {0} elements to the trash?";
    out.fm_removeDialog = "Are you sure you want to move {0} to the trash?";
    out.fm_deleteOwnedPad = "Are you sure you want to permanently remove this pad from the server?";
    out.fm_deleteOwnedPads = "Are you sure you want to permanently remove these pads from the server?";
    out.fm_restoreDialog = "Are you sure you want to restore {0} to its previous location?";
    out.fm_unknownFolderError = "The selected or last visited directory no longer exist. Opening the parent folder...";
    out.fm_contextMenuError = "Unable to open the context menu for that element. If the problem persist, try to reload the page.";
    out.fm_selectError = "Unable to select the targeted element. If the problem persists, try to reload the page.";
    out.fm_categoryError = "Unable to open the selected category, displaying root.";
    out.fm_info_root = "Create as many nested folders here as you want to sort your files.";
    out.fm_info_unsorted = 'Contains all the files you\'ve visited that are not yet sorted in "Documents" or moved to the "Trash".'; // "My Documents" should match with the "out.fm_rootName" key, and "Trash" with "out.fm_trashName"
    out.fm_info_template = 'Contains all the pads stored as templates and that you can re-use when you create a new pad.';
    out.fm_info_recent = "List the recently modified or opened pads.";
    out.updated_0_fm_info_trash = 'Empty your trash to free space in your CryptDrive.';
    out.fm_info_trash = out.updated_0_fm_info_trash;
    out.fm_info_allFiles = 'Contains all the files from "Documents", "Unsorted" and "Trash". You can\'t move or remove files from here.'; // Same here
    out.fm_info_anonymous = 'You are not logged in so your pads will expire after 3 months (<a href="https://blog.cryptpad.fr/2017/05/17/You-gotta-log-in/" target="_blank">find out more</a>). ' +
                            'They are stored in your browser so clearing history may make them disappear.<br>' +
                            '<a href="/register/">Sign up</a> or <a href="/login/">Log in</a> to keep them alive.<br>';
    out.fm_info_sharedFolder = "This is a shared folder. You're not logged in so you can only access it in read-only mode.<br>" +
                               '<a href="/register/">Sign up</a> or <a href="/login/">Log in</a> to be able to import it to your CryptDrive and to modify it.';
    out.fm_info_owned = "You are the owner of the pads displayed here. This means you can remove them permanently from the server whenever you want. If you do so, other users won't be able to access them anymore.";
    out.fm_alert_backupUrl = "Backup link for this drive.<br>" +
                             "It is <strong>highly recommended</strong> that you keep it secret.<br>" +
                             "You can use it to retrieve all your files in case your browser memory got erased.<br>" +
                             "Anybody with that link can edit or remove all the files in your file manager.<br>";
    out.fm_alert_anonymous = "Hello there, you are currently using CryptPad anonymously, that's ok but your pads may be deleted after a period of " +
                             "inactivity. We have disabled advanced features of the drive for anonymous users because we want to be clear that it is " +
                             'not a safe place to store things. You can <a href="https://blog.cryptpad.fr/2017/05/17/You-gotta-log-in/" target="_blank">read more</a> about ' +
                             'why we are doing this and why you really should <a href="/register/">Sign up</a> and <a href="/login/">Log in</a>.';
    out.fm_backup_title = 'Backup link';
    out.fm_nameFile = 'How would you like to name that file?';
    out.fm_error_cantPin = "Internal server error. Please reload the page and try again.";
    out.fm_viewListButton = "List view";
    out.fm_viewGridButton = "Grid view";
    out.fm_renamedPad = "You've set a custom name for this pad. Its shared title is:<br><b>{0}</b>";
    out.fm_canBeShared = "This folder can be shared";
    out.fm_prop_tagsList = "Tags";
    out.fm_burnThisDriveButton = "Erase all information stored by CryptPad in your browser";
    out.fm_burnThisDrive = "Are you sure you want to remove everything stored by CryptPad in your browser?<br>" +
                           "This will remove your CryptDrive and its history from your browser, but your pads will still exist (encrypted) on our server.";
    out.fm_padIsOwned = "You are the owner of this pad";
    out.fm_padIsOwnedOther = "This pad is owned by another user";
    out.fm_deletedPads = "These pads no longer exist on the server, they've been removed from your CryptDrive: {0}";
    out.fm_tags_name = "Tag name";
    out.fm_tags_used = "Number of uses";
    out.fm_restoreDrive = "Resetting your drive to an earlier state. For best results, avoid making changes to your drive until this process is complete.";
    out.fm_moveNestedSF = "You can't place one shared folder within another. The folder {0} was not moved.";
    // File - Context menu
    out.fc_newfolder = "New folder";
    out.fc_newsharedfolder = "New shared folder";
    out.fc_rename = "Rename";
    out.fc_open = "Open";
    out.fc_open_ro = "Open (read-only)";
    out.fc_delete = "Move to trash";
    out.fc_delete_owned = "Delete from the server";
    out.fc_restore = "Restore";
    out.fc_remove = "Remove from your CryptDrive";
    out.fc_remove_sharedfolder = "Remove";
    out.fc_empty = "Empty the trash";
    out.fc_prop = "Properties";
    out.fc_hashtag = "Tags";
    out.fc_sizeInKilobytes = "Size in Kilobytes";
    // fileObject.js (logs)
    out.fo_moveUnsortedError = "You can't move a folder to the list of templates";
    out.fo_existingNameError = "Name already used in that directory. Please choose another one.";
    out.fo_moveFolderToChildError = "You can't move a folder into one of its descendants";
    out.fo_unableToRestore = "Unable to restore that file to its original location. You can try to move it to a new location.";
    out.fo_unavailableName = "A file or a folder with the same name already exist at the new location. Rename the element and try again.";

    out.fs_migration = "Your CryptDrive is being updated to a new version. As a result, the current page has to be reloaded.<br><strong>Please reload this page to continue to use it.</strong>";

    // login
    out.login_login = "Log in";
    out.login_makeAPad = 'Create a pad anonymously';
    out.login_nologin = "Browse local pads";
    out.login_register = "Sign up";
    out.logoutButton = "Log out";
    out.settingsButton = "Settings";

    out.login_username = "Username";
    out.login_password = "Password";
    out.login_confirm = "Confirm your password";
    out.login_remember = "Remember me";

    out.login_hashing = "Hashing your password, this might take some time.";

    out.login_hello = 'Hello {0},'; // {0} is the username
    out.login_helloNoName = 'Hello,';
    out.login_accessDrive = 'Access your drive';
    out.login_orNoLogin = 'or';

    out.login_noSuchUser = 'Invalid username or password. Try again, or sign up';
    out.login_invalUser = 'Username required';
    out.login_invalPass = 'Password required';
    out.login_unhandledError = 'An unexpected error occurred :(';

    out.register_importRecent = "Import pads from your anonymous session";
    out.register_acceptTerms = "I accept <a href='/terms.html' tabindex='-1'>the terms of service</a>";
    out.register_passwordsDontMatch = "Passwords do not match!";
    out.register_passwordTooShort = "Passwords must be at least {0} characters long.";

    out.register_mustAcceptTerms = "You must accept the terms of service.";
    out.register_mustRememberPass = "We cannot reset your password if you forget it. It's very important that you remember it! Please check the checkbox to confirm.";

    out.register_whyRegister = "Why sign up?";
    out.register_header = "Welcome to CryptPad";
    out.register_explanation = [
        "<h3>Lets go over a couple things first:</h3>",
        "<ul class='list-unstyled'>",
            "<li><i class='fa fa-info-circle'> </i> Your password is your secret key which encrypts all of your pads. If you lose it there is no way we can recover your data.</li>",
            "<li><i class='fa fa-info-circle'> </i> You can import pads which were recently viewed in your browser so you have them in your account.</li>",
            "<li><i class='fa fa-info-circle'> </i> If you are using a shared computer, you need to log out when you are done, closing the tab is not enough.</li>",
        "</ul>"
    ].join('');

    out.register_writtenPassword = "I have written down my username and password, proceed";
    out.register_cancel = "Go back";

    out.register_warning = "Zero Knowledge means that we can't recover your data if you lose your password.";

    out.register_alreadyRegistered = "This user already exists, do you want to log in?";

    // Settings
    out.settings_cat_account = "Account";
    out.settings_cat_drive = "CryptDrive";
    out.settings_cat_cursor = "Cursor";
    out.settings_cat_code = "Code";
    out.settings_cat_pad = "Rich text";
    out.settings_cat_creation = "New pad";
    out.settings_cat_subscription = "Subscription";
    out.settings_title = "Settings";
    out.settings_save = "Save";

    out.settings_backupCategory = "Backup";
    out.settings_backupHint = "Backup or restore all your CryptDrive's content. It won't contain the content of your pads, just the keys to access them.";
    out.settings_backup = "Backup";
    out.settings_restore = "Restore";

    out.settings_backupHint2 = "Download the current content of all your pads. Pads will be downloaded in an readable format if such a format is available.";
    out.settings_backup2 = "Download my CryptDrive";
    out.settings_backup2Confirm = "This will download all the pads and files from your CryptDrive. If you want to continue, pick a name and press OK";
    out.settings_exportTitle = "Export your CryptDrive";
    out.settings_exportDescription = "Please wait while we're downloading and decrypting your documents. This may take a few minutes. Closing the tab will interrupt the process.";
    out.settings_exportFailed = "If a pad requires more than 1 minute to be downloaded, it won't be included in the export. A link to any pad that has not been exported will be displayed.";
    out.settings_exportWarning = "Note: this tool is still in a beta version and it might have scalability issues. For better performance, it is recommended to leave this tab focused.";
    out.settings_exportCancel = "Are you sure you want to cancel the export? You will have to start again from the beginning next time.";
    out.settings_export_reading = "Reading your CryptDrive...";
    out.settings_export_download = "Downloading and decrypting your documents...";
    out.settings_export_compressing = "Compressing data...";
    out.settings_export_done = "Your download is ready!";
    out.settings_exportError = "View errors";
    out.settings_exportErrorDescription = "We weren't able to add the following documents into the export:";
    out.settings_exportErrorEmpty = "This document can't be exported (empty or invalid content).";
    out.settings_exportErrorMissing = "This document is missing from our servers (expired or deleted by its owner)";
    out.settings_exportErrorOther = "An error occurred while trying to export this document: {0}";

    out.settings_resetNewTitle = "Clean CryptDrive";
    out.settings_resetButton = "Remove";
    out.settings_reset = "Remove all the files and folders from your CryptDrive";
    out.settings_resetPrompt = "This action will remove all the pads from your drive.<br>"+
                               "Are you sure you want to continue?<br>" +
                               "Type “<em>I love CryptPad</em>” to confirm.";
    out.settings_resetDone = "Your drive is now empty!";
    out.settings_resetError = "Incorrect verification text. Your CryptDrive has not been changed.";

    out.settings_resetTipsAction = "Reset";
    out.settings_resetTips = "Tips";
    out.settings_resetTipsButton = "Reset the available tips in CryptDrive";
    out.settings_resetTipsDone = "All the tips are now visible again.";

    out.settings_thumbnails = "Thumbnails";
    out.settings_disableThumbnailsAction = "Disable thumbnails creation in your CryptDrive";
    out.settings_disableThumbnailsDescription = "Thumbnails are automatically created and stored in your browser when you visit a new pad. You can disable this feature here.";
    out.settings_resetThumbnailsAction = "Clean";
    out.settings_resetThumbnailsDescription = "Clean all the pads thumbnails stored in your browser.";
    out.settings_resetThumbnailsDone = "All the thumbnails have been erased.";

    out.settings_importTitle = "Import this browser's recent pads in your CryptDrive";
    out.settings_import = "Import";
    out.settings_importConfirm = "Are you sure you want to import recent pads from this browser to your user account's CryptDrive?";
    out.settings_importDone = "Import completed";

    out.settings_autostoreTitle = "Pad storage in CryptDrive";
    out.settings_autostoreHint = "<b>Automatic</b> All the pads you visit are stored in your CryptDrive.<br>" +
                                 "<b>Manual (always ask)</b> If you have not stored a pad yet, you will be asked if you want to store them in your CryptDrive.<br>" +
                                 "<b>Manual (never ask)</b> Pads are not stored automatically in your CryptDrive. The option to store them will be hidden.";
    out.settings_autostoreYes = "Automatic";
    out.settings_autostoreNo = "Manual (never ask)";
    out.settings_autostoreMaybe = "Manual (always ask)";

    out.settings_userFeedbackTitle = "Feedback";
    out.settings_userFeedbackHint1 = "CryptPad provides some very basic feedback to the server, to let us know how to improve your experience. ";
    out.settings_userFeedbackHint2 = "Your pad's content will never be shared with the server.";
    out.settings_userFeedback = "Enable user feedback";

    out.settings_deleteTitle = "Account deletion";
    out.settings_deleteHint = "Account deletion is permanent. Your CryptDrive and your list of pads will be deleted from the server. The rest of your pads will be deleted in 90 days if nobody else has stored them in their CryptDrive.";
    out.settings_deleteButton = "Delete your account";
    out.settings_deleteModal = "Share the following information with your CryptPad administrator in order to have your data removed from their server.";
    out.settings_deleteConfirm = "Clicking OK will delete your account permanently. Are you sure?";
    out.settings_deleted = "Your user account is now deleted. Press OK to go to the home page.";

    out.settings_anonymous = "You are not logged in. Settings here are specific to this browser.";
    out.settings_publicSigningKey = "Public Signing Key";

    out.settings_usage = "Usage";
    out.settings_usageTitle = "See the total size of your pinned pads in MB";
    out.settings_pinningNotAvailable = "Pinned pads are only available to registered users.";
    out.settings_pinningError = "Something went wrong";
    out.settings_usageAmount = "Your pinned pads occupy {0}MB";

    out.settings_logoutEverywhereButton = "Log out";
    out.settings_logoutEverywhereTitle = "Log out everywhere";
    out.settings_logoutEverywhere = "Force log out of all other web sessions";
    out.settings_logoutEverywhereConfirm = "Are you sure? You will need to log in with all your devices.";

    out.settings_driveDuplicateTitle = "Duplicated owned pads";
    out.settings_driveDuplicateHint = "When you move your owned pads to a shared folder, a copy is kept in your CryptDrive to ensure that you retain your control over it. You can hide duplicated files. Only the shared version will be visible, unless deleted, in which case the original will be displayed in its previous location.";
    out.settings_driveDuplicateLabel = "Hide duplicates";

    out.settings_codeIndentation = 'Code editor indentation (spaces)';
    out.settings_codeUseTabs = "Indent using tabs (instead of spaces)";
    out.settings_codeFontSize = "Font size in the code editor";

    out.settings_padWidth = "Editor's maximum width";
    out.settings_padWidthHint = "Rich text pads use by default the maximum available width on your screen and it can be difficult to read. You can reduce the editor's width here.";
    out.settings_padWidthLabel = "Reduce the editor's width";
    out.settings_padSpellcheckTitle = "Spellcheck";
    out.settings_padSpellcheckHint = "This option allows you to enable spellcheck in rich text pads. Spelling errors will be underlined in red and you'll have to hold your Ctrl or Meta key while right-clicking to see the correct options.";
    out.settings_padSpellcheckLabel = "Enable spellcheck in rich text pads";

    out.settings_creationSkip = "Skip the pad creation screen";
    out.settings_creationSkipHint = "The pad creation screen offers new options to create a pad, providing you more control and security over your data. However, it may slow down your workflow by adding one additional step so, here, you have the option to skip this screen and use the default settings selected above.";
    out.settings_creationSkipTrue = "Skip";
    out.settings_creationSkipFalse = "Display";

    out.settings_templateSkip = "Skip the template selection modal";
    out.settings_templateSkipHint = "When you create a new empty pad, if you have stored templates for this type of pad, a modal appears to ask if you want to use a template. Here you can choose to never show this modal and so to never use a template.";

    out.settings_ownDriveTitle = "Enable latest account features";
    out.settings_ownDriveHint = "For technical reasons, older accounts do not have access to all of our latest features. A free upgrade to a new account will prepare your CryptDrive for upcoming features without disrupting your usual activities.";
    out.settings_ownDriveButton = "Upgrade your account";
    out.settings_ownDriveConfirm = "Upgrading your account may take some time. You will need to log back in on all your devices. Are you sure?";
    out.settings_ownDrivePending = "Your account is being upgraded. Please do not close or reload this page until the process has completed.";

    out.settings_changePasswordTitle = "Change your password";
    out.settings_changePasswordHint = "Change your account's password. Enter your current password, and confirm the new password by typing it twice.<br>" +
                                      "<b>We can't reset your password if you forget it, so be very careful!</b>";
    out.settings_changePasswordButton = "Change password";
    out.settings_changePasswordCurrent = "Current password";
    out.settings_changePasswordNew = "New password";
    out.settings_changePasswordNewConfirm = "Confirm new password";
    out.settings_changePasswordConfirm = "Are you sure you want to change your password? You will need to log back in on all your devices.";
    out.settings_changePasswordError = "An unexpected error occurred. If you are unable to login or change your password, contact your CryptPad administrators.";
    out.settings_changePasswordPending = "Your password is being updated. Please do not close or reload this page until the process has completed.";
    out.settings_changePasswordNewPasswordSameAsOld = "Your new password must be different than your current password.";

    out.settings_cursorColorTitle = "Cursor color";
    out.settings_cursorColorHint = "Change the color associated with your user in collaborative documents.";
    out.settings_cursorShareTitle = "Share my cursor position";
    out.settings_cursorShareHint = "You can decide if you want other users to see your cursor position in collaborative documents.";
    out.settings_cursorShareLabel = "Share the position";
    out.settings_cursorShowTitle = "Display other users' cursor position";
    out.settings_cursorShowHint = "You can choose if you want to see the other users' cursor in collaborative documents.";
    out.settings_cursorShowLabel = "Show cursors";

    out.upload_title = "File upload";
    out.upload_type = "Type";
    out.upload_modal_title = "File upload options";
    out.upload_modal_filename = "File name (extension <em>{0}</em> added automatically)";
    out.upload_modal_owner = "Owned file";
    out.upload_serverError = "Server Error: unable to upload your file at this time.";
    out.upload_uploadPending = "You already have an upload in progress. Cancel it and upload your new file?";
    out.upload_success = "Your file ({0}) has been successfully uploaded and added to your drive.";
    out.upload_notEnoughSpace = "There is not enough space for this file in your CryptDrive.";
    out.upload_notEnoughSpaceBrief = "Not enough space";
    out.upload_tooLarge = "This file exceeds the maximum upload size.";
    out.upload_tooLargeBrief = 'File too large';
    out.upload_choose = "Choose a file";
    out.upload_pending = "Pending";
    out.upload_cancelled = "Cancelled";
    out.upload_name = "File name";
    out.upload_size = "Size";
    out.upload_progress = "Progress";
    out.upload_mustLogin = "You must be logged in to upload files";
    out.upload_up = "Upload";
    out.download_button = "Decrypt & Download";
    out.download_mt_button = "Download";
    out.download_resourceNotAvailable = "The requested resource was not available... Press Esc to continue.";
    out.download_dl = "Download";
    out.download_step1 = "Downloading";
    out.download_step2 = "Decrypting";

    out.todo_title = "CryptTodo";
    out.todo_newTodoNamePlaceholder = "Describe your task...";
    out.todo_newTodoNameTitle = "Add this task to your todo list";
    out.todo_markAsCompleteTitle = "Mark this task as complete";
    out.todo_markAsIncompleteTitle = "Mark this task as incomplete";
    out.todo_removeTaskTitle = "Remove this task from your todo list";

    // pad
    out.pad_showToolbar = "Show toolbar";
    out.pad_hideToolbar = "Hide toolbar";
    out.pad_base64 = "This pad contains images stored in an inefficient way. These images will significantly increase the size of the pad in your CryptDrive, and make it slower to load. You can migrate these files to a new format which will be stored separately in your CryptDrive. Do you want to migrate these images now?";

    // markdown toolbar
    out.mdToolbar_button = "Show or hide the Markdown toolbar";
    out.mdToolbar_defaultText = "Your text here";
    out.mdToolbar_help = "Help";
    out.mdToolbar_tutorial = "http://www.markdowntutorial.com/";
    out.mdToolbar_bold = "Bold";
    out.mdToolbar_italic = "Italic";
    out.mdToolbar_strikethrough = "Strikethrough";
    out.mdToolbar_heading = "Heading";
    out.mdToolbar_link = "Link";
    out.mdToolbar_quote = "Quote";
    out.mdToolbar_nlist = "Ordered list";
    out.mdToolbar_list = "Bullet list";
    out.mdToolbar_check = "Task list";
    out.mdToolbar_code = "Code";

    // index.html

    out.home_product = "CryptPad is a private-by-design alternative to popular office tools and cloud services. All the content stored on CryptPad is encrypted before being sent, which means nobody can access your data unless you give them the keys (not even us).";
    out.home_host = "This is an independent community instance of CryptPad. Its source code is available <a href=\"https://github.com/xwiki-labs/cryptpad\" target=\"_blank\" rel=\"noreferrer noopener\">on GitHub</a>.";
    out.home_host_agpl = "CryptPad is distributed under the terms of the AGPL3 software license";
    out.home_ngi = "NGI Award winner";

    //about.html
    out.about_intro = 'CryptPad is created inside of the Research Team at <a href="http://xwiki.com">XWiki SAS</a>, a small business located in Paris France and Iasi Romania. There are 3 core team members working on CryptPad plus a number of contributors both inside and outside of XWiki SAS.';
    out.about_core = 'Core Developers';
    out.about_contributors = 'Key Contributors';

    // contact.html
    out.main_about_p22 = 'Tweet us';
    out.main_about_p23 = 'open an issue on GitHub';
    out.main_about_p24 = 'say Hello (Matrix)';
    out.main_about_p25 = 'send us an email';
    out.main_about_p26 = 'If you have any questions or comments, feel free to reach out!';

    out.main_info = "<h2>Collaborate in Confidence</h2> Grow your ideas together with shared documents while <strong>Zero Knowledge</strong> technology secures your privacy; <strong>even from us</strong>.";
    out.main_catch_phrase = "The Zero Knowledge Cloud";

    out.main_richText = 'Rich Text editor';
    out.main_code = 'Code editor';
    out.main_slide = 'Slide editor';
    out.main_poll = 'Polls';
    out.main_drive = 'CryptDrive';

    out.main_richTextPad = 'Rich Text Pad';
    out.main_codePad = 'Markdown/Code Pad';
    out.main_sheetPad = 'Spreadsheets (Beta)';
    out.main_slidePad = 'Markdown Presentation';
    out.main_pollPad = 'Poll or Schedule';
    out.main_whiteboardPad = 'Whiteboard';
    out.main_kanbanPad = 'Kanban';
    out.main_localPads = 'Local Pads';
    out.main_yourCryptDrive = 'Your CryptDrive';
    out.main_footerText = "With CryptPad, you can make quick collaborative documents for taking notes and writing down ideas together.";

    out.footer_applications = "Applications";
    out.footer_contact = "Contact";
    out.footer_aboutUs = "About us";

    out.about = "About";
    out.privacy = "Privacy";
    out.contact = "Contact";
    out.terms = "ToS";
    out.blog = "Blog";

    out.topbar_whatIsCryptpad = "What is CryptPad";

    // what-is-cryptpad.html

    out.whatis_title = 'What is CryptPad';
    out.whatis_collaboration = 'Fast, Easy Collaboration';
    out.whatis_collaboration_p1 = 'With CryptPad, you can make quick collaborative documents for taking notes and writing down ideas together. When you sign up and log in, you get file upload capability and a CryptDrive where you can organize all of your pads. As a registered user you get 50MB of space for free.';
    out.whatis_collaboration_p2 = 'You can share access to a CryptPad document simply by sharing the link. You can also share a link which provides <em>read only</em> access to a pad, allowing you to publicise your collaborative work while still being able to edit it.';
    out.whatis_collaboration_p3 = 'You can make simple rich text documents with <a href="http://ckeditor.com/">CKEditor</a> as well as Markdown documents which are rendered in realtime while you type. You can also use the poll app for scheduling events with multiple participants.';
    out.whatis_zeroknowledge = 'Zero Knowledge';
    out.whatis_zeroknowledge_p1 = "We don't want to know what you're typing and with modern cryptography, you can be sure that we can't know. CryptPad uses <strong>100% client side encryption</strong> to protect the content that you type from us, the people who host the server.";
    out.whatis_zeroknowledge_p2 = 'When you sign up and log in, your username and password are computed into a secret key using <a href="https://en.wikipedia.org/wiki/Scrypt">scrypt key derivation function</a>. Neither this key, nor the username and password are ever sent to the server. Instead they are used on the client side to decrypt the content of your CryptDrive, which contains the keys to all pads that you are able to access.';
    out.whatis_zeroknowledge_p3 = 'When you share the link to a document, you\'re sharing the cryptographic key for accessing that document but since the key is in the <a href="https://en.wikipedia.org/wiki/Fragment_identifier">fragment identifier</a>, it is never directly sent to the server. Check out our <a href="https://blog.cryptpad.fr/2017/07/07/cryptpad-analytics-what-we-cant-know-what-we-must-know-what-we-want-to-know/">privacy blog post</a> to learn more about what types of metadata we do and do not have access to.';
    out.whatis_drive = 'Organization with CryptDrive';
    out.whatis_drive_p1 = 'Whenever you access a pad in CryptPad, the pad is automatically added to your CryptDrive in the main folder. Later on, you can organize these pads into folders or you can put them in the trash bin. CryptDrive allows you to search through your pads and to organize them whenever you want, however you want.';
    out.whatis_drive_p2 = 'With intuitive drag-and-drop, you can move pads around in your drive and the link to these pads will stay the same so your collaborators will never lose access.';
    out.whatis_drive_p3 = 'You can also upload files in your CryptDrive and share them with colleagues. Uploaded files can be organized just like collaborative pads.';
    out.whatis_business = 'CryptPad for Business';
    out.whatis_business_p1 = "CryptPad\'s Zero Knowledge encryption multiplies the effectiveness of existing security protocols by mirroring organizational access controls in cryptography. Because sensitive assets can only be decrypted using user access credentials, CryptPad is less valuable as a target when compared to traditional cloud services. Read the <a href='https://blog.cryptpad.fr/images/CryptPad-Whitepaper-v1.0.pdf'>CryptPad Whitepaper</a> to learn more about how it can help your business.";
    out.whatis_business_p2 = 'CryptPad is deployable on premises and the <a href="https://cryptpad.fr/about.html">CryptPad developers</a> at XWiki SAS are able to offer commercial support, customization and development. Reach out to <a href="mailto:sales@cryptpad.fr">sales@cryptpad.fr</a> for more information.';

    // privacy.html

    out.policy_title = 'CryptPad Privacy Policy';
    out.policy_whatweknow = 'What we know about you';
    out.policy_whatweknow_p1 = 'As an application that is hosted on the web, CryptPad has access to metadata exposed by the HTTP protocol. This includes your IP address, and various other HTTP headers that can be used to identify your particular browser. You can see what information your browser is sharing by visiting <a target="_blank" rel="noopener noreferrer" href="https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending" title="what http headers is my browser sending">WhatIsMyBrowser.com</a>.';
    out.policy_whatweknow_p2 = 'We use <a href="https://www.elastic.co/products/kibana" target="_blank" rel="noopener noreferrer" title="open source analytics platform">Kibana</a>, an open source analytics platform, to learn more about our users. Kibana tells us about how you found CryptPad, via direct entry, through a search engine, or via a referral from another web service like Reddit or Twitter.';
    out.policy_howweuse = 'How we use what we learn';
    out.policy_howweuse_p1 = 'We use this information to make better decisions about promoting CryptPad, by evaluating which of our past efforts were successful. Information about your location lets us know whether we should consider providing better support for languages other than English.';
    out.policy_howweuse_p2 = "Information about your browser (whether it's a desktop or mobile operating system) helps us make decisions when prioritizing feature improvements. Our development team is small, and we try to make choices that will improve as many users' experience as possible.";
    out.policy_whatwetell = 'What we tell others about you';
    out.policy_whatwetell_p1 = 'We do not furnish to third parties the information that we gather or that you provide to us unless we are legally required to do so.';
    out.policy_links = 'Links to other sites';
    out.policy_links_p1 = 'This site contains links to other sites, including those produced by other organizations. We are not responsible for the privacy practices or the contents of any outside sites. As a general rule, links to outside sites are launched in a new browser window, to make clear that you are leaving CryptPad.fr.';
    out.policy_ads = 'Advertisement';
    out.policy_ads_p1 = 'We do not display any online advertising, though we may link to the bodies which are financing our research.';
    out.policy_choices = 'Choices you have';
    out.policy_choices_open = 'Our code is open source, so you always have the option of hosting your own instance of CryptPad.';
    out.policy_choices_vpn = 'If you want to use our hosted instance, but don\'t want to expose your IP address, you can protect your IP using the <a href="https://www.torproject.org/projects/torbrowser.html.en" title="downloads from the Tor project" target="_blank" rel="noopener noreferrer">Tor browser bundle</a>, or a <a href="https://riseup.net/en/vpn" title="VPNs provided by Riseup" target="_blank" rel="noopener noreferrer">VPN</a>.';
    out.policy_choices_ads = 'If you just want to block our analytics platform, you can use adblocking tools like <a href="https://www.eff.org/privacybadger" title="download privacy badger" target="_blank" rel="noopener noreferrer">Privacy Badger</a>.';

    // features.html

    out.features = "Features";
    out.features_title = "Feature comparison";
    out.features_feature = "Feature";
    out.features_anon = "Anonymous user";
    out.features_registered = "Registered user";
    out.features_premium = "Premium user";
    out.features_notes = "Notes";

    out.features_f_apps = "Access to the main applications";
    out.features_f_core = "Common features for the applications";
    out.features_f_core_note = "Edit, Import & Export, History, Userlist, Chat";
    out.features_f_file0 = "Open files";
    out.features_f_file0_note = "View and download files shared by other users";
    out.features_f_cryptdrive0 = "Limited access to CryptDrive";
    out.features_f_cryptdrive0_note = "Ability to store visited pads in your browser to be able to open them later";
    out.features_f_storage0 = "Limited storage time";
    out.features_f_storage0_note = "Created pads risk deletion after 3 months of inactivity";

    out.features_f_anon = "All anonymous user features";
    out.features_f_anon_note = "With better usability and more power over your pads";
    out.features_f_cryptdrive1 = "Complete CryptDrive functionality";
    out.features_f_cryptdrive1_note = "Folders, shared folders, templates, tags";
    out.features_f_devices = "Your pads on all your devices";
    out.features_f_devices_note = "Access your CryptDrive everywhere with your user account";
    out.features_f_social = "Social applications";
    out.features_f_social_note = "Create a profile, use an avatar, chat with contacts";
    out.features_f_file1 = "Upload and share files";
    out.features_f_file1_note = "Share files with your friends or embed them in your pads";
    out.features_f_storage1 = "Permanent storage (50MB)";
    out.features_f_storage1_note = "Pads stored in your CryptDrive are never deleted for inactivity";
    out.features_f_register = "Register for free";
    out.features_f_register_note = "No email or personal information required";

    out.features_f_reg = "All registered user features";
    out.features_f_reg_note = "And help CryptPad's development";
    out.features_f_storage2 = "Extra storage space";
    out.features_f_storage2_note = "From 5GB to 50GB depending on the selected plan";
    out.features_f_support = "Faster support";
    out.features_f_support_note = "Professional email support with the Team plan";
    out.features_f_supporter = "Become a privacy supporter";
    out.features_f_supporter_note = "Help us show that privacy-enhancing software should be the norm";
    out.features_f_subscribe = "Subscribe to premium";
    out.features_f_subscribe_note = "You need to be logged in to CryptPad first";

    // faq.html

    out.faq_link = "FAQ";
    out.faq_title = "Frequently Asked Questions";
    out.faq_whatis = "What is <span class='cp-brand-font'>CryptPad</span>?";
    out.faq = {};
    out.faq.keywords = {
        title: 'Keywords',
        pad: {
            q: "What is a pad?",
            a: "<em>Pad</em> is a term popularized by <a href='http://etherpad.org/' target='_blank'>Etherpad</a>, a real-time collaborative editor.\n" +
            "It refers to a document that you can edit in your browser, generally with other people's changes visible nearly instantly."
        },
        owned: {
            q: "What is an owned Pad?",
            a: "An <em>owned pad</em> is a pad created with an explicit <em>owner</em>, identified to the server by their <em>public signing key</em>." +
            " A pad's owner may choose to delete their pads from the server, making it unavailable to other collaborators in the future, whether they had it in their CryptDrive or not."
        },
        expiring: {
            q: "What is an expiring Pad?",
            a: "An <em>expiring pad</em> is a pad created with a set time at which it will be automatically removed from the server." +
                " Expiring pads can be configured to last anywhere from one hour to one hundred months." +
                " The pad and all of its history will become permanently unavailable even if it is being edited at the time that it expires.<br><br>" +
                "If a pad is set to expire, you can check its expiration time by viewing its <em>properties</em>, either by right-clicking the pad in your CryptDrive, or by using the <em>properties</em> sub-menu from an application's toolbar."
        },
        tag: {
            q: "How can I use tags?",
            a: "You can tag pads and uploaded files via your CryptDrive, or using the <em>tag</em> button (<span class='fa fa-hashtag'></span>) in any editor's toolbar." +
            " Search for pads and files in your CryptDrive using the search bar with a term beginning with hashtag, like <em>#crypto</em>."
        },
        template: {
            q: "What is a template?",
            a: "A template is a pad which can be used to define to initial content for another pad of the same type when you create it." +
            " Any existing pad can be turned into a template by moving it into the <em>Templates</em> section in your CryptDrive." +
            " You can also create a copy of a pad to be used as a template by clicking the template button (<span class='fa fa-bookmark'></span>) in the editor's toolbar."
        },
        abandoned: {
            q: "What is an abandoned pad?",
            a: "An <em>abandoned pad</em> is a pad that is not pinned in any registered user's CryptDrive and that hasn't been changed for six months. Abandoned documents will be automatically removed from the server."
        },
    };
    out.faq.privacy = {
        title: 'Privacy',
        different: {
            q: "How is CryptPad different from other Pad services?",
            a: "CryptPad encrypts changes to your pads before sending that information to be stored on the server, so we can't read what you're typing."
        },
        me: {
            q: "What information does the server know about me?",
            a: "Server administrators are able to see the IP addresses of people who visit the CryptPad." +
            " We don't record which addresses visit which pads, but we could, even though we don't have access to the decrypted content of those pads." +
            " If you are worried about us analyzing that information, it's safest to assume that we do collect it, since we can't prove that we don't.<br><br>" +

            "We collect some basic telemetry about how people use CryptPad, such as the size of the screen on their device, and which buttons they click the most." +
            "This helps us improve the software, but if you'd prefer not to send such information to the server, you can <strong>opt out by unchecking the <em>Enable user feedback</em> checkbox</strong>.<br><br>" +

            "We do keep track of which pads are in a user's CryptDrive so that we can impose storage limits, but we don't know the content or type of those pads." +
            " Storage quotas are associated with a user's public key, but we don't associate names or emails with those public keys.<br><br>" +

            " For more information, you can read this <a href='https://blog.cryptpad.fr/2017/07/07/cryptpad-analytics-what-we-cant-know-what-we-must-know-what-we-want-to-know/' target='_blank'>blog post</a> which we wrote about the topic."
        },
        register: {
            q: "Does the server know more about me if I register?",
            a: "We don't require users to verify their email address, and the server does not even learn your username or password when you register." +
            " Instead, the register and login forms generate a unique keyring from your input, and the server only learns your cryptographic signature." +
            " We use this information to track details like how much data you are using, which allows us to restrict each user to a quota.<br><br>" +

            "We use our <em>feedback</em> functionality to inform the server that someone with your IP has registered an account." +
            " We use this to measure how many people register for CryptPad accounts, and to see what regions they are in so that we can guess which languages may need better support.<br><br>" +

            "Registered users inform the server which pads are in their CryptDrive so that such pads are not considered abandoned, and are removed from the server due to inactivity."
        },
        other: {
            q: "What can other collaborators learn about me?",
            a: "When you edit a pad with someone else, you communicate through the server, so only we learn your IP address." +
            " Other users can see your display name, avatar, the link to your profile (if you have one), and your <em>public key</em> (which is used for encrypting communications between each other)."
        },
        anonymous: {
            q: "Does CryptPad make me anonymous?",
            a: "Even though CryptPad is designed to know as little about you as possible, it does not provide strong anonymity." +
            " Our servers have access to your IP address, however, you can hide this information by using Tor to access CryptPad." +
            " Using Tor without changing your behaviour will not guarantee you anonymity, as the server is also able to identify users by their unique cryptographic identifier." +
            " If you use the same account when you're not using Tor, it will be possible to deanonymize your session.<br><br>" +

            "For users who require a lesser degree of privacy, CryptPad does not require users to identify themselves by name, phone number, or email address like many other services."
        },
        policy: {
            q: "Do you have a data privacy policy?",
            a: "Yes! It is available <a href='/privacy.html' target='_blank'>here</a>."
        }
    };
    out.faq.security = {
        title: 'Security',
        proof: {
            q: "How do you use Zero Knowledge Proofs?",
            a: "When we use the term <em>Zero Knowledge</em>, we are not referring to <em>Zero Knowledge proofs</em>, but to <em>Zero Knowledge Web Services</em>." +
            " <em>Zero Knowledge Web Services</em> encrypt user data in the user's browser, without the server ever having access to the unencrypted data, or the encryption keys.<br><br>" +
            "We've compiled a short list of Zero Knowledge services <a href='https://blog.cryptpad.fr/2017/02/20/Time-to-Encrypt-the-Cloud/#Other-Zero-Knowledge-Services'>here</a>."
        },
        why: {
            q: "Why should I use CryptPad?",
            a: "Our position is that cloud services should not require access to your data in order for you to share it with your friends and colleagues." +
            " If you are using another service to collaborate, and they do not explicitly say that they can't access your information, it is very likely that they are leveraging it for profit."
        },
        compromised: {
            q: "Does CryptPad protect me if my device is compromised?",
            a: "In the event that your device is stolen, CryptPad allows you to trigger a remote logout of all devices except the one you are currently using." +
            " To do so, go to your <strong>settings page</strong> and click <strong>Log out everywhere</strong>." +
            " All other devices which are currently connected to the account will log out." +
            " Any previously connected devices which visit CryptPad will log out as soon as they load the page.<br><br>" +

            "Currently, <em>remote logout</em> is implemented in the browser, not in conjunction with the server." +
            " As such, it may not protect you from government agencies, but it should be sufficient if you forgot to log out after using CryptPad from a shared computer."
        },
        crypto: {
            q: "What cryptography do you use?",
            a: "CryptPad is based upon two open-source cryptography libraries: <a href='https://github.com/dchest/tweetnacl-js' target='_blank'>tweetnacl.js</a> and <a href='https://github.com/dchest/scrypt-async-js' target='_blank'>scrypt-async.js</a>.<br><br>" +

            "Scrypt is a <em>password-based key derivation algorithm</em>. We use it to turn your username and password into a unique keyring which secures access to your CryptDrive such that only you can access your list of pads.<br><br>" +

            "We use the <em>xsalsa20-poly1305</em> and <em>x25519-xsalsa20-poly1305</em> cyphers provided by tweetnacl to encrypt pads and chat history, respectively."
        }
    };
    out.faq.usability = {
        title: 'Usability',
        register: {
            q: "What do I get by registering?",
            a: "Registered users have access to a number of features unavailable to unregistered users. There's a chart <a href='/features.html' target='_blank'>here</a>."
        },
        share: {
            q: "How can I share encrypted pads with my friends?",
            a: "CryptPad puts the secret encryption key to your pad after the <em>#</em> character in the URL." +
            " Anything after this character is not sent to the server, so we never have access to your encryption keys." +
            " By sharing the link to a pad, you share the ability to read and access it."
        },
        remove: {
            q: "I removed a pad or file from my CryptDrive, but the content is still available. How can I remove it?",
            a: "Only <em>owned pads</em> (introduced in February 2018) can be deleted. Additionally, these pads can only be deleted by their <em>owners</em> (the person that originally created the pad)." +
            " If you are not the creator of the pad, you will have to ask its owner to delete it for you." +
            " For pads you do own, you can <strong>right-click the pad in your CryptDrive</strong>, and choose <strong>Delete from the server</strong>."
        },
        forget: {
            q: "What if I forget my password?",
            a: "Unfortunately, if we could recover access to your encrypted pads for you, we'd be able to access them ourselves." +
            " If you did not record your username and password anywhere, and cannot remember either, you may be able to recover your pads by filtering your browser's history."
        },
        change: {
            q: "What if I want to change my password?",
            a: "You can change your CryptPad password in your account settings page."
        },
        devices: {
            q: "I am logged in on two devices, and see two different CryptDrives, how is this possible?",
            a: "It's probable that you registered the same name twice, using different passwords." +
            " Because the CryptPad server identifies you by your cryptographic signature and not your name, it cannot prevent others from registering with the same name." +
            " As such, each user account has a unique username and password combination." +
            " Logged in users can see their username at the top of the settings page."
        },
        folder: {
            q: "Can I share entire folders from my CryptDrive?",
            a: "Yes, you can share folders and all the pads in them."
        },
        feature: {
            q: "Can you add a very special feature which I need?",
            a: "Many of the features in CryptPad exist because users asked for them." +
            " Our <a href='https://cryptpad.fr/contact.html' target='_blank'>contacts page</a> lists the ways that you can reach us.<br><br>" +

            "Unfortunately, we cannot guarantee that we will implement everything that people ask for." +
            " If a particular feature is critical for your organization, you can sponsor development time to ensure its completion." +
            " Please contact <a href='mailto:sales@cryptpad.fr' target='_blank'>sales@cryptpad.fr</a> for more information.<br><br>" +

            "Even if you cannot afford to sponsor development, we're interested in feedback that can help us improve CryptPad." +
            " Feel free to contact us with via the above methods any time."
        },
    };
    out.faq.other = {
        title: "Other questions",
        pay: {
            q: "Why should I pay when so many features are free?",
            a: "We give supporters additional storage and the ability to increase their friends' quotas (<a href='https://accounts.cryptpad.fr/#/faq' target='_blank'>learn more</a>).<br><br>" +

            "Beyond these short term benefits, by subscribing with a premium account you help to fund continued, active development of CryptPad. That includes fixing bugs, adding new features, and making it easier for others to help host CryptPad themselves." +
            " Additionally, you help to prove to other service providers that people are willing to support privacy enhancing technologies. It is our hope that eventually business models based on selling user data will become a thing of the past.<br><br>" +

            "Finally, we offer most of CryptPad's functionality for free because we believe everyone deserves personal privacy, not just those with disposable income." +
            " By supporting us, you help us continue to make it possible for underprivileged populations to access these basic features without a price tag attached."
        },
        goal: {
            q: "What is your goal?",
            a: "By developing privacy-respecting collaboration technology, we wish to raise users' expectations of privacy from cloud-computing platforms." +
            " We hope that our work drives other service providers in all domains to match or exceed our efforts." +
            " Despite our optimism, we know that much of the web is funded by revenue from targeted advertising." +
            " There is much more work to be done than we can manage ourselves, and we appreciate the promotion, support, and contributions of our community towards this goal."
        },
        jobs: {
            q: "Are you hiring?",
            a: "Yes! Please introduce yourself with an email to <a href='mailto:jobs@xwiki.com' target='_blank'>jobs@xwiki.com</a>."
        },
        host: {
            q: "Can you help me set up my own instance of CryptPad?",
            a: "We are happy to provide support for your organization's internal CryptPad installation. Please contact <a href='mailto:sales@cryptpad.fr' target='_blank'>sales@cryptpad.fr</a> for more information."
        },
        revenue: {
            q: "How can I participate in the revenue sharing?",
            a: " If you are running your own instance of CryptPad, and would like to enable paid accounts and split the revenue with the developers, your server will need to be configured as a partner service.<br><br>" +

            "In your CryptPad directory, <em>config.example.js</em> should contain an explanation of what you need to configure on your server." +
            " You will need to contact <a href='mailto:sales@cryptpad.fr'>sales@cryptpad.fr</a> to verify that your server is configured to use HTTPS correctly, and discuss payment methods."
        },
    };

    // terms.html

    out.tos_title = "CryptPad Terms of Service";
    out.tos_legal = "Please don't be malicious, abusive, or do anything illegal.";
    out.tos_availability = "We hope you find this service useful, but availability or performance cannot be guaranteed. Please export your data regularly.";
    out.tos_e2ee = "CryptPad contents can be read or modified by anyone who can guess or otherwise obtain the pad's fragment identifier. We recommend that you use end-to-end-encrypted (e2ee) messaging technology to share links, and assume no liability in the event that such a link is leaked.";
    out.tos_logs = "Metadata provided by your browser to the server may be logged for the purpose of maintaining the service.";
    out.tos_3rdparties = "We do not provide individualized data to third parties unless required to by law.";

    // 404 page
    out.four04_pageNotFound = "We couldn't find the page you were looking for.";

    // BottomBar.html

    //out.bottom_france = '<a href="http://www.xwiki.com/" target="_blank" rel="noopener noreferrer">Made with <img class="bottom-bar-heart" src="/customize/heart.png" alt="love" /> in <img class="bottom-bar-fr" src="/customize/fr.png" alt="France" /></a>';
    //out.bottom_support = '<a href="http://labs.xwiki.com/" title="XWiki Labs" target="_blank" rel="noopener noreferrer">An <img src="/customize/logo-xwiki2.png" alt="XWiki SAS" class="bottom-bar-xwiki"/> Labs Project </a> with the support of <a href="http://ng.open-paas.org/" title="OpenPaaS::ng" target="_blank" rel="noopener noreferrer"> <img src="/customize/openpaasng.png" alt="OpenPaaS-ng" class="bottom-bar-openpaas" /></a>';

    // Header.html

    out.updated_0_header_logoTitle = 'Go to your CryptDrive';
    out.header_logoTitle = out.updated_0_header_logoTitle;
    out.header_homeTitle = 'Go to CryptPad homepage';

    // Initial states

    out.help = {};

    out.help.title = "Getting started";
    out.help.generic = {
        more: 'Learn more about how CryptPad can work for you by reading our <a href="/faq.html" target="_blank">FAQ</a>',
        share: 'Use the share menu (<span class="fa fa-shhare-alt"></span>) to generate a link so collaborators can view or edit this pad',
        //stored: 'Every pad you visit is automatically stored in your <a href="/drive/" target="_blank">CryptDrive</a>',
        save: "All your changes are synced automatically so you never need to save"
    };

    out.help.text = {
        formatting: 'You can display or hide the text formatting toolbar by clicking the <span class="fa fa-caret-down"></span> or <span class="fa fa-caret-up"></span> buttons',
        embed: 'Registered users can embed an image or a file stored in their CryptDrive using <span class="fa fa-image"></span>',
        history: 'You can use <em>history</em> <span class="fa fa-history"></span> to view or restore previous versions',
    };

    out.help.pad = {
        export: 'You can export the content as PDF using the <span class="fa fa-print"></span> button in the text formatting toolbar',
    };

    out.help.code = {
        modes: 'Use the dropdown menus in the <span class="fa fa-ellipsis-h"></span> submenu to change syntax highlighting modes or color themes',
    };

    out.help.beta = {
        warning: 'This editor is still <strong>experimental</strong>, you can report bugs on <a href="https://github.com/xwiki-labs/cryptpad/issues/" target="_blank">our issue tracker</a>'
    };
    out.help.oo = {
        access: "Access is restricted to registered users, collaborators will need to log in",
    };

    out.help.slide = {
        markdown: 'Write slides in <a href="http://www.markdowntutorial.com/">Markdown</a> and separate them with a line containing <code>---</code>',
        present: 'Start the presentation using the <span class="fa fa-play-circle"></span> button',
        settings: 'Change the slide settings (background, transitions, page numbers, etc.) with the <span class="fa fa-cog"></span> button in the <span class="fa fa-ellipsis-h"></span> submenu',
        colors: 'Change the text and background colors using the <span class="fa fa-i-cursor"></span> and <span class="fa fa-square"></span> buttons',
    };

    out.help.poll = {
        decisions: 'Make decisions in private among trusted friends',
        options: 'Propose options, and express your preferences',
        choices: 'Click cells in your column to cycle through yes (<strong>✔</strong>), maybe (<strong>~</strong>), or no (<strong>✖</strong>)',
        submit: 'Click <strong>submit</strong> to make your choices visible to others',
    };

    out.help.whiteboard = {
        colors: 'Double-click colors to modify your palette',
        mode: 'Disable draw mode to drag and stretch strokes',
        embed: 'Embed images from your disk <span class="fa fa-file-image-o"></span> or your CryptDrive <span class="fa fa-image"></span> and export them as PNG to your disk <span class="fa fa-download"></span> or your CryptDrive <span class="fa fa-cloud-upload"></span>'
    };

    out.help.kanban = {
        add: 'Add new boards using the <span class="fa fa-plus"></span> button in the top-right corner',
        task: 'Move items by dragging and dropping them from one board to another',
        color: 'Change the colors by clicking on the colored part next to the board titles',
    };

    out.initialState = [
        '<p>',
        'This is&nbsp;<strong>CryptPad</strong>, the Zero Knowledge realtime collaborative editor. Everything is saved as you type.',
        '<br>',
        'Share the link to this pad to edit with friends or use the <span class="fa fa-share-alt"></span> button to share a <em>read-only link</em>&nbsp;which allows viewing but not editing.',
        '</p>',
    ].join('');

    out.codeInitialState = [
        '# CryptPad\'s Zero Knowledge collaborative code editor\n',
        '\n',
        '* What you type here is encrypted so only people who have the link can access it.\n',
        '* You can choose the programming language to highlight and the UI color scheme in the upper right.'
    ].join('');

    out.slideInitialState = [
        '# CryptSlide\n',
        '1. Write your slides content using markdown syntax\n',
        '  - Learn more about markdown syntax [here](http://www.markdowntutorial.com/)\n',
        '2. Separate your slides with ---\n',
        '3. Click on the "Play" button to see the result',
        '  - Your slides are updated in realtime'
    ].join('');

    // Readme

    out.driveReadmeTitle = "What is CryptPad?";
    out.readme_welcome = "Welcome to CryptPad!";
    out.readme_p1 = "Welcome to CryptPad, this is where you can take note of things alone and with friends.";
    out.readme_p2 = "This pad will give you a quick walk through of how you can use CryptPad to take notes, keep them organized and work together on them.";
    out.readme_cat1 = "Get to know your CryptDrive";
    out.readme_cat1_l1 = "Make a pad: In your CryptDrive, click {0} then {1} and you can make a pad."; // 0: New, 1: Rich Text
    out.readme_cat1_l2 = "Open Pads from your CryptDrive: double-click on a pad icon to open it.";
    out.readme_cat1_l3 = "Organize your pads: When you are logged in, every pad you access will be shown as in the {0} section of your drive."; // 0: Unsorted files
    out.readme_cat1_l3_l1 = "You can click and drag files into folders in the {0} section of your drive and make new folders."; // 0: Documents
    out.readme_cat1_l3_l2 = "Remember to try right clicking on icons because there are often additional menus.";
    out.readme_cat1_l4 = "Put old pads in the trash: You can click and drag your pads into the {0} the same way you drag them into folders."; // 0: Trash
    out.readme_cat2 = "Make pads like a pro";
    out.edit = "edit";
    out.view = "view";
    out.readme_cat2_l1 = "The {0} button in your pad allows you to give access to collaborators to either {1} or to {2} the pad."; // 0: Share, 1: edit, 2: view
    out.readme_cat2_l2 = "Change the title of the pad by clicking on the pencil";
    out.readme_cat3 = "Discover CryptPad apps";
    out.readme_cat3_l1 = "With CryptPad code editor, you can collaborate on code like JavaScript, HTML and Markdown";
    out.readme_cat3_l2 = "With CryptPad slide editor, you can make quick presentations using Markdown";
    out.readme_cat3_l3 = "With CryptPoll you can take quick votes, especially for scheduling meetings which fit with everybody's calendar";

    // Tips
    out.tips = {};
    out.tips.shortcuts = "`ctrl+b`, `ctrl+i` and `ctrl+u` are quick shortcuts for bold, italic and underline.";
    out.tips.indent = "In numbered and bulleted lists, you can use tab or shift+tab to quickly increase or decrease indentation.";
    out.tips.store = "Every time you visit a pad, if you're logged in it will be saved to your CryptDrive.";
    out.tips.marker = "You can highlight text in a pad using the \"marker\" item in the styles dropdown menu.";
    out.tips.driveUpload = "Registered users can upload encrypted files by dragging and dropping them into their CryptDrive.";
    out.tips.filenames = "You can rename files in your CryptDrive, this name is just for you.";
    out.tips.drive = "Logged in users can organize their files in their CryptDrive, accessible from the CryptPad icon at the top left of all pads.";
    out.tips.profile = "Registered users can create a profile from the user menu in the top right.";
    out.tips.avatars = "You can upload an avatar in your profile. People will see it when you collaborate in a pad.";
    out.tips.tags = "Tag your pads and start a search with # in your CryptDrive to find them";

    out.feedback_about = "If you're reading this, you were probably curious why CryptPad is requesting web pages when you perform certain actions";
    out.feedback_privacy = "We care about your privacy, and at the same time we want CryptPad to be very easy to use.  We use this file to figure out which UI features matter to our users, by requesting it along with a parameter specifying which action was taken.";
    out.feedback_optout = "If you would like to opt out, visit <a href='/settings/'>your user settings page</a>, where you'll find a checkbox to enable or disable user feedback";

    // Creation page
    out.creation_404 = "This pad not longer exists. Use the following form to create a new pad.";
    out.creation_ownedTitle = "Type of pad";
    out.creation_owned = "Owned pad"; // Creation page
    out.creation_ownedTrue = "Owned pad"; // Settings
    out.creation_ownedFalse = "Open pad";
    out.creation_owned1 = "An <b>owned</b> pad can be deleted from the server whenever the owner wants. Deleting an owned pad removes it from other users' CryptDrives.";
    out.creation_owned2 = "An <b>open</b> pad doesn't have any owner and thus, it can't be deleted from the server unless it has reached its expiration time.";
    out.creation_expireTitle = "Life time";
    out.creation_expire = "Expiring pad";
    out.creation_expireTrue = "Add a life time";
    out.creation_expireFalse = "Unlimited";
    out.creation_expireHours = "Hour(s)";
    out.creation_expireDays = "Day(s)";
    out.creation_expireMonths = "Month(s)";
    out.creation_expire1 = "An <b>unlimited</b> pad will not be removed from the server until its owner deletes it.";
    out.creation_expire2 = "An <b>expiring</b> pad has a set lifetime, after which it will be automatically removed from the server and other users' CryptDrives.";
    out.creation_password = "Add a password";
    out.creation_noTemplate = "No template";
    out.creation_newTemplate = "New template";
    out.creation_create = "Create";
    out.creation_saveSettings = "Don't show this again";
    out.creation_settings = "View more settings";
    out.creation_rememberHelp = "Visit your Settings page to reset this preference";
    // Properties about creation data
    out.creation_owners = "Owners";
    out.creation_ownedByOther = "Owned by another user";
    out.creation_noOwner = "No owner";
    out.creation_expiration = "Expiration time";
    out.creation_passwordValue = "Password";
    out.creation_propertiesTitle = "Availability";
    out.creation_appMenuName = "Advanced mode (Ctrl + E)";
    out.creation_newPadModalDescription = "Click on a pad type to create it. You can also press <b>Tab</b> to select the type and press <b>Enter</b> to confirm.";
    out.creation_newPadModalDescriptionAdvanced = "You can check the box (or press <b>Space</b> to change its value) if you want to display the pad creation screen (for owned pads, expiring pads, etc.).";
    out.creation_newPadModalAdvanced = "Display the pad creation screen";

    // Password prompt on the loading screen
    out.password_info = "The pad you're trying to open is protected with a password. Enter the correct password to access its content.";
    out.password_error = "Pad not found!<br>This error can be caused by two factors: either the password in invalid, or the pad has been deleted from the server.";
    out.password_placeholder = "Type the password here...";
    out.password_submit = "Submit";
    out.password_show = "Show";

    // Change password in pad properties
    out.properties_addPassword = "Add a password";
    out.properties_changePassword = "Change the password";
    out.properties_confirmNew = "Are you sure? Adding a password will change this pad's URL and remove its history. Users without the password will lose access to this pad";
    out.properties_confirmChange = "Are you sure? Changing the password will remove its history. Users without the new password will lose access to this pad";
    out.properties_passwordSame = "New passwords must differ from the current one.";
    out.properties_passwordError = "An error occurred while trying to change the password. Please try again.";
    out.properties_passwordWarning = "The password was successfully changed but we were unable to update your CryptDrive with the new data. You may have to remove the old version of the pad manually.<br>Press OK to reload and update your access rights.";
    out.properties_passwordSuccess = "The password was successfully changed.<br>Press OK to reload and update your access rights.";
    out.properties_changePasswordButton = "Submit";

    // New share modal
    out.share_linkCategory = "Share link";
    out.share_linkAccess = "Access rights";
    out.share_linkEdit = "Edit";
    out.share_linkView = "View";
    out.share_linkOptions = "Link options";
    out.share_linkEmbed = "Embed mode (toolbar and userlist hidden)";
    out.share_linkPresent = "Present mode (editable sections hidden)";
    out.share_linkOpen = "Open in new tab";
    out.share_linkCopy = "Copy to clipboard";
    out.share_embedCategory = "Embed";
    out.share_mediatagCopy = "Copy mediatag to clipboard";

    // Loading info
    out.loading_pad_1 = "Initializing pad";
    out.loading_pad_2 = "Loading pad content";
    out.loading_drive_1 = "Loading data";
    out.loading_drive_2 = "Updating data format";
    out.loading_drive_3 = "Verifying data integrity";

    // Shared folders
    out.sharedFolders_forget = "This pad is only stored in a shared folder, you can't move it to the trash. You can use your CryptDrive if you want to delete it.";
    out.sharedFolders_duplicate = "Some of the pads you were trying to move were already shared in the destination folder.";
    out.sharedFolders_create = "Create a shared folder";
    out.sharedFolders_create_name = "Folder name";
    out.sharedFolders_create_owned = "Owned folder";
    out.sharedFolders_create_password = "Folder password";
    out.sharedFolders_share = "Share this URL with other registered users to give them access to the shared folder. Once they open this URL, the shared folder will be added to the root directory of their CryptDrive.";

    out.chrome68 = "It seems that you're using the browser Chrome or Chromium version 68. It contains a bug resulting in the page turning completely white after a few seconds or the page being unresponsive to clicks. To fix this issue, you can switch to another tab and come back, or try to scroll in the page. This bug should be fixed in the next version of your browser.";

    // Manual pad storage popup
    out.autostore_file = "file";
    out.autostore_sf = "folder";
    out.autostore_pad = "pad";
    out.autostore_notstored = "This {0} is not in your CryptDrive. Do you want to store it now?";
    out.autostore_settings = "You can enable automatic pad storage in your <a href=\"/settings/\">Settings</a> page!";
    out.autostore_store = "Store";
    out.autostore_hide = "Don't store";
    out.autostore_error = "Unexpected error: we were unable to store this pad, please try again.";
    out.autostore_saved = "The pad was successfully stored in your CryptDrive!";
    out.autostore_forceSave = "Store the file in your CryptDrive"; // File upload modal
    out.autostore_notAvailable = "You must store this pad in your CryptDrive before being able to use this feature."; // Properties/tags/move to trash

    // Crowdfunding messages
    out.crowdfunding_home1 = "CryptPad needs your help!";
    out.crowdfunding_home2 = "Click on the button to learn about our crowdfunding campaign.";
    out.crowdfunding_button = "Support CryptPad";

    out.crowdfunding_popup_text = "<h3>We need your help!</h3>" +
                                  "To ensure that CryptPad is actively developed, consider supporting the project via the " +
                                  '<a href="https://opencollective.com/cryptpad">OpenCollective page</a>, where you can see our <b>Roadmap</b> and <b>Funding goals</b>.';
    out.crowdfunding_popup_yes = "Go to OpenCollective";
    out.crowdfunding_popup_no = "Not now";
    out.crowdfunding_popup_never = "Don't ask me again";

    return out;
});
