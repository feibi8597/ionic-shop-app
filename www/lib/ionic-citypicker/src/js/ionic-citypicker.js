"use strict";
var app = angular.module('ionic-citypicker', ['ionic', 'ionic-citypicker.service', 'ionic-citypicker.directive']);
app.directive('ionicCityPicker', ['$ionicPopup', '$timeout','CityPickerService','$ionicScrollDelegate','$ionicModal', '$ionicTabsDelegate', function ($ionicPopup, $timeout,CityPickerService, $ionicScrollDelegate,$ionicModal, $ionicTabsDelegate) {
  function isBoolean(value) {return typeof value === 'boolean'}
  function isArray(value) {return toString.apply(value) === '[object Array]'}
  return {
    restrict: 'AE',
    template: '<label class="item item-input"><input type="text" placeholder="所在地区" ng-model="vm.areaData" name="tenantArea" required></label>',
    scope: {
      options : '=options'
    },
    link: function (scope, element, attrs) {
        var vm = scope.vm = {}, so = scope.options, citypickerModel = null
        vm.uuid = Math.random().toString(36).substring(3, 8)
        vm.provinceHandle = 'province-' + vm.uuid
        vm.cityHandle = 'city-' + vm.uuid
        vm.countryHandle ='country-' + vm.uuid
        vm.buttonText = '完成'
        vm.barCssClass = 'bar-light'
        vm.backdrop = true
        vm.backdropClickToClose = true
        vm.hardwareBackButtonClose = true
        vm.AreaService = CityPickerService.getMsg()
        vm.tag = "-"
        vm.provinceSelected = {};
        vm.citySelected = {};
        vm.districtSelected = {};
        vm.step = 36 // 滚动步长 （li的高度）
        // vm.returnOk = function(){
        //   (vm.city && vm.city.sub && vm.city.sub.length > 0) ? (vm.areaData = vm.province.name + vm.tag +  vm.city.name + vm.tag + vm.country.name ) : (vm.areaData = vm.province.name + vm.tag + vm.city.name)
        //   so.areaData = vm.areaData.split(vm.tag)
        //   $timeout(function () {
        //     citypickerModel && citypickerModel.hide()
        //     so.buttonClicked && so.buttonClicked()
        //   }, 50)
        // }
        vm.returnCancel = function() {
          citypickerModel && citypickerModel.hide()
        }
        vm.selectArea = function (object, type) {
          if(type === 'province') {
            vm.citySelected.name = '请选择'
            vm.provinceSelected = object
            $ionicTabsDelegate.select(1)
          } else if(type === 'city') {
            vm.districtSelected.name = '请选择'
            vm.citySelected = object
            $ionicTabsDelegate.select(2);
          } else if(type === 'district') {
            vm.districtSelected = object
            vm.areaData = vm.provinceSelected.name + vm.citySelected.name + vm.districtSelected.name
            citypickerModel && citypickerModel.hide()
          }
          CityPickerService.getAreaById(object.id).success(function (res) {
            console.log('res', res);
          })
        }
        vm.clickToClose = function() {
          vm.backdropClickToClose && vm.returnCancel()
        }
        vm.getValue = function(name) {
          $timeout.cancel(vm.runing)
          switch(name)
          {
            case 'province':
              if (!vm.AreaService) {alert('province数据出错')}
              var province = true, Handle = vm.provinceHandle, HandleChild = vm.cityHandle
            break
            case 'city':
              if (!vm.province.sub) {alert('city数据出错')}
              var city = true, Handle = vm.cityHandle, HandleChild = vm.countryHandle
            break
            case 'country':
              if (!vm.city.sub) {alert('country数据出错')}
              var country = true, Handle = vm.countryHandle, HandleChild = null
            break
          }
          var top = $ionicScrollDelegate.$getByHandle(Handle).getScrollPosition().top // 当前滚动位置
          var step = Math.round(top / vm.step)
          if (top % vm.step !== 0) {
            $ionicScrollDelegate.$getByHandle(Handle).scrollTo(0, step * vm.step, true)
            return false
          }
          vm.runing = $timeout(function () {
            province && (vm.province = vm.AreaService[step], vm.city = vm.province.sub[0], vm.country = {}, (vm.city && vm.city.sub && (vm.country = vm.city.sub[0]))) //处理省市乡联动数据
            city &&  (vm.city = vm.province.sub[step], vm.country = {},(vm.city && vm.city.sub && (vm.country = vm.city.sub[0]))) // 处理市乡联动数据
            country &&  (vm.country = vm.city.sub[step]) // 处理乡数据
            HandleChild && $ionicScrollDelegate.$getByHandle(HandleChild).scrollTop() // 初始化子scroll top位
          })
        }
        element.on("click", function (event) {
            event.preventDefault();
            if (citypickerModel) {
              citypickerModel.show()
              return false
            }
            vm.isCreated = true
            $ionicModal.fromTemplateUrl('lib/ionic-citypicker/src/templates/ionic-citypicker.html', {
              scope: scope,
              animation: 'slide-in-up',
              backdropClickToClose: vm.backdropClickToClose,
              hardwareBackButtonClose: vm.hardwareBackButtonClose,
            }).then(function(modal) {
              citypickerModel = modal;
            })
        })
        scope.$on('$destroy', function() {
          citypickerModel && citypickerModel.remove();
        });
    }
  }
}]);
