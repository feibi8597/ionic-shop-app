/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function(m){
  m.factory('receiverService', [
    '$http',
    function ($http) {
      var token = localStorage.access_token;

      function addReceiver(data) {
        return $http.post('/ECommerce/api/recipient/create', angular.toJson(data));
      }

      function getArea(id) {
        return $http.get('/ECommerce/api/area/list?id=' + id);
      }

      function getReceiverList() {
        var tenant = angular.fromJson(localStorage.tenantInfo);
        var tenantId = tenant.shopId;
        return $http.get('/ECommerce/api/recipient/list?shopId=' + tenantId + '&token=' + token);
      }

      function updateReceiver(data) {
        return $http.post('/ECommerce/api/recipient/update', angular.toJson(data));
      }

      function updateDefault(data) {
        return $http.post("/ECommerce/api/recipient/updateDef?token=" + token, angular.toJson(data));
      }

      function deleteReceiver(id) {
        return $http.get('/ECommerce/api/recipient/delete?token=' + token + '&id=' + id);
      }

      return {
        addReceiver: addReceiver,
        getArea: getArea,
        getReceiverList: getReceiverList,
        updateReceiver: updateReceiver,
        deleteReceiver: deleteReceiver,
        updateDefault:updateDefault
      }
    }
  ]);
};
