define(function () {
    return {
        // localStorage
        userHashKey: 'User_hash',
        userNameKey: 'User_name',
        blockHashKey: 'Block_hash',
        fileHashKey: 'FS_hash',
        // sessionStorage
        newPadPathKey: "newPadPath",
        newPadTeamKey: "newPadTeam",
        newPadFileData: "newPadFileData",
        // Store
        displayNameKey: 'cryptpad.username',
        oldStorageKey: 'CryptPad_RECENTPADS',
        storageKey: 'filesData',
        tokenKey: 'loginToken',
        displayPadCreationScreen: 'displayPadCreationScreen',
        deprecatedKey: 'deprecated',
        MAX_TEAMS_SLOTS: 3,
        // Sub
        plan: 'CryptPad_plan',
        // Apps
        criticalApps: ['profile', 'settings', 'debug', 'admin', 'support', 'notifications']
    };
});
