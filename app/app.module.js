(function () {
    'use strict';

    angular
        .module('app', [
            'ngMaterial',
            'ui.router',
            'ngResource',
            'satellizer',
            'app.core',
            'app.accounts',
            'app.containers',
            'app.items',
            'app.auth'
        ])
        .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $resourceProvider, $authProvider, AppSettings, $httpProvider, $provide, $mdIconProvider) {

                $resourceProvider.defaults.stripTrailingSlashes = false;


                $mdThemingProvider.theme('default')
                                  .primaryPalette('blue-grey')
                                  .accentPalette('amber');

                $authProvider.loginUrl = AppSettings.apiUrl + '/api-token-auth/';

                $urlRouterProvider.otherwise('/auth');

                function redirectWhenLoggedOut($q, $injector) {
                    return {

                        responseError: function(rejection) {
                            var $state = $injector.get('$state');

                            if(typeof rejection.data.detail != 'undefined' && rejection.data.detail == 'Authentication credentials were not provided.' && $state.current.name != 'auth'){
                                localStorage.removeItem('user');
                                $state.go('auth');
                            }

                            return $q.reject(rejection);
                        }
                    }
                }

            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
            $httpProvider.interceptors.push('redirectWhenLoggedOut');

            // setup icon provider
            // we can register icon and/or iconsets see https://material.angularjs.org/latest/api/service/$mdIconProvider
            // where to find and download icons https://design.google.com/icons/
            $mdIconProvider
                .icon('inbox', 'content/icons/ic_inbox_white_48px.svg', 48)
                .icon('search', 'content/icons/ic_search_black_48px.svg', 48);


            })


        .run(function($rootScope, $state) {

            $rootScope.$on('$stateChangeStart', function(event, toState) {

                var user = JSON.parse(localStorage.getItem('user'));

                if(user) {
                    $rootScope.authenticated = user;
                    if(toState.name === "auth") {
                        event.preventDefault();
                        $state.go('list');
                    }
                }
            });
        });

})();
