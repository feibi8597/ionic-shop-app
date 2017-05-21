/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function(m) {
  m.controller('ProductDetailCtrl', [
    '$scope', '$state', '$ionicSlideBoxDelegate', '$ionicModal', 'cartService', '$stateParams', 'productService',
    function ($scope, $state, $ionicSlideBoxDelegate, $ionicModal, cartService, $stateParams, productService) {
      $scope.loadMore = function () {
        $scope.detail = [];
      };
      $scope.$on('stateChangeSuccess', function() {
        $scope.loadMore();
      });
      $scope.moreDataCanBeLoaded = function () {
        return false;
      };
      $scope.open_modal = function (index) {
        $scope.top_slide_modal.show();
        $ionicSlideBoxDelegate.$getByHandle('modal_slide').slide(index);
      };
      $ionicModal.fromTemplateUrl('templates/modal/top_slide_modal.html',{
        scope:$scope
      }).then(function(modal){
        $scope.top_slide_modal=modal;
      });
      $scope.$on('$destroy', function() {
        $scope.top_slide_modal.remove();
      });
      $scope.close_modal=function(){
        $scope.top_slide_modal.hide();
      };
      $scope.addToCart = function (product) {
        cartService.setCart(product);
      };
      $scope.confirmOrder = function (product) {
        var list = [];
        product.num = 1;
        list.push(product);
        cartService.setSelectedProductsList(list);
        $state.go('purchase');
      };

      function init() {
        var id = $stateParams.productId;
        $scope.type = $stateParams.type || null;
        productService.getProductById(id).success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            $scope.product = res.data;
            $scope.product.image = res.data.image.split(',');
            angular.forEach($scope.product.image, function (item) {
              item.replace(/\\/g,"/");
            });
            var container = document.getElementById('description');
            container.innerHTML = $scope.product.description;
            $scope.product.num = 0;
          }
        });
        $scope.productInCart = cartService.getCart();
      }
      init();
    }
  ]);
};
