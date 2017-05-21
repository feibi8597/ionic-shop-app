/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function (m) {
  m.controller('OrderCtrl', [
    '$scope', 'orderMsgService', 'orderService', '$ionicModal', '$state',
    function ($scope, orderMsgService, orderService, $ionicModal, $state) {
      var orderId;

      $scope.state = {
        unpayed: '等待买家付款',
        payed: '买家已付款',
        delivered: '卖家已发货',
        canceled: '交易关闭',
        succeed: '交易成功'
      };
      function init() {
        $scope.undeliveredOrder = orderMsgService.getUndeliveredOrder();
        $scope.unpayedOrder = orderMsgService.getUnPayedOrder();
        $scope.unrecivedOrder = orderMsgService.getUnReceivedOrder();
        $scope.orderList = orderMsgService.getMsg();
      }
      $scope.cancelOrder = function (id) {
        orderService.cancelOrder(id).success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            angular.forEach($scope.orderList, function (order) {
              if(order.id == id) {
                order.state = 1;
              }
            });
          }
        });
      };
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
              $scope.closeModal();
              $state.go('orederdetail', { orderId: orderId });
            }
          }
        });
      };
      $scope.confirmDeposit = function () {
        $scope.closeModal();
        $state.go('orederdetail', { orderId: orderId });
      };
      $scope.payway = function (id) {
        orderId = id;
        $scope.payModal.show();
      };
      $scope.doRefresh = function() {
        getOrders();
      };
      function getOrders() {
        orderService.getAllOrder().success(function (res) {
          if(res.msg == 'OK' && res.status == 200) {
            orderMsgService.setMsg(res.data);
            init();
            $scope.$broadcast('scroll.refreshComplete');
          }
        });
      }
      init();
    }
  ]);
};
