﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('Roupa.IndexController', Controller);

    function Controller($window, RoupaService, FlashService) {
        var vm = this;
        
        vm.productList = null;
        vm.product = null;

        vm.newProduct = newProduct;
        vm.saveProduct = saveProduct;
        vm.deleteProduct = deleteProduct;
        vm.getProduct = getProduct;

        var creating = false;
    
        getAll();

        function getAll() 
        {
            RoupaService.GetAll().then(function (productList) {
                vm.productList = productList;
            });            
        }

        function newProduct() 
        {
            creating = true;
            clearElements();
            document.getElementById('code').value = getLast();
        }

        function createProduct() 
        {
            vm.product = null;
            fillProduct(false);
            RoupaService.Create(vm.product)
                .then(function () {
                    FlashService.Success('Product created');
                    getAll();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function saveProduct() 
        {
            if(creating) //insert
            {
                createProduct();
                creating = false;
            }
            else //update
            {
                fillProduct(true);
                RoupaService.Update(vm.product)
                    .then(function () {
                        FlashService.Success('Product updated');
                        getAll();
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
            }
        }

        function deleteProduct() 
        {
            if(creating) //erase info
            {
                vm.product = null;
                clearElements();
                creating = false;
            }
            else //delete
            {
                fillProduct(true);
                RoupaService.Delete(vm.product._id)
                    .then(function () {
                        vm.product = null;
                        getAll();
                        clearElements();
                        FlashService.Success('Product deleted');
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });                
            }
        }

        function clearElements()
        {            
            var clear = document.getElementsByClassName("clear");
            for(let e of clear)
            {
                e.value = "";
            }
        }

        function getLast()
        {                    
            return (Number(vm.productList[Object.keys(vm.productList).length - 1].code) + 1);
        }

        function getProduct(productCode)
        {        
            for(var key in vm.productList)
            {
                var product = vm.productList[key];
                if(Number(product.code) == Number(productCode))
                {
                    vm.product = product;
                    fillElements();
                    creating = false;                    
                }
            }
        }

        function fillElements()
        {
            document.getElementById('code').value = vm.product.code;
            document.getElementById('date').value = vm.product.date;
            document.getElementById('type').value = vm.product.type;
            document.getElementById('brand').value = vm.product.brand;
            document.getElementById('charac').value = vm.product.charac;
            document.getElementById('size').value = vm.product.size;
            document.getElementById('color').value = vm.product.color;
            document.getElementById('labelprice').value = vm.product.labelprice;
            document.getElementById('pricepaid').value = vm.product.pricepaid;
            document.getElementById('suggestedprice').value = vm.product.suggestedprice;
            document.getElementById('marginprice').value = Number(vm.product.suggestedprice) * 2;
        }

        function fillProduct(withId)
        {
            if(!withId)
            {
                vm.product = {
                    code: document.getElementById('code').value,
                    date: document.getElementById('date').value,
                    type: document.getElementById('type').value,
                    brand: document.getElementById('brand').value,
                    charac: document.getElementById('charac').value,
                    size: document.getElementById('size').value,
                    color: document.getElementById('color').value,
                    labelprice: document.getElementById('labelprice').value,
                    pricepaid: document.getElementById('pricepaid').value,
                    suggestedprice: document.getElementById('suggestedprice').value
                };
            }
            else
            {
                var id = vm.product._id;
                vm.product = {
                    _id: id,
                    code: document.getElementById('code').value,
                    date: document.getElementById('date').value,
                    type: document.getElementById('type').value,
                    brand: document.getElementById('brand').value,
                    charac: document.getElementById('charac').value,
                    size: document.getElementById('size').value,
                    color: document.getElementById('color').value,
                    labelprice: document.getElementById('labelprice').value,
                    pricepaid: document.getElementById('pricepaid').value,
                    suggestedprice: document.getElementById('suggestedprice').value
                };
            }
        }
    }

})();