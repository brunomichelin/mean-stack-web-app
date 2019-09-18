(function () {
    'use strict';

    angular
        .module('app')
        .controller('Roupa.IndexController', Controller);

    function Controller($window,RoupaService) {
        var vm = this;

        vm.roupa = '';
        vm.createRoupa = createRoupa

        vm.title = 'Roupa:';

        vm.roupas = []

        initController();

        function initController() {
            
            RoupaService.GetAll().then(function (roupas) {
                vm.roupas = roupas;
            });
            
        }

        function createRoupa () {

            if(vm.roupa != null || vm.roupa != '') {  
                var quest = { key: vm.roupas.length ,value: vm.roupa }     
                vm.roupas.push(quest)
                RoupaService.Create(quest)
                vm.roupa = null
            }
            
        }
        
    }    

})();