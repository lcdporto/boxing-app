(function () {
    'use strict';

    angular
            .module('app')
            .service("Boxes", function ($resource, $q) {
                return $resource("http://192.168.1.219:3000/api/Boxes/:id");
            });
})();