/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function (m) {
  m.controller('ContactsCtrl', [
    '$scope', '$state', 'memberMsgService', 'memberService', '$ionicPopup', '$stateParams', '$http', '$ionicModal', 'systemService', '$timeout',
    function ($scope, $state, memberMsgService, memberService, $ionicPopup, $stateParams, $http, $ionicModal, systemService, $timeout) {
      $scope.newMember = {};
      init();
      $scope.data = {};
      function init() {
        $scope.memberList = memberMsgService.getMsg();
        if($stateParams.memberId) {
          $scope.title = '更新员工';
          var member = memberMsgService.getMemberById($stateParams.memberId);
          member[0].mobile = parseInt(member[0].mobile);
          member[0].identity = parseInt(member[0].identity);
          $scope.member = member[0];
          if($scope.member.level == 2) {
            $scope.newMember.finance = true;
          }else {
            $scope.newMember.sales = true;
          }
        } else {
          $scope.title = '添加员工';
          $scope.member = {};
        }
      }
      $scope.delete = function (member) {
        var deletePop = $ionicPopup.show({
          title: '您确定要删除该成员吗？',
          scope: $scope,
          buttons: [
            { text: '取消' },
            {
              text: '<b>确定</b>',
              type: 'button-positive',
              onTap: function(e) {
                memberService.deleteMember(member.id).success(function (res) {
                  if(res.status == 200 && res.msg == 'OK'){
                    $scope.memberList = _.reject($scope.memberList, function (item) {
                      return item.id == member.id;
                    });
                    memberMsgService.setMsg($scope.memberList);
                  }
                });
              }
            },
          ]
        });

      };
      $scope.addMember = function () {
        var data = {
          id: $scope.member.id || null,
          mobile: JSON.stringify($scope.member.mobile),
          identity: JSON.stringify($scope.member.identity),
          level: $scope.member.level,
          name: $scope.member.name,
          shopId: angular.fromJson(localStorage.tenantInfo).shopId
        };

        if(data.id) {
          memberService.updateMember(data).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              memberService.getMembersByTenantId().success(function (res) {
                if(res.status == 200 && res.msg == 'OK') {
                  memberMsgService.setMsg(res.data);
                  $state.go('contactsList');
                }
              });
            }
          });
        } else {
          $http.post('http://120.77.40.156:8080/ECommerce/api/user/register', angular.toJson(data)).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              memberService.getMembersByTenantId().success(function (res) {
                if(res.status == 200 && res.msg == 'OK') {
                  memberMsgService.setMsg(res.data);
                  $state.go('contactsList');
                }
              });
            }
          });
        }

      };
      $scope.validate = function (type, form) {
        switch (type) {
          case 'phone':
            if(form.memberMobile && form.memberMobile.$dirty && form.memberMobile.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '手机格式不正确',
                template:'请检查您填写的手机号信息！'
              });
            }
            if(form.memberMobile && form.memberMobile.$valid){
              isConflictMobile($scope.member.mobile);
            }
            break;
          case 'Id':
            if(form.memberIdentifyID.$dirty && form.memberIdentifyID.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '身份证号码格式不正确',
                template:'请检查您填写的身份证信息！'
              });
            }
            break;
          case 'mail':
            if(form.userMail.$dirty && form.userMail.$error.pattern) {
              var alertPopup = $ionicPopup.alert({
                title: '邮箱格式不正确',
                template:'请检查您填写的邮箱信息！'
              });
            }
            if(form.userMail.$valid) {
            }
            break;
          default:
            break;
        }
      };
      function isConflictMobile(mobile) {
        systemService.checkUserExist(mobile).success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            $scope.conflictEmail = !!res.data;
          }else {

          }
          if($scope.conflictEmail) {
            var conflictPopup = $ionicPopup.alert({
              title: '用户已存在',
              template:"不可以添加到该门店！"
            });
          }
          $timeout(function() {
            conflictPopup.hide(); // 3秒后关闭弹窗
          }, 3000);
        })
      }
      $ionicModal.fromTemplateUrl('templates/modal/select_role_modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: true,
        hardwareBackButtonClose: true
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      $scope.$on('modal.hidden', function() {
      });
      $scope.$on('modal.removed', function() {
      });
      $scope.selectRole = function (u) {
        if(u.sales) {
          $scope.member.level = 3;
          $scope.member.role = '销售';
          $scope.closeModal();
        } else if(u.finance) {
          $scope.member.level = 2;
          $scope.member.role = '财务';
          $scope.closeModal();
        }
      };
      $scope.bindMail = function () {
        var id = angular.fromJson(localStorage.userInfo).id;
        var data = {
          email: $scope.data.userMail,
          id: id
        };
        memberService.bindMail(data).success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            var user = angular.fromJson(localStorage.userInfo);
            user.email = $scope.data.userMail;
            localStorage.userInfo = angular.toJson(user);
            $state.go('selfInfo');
          }
        });
      };
    }
  ]);
};
