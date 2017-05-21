angular.module('woaijiu.services', [])
.factory('authService', function ($q, $http) {
    var _userInfo = null;
    var _tenantInfo = null;
    function retrieveUserInfo(token) {
      return $http.get("http://120.77.40.156:8080/ECommerce/api/auth/getLoginUser?token=" + token);
    }
    function setUser(user) {
      _userInfo = user;
      var val = (user ? angular.toJson(user) : null);

      if (val) {
        localStorage.userInfo = val;
      } else {
        delete localStorage.userInfo;
      }
    }
    function setTenant(tenant) {
      _tenantInfo = tenant;
      var value = (tenant ? angular.toJson(tenant) : null);
      if (value) {
        localStorage.tenantInfo = value;
      } else {
        delete localStorage.tenantInfo;
      }
    }
    function login(username, password) {
      var defered = $q.defer();
      var data = {"mobile": username,
                  "password": password
                  };
      $http.post('http://120.77.40.156:8080/ECommerce/api/user/login', angular.toJson(data)).success(function (result) {
        if(result.status == 400) {
          defered.reject(result);
        } else if(result.status == 200 && result.msg == 'OK') {
          var token = result.data;
          localStorage.access_token = token;
          retrieveUserInfo(token).success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              var user = res.data.userMsg;
              var tenant = res.data.tenantMsg;
              setUser(user);
              setTenant(tenant);
              var object = {
                'user': user,
                'tenant': tenant
              };
              defered.resolve(object);
            } else {
              defered.reject(res);
            }
          });
        }
      }).error(function (err) {
        defered.reject(err);
      });
      return defered.promise;
    }
    function logout() {
      var defered = $q.defer();
      $http.get('http://120.77.40.156:8080/ECommerce/api/user/logout?token=' + localStorage.access_token).success(function (res) {
        if(res.status == 400) {
          defered.reject(res);
        }else if(res.status == 200 && res.msg == 'OK') {
          defered.resolve(res);
          setUser(null);
          setTenant(null);
          localStorage.clear();
        }
      }).error(function (err) {
        defered.reject(err);
      });
      return defered.promise;
    }
    function register(object) {
      object.level = 1;
      return $http.post('http://120.77.40.156:8080/ECommerce/api/user/register', object);
    }

    return {
      login: login,
      logout: logout,
      register: register,
      setUser: setUser,
      setTenant: setTenant
    }
  })
.factory('productService', function ($http) {
    var token = localStorage.access_token;
    function getProductList(keyword) {
      return $http.get('http://120.77.40.156:8080/ECommerce/api/goods/list?token=' + localStorage.access_token + '&keyWord=' + keyword);
    }
    function getProductById(id) {
      return $http.get('http://120.77.40.156:8080/ECommerce/api/goods/get?id=' + id + '&token=' + token);
    }
    return {
      getProductBykeyWord: getProductList,
      getProductById: getProductById
    };
  })
.factory('productMsgService', function () {
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
        angular.forEach(pro.avatarList, function (li, index) {
          if(index != 0) {
            li = 'http://120.77.40.156\\' + li;
          }
        });
      });
    }

    return {
      setMsg: setMsg,
      getMsg: getMsg,
      getNew: getNew,
      getHot: getHot,
      getSales: getSales
    }
  })
.factory('receiverService', function ($http) {
    var token = localStorage.access_token;
    function addReceiver(data) {
      return $http.post('http://120.77.40.156:8080/ECommerce/api/recipient/create', angular.toJson(data));
    }
    function getArea(id) {
      return $http.get('http://120.77.40.156:8080/ECommerce/api/area/list?id=' + id);
    }
    function getReceiverList() {
      var tenant = angular.fromJson(localStorage.tenantInfo);
      var tenantId = tenant.shopId;
      return $http.get('http://120.77.40.156:8080/ECommerce/api/recipient/list?shopId=' + tenantId + '&token=' + token);
    }
    function updateReceiver(data) {
      return $http.post('http://120.77.40.156:8080/ECommerce/api/recipient/update', angular.toJson(data));
    }
    function updateDefault(data) {
      return $http.post("http://120.77.40.156:8080/ECommerce/api/recipient/updateDef?token=" + token, angular.toJson(data));
    }
    function deleteReceiver(id) {
      return $http.get('http://120.77.40.156:8080/ECommerce/api/recipient/delete?token=' + token + '&id=' + id);
    }
    return {
      addReceiver: addReceiver,
      getArea: getArea,
      getReceiverList: getReceiverList,
      updateReceiver: updateReceiver,
      deleteReceiver: deleteReceiver,
      updateDefault:updateDefault
    }
  })
.factory('receiverMsgService', function () {
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

  })
