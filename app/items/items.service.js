
(function() {
    'use strict';
    
    angular
        .module('app')
        .service('ItemsService', Service);
    
    Service.$inject = ['ItemsFactory', 'ContainersService', '$q'];
    
    /* @ngInject */
    function Service(ItemsFactory, ContainersService, $q) {
        this.all = all;

        function all() {
            var items;
            return ItemsFactory.query(function(data){
                items = data.results;
                var requests = [];
                angular.forEach(items, function(item){
                    var request = ContainersService.getContainerByUrl(item.container);
                    requests.push(request);
                    request.then(function(container){
                        item.container = container.data;
                    });
                });
                return $q.all(requests);
            })
        }
    }
})();