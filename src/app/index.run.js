(function () {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, AccountsTable) {
    $rootScope.$state = $state;
    $rootScope.mainStateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState) {

      var user = localStorage.getItem('member');
      if (user !== 'undefined' && user !== null) {
        user = angular.fromJson(user);

        $rootScope.me = AccountsTable.$build(user);
        $rootScope.me.$pk = user.id;
        if (toState.name === 'auth') {
          event.preventDefault();
          //$state.go('itemsList');
        }
      }
    });
  }

})();
