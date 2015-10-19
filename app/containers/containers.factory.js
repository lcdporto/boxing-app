(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('ContainersFactory', factory);
    
    factory.$inject = ['$resource'];
    
    /* @ngInject */
    function factory($resource) {
        return $resource('http://localhost/boxinglab/api/1/containers/:containerId/', {containerId: "@id"}, { query: {} });
    }
})();
