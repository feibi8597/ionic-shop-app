/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function(m){
  m.controller('WebsitesCtrl', ['$scope', '$ionicLoading', '$state', 'productService', 'contentMsgService', 'productMsgService', '$ionicPopover', '$stateParams',
    function($scope, $ionicLoading, $state, productService, contentMsgService, productMsgService, $ionicPopover, $stateParams) {
      $scope.banners = contentMsgService.getShopBanner();

      init();
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

      $scope.popover = $ionicPopover.fromTemplateUrl('templates/modal/search_popover.html', {
        scope: $scope
      });

      $ionicPopover.fromTemplateUrl('templates/modal/search_popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });

      $scope.openSearchPop = function ($event) {
        $scope.popover.show($event);
      };

      function init() {
        var cat = $stateParams.cat;
        $scope.newproductList = productMsgService.getNew();
        $scope.bestproductList = productMsgService.getHot();
        $scope.salesproductList = productMsgService.getSales();
        if(cat == 'new') {
          $scope.isNew = true;
          $scope.isSales = false;
        } else if(cat == 'sales') {
          $scope.isNew = false;
          $scope.isSales = true;
        } else {
        }
      }
    }
  ]);
};
