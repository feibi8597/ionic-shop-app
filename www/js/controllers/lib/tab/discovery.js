/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function (m) {
  m.controller('discoveryCtrl', [
    '$scope', 'productMsgService', 'productService',
    function($scope, productMsgService, productService) {
      init();

      function init() {
        $scope.productList = productMsgService.getMsg();
      }

      $scope.doRefresh = function() {
        getProducts();
      };

      function getProducts() {
        productService.getProductBykeyWord('').success(function (res) {
          if(res.status === 200 && res.msg == 'OK') {
            // $ionicLoading.hide();
            productMsgService.setMsg(res.data);
            $scope.$broadcast('scroll.refreshComplete');
            init();
            // $scope.newproductList = productMsgService.getNew();
            // getReceivers();

          }
        });
      }
    }
  ]);
};
