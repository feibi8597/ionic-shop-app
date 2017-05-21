/**
 * Created by toothless on 2017/4/25.
 */
module.exports = function(m){
  m.controller('MsgCtrl', [
    '$timeout', '$state',
    function ($timeout, $state) {
      $timeout(function() {
        $state.go('mainMenu'); // 3秒后关闭弹窗
      }, 3000);
    }
  ]);
};
