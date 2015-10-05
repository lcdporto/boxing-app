(function () {
    'use strict';

    angular
            .module('app')
            .controller('ItemsController', Controller);

    Controller.$inject = ['ItemsService'];

    function Controller(ItemsService) {
        var vm = this;
        vm.items = ItemsService.find();
    }
})();