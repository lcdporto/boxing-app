(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('ItemDetailsController', Controller);

    /* @ngInject */
    function Controller(item, ItemsTable) {
        var vm = this;

        vm.item = item;
        vm.zoomImgUrl = false;

        vm.viewImage = viewImage;

        activate();

        function activate() {
            vm.item.$load('images');
            if (vm.item.category) {
                vm.item.$load('category');
            }
            if (vm.item.container) {
                vm.item.$load('container');
            }

            vm.item.$relatedItems = ItemsTable.$search({related: item.id});
        }

        function viewImage(image) {
            vm.zoomImgUrl = image;
        }
    }
})();
