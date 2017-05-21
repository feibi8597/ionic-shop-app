"use strict";
angular.module('ionic-citypicker.service', ['ionic'])
  .factory('CityPickerService', function ($http) {
  var arr = [
    {name: '北京', id: '1'},
    {name: '天津', id: 19},
    {name: '河北', id: 37},
    {name: '山西', id: 220},
    {name: '内蒙古', id: 351},
    {name: '辽宁', id: 466},
    {name: '吉林', id: 585},
    {name: '黑龙江', id: 655},
    {name: '上海', id: 801},
    {name: '江苏', id: 820},
    {name: '浙江', id: 933},
    {name: '安徽', id: 1046},
    {name: '福建', id: 1168},
    {name: '江西', id: 1263},
    {name: '山东', id: 1375},
    {name: '河南', id: 1532},
    {name: '湖北', id: 1709},
    {name: '湖南', id: 1827},
    {name: '广东', id: 1964},
    {name: '广西', id: 2162},
    {name: '海南', id: 2291},
    {name: '重庆', id: 2323},
    {name: '四川', id: 2367},
    {name: '贵州', id: 2572},
    {name: '云南', id: 2670},
    {name: '西藏', id: 2816},
    {name: '陕西', id: 2898},
    {name: '甘肃', id: 3022},
    {name: '青海', id: 3126},
    {name: '宁夏', id: 3178},
    {name: '新疆', id: 3206},
    {name: '台湾', id: 3325},
    {name: '香港', id: 3716},
    {name: '澳门', id: 3738},
    {name: '钓鱼岛', id: 3749}
    ];
  function getMsg() {
    return arr;
  }
  function getAreaById(id) {
    return $http.get('/ECommerce/api/area/get?id=' + id);
  }
  return {
    getMsg: getMsg,
    getAreaById: getAreaById
  };
})
  .factory('AreaService', function ($http) {
    function getArea(name) {
      return $http.get('/ECommerce/api/area/list?name=' + name);
    }
    return {
      getArea: getArea
    };
  });


