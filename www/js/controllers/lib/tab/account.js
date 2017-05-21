/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function(m){
  m.controller('AccountCtrl',[
    '$scope', 'authService', '$ionicPopup', '$state', 'memberService', 'memberMsgService',
    function ($scope, authService, $ionicPopup, $state, memberService, memberMsgService) {
      init();
      $scope.tenantLevel = {
        first: '一级经销商',
        second: '二级经销商',
        third: '三级经销商'
      };
      function init() {
        $scope.user = angular.fromJson(localStorage.userInfo);
        $scope.tenant = angular.fromJson(localStorage.tenantInfo);
        getArea();
        getMembers();
      }
      function getArea() {
        //test
        var area = $scope.tenant.tenantArea || '上海市-浦东新区-川沙镇';
        //test
        var arr = area.split('-');
        $scope.province = arr[0];
        $scope.city = arr[1];
        $scope.district = arr[2];
      }
      function getMembers() {
        memberService.getMembersByTenantId().success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            memberMsgService.setMsg(res.data);
          }
        });
      }
      $scope.logout = function () {
        authService.logout().then(function (data) {
          localStorage.haslogin = 0;
          $state.go('signin')
        }, function (error) {
          localStorage.haslogin = 1;
          var alertPopup = $ionicPopup.alert({
            title: '登出失败',
            template:'请联系技术支持人员！'
          });
        });
      };
    }
  ]);
};
