/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('paymentService', [
    '$http', function ($http) {
      function payByScan(barCode, orderId) {
        var data = {
          barCode: barCode,
          orderId: orderId
        };
        return $http.get('/ECommerce/api/order/payByScan?orderId=' + orderId + '&barCode=' + barCode);
      }
      return {
        payByScan: payByScan
      }
    }
  ]);
};
