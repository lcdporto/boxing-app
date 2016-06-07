(function () {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider,
                  $mdThemingProvider,
                  $authProvider,
                  $provide,
                  $httpProvider,
                  AppSettings) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('orange')
      .accentPalette('blue-grey');

    $authProvider.loginUrl = AppSettings.apiUrl + '/api-token-auth/';


    function redirectWhenLoggedOut($q, $injector) {
      return {

        responseError: function (rejection) {
          var $state = $injector.get('$state');
          // the string the api returns when a request has been made without
          // passing the credentials, in this case email and password
          var msg = 'Authentication credentials were not provided.';
          if (rejection.data.detail === msg && $state.current.name !== 'auth') {
            localStorage.removeItem('member');
            $state.go('auth');
          }

          return $q.reject(rejection);
        }
      };
    }

    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
    $httpProvider.interceptors.push('redirectWhenLoggedOut');
  }

})();
