(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsListController', Controller);

    Controller.$inject = ['ItemsService', '$state'];

    /* @ngInject */
    function Controller(ItemsService, $state) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        function activate() {
            ItemsService.all().$promise.then(
                function (data) {
                    vm.items = data.results;
                });
        }
    }
})();
