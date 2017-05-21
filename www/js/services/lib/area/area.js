/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('areaService', [
    '$http', function ($http) {
      var arr = [
        {name: '北京', id: 3924},
        {name: '天津', id: 3925},
        {name: '河北', id: 36},
        {name: '山西', id: 230},
        {name: '内蒙古自治区', id: 372},
        {name: '辽宁', id: 496},
        {name: '吉林', id: 625},
        {name: '黑龙江', id: 703},
        {name: '上海', id: 3926},
        {name: '江苏', id: 875},
        {name: '浙江', id: 1001},
        {name: '安徽', id: 1114},
        {name: '福建', id: 1252},
        {name: '江西', id: 1356},
        {name: '山东', id: 1479},
        {name: '河南', id: 1651},
        {name: '湖北', id: 1845},
        {name: '湖南', id: 1975},
        {name: '广东', id: 2125},
        {name: '广西壮族自治区', id: 2285},
        {name: '海南', id: 2425},
        {name: '重庆', id: 3927},
        {name: '四川', id: 2498},
        {name: '贵州', id: 2721},
        {name: '云南', id: 2824},
        {name: '西藏自治区', id: 2978},
        {name: '陕西', id: 3063},
        {name: '甘肃', id: 3191},
        {name: '青海', id: 3304},
        {name: '宁夏回族自治区', id: 3358},
        {name: '新疆维吾尔族自治区', id: 3391},
        {name: '台湾', id: 3512},
        {name: '香港特别行政区', id: 3891},
        {name: '澳门特别行政区', id: 3913}
      ];
      function getMsg() {
        return arr;
      }
      function getAreaListById(id) {
        return $http.get('/ECommerce/api/area/get?id=' + id);
      }
      return {
        getAreaListById: getAreaListById,
        getMsg: getMsg
      }
    }
  ]);
};
