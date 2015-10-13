(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('BoxesFactory', factory);
    
    factory.$inject = ['$resource'];
    
    /* @ngInject */
    function factory($resource) {
        return $resource('http://192.168.1.219:8080/boxes/:id/', {}, { query: {} });
    }
})();