.factory('orderService', function ($http) {
  var token = localStorage.access_token;
  function createOrder(data) {
    return $http.post('http://120.77.40.156:8080/ECommerce/api/order/create', angular.toJson(data));
  }
  function createOrderByQR(data) {
    return $http.post('http://120.77.40.156:8080/ECommerce/api/order/createByScan', angular.toJson(data));
  }
  function getSingleOrder(id) {
    return $http.get('http://120.77.40.156:8080/ECommerce/api/order/get?token=' + token + '&id=' + id);
  }
  function getAllOrder() {
    var tenantId = angular.fromJson(localStorage.tenantInfo).shopId;
    return $http.get('http://120.77.40.156:8080/ECommerce/api/order/getAll?token=' + token + '&shopId=' + tenantId);
  }
  function updatepayment(data) {
    var id = data.id;
    var payment = data.paymentWay;
    return $http.get('http://120.77.40.156:8080/ECommerce/api/order/pay?token=' + token + '&id=' + id + '&paymentWay=' + payment);
  }
  function cancelOrder(id) {
    return $http.get('http://120.77.40.156:8080/ECommerce/api/order/cancel?token=' + token + '&id=' + id);
  }
  return {
    createOrder: createOrder,
    getSingleOrder: getSingleOrder,
    getAllOrder: getAllOrder,
    updatepayment: updatepayment,
    createOrderByQR: createOrderByQR,
    cancelOrder: cancelOrder
  }
})
.factory('orderMsgService', function() {
  var orderList = [];
  function setMsg(arr) {
    orderList = arr;
  }
  function getMsg() {
    return orderList;
  }
  // function addOrder(item) {
  //   orderList.push(item)
  // }
  function getUndeliveredOrder() {
    var udo = _.filter(orderList, function (item) {
      return item.state == 5;
    });
    return udo;
  }
  function getUnPayedOrder() {
    var upo = _.filter(orderList, function (item) {
      return item.state == 3;
    });
    return upo;
  }
  function getUnReceivedOrder() {
    var uro = _.filter(orderList, function (item) {
      return item.state == 6;
    });
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
})
.factory('logisticsService', function ($http) {
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
    $http.get('http://120.77.40.156:8080/ECommerce/api/logistics/getInfo?id=' + id);
  }
  return {
    getAllLogisticsInfo: getAllLogisticsInfo,
    getLogisticsInfo: getLogisticsInfo
  }
})
.factory('logisticsMsgService', function () {
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
})
// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array
//
//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];
//
//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// })
.factory('systemService', function ($http) {
  function checkUserExist(mobile) {
    return $http.get('http://120.77.40.156:8080/ECommerce/api/user/checkExist?mobile=' + mobile);
  }
  function registerUser(data) {
    return $http.post('http://120.77.40.156:8080/ECommerce/api/user/register', angular.toJson({
      "mobile": data.mobile,
      "password": data.password,
      "email": data.email,
      "tenantName": data.tenantName,
      "tenantAddress": data.tenantAddress,
      "tenantMobile": data.tenantMobile,
      "area": data.area,
      "name": data.name,
      "cardNum": data.cardNum,
      "identify": data.identify,
      "phone": data.phone,
      "salesCode": data.salesCode
    }));
  }
    return {
      checkUserExist: checkUserExist,
      registerUser: registerUser
    };
  })
.factory('contentService', function ($http) {
    function getContentByCode(code) {
      return $http.get('http://120.77.40.156:8080/ECommerce/api/content/get?cat=' + code);
    }
    function getContent() {
      return $http.get('http://120.77.40.156:8080/ECommerce/api/content/list');
    }
    return {
      getContentByCode: getContentByCode,
      getContent: getContent
    }
  })
.factory('contentMsgService', function () {
    var allbanners = [];
    var advertisement = [];
    var shop_banner = [];
    var main_banner = [];
    function getMsg() {
      return allbanners;
    }
    function setMsg(arr) {
      allbanners = arr;
      setAdvertisement();
      setMainBanner();
      setShopBanner();
    }
    function setAdvertisement() {
      advertisement = _.filter(allbanners, function (banner) {
        if(banner.code == 1) {
          return banner;
        }
      });
    }
    function getAdvertisement() {
      return advertisement;
    }
    function setMainBanner() {
      main_banner = _.filter(allbanners, function (banner) {
        if(banner.code == 3) {
          return banner;
        }
      });
    }
    function getMainBanner() {
      return main_banner;
    }
    function getShopBanner() {
      shop_banner = _.filter(allbanners, function (banner) {
        if(banner.code == 2) {
          return banner;
        }
      });
    }
    function setShopBanner() {
      return shop_banner
    }
    return {
      setMsg: setMsg,
      getAdvertisement: getAdvertisement,
      getMainBanner: getMainBanner,
      getShopBanner: getShopBanner
    }
  })
.factory('cartService', function () {
    var cart = angular.fromJson(localStorage.productsInCart) || [];
    var productIds = [];
    var selectedProductsList = [];
    function getCart() {
      return cart;
    }
    function setCart(product) {
      productIds = _.map(cart, 'id');
      if(_.contains(productIds, product.id)) {
        angular.forEach(cart, function (item) {
          if(item.id == product.id) {
            item.num ++
          }
        });
      } else {
        product.num = 1;
        cart.push(product);
      }
      localStorage.productsInCart = JSON.stringify(cart);
    }
    function deleteProduct(product) {
      cart = _.reject(cart, function (item) {
        return item.id == product.id;
      });
      localStorage.productsInCart = JSON.stringify(cart);
    }
    function getSelectedProductsList() {
      return selectedProductsList;
    }
    function setSelectedProductsList(data) {
      selectedProductsList = data;
    }
    return {
      getCart: getCart,
      setCart: setCart,
      deleteProduct: deleteProduct,
      getSelectedProductsList: getSelectedProductsList,
      setSelectedProductsList: setSelectedProductsList
    }

  })
