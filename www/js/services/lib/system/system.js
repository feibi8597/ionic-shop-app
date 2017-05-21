/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('systemService', [
    '$http', function () {
      function checkUserExist(mobile) {
        return $http.get('/ECommerce/api/user/checkExist?mobile=' + mobile);
      }
      function registerUser(data) {
        return $http.post('/ECommerce/api/user/register', angular.toJson({
          "mobile": data.mobile,
          "password": data.password,
          "email": data.email,
          "tenantName": data.tenantName,
          "tenantAddress": data.tenantAddress,
          "tenantMobile": data.tenantMobile,
          "area": data.area,
          "name": data.name,
          "cardNum": data.cardNum,
          "identify": data.identify,
          "phone": data.phone,
          "salesCode": data.salesCode
        }));
      }
      return {
        checkUserExist: checkUserExist,
        registerUser: registerUser
      };
    }
  ]);
};
