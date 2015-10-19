(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('ItemsFactory', factory);
    
    factory.$inject = ['$resource'];
    
    /* @ngInject */
    function factory($resource) {
        return $resource('http://localhost/boxinglab/api/1/items/:id/?fields=*', {}, { query: { method: "GET", isArray: false } });
    }
})();
