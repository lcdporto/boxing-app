
(function() {
    'use strict';

    angular
        .module('app.accounts')
        .service('AccountsService', Service);

    Service.$inject = ['AccountsFactory'];

    /* @ngInject */
    function Service(AccountsFactory) {
        this.all = all;
        this.get = get;

        function all() {
            return AccountsFactory.query();
        }

        function get(id) {
            return AccountsFactory.get({id: id}).$promise;
        }
    }
})();
