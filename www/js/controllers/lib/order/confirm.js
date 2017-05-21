/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function (m) {
  m.controller('confirmOrderCtrl',[
    '$scope', 'cartService', '$state', 'orderService', 'receiverMsgService', '$ionicPopup', '$timeout', 'orderMsgService', '$stateParams', '$ionicModal',
    function ($scope, cartService, $state, orderService, receiverMsgService, $ionicPopup, $timeout, orderMsgService, $stateParams, $ionicModal) {
      $scope.productsSum = 0;
      var type = $stateParams.type;
      var orderId;
      $scope.first = true;
      $scope.second = false;
      $ionicModal.fromTemplateUrl('templates/modal/select_payway_modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: true,
        hardwareBackButtonClose: true
      }).then(function(modal) {
        $scope.payModal = modal;
      });
      $scope.closeModal = function() {
        $scope.payModal.hide();
        $state.go('orederdetail', { orderId: orderId });
      };
      $scope.return = function () {
        $scope.first = true;
        $scope.second = false;
      };
      init();
      function init() {
        $scope.productList = cartService.getSelectedProductsList();
        $scope.receiver = receiverMsgService.getDefaultReceiver();
        angular.forEach($scope.productList, function (item) {
          $scope.productsSum = $scope.productsSum + item.sellPrice * item.num;
        });
      }
      $scope.minus = function (product) {
        if(product.num == 1) {
          alert('不能在减少了哦！')
        } else {
          product.num --;
        }
      };
      $scope.plus = function (product) {
        if(product.num < product.inventory) {
          product.num ++;
        } else {
          var plusPopup = $ionicPopup.show({
            title: '商品数量已经超出商品库存'
          });
          $timeout(function() {
            plusPopup.close();
          }, 2000);
        }
      };
      $scope.createOrder = function () {
        if($scope.receiver) {
          var data = {
            recipientId: $scope.receiver.id,
            shopId: angular.fromJson(localStorage.tenantInfo).shopId
          };
          var productL = [];
          angular.forEach($scope.productList, function (prod) {
            var temp = {'productid': prod.id, 'amount': prod.num};
            productL.push(temp);
          });
          data.items = productL;
          orderService.createOrder(data).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              orderId = res.data;
              angular.forEach($scope.productList, function (prod) {
                cartService.deleteProduct(prod);
              });
              orderService.getAllOrder().success(function (res) {
                if(res.status == 200 && res.msg == 'OK') {
                  orderMsgService.setMsg(res.data);
                }
              });
              $scope.payModal.show();
              // $timeout(function () {
              //   $state.go('tab.order');
              // }, 2000);
            }
          });
        }else {
          var alertPopup = $ionicPopup.show({
            title: '请先填写收货人地址'
          });
          $timeout(function() {
            alertPopup.close();
          }, 2000);
        }
      };
      $scope.routeURL = function () {
        if($scope.receiver) {
          $state.go('addressSelected');
        } else {
          $state.go('addAddress');
        }
      };
      $scope.$on('$destroy', function() {
        $scope.payModal.remove();
      });
      $scope.$on('modal.hidden', function() {
      });
      $scope.$on('modal.removed', function() {
      });
      $scope.checkPayway = function (data) {
        var paymentWay;
        if(data.alipay) {
          paymentWay = '1';
        } else if(data.weixin) {
          paymentWay = '2';
        } else if(data.COD) {
          paymentWay = '3';
        } else if(data.deposit) {
          paymentWay = '4';
        }
        var data = {
          id: orderId,
          paymentWay: paymentWay
        };
        orderService.updatepayment(data).success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            if(paymentWay == '4') {
              $scope.second = true;
              $scope.first = false;
              $scope.deposit = res.data;
            } else {
              $state.go('orederdetail', { orderId: orderId });
            }
          }
        });
      };
      $scope.confirmDeposit = function () {
        $state.go('orederdetail', { orderId: orderId });
      };
    }
  ]);
};
