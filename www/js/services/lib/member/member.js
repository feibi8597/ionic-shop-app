/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('memberService', [
    '$http', function ($http) {
      var token = localStorage.access_token;
      var tenantId = angular.fromJson(localStorage.tenantInfo).shopId;
      function getMembersByTenantId() {
        return $http.get('/ECommerce/api/user/getUsers?token=' + token + '&shopId=' + tenantId)
      }
      function updateMember(data) {
        return $http.post('/ECommerce/api/user/update', angular.toJson(data))
      }
      function deleteMember(id) {
        return $http.get('/ECommerce/api/user/delete?token=' + token + '&id=' + id);
      }
      function bindMail(data) {
        return $http.post('/ECommerce/api/user/bindMail?token=' + token, angular.toJson(data));
      }
      return {
        getMembersByTenantId: getMembersByTenantId,
        updateMember: updateMember,
        deleteMember: deleteMember,
        bindMail: bindMail
      }
    }
  ]);
};
