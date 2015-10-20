(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItemsListController', Controller);

    Controller.$inject = ['ItemsService', '$state', '$scope'];

    /* @ngInject */
    function Controller(ItemsService, $state, $scope) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        function activate() {
            ItemsService.all().$promise.then(
                function (data) {
                    vm.items = data.results;
                });
        }

        $scope.$watch(function () {
            return vm.searchText;
        }, function (current, original) {

            if(angular.lowercase(current) === 'i know the secret and i want to add an object'){
                $state.go('items_add');
            }
        });
    }
})();