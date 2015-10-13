(function () {
    'use strict';

    angular
            .module('app')
            .controller('ItemsController', Controller);

    Controller.$inject = ['Item'];

    function Controller(Item) {
        var vm = this;

        Item.all()/*.$promise.then(function (data) {
            vm.items = data;
        }, function (errResponse) {
            // fail
        })*/;
    }
})();