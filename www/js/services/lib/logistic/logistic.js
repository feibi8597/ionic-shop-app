/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('logisticsService',[
    '$http', function ($http) {
      function getAllLogisticsInfo(arr) {
        var data = {
          content: arr,
          code: '102',
          cmd:'API_Order_Logistics'
        };
        // $http.post('/portal/workflow/login.wf', data);
        $http({
          url: '/portal/workflow/login.wf',
          method: "POST",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: {
            content : arr,
            code: '102',
            cmd:'API_Order_Logistics'
          }
        });
      }
      function getLogisticsInfo(id) {
        $http.get('/ECommerce/api/logistics/getInfo?id=' + id);
      }
      return {
        getAllLogisticsInfo: getAllLogisticsInfo,
        getLogisticsInfo: getLogisticsInfo
      }
    }
  ]);
};
