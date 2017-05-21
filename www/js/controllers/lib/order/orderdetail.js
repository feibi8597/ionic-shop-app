/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function (m) {
  m.controller('OrderDetailCtrl', [
    '$scope', 'orderService', '$stateParams', '$ionicHistory',
    function ($scope, orderService, $stateParams, $ionicHistory) {
      var orderId = $stateParams.orderId;
      $scope.state = {
        unpayed: '等待买家付款',
        payed: '买家已付款',
        delivered: '卖家已发货',
        canceled: '交易关闭',
        succeed: '交易成功'
      };
      init();
      function init() {
        orderService.getSingleOrder(orderId).success(function(res) {
          if(res.status == 200 && res.msg == 'OK') {
            $scope.order = res.data;
            angular.forEach($scope.order.productList, function (p) {
              p.image = p.image.split(',');
            });
          }
        });
      }
      $scope.return = function () {
        $ionicHistory.viewHistory();
        var title = $ionicHistory.backTitle();
        if(title == '购买宝贝') {
          $ionicHistory.goBack(-2);
        } else {
          $ionicHistory.goBack(-1);
        }
      };
    }
  ]);
};
