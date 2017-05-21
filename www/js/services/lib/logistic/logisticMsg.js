/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('logisticsMsgService', function () {
    var logisticsList = [];
    function getMsg() {
      return logisticsList;
    }
    function setMsg(arr) {
      logisticsList = arr;
    }

    return {
      getMsg: getMsg,
      setMsg: setMsg
    }
  });
};
