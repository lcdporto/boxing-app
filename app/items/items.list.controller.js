(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('ItemsListController', Controller);
    
    Controller.$inject = ['ItemsService'];
    
    /* @ngInject */
    function Controller(ItemsService) {
        var vm = this;
        vm.title = 'Controller';
        
        activate();
        
        ////////////////
        
        function activate() {
            ItemsService.all().$promise.then(
                function(data){
                    console.log(data);
                    vm.items = data.results;
            });
        }
    }
})();