(function () {
    'use strict';

    angular
        .module('app.media')
        .service('MediaService', Service);

    /* @ngInject */
    function Service(Upload, AppSettings, $mdToast) {
        this.upload = upload;

        function upload(file) {
            $mdToast.show($mdToast.simple().textContent('Uploading ...'));

            if (file) {
                return Upload.upload({
                    url: AppSettings.apiUrl + '/media/',
                    data: {
                        path: file
                    }
                }).then(function (data) {
                    return data.data.path;
                }, function () {
                    $mdToast.updateTextContent('Erro ao enviar ficheiro!');
                    return undefined;
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $mdToast.updateTextContent('Uploading (' + progressPercentage + '%)');
                });
            } else {
                $mdToast.updateTextContent('Ficheiro inválido!');
                return undefined;
            }
        }
    }
})();