(function () {
    'use strict';

    angular
            .module('app')
            .service("Item", function ($resource, $q, Boxes) {
                this.all = all;
                var resource = $resource("http://192.168.1.219:8080/items/:id");

                function all() {
                    this.items = [];
                    return resource.query().$promise.then(function (data) {
                        var requests = [];
                        angular.forEach(data, function (item) {
                            requests.push(Boxes.get({id: 1}));
                            console.log(item);
                        });
                        return $q.all(requests);
                    })/*.then(function (responses) {
                     angular.forEach(responses, function (response) {
                     this.items.push(responses);
                     })
                     });*/

                }
                ;

            });
})();