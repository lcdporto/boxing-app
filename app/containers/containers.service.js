(function() {
    'use strict';
    
    angular
        .module('app.containers')
        .service('ContainersService', Service);
    
    Service.$inject = ['$http', 'ContainersFactory'];
    
    /* @ngInject */
    function Service($http, ContainersFactory) {
        this.getContainerByUrl = getContainerByUrl;
        this.all = all;
        this.get = get;

        function getContainerByUrl(url) {
            return $http({
                method: 'GET',
                url: url
            })
        }

        function all() {
            return ContainersFactory.query();
        }

        function get(id){
            return ContainersFactory.get({id:id}).$promise;
        }
    }
})();
