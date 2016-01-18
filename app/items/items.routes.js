(function() {
    'use strict';

    angular
        .module('app.items')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'list',
                config: {
                    url: '/list',
                    templateUrl: 'app/items/items.list.html',
                    controller: 'ItemsListController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();
