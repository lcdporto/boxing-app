(function () {
    'use strict';

    angular
        .module('app.items')
        .controller('ItemsDetailController', Controller);

    Controller.$inject = ['$stateParams', 'ItemsService'];

    /* @ngInject */
    function Controller($stateParams, ItemsService) {
        var vm = this;

        activate();

        function activate() {
            ItemsService.get($stateParams.id).then(
                function (data) {
                    vm.item = data;
                });
        }
    }
})();
