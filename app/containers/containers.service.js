(function() {
    'use strict';
    
    angular
        .module('app')
        .service('ContainersService', Service);
    
    Service.$inject = ['$http', 'ContainersFactory'];
    
    /* @ngInject */
    function Service($http, ContainersFactory) {
        this.getContainerByUrl = getContainerByUrl;
        this.all = all;

        function getContainerByUrl(url) {
            return $http({
                method: 'GET',
                url: url
            })
        }

        function all() {
            return ContainersFactory.query();
        }
    }
})();