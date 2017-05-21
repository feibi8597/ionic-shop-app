/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function (m) {
  m.controller('SignInCtrl', [
    '$scope', '$state', 'authService', '$ionicLoading', '$ionicPopup',
    function ($scope, $state, authService, $ionicLoading, $ionicPopup) {
      $scope.data = {};
      function getOrders() {

      }
      $scope.login = function () {
        $ionicLoading.show({
          template: '登录中...'
        });
        authService.login($scope.data.username, $scope.data.password).then(function (data) {
          localStorage.haslogin = 1;

          $ionicLoading.hide();
          $state.go('mainMenu');
        },function(error) {
          $ionicLoading.hide();
          localStorage.haslogin = 0;
          var alertPopup = $ionicPopup.alert({
            title: '登录失败',
            template:'请检查您填写的登录信息！'
          });
        });
      };
    }
  ]);
};
