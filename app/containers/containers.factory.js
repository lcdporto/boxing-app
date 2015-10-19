(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('ContainersFactory', factory);
    
    factory.$inject = ['$resource'];
    
    /* @ngInject */
    function factory($resource) {
        return $resource('http://192.168.1.73/boxinglab/api/1/containers/:containerId/', {containerId: "@id"}, { query: {} });
    }
})();
