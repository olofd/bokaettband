/// <reference path="../../../scripts/typings/cryptojs/cryptojs.d.ts" />
var app;
(function (app) {
    var auth;
    (function (auth) {
        var AuthService = (function () {
            function AuthService($http, $rootScope, $cookies, logService, $q, $sanitize) {
                this.$http = $http;
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;
                this.logService = logService;
                this.$q = $q;
                this.$sanitize = $sanitize;
            }
            AuthService.prototype.registerUser = function (user) {
                var _this = this;
                var defered = this.$q.defer();
                this.logOut();
                var newUserObject = {};
                for (var prop in user) {
                    if (prop === "Password" || prop === "ConfirmPassword") {
                        newUserObject[prop + "Encrypted"] = this.encryptString(this.$sanitize(user[prop]));
                    }
                    else {
                        newUserObject[prop] = user[prop];
                    }
                }
                this.$http({
                    url: "/api/User/Register",
                    data: newUserObject,
                    dataType: "json",
                    method: "POST",
                }).then(function () {
                    _this.login(user.Email, user.Password, false).then(function (loggedInUser) {
                        defered.resolve(loggedInUser);
                    }).catch(function (error) {
                        defered.reject(error.error_description);
                    });
                }).catch(function (error) {
                    if (error.data.ExceptionMessage) {
                        defered.reject(error.data.ExceptionMessage);
                    }
                    if (error.data.ModelState) {
                        defered.reject(error.data.ModelState[""][0]);
                    }
                });
                return defered.promise;
            };
            AuthService.prototype.login = function (userName, password, rememberMe) {
                var _this = this;
                var defered = this.$q.defer();
                this.$http({
                    url: "/Token",
                    data: "grant_type=password&username=" + userName + "&password=" + this.$sanitize(password),
                    dataType: "json",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function (data, status, headers, config) {
                    if (data.access_token) {
                        var barer = 'Bearer ' + data.access_token;
                        if (rememberMe) {
                            _this.$cookies.applicationAuthorization = barer;
                        }
                        _this.$http.defaults.headers.common.Authorization = barer;
                        _this.getUserInfo().then(function (user) {
                            defered.resolve(user);
                        });
                    }
                }).error(function (data, status, headers, config) {
                    defered.reject(data);
                });
                return defered.promise;
            };
            AuthService.prototype.updateRequestHeaderFromCookie = function () {
                if (this.$cookies.applicationAuthorization) {
                    this.$http.defaults.headers.common.Authorization = this.$cookies.applicationAuthorization;
                }
            };
            AuthService.prototype.encryptString = function (stringToEncrypt) {
                var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
                var encrypted = CryptoJS.AES.encrypt(stringToEncrypt, "Secret", {
                    keySize: 128,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.toString();
            };
            AuthService.prototype.logOut = function () {
                this.loggedInUser = undefined;
                this.$rootScope.loggedInUser = undefined;
                delete this.$http.defaults.headers.common.Authorization;
                delete this.$cookies.applicationAuthorization;
            };
            AuthService.prototype.getUserInfo = function () {
                var _this = this;
                var defered = this.$q.defer();
                if (this.loggedInUser) {
                    defered.resolve(this.loggedInUser);
                }
                this.$http.get("/api/User/GetExtraUserInfo").success(function (data, status, headers, config) {
                    if (data && data.UserName) {
                        _this.loggedInUser = data;
                        _this.$rootScope.$broadcast('event:auth-loginConfirmed');
                        _this.$rootScope.loggedInUser = data;
                    }
                    defered.resolve(_this.loggedInUser);
                }).error(function (data, status, headers, config) {
                    defered.reject(status);
                });
                return defered.promise;
            };
            AuthService.$inject = ['$http', '$rootScope', '$cookies', 'logService', '$q', '$sanitize'];
            return AuthService;
        })();
        auth.AuthService = AuthService;
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
angular.module('app.auth').service("appAuthService", app.auth.AuthService);
