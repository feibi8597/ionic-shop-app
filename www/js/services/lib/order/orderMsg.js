/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('orderMsgService', [
    function () {
      var orderList = [];
      function setMsg(arr) {
        orderList = arr;
      }
      function getMsg() {
        // getImg(orderList);
        return orderList;
      }
      function getImg(list) {
        angular.forEach(list, function (item) {
          angular.forEach(item.productList, function (p) {
            p.image = p.image.split(',');
          })
        });
      }
      // function addOrder(item) {
      //   orderList.push(item)
      // }
      function getUndeliveredOrder() {
        var udo = _.filter(orderList, function (item) {
          return item.state == 5;
        });
        // getImg(udo);
        return udo;
      }
      function getUnPayedOrder() {
        var upo = _.filter(orderList, function (item) {
          return item.state == 3;
        });
        // getImg(upo);
        return upo;
      }
      function getUnReceivedOrder() {
        var uro = _.filter(orderList, function (item) {
          return item.state == 6;
        });
        // getImg(uro);
        return uro;
      }
      function getProductInOrderNum(list) {
        var num;
        var sum;
        angular.forEach(list, function (item) {
          num = 0;
          sum = 0;
          angular.forEach(item.productList, function (li) {
            num  = num + li.productNum;
            sum = sum + li.productNum * li.productSellPrice;
          });
          item.orderNum = num;
          item.orderSum = sum;
        });
      }
      return {
        getMsg: getMsg,
        setMsg: setMsg,
        // addOrder: addOrder,
        getUndeliveredOrder: getUndeliveredOrder,
        getUnPayedOrder: getUnPayedOrder,
        getUnReceivedOrder: getUnReceivedOrder
      }
    }
  ]);
};
