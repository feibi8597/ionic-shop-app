/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function(m) {
  m.factory('productService',[
    '$http',
    function ($http) {
      var token = localStorage.access_token;
      function getProductList(keyword) {
        return $http.get('/ECommerce/api/goods/list?token=' + localStorage.access_token + '&keyWord=' + keyword);
      }
      function getProductById(id) {
        return $http.get('/ECommerce/api/goods/get?id=' + id + '&token=' + token);
      }
      return {
        getProductBykeyWord: getProductList,
        getProductById: getProductById
      };
    }
  ]);
};
