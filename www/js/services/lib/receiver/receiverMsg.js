/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('receiverMsgService', [
    function () {
      var receiverList = [];
      var receiverSelected;

      function getMsg() {
        return receiverList;
      }

      function setMsg(arr) {
        receiverList = arr;
      }

      function getReceiverById(id) {
        var receiver = _.filter(receiverList, function (item) {
          return item.id == id;
        });
        return receiver;
      }

      function addReceiver(receiver) {
        receiverList.push(receiver);
      }

      function getDefaultReceiver() {
        var receiver = _.find(receiverList, function (item) {
          return item.def == true;
        });
        if(receiverSelected) {
          receiver = receiverSelected;
        } else if(!receiver) {
          receiver = receiverList[0];
        }
        return receiver;
      }

      function setSelectedReceiver(receiver) {
        receiverSelected = receiver;
      }

      function getSelectedReceiver() {
        return receiverSelected;
      }

      return {
        getMsg: getMsg,
        setMsg: setMsg,
        getReceiverById: getReceiverById,
        addReceiver: addReceiver,
        getDefaultReceiver: getDefaultReceiver,
        setSelectedReceiver: setSelectedReceiver,
        getSelectedReceiver: getSelectedReceiver
      }
    }
  ]);
};
