/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function(m) {
  m.factory('productMsgService',[
    function () {
      var productList = [];

      function setMsg(array) {
        productList = array;
        getImg();
      }

      function getMsg() {
        return productList;
      }

      function getNew() {
        var list = [];
        angular.forEach(productList, function (item) {
          if(item.saleCats) {
            var strs = item.saleCats.split(',');
            if(_.contains(strs, '3')) {
              list.push(item);
            }
          }
        });
        return list;
      }

      function getHot() {
        var list = [];
        angular.forEach(productList, function (item) {
          if(item.saleCats) {
            var strs = item.saleCats.split(',');
            if(_.contains(strs, '1')) {
              list.push(item);
            }
          }
        });
        return list;
      }

      function getSales() {
        var list = [];
        angular.forEach(productList, function (item) {
          if(item.saleCats) {
            var strs = item.saleCats.split(',');
            if(_.contains(strs, '2')) {
              list.push(item);
            }
          }
        });
        return list;
      }

      function getImg() {
        angular.forEach(productList, function (pro) {
          pro.avatarList = new Array();
          pro.avatarList = pro.image.split(',');
        });
      }

      return {
        setMsg: setMsg,
        getMsg: getMsg,
        getNew: getNew,
        getHot: getHot,
        getSales: getSales
      }
    }
  ]);
};
