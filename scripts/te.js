var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["ONLINE"] = 0] = "ONLINE";
    UserStatus[UserStatus["OFFLINE"] = 1] = "OFFLINE";
})(UserStatus || (UserStatus = {}));
var userStatus = UserStatus.ONLINE;
UserStatus.ONLINE
