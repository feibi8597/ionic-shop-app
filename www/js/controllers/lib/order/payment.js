/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function (m) {
  m.controller('paymentCtrl', [
    '$scope', 'orderService', '$cordovaBarodeScanner', 'paymentService', '$state', '$ionicLoading',
    function ($scope, orderService, $cordovaBarcodeScanner, paymentService, $state, $ionicLoading) {
      $scope.seller_msg = {
        id: angular.fromJson(localStorage.tenantInfo).shopId,
        name: angular.fromJson(localStorage.tenantInfo).tenantName
      };
      $scope.data = {amount: ''};
      $scope.payway = {
        alipay: false,
        weixin: true
      };
      var orderId;
      $scope.scanCode = function () {
        var data = {
          shopId: $scope.seller_msg.id,
          productTotalPrice: $scope.data.amount,
          paymentWay: $scope.payway.alipay ? 1 : 2
        };
        orderService.createOrderByQR(data).success(function (res) {
          if(res.status == 200 && res.msg == "OK") {
            orderId = res.data;
            $cordovaBarcodeScanner.scan().then(function (res) {
              $ionicLoading.show({
                template: '数据处理中...'
              });
              paymentService.payByScan(res.text, orderId).success(function (res) {
                $ionicLoading.hide();
                if(res.status == 200 && res.msg == 'OK'){
                  $state.go('paySuccess');
                }
              });
              console.log(res.text);
            }, function (error) {
              console.log('error' + error);
            });
          }
        });
      };
    }
  ]);
};
