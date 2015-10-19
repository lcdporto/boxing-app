(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('ContainersFactory', factory);
    
    factory.$inject = ['$resource', 'AppSettings'];
    
    /* @ngInject */
    function factory($resource, AppSettings) {
        return $resource(AppSettings.apiUrl + '/containers/:containerId/', {containerId: "@id"}, { query: {} });
    }
})();