.factory('registerMsgService', function () {
  var reg = {};
  var img = {};
  var area;
  return {
    getMsg: function () {
      return reg;
    },
    getIMG: function () {
      return img;
    },
    getArea: function () {
      return area;
    },
    setArea: function (str) {
      area = str;
    },
    setMsg: function (msg) {
      var msgObjList = msg.reg;
      angular.forEach(msgObjList, function (obj) {
        var type = obj.key;
        if(obj.value.length !== 0 && obj.value) {
          switch (type) {
            case 'userMobile':
              reg.mobile = obj.value;
              break;
            case 'password':
              reg.password = obj.value;
              break;
            case 'userMail':
              reg.email = obj.value;
              break;
            case 'salesCode':
              reg.code = obj.value;
              break;

            case 'tenantName':
              reg.tenantName = obj.value;
              break;
            case 'tenantAddress':
              reg.tenantAddress = obj.value;
              break;
            case 'tenantAreaId':
              reg.area = obj.value.toString();
              break;
            case 'tenantMobile':
              reg.tenantMobile = obj.value;
              break;
            case 'arrivalTime':
              reg.arrivalTime = obj.value.toString();
              break;
            case 'identifyCardIMG':
              img.identifyCardIMG = obj.value;
              var arr = _.map(obj.value, 'url');
              reg.identifyCardIMG = arr.join(';');
              break;

            case 'tenantLicenseNum':
              reg.tenantLicenseNum = obj.value;
              break;
            case 'tenantScope':
              reg.tenantScope = obj.value;
              break;
            case 'tenantValidity':
              reg.tenantValidity = 12;
              break;
            case 'tenantTerm':
              reg.tenantTerm = 11;
              break;
            case 'organizationCode':
              reg.organizationCode = obj.value;
              break;
            case 'tenantType':
              reg.tenantType = obj.value;
              break;
            case 'businessLiscenseIMG':
              img.businessLiscenseIMG = obj.value;
              var arr = _.map(obj.value, 'url');
              reg.businessLiscenseIMG = arr.join(';');
              break;
            case 'tenantIMG':
              img.tenantIMG = obj.value;
              var arr = _.map(obj.value, 'url');
              reg.tenantIMG = arr.join(';');
              break;

            case 'name':
              reg.name = obj.value;
              break;
            case 'cardNum':
              reg.cardNum = obj.value.toString();
              break;
            case 'identity':
              reg.identity = obj.value.toString();
              break;
            case 'phone':
              reg.phone = obj.value;
              break;
            case 'bankAccountType':
              reg.bankAccountType = obj.value.toString();
              break;
            case 'bankCode':
              reg.bankCode = obj.value.toString();
              break;
            case 'bankAccountNum':
              reg.bankAccountNum = obj.value.toString();
              break;
            case 'bankName':
              reg.bankName = obj.value;
              break;
            case 'bankNum':
              reg.bankNum = obj.value.toString();
              break;
            case 'cardIMG':
              img.cardIMG = obj.value;
              var arr = _.map(obj.value, 'url');
              reg.cardIMG = arr.join(';');
              break;
          }
        }
      });
    }
  }
})
.factory('memberService', function ($http) {
  var token = localStorage.access_token;
  var tenantId = angular.fromJson(localStorage.tenantInfo).shopId;
  function getMembersByTenantId() {
    return $http.get('http://120.77.40.156:8080/ECommerce/api/user/getUsers?token=' + token + '&shopId=' + tenantId)
  }
  function updateMember(data) {
    return $http.post('http://120.77.40.156:8080/ECommerce/api/user/update', angular.toJson(data))
  }
  function deleteMember(id) {
    return $http.get('http://120.77.40.156:8080/ECommerce/api/user/delete?token=' + token + '&id=' + id);
  }
  function bindMail(data) {
    return $http.post('http://120.77.40.156:8080/ECommerce/api/user/bindMail?token=' + token, angular.toJson(data));
  }
  return {
    getMembersByTenantId: getMembersByTenantId,
    updateMember: updateMember,
    deleteMember: deleteMember,
    bindMail: bindMail
  }
})
.factory('memberMsgService', function () {
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
})
  .factory('paymentService', function ($http) {
    function payByScan(barCode, orderId) {
      var data = {
        barCode: barCode,
        orderId: orderId
      };
      return $http.get('http://120.77.40.156:8080/ECommerce/api/order/payByScan?orderId=' + orderId + '&barCode=' + barCode);
    }
    return {
      payByScan: payByScan
    }
  })
.factory('areaService', function ($http) {
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
    return $http.get('http://120.77.40.156:8080/ECommerce/api/area/get?id=' + id);
  }
  return {
    getAreaListById: getAreaListById,
    getMsg: getMsg
  }
});
