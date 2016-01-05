(function() {
    'use strict';
    
    angular
        .module('app.containers')
        .factory('ContainersFactory', factory);
    
    factory.$inject = ['$resource', 'AppSettings'];
    
    /* @ngInject */
    function factory($resource, AppSettings) {
        return $resource(AppSettings.apiUrl + '/containers/:id/', {}, { query: {} });
    }
})();
