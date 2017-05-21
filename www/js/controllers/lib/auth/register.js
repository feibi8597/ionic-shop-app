/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function (m) {
  m.controller('RegisterCtrl', [
    '$filter', '$scope', '$state', '$ionicPopup', '$ionicPlatform', '$ionicModal', '$cordovaCamera', '$timeout', 'systemService',
    'authService', 'registerMsgService', '$ionicPopover', '$cordovaFileTransfer', 'areaService', '$ionicTabsDelegate', 'ionicDatePicker',
    '$ionicLoading', function ($filter, $scope, $state, $ionicPopup, $ionicPlatform, $ionicModal, $cordovaCamera, $timeout, systemService,
     authService, registerMsgService, $ionicPopover, $cordovaFileTransfer, areaService, $ionicTabsDelegate, ionicDatePicker, $ionicLoading) {
      var regMsg = registerMsgService.getMsg();
      var imgMsg = registerMsgService.getIMG();

      $scope.data = {
        reg: {
          userMobile: {value: regMsg.mobile || '', key: 'userMobile'},
          userMail: {value: regMsg.email || '', key: 'userMail'},
          salesCode: {value: regMsg.code || '', key: 'salesCode'},
          password: {value: regMsg.password || '', key: 'password'},

          tenantName: {value: regMsg.tenantName || '', key: 'tenantName'},
          tenantAreaId: {value: regMsg.area || '', key: 'tenantAreaId'},
          tenantAddress: {value: regMsg.tenantAddress || '', key: 'tenantAddress'},
          tenantMobile: {value: regMsg.tenantMobile || '', key: 'tenantMobile'},
          arrivalTime: {value: regMsg.arrivalTime || '', key: 'arrivalTime'},
          identifyCardIMG: {value: imgMsg.identifyCardIMG || [], key: 'identifyCardIMG'},

          tenantLicenseNum: {value: regMsg.tenantLicenseNum || '', key: 'tenantLicenseNum'},
          tenantScope: {value: regMsg.tenantScope || '', key: 'tenantScope'},
          tenantValidity: {value: regMsg.tenantValidity || '', key: 'tenantValidity'},
          tenantTerm: {value:regMsg.tenantTerm || '',key:'tenantTerm'},
          organizationCode: {value: regMsg.organizationCode || '', key: 'organizationCode'},
          tenantType: {value: regMsg.tenantType || '', key: 'tenantType'},
          businessLiscenseIMG: {value: imgMsg.businessLiscenseIMG || new Array(), key: 'businessLiscenseIMG'},
          tenantIMG: {value: imgMsg.tenantIMG || new Array(), key: 'tenantIMG'},

          realName: {value: regMsg.name || '', key: 'name'},
          identification: {value: regMsg.identify || '', key: 'identify'},
          cardNum: {value: regMsg.cardNum || '', key: 'cardNum'},
          cardPhone: {value: regMsg.phone || '', key: 'phone'},
          bankAccountType: {value: regMsg.bankAccountType || '',key: 'bankAccountType'},
          bankCode: {value: regMsg.bankCode || '', key: 'bankCode'},
          bankAccountNum: {value: regMsg.bankAccountNum || '', key: 'bankAccountNum'},
          bankName: {value: regMsg.bankName || '', key: 'bankName'},
          bankNum: {value: regMsg.bankNum || '', key: 'bankNum'},
          cardIMG: {value: imgMsg.cardIMG || new Array(), key: 'cardIMG'}
        },
        nextdayArrival: true,
        todayArrival: false,
        private: true,
        public: false,
      };
      $scope.startTime;
      $scope.endTime;
      $scope.licenseList = [];
      $scope.nameList = [];
      $scope.citySelected = {};
      $scope.districtSelected = {};
      $scope.provinceSelected = {};
      $scope.agree = true;
      $scope.hidden = true;
      $scope.isLimit = true;
      $scope.isLicense = false;
      $scope.provinceList = areaService.getMsg();
      $scope.tenantArea = registerMsgService.getArea();

      var datename;
      var imgIdentify = {};
      var upload_options = {};
      var server_url = 'http://120.77.40.156:8080/ECommerce/api/pic/upload';
      upload_options.chunkedMode = false;
      upload_options.fileKey = 'uploadFile';
      var weeksList = ["日", "一", "二", "三", "四", "五", "六"];
      var monthsList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
      var num = 1;

      $ionicPopover.fromTemplateUrl('templates/modal/protocol_popover.html', {scope: $scope}).then(function (popover) {
        $scope.protocol_popover = popover;
      });

      $ionicPopover.fromTemplateUrl('templates/modal/existed_user.html', { scope: $scope}).then(function (popover) {
        $scope.conflict_popover = popover;
      });

      $ionicModal.fromTemplateUrl('templates/modal/photo_edit_modal.html',{
        scope:$scope,
      }).then(function(modal){
        $scope.photo_edit_modal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/modal/select_area_modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: true,
        hardwareBackButtonClose: true
      }).then(function(modal) {
        $scope.citymodal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/modal/select_action.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: true,
        hardwareBackButtonClose: true
      }).then(function (modal) {
        $scope.actionModal = modal;
      });

      function init() {
        $scope.data.nextdayArrival = $scope.data.reg.arrivalTime.value ? ($scope.data.reg.arrivalTime.value == 2 ? true : false) : true;
        $scope.data.todayArrival =  $scope.data.reg.arrivalTime.value ? ($scope.data.reg.arrivalTime.value == 1 ? true : false) : false;
        $scope.data.private = $scope.data.reg.bankAccountType.value ? ($scope.data.reg.bankAccountType.value == 2 ? true : false) : true;
        $scope.data.private = $scope.data.reg.bankAccountType.value ? ($scope.data.reg.bankAccountType.value == 1 ? true : false) : false;
        angular.forEach(imgMsg.identifyCardIMG, function (item) {
          switch (item.name) {
            case 'front':
              $scope.frontUserphoto = item.url;
              break;
            case 'oppsite':
              $scope.oppsiteUserphoto = item.url;
              break;
            case 'hand':
              $scope.handUserphoto = item.url;
              break;
          }
        });
        $scope.licenseList = angular.copy(imgMsg.businessLiscenseIMG);
        angular.forEach(imgMsg.tenantIMG, function (item) {
          switch (item.name) {
            case 'door':
              $scope.doorphoto = item.url;
              break;
            case 'counter':
              $scope.counterphoto = item.url;
              break;
            case 'store':
              $scope.storephoto = item.url;
              break;
            case 'agreements':
              $scope.agreementsphoto = item.url;
              break;
          }
        });
        $scope.cardphoto = angular.copy(imgMsg.cardIMG[0].url);
      }

      $scope.openMore = function () {
        $scope.actionModal.show();
      };

      function datePickerCallbacks(val) {
        if(datename == 'tenantTermStart') {
          $scope.startTime = $filter('date')(val,'yyyy-MM-dd');
        }else if(datename == 'tenantTermEnd'){
          $scope.endTime = $filter('date')(val,'yyyy-MM-dd');;
        }else if(datename == 'tenantValidity') {
          $scope.data.reg.tenantValidity.value = $filter('date')(val,'yyyy-MM-dd');
        }
        if($scope.startTime && $scope.endTime) {
          $scope.data.reg.tenantTerm.value = $scope.startTime + '~' + $scope.endTime;
        }
      }

      function isConflictMobile(mobile) {
        systemService.checkUserExist(mobile).success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            $scope.conflictEmail = !!res.data;
          }else {

          }
          if($scope.conflictEmail) {
            // $scope.conflict_popover.show();
            var conflictPopup = $ionicPopup.show({
              title: '用户已存在',
              template:"<div style='text-align:center;'>您可以直接<a ui-sref='signin'>登录</a>！</div>"
            });
            $timeout(function() {
              conflictPopup.close();
            }, 3000);
          }
        });
      }

      $scope.selectArea = function (object, type) {
        if(type === 'province') {
          $scope.citySelected.name = '请选择';
          $scope.provinceSelected = object;
          $ionicTabsDelegate.select(1);
          areaService.getAreaListById(object.id).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              $scope.cityList = res.data;
            }
          });
        } else if(type === 'city') {
          $scope.districtSelected.name = '请选择';
          $scope.citySelected = object;
          $ionicTabsDelegate.select(2);
          areaService.getAreaListById(object.id).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              $scope.districtList = res.data;
            }
          });
        } else if(type === 'district') {
          $scope.districtSelected = object;
          $scope.tenantArea = $scope.provinceSelected.name + '-' + $scope.citySelected.name + '-' + $scope.districtSelected.name;
          registerMsgService.setArea($scope.tenantArea);
          $scope.data.reg.tenantAreaId.value = object.id;
          $scope.closeModal('city');
        }

      };

      $scope.openAreaModal = function () {
        $scope.citymodal.show();
      };

      $scope.openLicenseSec = function () {
        $scope.hidden = !$scope.hidden;
      };

      $scope.openDatePicker = function ($event) {
        datename = $event.target.name;
        ionicDatePicker.openDatePicker(
          {
            todayLabel: '今天',
            closeLabel: '关闭',
            inputDate: new Date(),
            mondayFirst: true,
            weeksList: weeksList,
            monthsList: monthsList,
            templateType: 'popup',
            showTodayButton: 'true',
            dataFormat: 'yyyy-MM-dd',
            closeOnSelect: true,
            from: datename == 'tenantTermEnd' ? $scope.startTime : 0,
            to: datename == 'tenantTermStart' ? $scope.endTime : 0,
            callback: function (val) {
              datePickerCallbacks(val);
            }
          }
        );
        var ele = document.getElementsByClassName('selected_date_full');
        ele.innerHTML = '选择日期';
      };

      $scope.closeModal = function(type) {
        if(type == "photo") {
          $scope.photo_edit_modal.hide();
        }else if(type == "action") {
          $scope.actionModal.hide();
        } else if(type == "city") {
          $scope.citymodal.hide();
        }
      };

      $scope.changeArrival = function ($event) {
        var name = $event.target.name;
        var status = $event.target.checked;
        $scope.data.nextdayArrival = ((name == 'nextdayArrival' && !status) || (name == 'todayArrival' && status)) ? false : true;
        $scope.data.todayArrival = ((name == 'todayArrival' && !status) || (name == 'nextdayArrival' && status)) ? false : true;
      };

      $scope.changeType = function ($event) {
        var name = $event.target.name;
        var status = $event.target.checked;
        $scope.data.private = ((name == 'private' && !status) || (name == 'public' && status)) ? false : true;
        $scope.data.public = ((name == 'public' && !status) || (name == 'private' && status)) ? false : true;
      };

      $scope.confirm = function () {
        registerMsgService.setMsg($scope.data);
        var data = registerMsgService.getMsg();
        authService.register(data).success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            var user = res.data.userMsg;
            var tenant = res.data.tenantMsg;
            authService.setUser(user);
            authService.setTenant(tenant);
            localStorage.haslogin = 1;
            $state.go('mainMenu');
          }
        });

      };

      $scope.validate = function (type, form) {
        switch (type) {
          case 'phone':
            if(form.userMobile && form.userMobile.$dirty && form.userMobile.$error.pattern) {
              //register.html userMobile
              var alertPopup = $ionicPopup.show({
                title: '手机格式不正确',
                template:'<div style="text-align:center;">请检查您填写的手机号信息！</div>'
              });
              $timeout(function() {
                alertPopup.close();
              }, 3000);
            } else if(form.tenantMobile && form.tenantMobile.$dirty && form.tenantMobile.$error.pattern) {
              var alertPopup = $ionicPopup.show({
                title: '手机格式不正确',
                template:'<div style="text-align:center;">请检查您填写的手机号信息！</div>'
              });
              $timeout(function() {
                alertPopup.close();
              }, 3000);
            } else if (form.cardPhone && form.cardPhone.$dirty && form.cardPhone.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '手机格式不正确',
                template:'<div style="text-align:center;">请检查您填写的手机号信息！</div>'
              });
              $timeout(function() {
                alertPopup.close();
              }, 3000);
            }
            if(form.userMobile && form.userMobile.$valid){
              isConflictMobile($scope.data.reg.userMobile.value);
            }
            break;
          case 'mail':
            if(form.userMail.$dirty && form.userMail.$error.pattern) {
              var alertPopup = $ionicPopup.show({
                title: '邮箱格式不正确',
                template:'<div style="text-align:center;">请检查您填写的邮箱信息！</div>'
              });
              $timeout(function() {
                alertPopup.close();
              }, 3000);
            }
            if(form.userMail.$valid) {
            }
            break;
          // case 'address':
          //   if(form.tenantAddress.$dirty && form.tenantAddress.$error.pattern) {
          //     var alertPopup = $ionicPopup.alert({
          //       title:'详细地址不得少于五个字符',
          //       template: '请检查您填写的详细地址信息',
          //       buttons: [{
          //         text: '我知道了',
          //         type: 'button-assertive'
          //       }]
          //     });
          //   }
          //   break;
          case 'password':
            if(form.password.$dirty && form.password.$error.pattern) {
              var alertPopup = $ionicPopup.show({
                title: '密码格式不正确',
                template:'<div style="text-align:center;">至少8位字符，至少包含数字，字母或特殊字符！</div>'
              });
              $timeout(function() {
                alertPopup.close();
              }, 3000);
            }
            if(form.password.$valid) {
            }
            break;
          case 'salesCode':
            if(form.salesCode.$dirty && form.salesCode.$error.pattern) {
              var alertPopup = $ionicPopup.show({
                title: '销售代码格式不正确',
                template: '<div style="text-align:center;">销售代码为六位数字！</div>'
              });
              $timeout(function() {
                alertPopup.close();
              }, 3000);
            }
            break;
          case 'repeatpw':
            if(form.repeatpw.$dirty && form.repeatpw.$error.repeat) {
              var alertPopup = $ionicPopup.show({
                title: '两次密码输入不一致',
                template:'<div style="text-align:center;">请检查您填写的确认密码！</div>'
              });
              $timeout(function() {
                alertPopup.close();
              }, 3000);
            }
            if(form.repeatpw.$valid) {
            }
            break;
          case 'realName':
            if(form.realName.$dirty && form.realName.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '姓名有误',
                template:'请检查您填写的姓名！'
              });
            }
            break;
          case 'cardNum':
            if(form.cardNum.$dirty && form.cardNum.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '银行卡卡号格式不正确',
                template:'请检查您填写的银行卡信息！'
              });
            }
            break;
          case 'Id':
            if(form.identification.$dirty && form.identification.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '身份证号码格式不正确',
                template:'请检查您填写的身份证信息！'
              });
            }
            break;
          default:
            break;
        }
      };

      $scope.next = function () {
        $scope.data.reg.arrivalTime.value = $scope.data.nextdayArrival ? 2 : 1;
        $scope.data.reg.bankAccountType.value = $scope.data.private ? 2 : 1;
        registerMsgService.setMsg($scope.data);
        console.log(registerMsgService.getMsg());

      };

      $scope.deletePicture = function (pic) {
        var deletePicPopup = $ionicPopup.show({
          template: '<div style="text-align: center;">是否要删除该图片？</div>',
          title: '提示',
          buttons: [
            { text: '取消' },
            {
              text: '确定',
              type: 'button-assertive',
              onTap: function(e) {
                num--;
                if(num < 5) {
                  $scope.isLimit = true;
                }
                nameList.push(pic.name);
                $scope.licenseList = _.reject($scope.licenseList, function (item) {
                  return item.name == pic.name;
                });
                $scope.data.reg.businessLiscenseIMG.value = _.reject($scope.data.reg.businessLiscenseIMG.value, function (item) {
                  return item.name == pic.name;
                });
              }
            }
          ]
        });

      };

      $scope.takePicture = function (type) {
        $ionicPlatform.ready(function () {
          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            mediaType:0,
            cameraDirection:0,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
          };
          $cordovaCamera.getPicture(options).then(function (photo) {
            switch (type) {
              case 'front':
                $scope.frontUserphoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'front';
                break;
              case 'oppsite':
                $scope.oppsiteUserphoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'oppsite';
                break;
              case 'hand':
                $scope.handUserphoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'hand';
                break;
              case 'license':
                $scope.licensephoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'license';
                break;
              case 'door':
                $scope.doorphoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'door';
                break;
              case 'counter':
                $scope.counterphoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'counter';
                break;
              case 'store':
                $scope.storephoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'store';
                break;
              case 'agreements':
                $scope.agreementsphoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'agreements';
                break;
              case 'card':
                $scope.cardphoto = photo;
                imgIdentify.photo = photo;
                imgIdentify.type = 'card';
                break;
              case 'more':
                var li = {'name': '', 'url': photo};
                nameList.length == 0 ? li.name = 'license' + num : li.name = nameList[0];
                nameList.shift();
                if(num < 5) {
                  $scope.licenseList.push(li);
                  imgIdentify.photo = photo;
                  imgIdentify.type = li.name;
                  num++;
                }
                if(num > 4) {
                  $scope.isLimit = false;
                }
                break;
              default:
                var temp = {'name': type.name, 'url': photo};
                $scope.licenseList = _.reject($scope.licenseList, function (item) {
                  return item.name == type.name;
                });
                $scope.licenseList.push(temp);
                imgIdentify.photo = photo;
                imgIdentify.type = type.name;
            }
            $cordovaFileTransfer.upload(server_url, imgIdentify.photo, upload_options).then(function (res) {
              $ionicLoading.hide();
              console.log("SUCCESS: " + JSON.stringify(res.response));
              var pUrl = angular.fromJson(res.response).url;
              var name = imgIdentify.type;
              var obj = {'name': name, 'url': pUrl};
              if(imgIdentify.type == 'front' || imgIdentify.type == 'oppsite' || imgIdentify.type == 'hand') {
                if($scope.data.reg.identifyCardIMG.value.length !== 0) {
                  $scope.data.reg.identifyCardIMG.value = _.reject($scope.data.reg.identifyCardIMG.value, function (item) {
                    return item.name == obj.name;
                  });
                }
                $scope.data.reg.identifyCardIMG.value.push(obj);
                console.log('id', $scope.data.reg.identifyCardIMG);
              } else if(imgIdentify.type.indexOf('license') >= 0 ) {
                if($scope.data.reg.businessLiscenseIMG.value.length !== 0) {
                  $scope.data.reg.businessLiscenseIMG.value = _.reject($scope.data.reg.businessLiscenseIMG.value, function (item) {
                    return item.name == obj.name;
                  });
                }
                $scope.data.reg.businessLiscenseIMG.value.push(obj);
                console.log('license', $scope.data.reg.businessLiscenseIMG);
              } else if(imgIdentify.type == 'store' || imgIdentify.type == 'counter' || imgIdentify.type == 'door' || imgIdentify.type == 'agreements') {
                if($scope.data.reg.tenantIMG.value.length !== 0) {
                  $scope.data.reg.tenantIMG.value = _.reject($scope.data.reg.tenantIMG.value, function (item) {
                    return item.name == obj.name;
                  });
                }
                $scope.data.reg.tenantIMG.value.push(obj);
                console.log('tenant', $scope.data.reg.tenantIMG);
              } else if(imgIdentify.type == 'card') {
                $scope.data.reg.cardIMG.value[0] = obj;
                console.log('card', $scope.data.reg.cardIMG);
              }
            }, function(err) {
              console.log("ERROR: " + JSON.stringify(err));
              alert(JSON.stringify(err));
            }, function (progress) {
              $ionicLoading.show({
                template: '上传中...'
              });
            });
          }, function (err) {
            console.log(err);
          });
        });
      };

      $scope.openCamera = function (type, rate) {
        $scope.type = type;
        $scope.closeModal('action');
        $ionicPlatform.ready(function () {
          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            mediaType:0,
            cameraDirection:0,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
          };
          if(!rate) {
            $cordovaCamera.getPicture(options).then(function (photo) {
              switch (type) {
                case 'front':
                  $scope.img = $scope.frontUserphoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'front';
                  break;
                case 'oppsite':
                  $scope.img = $scope.oppsiteUserphoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'oppsite';
                  break;
                case 'hand':
                  $scope.img = $scope.handUserphoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'hand';
                  break;
                case 'license':
                  $scope.img = $scope.licensephoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'license';
                  break;
                case 'door':
                  $scope.img = $scope.doorphoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'door';
                  break;
                case 'counter':
                  $scope.img = $scope.counterphoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'counter';
                  break;
                case 'store':
                  $scope.img = $scope.storephoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'store';
                  break;
                case 'agreements':
                  $scope.img = $scope.agreementsphoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'agreements';
                  break;
                case 'card':
                  $scope.img = $scope.cardphoto = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'card';
                  break;
                case 'more':
                  var li = {'name': 'license' + i, 'url': photo};
                  if(i < 5) {
                    $scope.licenseList.push(li);
                    imgIdentify.photo = photo;
                    imgIdentify.type = 'license' + i;
                    i++;
                  } else {
                    $scope.isLimit = false;
                  }
                default:
                  angular.forEach($scope.licenseList, function (item) {
                    if(item.name == type.name) {
                      item.photo = photo;
                    }
                  });
                  $scope.type.photo = photo ;
                  $scope.img = photo;
                  imgIdentify.photo = photo;
                  imgIdentify.type = 'license' + i;

              }
              $cordovaFileTransfer.upload(server_url, imgIdentify.photo, upload_options).then(function (res) {
                $ionicLoading.hide();
                console.log("SUCCESS: " + JSON.stringify(res.response));
                var pUrl = angular.fromJson(res.response).url;
                var name = imgIdentify.type;
                var obj = {'name': name, 'url': pUrl};
                if(imgIdentify.type == 'front' || imgIdentify.type == 'oppsite' || imgIdentify.type == 'hand') {
                  if($scope.data.reg.identifyCardIMG.value.length !== 0) {
                    $scope.data.reg.identifyCardIMG.value = _.reject($scope.data.reg.identifyCardIMG.value, function (item) {
                      return item.name == obj.name;
                    });
                  }
                  $scope.data.reg.identifyCardIMG.value.push(obj);
                  console.log('id', $scope.data.reg.identifyCardIMG);
                } else if(imgIdentify.type.indexOf('license') >= 0 ) {
                  if($scope.data.reg.businessLiscenseIMG.value.length !== 0) {
                    $scope.data.reg.businessLiscenseIMG.value = _.reject($scope.data.reg.businessLiscenseIMG.value, function (item) {
                      return item.name == obj.name;
                    });
                  }
                  $scope.data.reg.businessLiscenseIMG.value.push(obj);
                  console.log('license', $scope.data.reg.businessLiscenseIMG);
                } else if(imgIdentify.type == 'store' || imgIdentify.type == 'counter' || imgIdentify.type == 'door' || imgIdentify.type == 'agreements') {
                  if($scope.data.reg.tenantIMG.value.length !== 0) {
                    $scope.data.reg.tenantIMG.value = _.reject($scope.data.reg.tenantIMG.value, function (item) {
                      return item.name == obj.name;
                    });
                  }
                  $scope.data.reg.tenantIMG.value.push(obj);
                  console.log('tenant', $scope.data.reg.tenantIMG);
                } else if(imgIdentify.type == 'card') {
                  $scope.data.reg.cardIMG.value[0] = obj;
                  console.log('card', $scope.data.reg.cardIMG);
                }
              }, function(err) {
                console.log("ERROR: " + JSON.stringify(err));
                alert(JSON.stringify(err));
              }, function (progress) {
                $ionicLoading.show({
                  template: '上传中...'
                });
              });
            }, function (err) {
              console.log(err);
            });
          } else {
            openEditModal(type);
          }
        });
      };

      function openEditModal(type) {
        switch (type) {
          case 'front':
            $scope.img = $scope.frontUserphoto;
            break;
          case 'oppsite':
            $scope.img = $scope.oppsiteUserphoto;
            break;
          case 'hand':
            $scope.img = $scope.handUserphoto;
            break;
          case 'license':
            $scope.img = $scope.licensephoto;
            break;
          case 'door':
            $scope.img = $scope.doorphoto;
            break;
          case 'counter':
            $scope.img = $scope.counterphoto;
            break;
          case 'store':
            $scope.img = $scope.storephoto;
            break;
          case 'agreements':
            $scope.img = $scope.agreementsphoto;
            break;
          case 'card':
            $scope.img = $scope.cardphoto;
            break;
          default:
            $scope.img = type.photo;
        }
        $scope.photo_edit_modal.show();
      }

      $scope.detelePhoto = function (img) {
        i--;
        $scope.isLimit = true;
        $scope.licenseList = _.reject($scope.licenseList, function (item) {
          return item.content == img;
        });
        $scope.actionModal.hide();
        $scope.photo_edit_modal.hide();
      };

      $scope.openProtModal = function () {
        $scope.protocol_popover.show();
      };

      $scope.closePopover = function() {
        $scope.protocol_popover.hide();
      };

      $scope.$on('$destroy', function() {
        $scope.protocol_popover.remove();
        $scope.citymodal.remove();

      });
    }
  ])
};
