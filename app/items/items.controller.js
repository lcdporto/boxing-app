(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('ItemsListController', Controller);
    
    Controller.$inject = ['ItemsService'];
    
    /* @ngInject */
    function Controller(ItemsService) {
        var vm = this;
        vm.title = 'Controller';
        
        activate();
        
        ////////////////
        
        function activate() {
            console.log('my controller');
            ItemsService.func().$promise.then(
                function(data){
                    console.log(data);
            });
        }
    }
})();


// (function () {
//     'use strict';

//     angular
//             .module('app')
//             .controller('ItemsController', Controller);

//     Controller.$inject = ['Item'];

//     function Controller(Item) {
//         var vm = this;

//         Item.all()/*.$promise.then(function (data) {
//             vm.items = data;
//         }, function (errResponse) {
//             // fail
//         })*/;
//     }
// })();
