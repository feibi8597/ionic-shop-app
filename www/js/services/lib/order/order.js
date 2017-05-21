/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('orderService',[
    '$http', function ($http) {
      var token = localStorage.access_token;
      function createOrder(data) {
        return $http.post('/ECommerce/api/order/create', angular.toJson(data));
      }
      function createOrderByQR(data) {
        return $http.post('/ECommerce/api/order/createByScan', angular.toJson(data));
      }
      function getSingleOrder(id) {
        return $http.get('/ECommerce/api/order/get?token=' + token + '&id=' + id);
      }
      function getAllOrder() {
        var tenantId = angular.fromJson(localStorage.tenantInfo).shopId;
        return $http.get('/ECommerce/api/order/getAll?token=' + token + '&shopId=' + tenantId);
      }
      function updatepayment(data) {
        var id = data.id;
        var payment = data.paymentWay;
        return $http.get('/ECommerce/api/order/pay?token=' + token + '&id=' + id + '&paymentWay=' + payment);
      }
      function cancelOrder(id) {
        return $http.get('/ECommerce/api/order/cancel?token=' + token + '&id=' + id);
      }
      return {
        createOrder: createOrder,
        getSingleOrder: getSingleOrder,
        getAllOrder: getAllOrder,
        updatepayment: updatepayment,
        createOrderByQR: createOrderByQR,
        cancelOrder: cancelOrder
      }
    }
  ]);
};
