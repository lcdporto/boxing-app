
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
                // for each item in the items array make a request to get the container data
                angular.forEach(items, function(item){
                    // get related resource data using container id as foreign key
                    var request = ContainersService.get(item.container);
                    request.then(function(container){
                        item.container = container;
                    });
                    // add the request to the requests array
                    requests.push(request);
                });
                return $q.all(requests);
            })
        }
    }
})();
