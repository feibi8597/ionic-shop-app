/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function (m) {
  m.controller('ReceiverCtrl', [
    '$scope', 'receiverService', 'receiverMsgService', '$stateParams', '$ionicPopup', '$state', '$ionicModal', '$ionicTabsDelegate',
    'areaService', function ($scope, receiverService, receiverMsgService, $stateParams, $ionicPopup, $state, $ionicModal, $ionicTabsDelegate, areaService) {
      $scope.citySelected = {};
      $scope.districtSelected = {};
      $scope.provinceSelected = {};
      $ionicModal.fromTemplateUrl('templates/modal/select_area_modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: true,
        hardwareBackButtonClose: true
      }).then(function(modal) {
        $scope.citymodal = modal;
      });
      function init() {
        $scope.receiverList = receiverMsgService.getMsg();
        if($scope.receiverList.length == 0) {
          receiverService.getReceiverList().success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              $scope.receiverList = res.data;
              receiverMsgService.setMsg(res.data);
            }
          });
        }
        if($stateParams.receiverId) {
          $scope.title = '更改地址';
          var id = $stateParams.receiverId;
          $scope.receiver = receiverMsgService.getReceiverById(id)[0];
          $scope.receiver.phone = parseInt($scope.receiver.phone);
          $scope.provinceList = areaService.getMsg();
          var arr = $scope.receiver.area.split('-');
          $scope.provinceSelected.name = arr[0];
          $scope.citySelected.name = arr[1];
          $scope.districtSelected.name = arr[2];
        } else {
          $scope.title = '新增地址';
          $scope.receiver = {};
          $scope.provinceList = areaService.getMsg();
        }
      }
      init();
      function initArea() {
        var arr = $scope.receiver.area.split('-');
        $scope.provinceSelected.name = arr[0];
        $scope.citySelected.name = arr[1];
        $scope.districtSelected.name = arr[2];
      }
      $scope.deleteReceiver = function (id) {
        var deletePop = $ionicPopup.show({
          title: '您确定要删除该收货人信息吗？',
          scope: $scope,
          buttons: [
            { text: '取消' },
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function(e) {
                receiverService.deleteReceiver(id).success(function (res) {
                  if(res.status == 200 && res.msg == 'OK') {
                    $scope.receiverList = _.reject($scope.receiverList, function (item) {
                      return item.id == id;
                    });
                    receiverService.getReceiverList().success(function (res) {
                      if(res.status == 200 && res.msg == 'OK') {
                        receiverMsgService.setMsg(res.data);
                      }
                    });
                  }
                });
              }
            },
          ]
        });

      };
      $scope.validate = function (type, form) {
        switch (type) {
          case 'phone':
            if(form.receiverPhone && form.receiverPhone.$dirty && form.receiverPhone.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '手机格式不正确',
                template:'请检查您填写的手机号信息！'
              });
            }
            break;
          case 'address':
            if(form.receiverAddress.$dirty && form.receiverAddress.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title:'详细地址不得少于五个字符',
                template: '请检查您填写的详细地址信息'
              });
            }
            break;
          default:
            break;
        }
      };
      $scope.addReceiver = function () {
        var data = {
          id: $scope.receiver.id || null,
          phone: JSON.stringify($scope.receiver.phone),
          address: $scope.receiver.address,
          areaId: $scope.receiver.areaId,
          name: $scope.receiver.name,
          shopId: angular.fromJson(localStorage.tenantInfo).shopId,
          def: $scope.receiver.def || false
        };

        if(data.id) {
          receiverService.updateReceiver(data).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              receiverService.getReceiverList().success(function (res) {
                if(res.status == 200 && res.msg == 'OK') {
                  receiverMsgService.setMsg(res.data);
                  $state.go('addressList');
                }
              });
            }
          });
        } else {
          console.log('receiver', data);
          receiverService.addReceiver(data).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              receiverService.getReceiverList().success(function (res) {
                if(res.status == 200 && res.msg == 'OK') {
                  receiverMsgService.setMsg(res.data);
                  // $ionicHistory.goBack(1);
                  // $state.go('addressList');
                  window.history.back();
                }
              });
            }
          });
        }

      };
      $scope.changeDefault = function (receiver) {
        if(receiver.def) {
          angular.forEach($scope.receiverList, function (item) {
            if(receiver.id != item.id) {
              item.def = false;
            }
          });
          var data = {
            id: receiver.id,
            def: receiver.def,
            shopId : angular.fromJson(localStorage.tenantInfo).shopId
          };

          receiverService.updateDefault(data).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              receiverService.getReceiverList().success(function (res) {
                if(res.status == 200 && res.msg == 'OK') {
                  receiverMsgService.setMsg(res.data);
                }
              });
            }
          })
        } else {
          receiver.def = true;
          alert('至少选择一个默认地址！');
        }
      };
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
          $scope.receiver.area = $scope.provinceSelected.name + '-' + $scope.citySelected.name + '-' + $scope.districtSelected.name;
          $scope.receiver.areaId = object.id;
          $scope.closeModal();
        }

      };
      $scope.openModal = function () {
        $scope.citymodal.show();
      };
      $scope.closeModal = function() {
        $scope.citymodal.hide();
      };
      $scope.$on('$destroy', function() {
        $scope.citymodal.remove();
      });
      $scope.$on('modal.hidden', function() {
      });
      $scope.$on('modal.removed', function() {
      });
      $scope.selectReceiver = function (receiver) {
        receiverMsgService.setSelectedReceiver(receiver);
        $state.go('purchase');
      };
    }
  ]);
};
