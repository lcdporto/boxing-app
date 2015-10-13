(function() {
    'use strict';
    
    angular
        .module('app')
        .service('BoxesService', Service);
    
    Service.$inject = [];
    
    /* @ngInject */
    function Service() {
        this.func = func;
        
        ////////////////
        
        function func() {
        }
    }
})();




// (function () {
//     'use strict';

//     angular
//             .module('app')
//             .service("Boxes", function ($resource, $q) {
//                 return $resource("http://192.168.1.219:8080/api/boxes/:id", {}, { query: {}});
//             });
// })();
