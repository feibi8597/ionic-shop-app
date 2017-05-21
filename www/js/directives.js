/**
 * Created by toothless on 2016/12/27.
 */
angular.module('woaijiu.directives', [])
.directive('repeat', [
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        console.log(ctrl);
        if(ctrl) {
          var otherInput = element.inheritedData('$formController')[attrs.repeat];
          var repeatValidator = function (value) {
            var validity = value === otherInput.$viewValue;
            ctrl.$setValidity("repeat", validity);
            return validity ? value : undefined;
          };
          ctrl.$parsers.push(repeatValidator);
          ctrl.$formatters.push(repeatValidator);
          otherInput.$parsers.push(function (value) {
            ctrl.$setValidity("repeat", value === ctrl.$viewValue);
            return value;
          });
        }
      }
    };
  }
])
.directive('translucentBar', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
      return {
        scope:false.false,
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs) {
          var el = angular.element(element);
          var ion = angular.element(element).parent().find('ion-content').css({top: 0});
          var delegateHandle = attrs.translucentBar;
          var translucentColorOpacity = attrs.translucentColorOpacity;
          var translucentColor = attrs.translucentColor;
          var translucentScrollMaxtop = attrs.translucentScrollMaxtop;
          var translucentColorTotal = attrs.translucentColorTotal;
          if(!delegateHandle) {
            console.log('please dingfine the ion-content of delegate-handle');
          }
          if(!translucentColorOpacity) {
            console.log('you must set translucentColorOpacity directive of the value');
          }
          if(!translucentColor) {
            console.log('you must set translucentColor directive of the value');
          }

          if(!translucentScrollMaxtop) {
            translucentScrollMaxtop = 88;
          }

          if(!translucentColorTotal) {
            translucentColorTotal = 90;
          }

          var rgb = translucentColor.substring(4,translucentColor.length-1);

          var initCss = {
            'background': "rgba("+rgb+","+translucentColorOpacity+")",
          }

          el.css(initCss);

          var scroollTop = null;
          var distance = null;
          var opacity  = null;
          var translucentCss = null;

          scope.$$childHead.$onScroll = function() {
            distance   = $ionicScrollDelegate.$getByHandle(delegateHandle).getScrollPosition();
            scroollTop = distance.top;

            if(scroollTop <= translucentScrollMaxtop) {
              opacity = scroollTop / translucentColorTotal;
              translucentCss = {
                'background': "rgba("+rgb+","+opacity+")",
              };

              el.css(translucentCss);
            }
          }
        }
      };
    }])
