(function() {
    'use strict';
    
    angular
        .module('app')
        .service('ContainersService', Service);
    
    Service.$inject = [];
    
    /* @ngInject */
    function Service() {
        this.func = func;
        
        function func() {
        }
    }
})();