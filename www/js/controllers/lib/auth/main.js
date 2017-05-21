/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function(m){
  m.controller('MainCtrl', [
    '$scope', 'productService', 'receiverService', 'receiverMsgService', 'contentMsgService', 'logisticsService', 'logisticsMsgService', 'orderService',
    'orderMsgService', 'productMsgService', '$ionicLoading', '$ionicHistory',
    function ($scope, productService, receiverService, receiverMsgService, contentMsgService, logisticsService, logisticsMsgService, orderService, orderMsgService, productMsgService, $ionicLoading, $ionicHistory) {
      $ionicHistory.clearHistory();
      $scope.newproductList = new Array();
      $scope.banners = new Array();
      $scope.doRefresh = function() {
        getProducts();
      };
      $scope.logisticsList = [
        {'img': 'img/max.png',
          'add': '[上海市]上海市浦东新区高桥营业部派件员:',
          'msg': '15896547821正在为您派送',
          "time": '2015-11-01'
        },
        {'img': 'img/max.png',
          'add': '[上海市]上海市浦东新区高桥营业部派件员:',
          'msg': '15896547821正在为您派送',
          "time": '2015-11-02'
        },
        {'img': 'img/max.png',
          'add': '[上海市]上海市浦东新区高桥营业部派件员:',
          'msg': '15896547821正在为您派送',
          "time": '2015-11-03'
        },
        {'img': 'img/max.png',
          'add': '[上海市]上海市浦东新区高桥营业部派件员:',
          'msg': '15896547821正在为您派送',
          "time": '2015-11-04'
        }
      ];

      init();
      function getProducts() {
        productService.getProductBykeyWord('').success(function (res) {
          if(res.status === 200 && res.msg == 'OK') {
            productMsgService.setMsg(res.data);
            $scope.productList_hot = productMsgService.getHot();
            getReceivers();
          }
        });
      }

      function getOrders() {
        orderService.getAllOrder().success(function (res) {
          if(res.msg == 'OK' && res.status == 200) {
            orderMsgService.setMsg(res.data);
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
            var urlist = orderMsgService.getUnReceivedOrder();
            var orderIds = _.map(res.data, 'orderId');
          } else {
            $ionicLoading.hide();
            alert('error');
          }
        }).error(function (res) {
          $ionicLoading.hide();
        });
      }
      function getReceivers() {
        receiverService.getReceiverList().success(function (res) {
          if(res.status == 200 && res.msg == 'OK') {
            receiverMsgService.setMsg(res.data);
            getOrders();
          }
        });
      }
      function getLogistics() {
        logisticsService.getAllLogisticsInfo('O-2017-00-01-001').success(function (res) {

        });
      }
      function initCarousel() {
        var speed=50;
        var timer=null;
        var demo=document.getElementsByClassName("logistics-wrapper")[0];
        var demo1=document.getElementById("timeline-01");
        function moveTop()
        {
          if(demo1.offsetHeight-demo.scrollTop<=0)
          {
            demo.scrollTop=0;
          }
          else
          {
            demo.scrollTop++;
          }
        }
        timer=setInterval(moveTop,speed);
        demo.onmouseover=function(){clearInterval(timer);}
        demo.onmouseout=function(){timer=setInterval(moveTop,speed);}
      }

      function getMainBanners() {
        var temp = _.map(contentMsgService.getMainBanner(), 'pic');
        $scope.banners = temp[0].split(",");
        angular.forEach($scope.banners, function (item) {
          item.replace(/\\/g,"/");
        });
      }

      function init() {
        $ionicLoading.show({
          template: '加载中...'
        });
        getProducts();
        getMainBanners();
        initCarousel();
      }
    }
  ]);
};
