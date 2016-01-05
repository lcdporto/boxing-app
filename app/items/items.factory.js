(function() {
    'use strict';
    
    angular
        .module('app.items')
        .factory('ItemsFactory', factory);
    
    factory.$inject = ['$resource', 'AppSettings'];
    
    /* @ngInject */
    function factory($resource, AppSettings) {
        return $resource(AppSettings.apiUrl + '/items/:id', {}, { query: { } });
    }
})();
