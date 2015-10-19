
(function() {
    'use strict';
    
    angular
        .module('app')
        .service('ItemsService', Service);
    
    Service.$inject = ['ItemsFactory', 'ContainersFactory', '$q'];
    
    /* @ngInject */
    function Service(ItemsFactory, ContainersFactory, $q) {
        this.all = all;

        function all() {
            var items;
            return ItemsFactory.query(function(data){
                items = data.items;
                var requests = [];
                angular.forEach(items, function(item){
                    requests.push(ContainersFactory.get({containerId: 1}, function(data){
                        item.Item.Container = data.Container;
                    }));
                });
                return $q.all(requests);
            })
        }
    }
})();