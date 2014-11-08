/// <reference path="../../../scripts/typings/cryptojs/cryptojs.d.ts" />

module app.auth {
    export class AuthService {
        static $inject = ['$http', '$rootScope', '$cookies', 'logService', '$q', '$sanitize', 'authService', '$location'];
        loggedInUser: app.identity.IUser;
        constructor(
            private $http,
            private $rootScope,
            private $cookies,
            private logService: app.log.LogService,
            private $q: ng.IQService,
            private $sanitize,
            private authService,
            private $location) {
        }
        registerUser(user: app.identity.IUser): ng.IPromise<app.identity.IUser> {
            var defered = this.$q.defer();
            this.logOut();
            var newUserObject = {};
            for (var prop in user) {
                if (prop === "Password" || prop === "ConfirmPassword") {
                    newUserObject[prop + "Encrypted"] = this.encryptString(this.$sanitize(user[prop]));
                } else {
                    newUserObject[prop] = user[prop];
                }
            }
            this.$http({
                url: "/api/User/Register",
                data: newUserObject,
                dataType: "json",
                method: "POST",
            }).then(() => {
                    this.login(user.Email, user.Password, false).then((loggedInUser) => {
                        defered.resolve(loggedInUser);
                    }).catch((error) => {
                        debugger;
                            defered.reject(error.error_description);
                        });
                }).catch((error) => {
                    if (error.data.ExceptionMessage) {
                        defered.reject(error.data.ExceptionMessage);
                    }
                    if (error.data.ModelState) {
                        defered.reject(error.data.ModelState[""][0]);
                    }
                });
            return defered.promise;
        }
        login(userName: string, password: string, rememberMe: boolean): ng.IPromise<any> {
            var defered = this.$q.defer();

            this.$http({
                url: "/Token",
                data: "grant_type=password&username=" + userName + "&password=" + this.$sanitize(password),
                dataType: "json",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success((data, status, headers, config) => {

                    if (data.access_token) {
                        var barer = 'Bearer ' + data.access_token;
                        if (rememberMe) {
                            this.$cookies.applicationAuthorization = barer;
                        }
                        this.$http.defaults.headers.common.Authorization = barer;
                        this.getUserInfo().then((user: app.identity.IUser) => {

                            defered.resolve(user);
                            this.authService.loginConfirmed(user);
                        });
                    }

                }).
                error((data, status, headers, config) => {
                    defered.reject(data);
                });

            return defered.promise;
        }

        updateRequestHeaderFromCookie() {
            if (this.$cookies.applicationAuthorization) {
                this.$http.defaults.headers.common.Authorization = this.$cookies.applicationAuthorization;
            }
        }
        encryptString(stringToEncrypt: string) {
            var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
            var encrypted = CryptoJS.AES.encrypt(stringToEncrypt, "Secret",
                {
                    keySize: 128,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            return encrypted.toString();
        }
        logOut() {
            this.loggedInUser = undefined;
            this.$rootScope.loggedInUser = undefined;
            delete this.$http.defaults.headers.common.Authorization;
            delete this.$cookies.applicationAuthorization;

        }

        getUserInfo(usecache : boolean = true): ng.IPromise<app.identity.IUser> {
            var defered = this.$q.defer();
            if (this.loggedInUser && usecache) {
                defered.resolve(this.loggedInUser);
            }
            this.$http.get("/api/User/GetExtraUserInfo").
                success((data, status, headers, config) => { 
                    if (data && data.UserName) {
                        this.loggedInUser = data;
                        this.$rootScope.$broadcast('event:auth-loginConfirmed');
                        this.$rootScope.loggedInUser = data;
                    }
                    defered.resolve(this.loggedInUser);
                }).
                error((data, status, headers, config) => {
                    defered.reject(status);
                });

            return defered.promise;
        }
        setupLockout() {
            this.$rootScope.$on('event:auth-loginRequired', () => {                
                var returnUrlObject = this.$location.search();
                var returnUrl;
                if (returnUrlObject.returnUrl) {
                    returnUrl = returnUrlObject.returnUrl;

                } else {
                    returnUrl = window.location.pathname;
                }
                this.$location.path('loggain').search({ returnUrl: returnUrl });
                this.$location.replace();

            });
            this.$rootScope.$on('event:auth-loginConfirmed', (ev, user) => {
                var returnUrlObject = this.$location.search();
                if (returnUrlObject.returnUrl) {
                    this.$location.path(returnUrlObject.returnUrl).search({});
                    this.$location.replace();
                    
                }
            });
        }
    }
}
angular.module('app.auth').service("appAuthService", app.auth.AuthService);
