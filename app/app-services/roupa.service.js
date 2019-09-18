(function () {
    'use strict';

    angular
        .module('app')
        .factory('RoupaService', Service);

    function Service($http, $q) {
        var service = {};
        
        service.GetAll = GetAll;        
        service.Create = Create;        

        return service;

        function GetAll() {
            return $http.get('http://localhost:9050/api/roupa/getAll').then(handleSuccess, handleError);
        }        

        function Create(roupa) {
            return $http.post('http://localhost:9050/api/roupa/create', roupa).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