.directive('ionicCity', ['$ionicPopup', '$timeout','CityPickerService','CityPickerTService','$ionicScrollDelegate','$ionicModal',
  function ($ionicPopup, $timeout,CityPickerService,CityPickerTService, $ionicScrollDelegate,$ionicModal) {
    function isBoolean(value) {return typeof value === 'boolean'}
    function isArray(value) {return toString.apply(value) === '[object Array]'}
    return {
      restrict: 'AE',
      // template:  '<div class={{vm.cssClass}}><i class={{vm.iconClass}}></i>{{vm.title}}<span class=item-note ng-model="vm.areaData">{{vm.areaData}}</span></div></div>',
      template: '<label class={{vm.cssClass}}><span style="height: 34px;padding-top: 8px;font-size: 14px;">{{vm.title}}</span><span ng-model="vm.areaData">{{vm.areaData}}</span></label>',
      scope: {
        options : '=options'
      },
      link: function (scope, element, attrs) {
        var vm = scope.vm = {}, so = scope.options, citypickerModel = null
        vm.uuid = Math.random().toString(36).substring(3, 8)
        vm.provinceHandle = 'province-' + vm.uuid
        vm.cityHandle = 'city-' + vm.uuid
        vm.countryHandle ='country-' + vm.uuid
        vm.title = so.title || ''
        vm.buttonText =  so.buttonText || '完成'
        vm.cssClass = 'item item-input item-top-margin'  + (angular.isDefined(so.iconClass) ? ' item-icon-left ' : ' ') + (angular.isDefined(so.cssClass) ? so.cssClass : '')
        vm.iconClass = 'icon ' + (angular.isDefined(so.iconClass) ? so.iconClass :'')
        vm.barCssClass = angular.isDefined(so.barCssClass) ? so.barCssClass : 'bar-stable'
        vm.backdrop = isBoolean(so.backdrop) ? so.backdrop : true
        vm.backdropClickToClose = isBoolean(so.backdropClickToClose) ? so.backdropClickToClose : false
        vm.hardwareBackButtonClose = isBoolean(so.hardwareBackButtonClose) ? so.hardwareBackButtonClose : true
        vm.watchChange = isBoolean(so.watchChange) ? so.watchChange : false
        vm.AreaService = CityPickerService
        vm.tag = so.tag || "-"
        vm.step = so.step || 36 // 滚动步长 （li的高度）
        if (angular.isDefined(so.defaultAreaData) && so.defaultAreaData.length > 1) {
          vm.defaultAreaData = so.defaultAreaData
          vm.areaData = vm.defaultAreaData.join(vm.tag)
        } else {
          vm.defaultAreaData =  ['上海','浦东新区']
          vm.areaData = angular.isDefined(so.areaData) ? so.areaData.join(vm.tag) : '请选择城市'
        }
        so.areaData = vm.areaData.split(vm.tag)
        vm.returnOk = function(){
          (vm.city && vm.city.sub && vm.city.sub.length > 0) ? (vm.areaData = vm.province.name + vm.tag +  vm.city.name + vm.tag + vm.country.name ) : (vm.areaData = vm.province.name + vm.tag + vm.city.name)
          so.areaData = vm.areaData.split(vm.tag)
          $timeout(function () {
            citypickerModel && citypickerModel.hide()
            so.buttonClicked && so.buttonClicked()
          }, 50)
        }
        vm.returnCancel = function() {
          citypickerModel && citypickerModel.hide()
          $timeout(function () {
            vm.initAreaData(vm.areaData.split(vm.tag))
          }, 150)
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
        vm.initAreaData = function(AreaData) {
          if (AreaData[0]) { // 初始化省
            for (var i = 0; i < vm.AreaService.length; i++)
            {
              if (AreaData[0] === vm.AreaService[i].name){
                $ionicScrollDelegate.$getByHandle(vm.provinceHandle).scrollTo(0, i * vm.step)
                vm.province = vm.AreaService[i]
                break
              }
            }
          }
          if (AreaData[1] && vm.province && vm.province.sub) { // 初始化市
            for (var i = 0; i < vm.province.sub.length; i++)
            {
              if (AreaData[1] === vm.province.sub[i].name){
                $ionicScrollDelegate.$getByHandle(vm.cityHandle).scrollTo(0, i * vm.step)
                vm.city = vm.province.sub[i]
                break
              }
            }
          }
          if (AreaData[2] && vm.city && vm.city.sub) { // 初始化区
            for (var i = 0; i < vm.city.sub.length; i++)
            {
              if (AreaData[2] === vm.city.sub[i].name){
                $ionicScrollDelegate.$getByHandle(vm.countryHandle).scrollTo(0, i * vm.step)
                vm.country = vm.city.sub[i]
                break
              }
            }
          }
        }
        if (vm.watchChange) {
          scope.$watch('options.areaData', function(newVal,oldVal){
            if (newVal !== oldVal && isArray(newVal) && newVal.length > 1 && newVal.join(vm.tag) !== vm.areaData) {
              if (vm.isCreated) {
                vm.initAreaData(newVal)
              }else {
                vm.defaultAreaData = newVal
              }
              vm.areaData = newVal.join(vm.tag)
            }
          })
        }
        element.on("click", function () {
          if (citypickerModel) {
            citypickerModel.show()
            return false
          }
          vm.isCreated = true
          // $ionicModal.fromTemplateUrl('lib/ionic-citypicker/src/templates/ionic-citypicker.html', {
          $ionicModal.fromTemplateUrl('lib/ionic-citypicker/src/templates/ionic-citypicker.html', {
            scope: scope,
            animation: 'slide-in-up',
            backdropClickToClose: vm.backdropClickToClose,
            hardwareBackButtonClose: vm.hardwareBackButtonClose,
          }).then(function(modal) {
            console.log(modal);
            citypickerModel = modal;
            $timeout(function () {
              citypickerModel.show();
              vm.initAreaData(vm.defaultAreaData)
            }, 50)
          })
        })
        scope.$on('$destroy', function() {
          citypickerModel && citypickerModel.remove();
        });
      }
    }
  }]);
