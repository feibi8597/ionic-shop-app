/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function (m) {
  m.controller('ChatsCtrl', [
    '$scope', '$timeout', 'cartService', '$ionicPopup', '$state',
    function($scope, $timeout, cartService, $ionicPopup, $state) {
      var allSelected = false;
      init();
      function init() {
        $scope.productList = [];
        $scope.productSelectedNum = 0;
        $scope.productSum = 0;
        $scope.productsInCart = cartService.getCart();
      }
      $scope.selectedProductAll = function () {
        allSelected = !allSelected;
        $scope.productSelectedNum = 0;
        $scope.productSum = 0;
        angular.forEach($scope.productsInCart,function (product) {
          product.selected = allSelected;
          if(product.selected) {
            $scope.productSelectedNum ++;
            $scope.productSum = $scope.productSum + product.sellPrice * product.num;
          }
        });
        if(allSelected) {
          $scope.productList = angular.copy($scope.productsInCart);
        } else {
          $scope.productList = [];
        }
        $scope.selectedAll = allSelected;
      };
      $scope.deleteProduct = function (product) {
        var deletePop = $ionicPopup.show({
          title: '您确定要删除该商品吗？',
          scope: $scope,
          buttons: [
            { text: '取消' },
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function(e) {
                cartService.deleteProduct(product);
                $scope.productsInCart = _.reject($scope.productsInCart, function (item) {
                  return item.id == product.id;
                });
              }
            },
          ]
        });
      };
      $scope.minus = function (product) {
        if(product.num == 1) {
          var myPopup = $ionicPopup.show({
            title: '您确定要删除该商品吗？',
            scope: $scope,
            buttons: [
              { text: '取消' },
              {
                text: '<b>确定</b>',
                type: 'button-positive',
                onTap: function(e) {
                  cartService.deleteProduct(product);
                  if(allSelected){
                    $scope.productSum = $scope.productSum - product.sellPrice;
                    $scope.productSelectedNum --;
                  }
                  $scope.productsInCart = _.reject($scope.productsInCart, function (item) {
                    return item.id == product.id;
                  });
                }
              },
            ]
          });
        } else {
          product.num --;
          if(allSelected) {
            $scope.productSum = $scope.productSum - product.sellPrice;
          }
        }
      };
      $scope.plus = function (product) {
        if(product.num < product.stock) {
          product.num ++;
          if(allSelected){
            $scope.productSum = $scope.productSum + product.sellPrice;
            $scope.productSelectedNum ++;
          }
        } else {
          var plusPopup = $ionicPopup.show({
            title: '商品数量已经超出商品库存'
          });
          $timeout(function() {
            plusPopup.close();
          }, 2000);
        }
      };
      $scope.productSelected = function (product) {
        $scope.productSelectedNum = 0;
        $scope.productSum = 0;
        if(product.selected) {
          $scope.productList.push(product);
          if($scope.productList.length == $scope.productsInCart.length) {
            // allSelected = true;
            $scope.selectedAll = true;
          }
        } else {
          $scope.productList = _.reject($scope.productList, function (prod) {
            return prod.id == product.id;
          });
          // allSelected = false;
          $scope.selectedAll = false;
        }
        angular.forEach($scope.productsInCart, function (p) {
          if (p.selected) {
            $scope.productSelectedNum++;
            $scope.productSum = $scope.productSum + p.sellPrice * p.num;
          }
        });
      };
      $scope.settleAccounts = function () {
        if($scope.productList.length == 0) {
          var alertPopup = $ionicPopup.show({
            title: '请选择要结算的商品！'
          });
          $timeout(function() {
            alertPopup.close();
          }, 3000);
        }else{
          cartService.setSelectedProductsList($scope.productList);
          $state.go('purchase');
        }
      };

      // $scope.openPop = function (product) {
      //   var changeNum = $ionicPopup.show({
      //     title: '修改购买数量',
      //     templateUrl: 'templates/modal/change_num_popup.html',
      //     scope: $scope,
      //     buttons: [
      //       { text: '取消' },
      //       {
      //         text: '<b>确定</b>',
      //         type: 'button-positive',
      //         onTap: function(e) {
      //           cartService.deleteProduct(product);
      //           $scope.productsInCart = _.reject($scope.productsInCart, function (item) {
      //             return item.id == product.id;
      //           });
      //         }
      //       },
      //     ]
      //   });
      // };
      // $scope.changeNum = function (num) {
      //
      // };
    }
  ]);
};
