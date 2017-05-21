/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function(m){
  m.factory('cartService', function () {
    var cart = angular.fromJson(localStorage.productsInCart) || [];
    var productIds = [];
    var selectedProductsList = [];
    function getCart() {
      return cart;
    }
    function setCart(product) {
      productIds = _.map(cart, 'id');
      if(_.contains(productIds, product.id)) {
        angular.forEach(cart, function (item) {
          if(item.id == product.id) {
            item.num ++
          }
        });
      } else {
        product.num = 1;
        cart.push(product);
      }
      localStorage.productsInCart = JSON.stringify(cart);
    }
    function deleteProduct(product) {
      cart = _.reject(cart, function (item) {
        return item.id == product.id;
      });
      localStorage.productsInCart = JSON.stringify(cart);
    }
    function getSelectedProductsList() {
      return selectedProductsList;
    }
    function setSelectedProductsList(data) {
      selectedProductsList = data;
    }
    return {
      getCart: getCart,
      setCart: setCart,
      deleteProduct: deleteProduct,
      getSelectedProductsList: getSelectedProductsList,
      setSelectedProductsList: setSelectedProductsList
    }
  });
};
