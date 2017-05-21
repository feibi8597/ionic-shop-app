/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('memberMsgService', function () {
    var membersList = [];
    function getMsg() {
      return membersList;
    }
    function setMsg(arr) {
      membersList = arr;
      setRole(membersList);
    }
    function setRole(arr) {
      angular.forEach(arr, function (item) {
        if(item.level == 1) {
          item.role = '老板';
        } else if(item.level == 2) {
          item.role = '财务';
        } else if(item.level == 3) {
          item.role = '销售';
        }
      });
    }
    function getMemberById(id) {
      var member = _.filter(membersList, function (member) {
        return member.id == id;
      });
      return member;
    }
    return {
      getMsg: getMsg,
      setMsg: setMsg,
      getMemberById: getMemberById
    }
  });
};
