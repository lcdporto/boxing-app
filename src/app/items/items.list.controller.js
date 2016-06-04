(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('ItemsListController', Controller);

    /* @ngInject */
    function Controller(items, categories, containers, $rootScope) {
        var vm = this;
        vm.items = items;
        vm.categories = categories;
        vm.containers = containers;

        vm.filter = filter;

        activate();

        function activate() {
            loadContains();
        }

        function loadContains() {
            vm.items.$load('container');
        }

        function filter() {
            $rootScope.lastSearch = vm.items.$params;
            vm.items.$refresh().$then(loadContains);
        }
    }
})();
