angular.module('woaijiu.controllers', ['ngCordova', 'ionic-datepicker'])
// .controller('adCtrl', function ($scope, $state, contentService, contentMsgService) {
//   $scope.skip = function () {
//     if(localStorage.haslogin != 1) {
//       $state.go("signin");
//     } else {
//       $state.go('mainMenu');
//     }
//     clearInterval(interval);
//   };
//   var interval = window.setInterval(run, 1000);
//   $scope.time = 3;
//   init();
//   function run(){
//     if($scope.time == 0){
//       $scope.skip();
//       return false;
//     }
//     $scope.time = $scope.time * 1 - 1;
//   };
//   function init() {
//     getContent();
//   }
//   function getContent() {
//     contentService.getContent().success(function (res) {
//       if(res.msg == 'OK' && res.status == 200) {
//         contentMsgService.setMsg(res.data);
//         $scope.ads = contentMsgService.getAdvertisement();
//       }
//     });
//   }
// })
// .controller('SignInCtrl', function($scope, $state, authService, $ionicLoading, $ionicPopup) {
//
//     $scope.data = {};
//     function getOrders() {
//
//     }
//     $scope.login = function () {
//       $ionicLoading.show({
//         template: '登录中...'
//       });
//       authService.login($scope.data.username, $scope.data.password).then(function (data) {
//         localStorage.haslogin = 1;
//
//         $ionicLoading.hide();
//         $state.go('mainMenu');
//       },function(error) {
//         $ionicLoading.hide();
//         localStorage.haslogin = 0;
//         var alertPopup = $ionicPopup.alert({
//           title: '登录失败',
//           template:'请检查您填写的登录信息！'
//         });
//       });
//     };
//   })
// .controller('MainCtrl', function ($scope, productService, receiverService, receiverMsgService, contentService, logisticsService, logisticsMsgService, orderService, orderMsgService, productMsgService, $ionicLoading, $ionicHistory) {
//     $ionicHistory.clearHistory();
//     $scope.newproductList = new Array();
//     $scope.banners = new Array();
//     $scope.doRefresh = function() {
//       getProducts();
//     };
//     init();
//     function getProducts() {
//       productService.getProductBykeyWord('').success(function (res) {
//         if(res.status === 200 && res.msg == 'OK') {
//           // $ionicLoading.hide();
//           productMsgService.setMsg(res.data);
//           $scope.newproductList = productMsgService.getNew();
//           getReceivers();
//
//         }
//       });
//     }
//     function getOrders() {
//       orderService.getAllOrder().success(function (res) {
//         if(res.msg == 'OK' && res.status == 200) {
//           orderMsgService.setMsg(res.data);
//           $ionicLoading.hide();
//           $scope.$broadcast('scroll.refreshComplete');
//           var urlist = orderMsgService.getUnReceivedOrder();
//           var orderIds = _.map(res.data, 'orderId');
//         } else {
//           $ionicLoading.hide();
//           alert('error');
//         }
//       }).error(function (res) {
//         $ionicLoading.hide();
//       });
//     }
//     function getReceivers() {
//       receiverService.getReceiverList().success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           receiverMsgService.setMsg(res.data);
//           getOrders();
//         }
//       });
//     }
//     function getLogistics() {
//       logisticsService.getAllLogisticsInfo('O-2017-00-01-001').success(function (res) {
//
//       });
//     }
//     function getContent() {
//       contentService.getContentByCode(2).success(function (res) {
//         if(res.msg == 'OK' && res.status == 200) {
//           $scope.banners = res.data;
//         }
//       });
//     }
//     function init() {
//         $ionicLoading.show({
//           template: '加载中...'
//         });
//         getProducts();
//         // getOrders();
//     }
//
//   })
// .controller('AccountCtrl', function ($scope, authService, $ionicPopup, $state, memberService, memberMsgService) {
//     init();
//     $scope.tenantLevel = {
//       first: '一级经销商',
//       second: '二级经销商',
//       third: '三级经销商'
//     };
//     function init() {
//       $scope.user = angular.fromJson(localStorage.userInfo);
//       $scope.tenant = angular.fromJson(localStorage.tenantInfo);
//       getArea();
//       getMembers();
//     }
//     function getArea() {
//       //test
//       var area = $scope.tenant.tenantArea || '上海市-浦东新区-川沙镇';
//       //test
//       var arr = area.split('-');
//       $scope.province = arr[0];
//       $scope.city = arr[1];
//       $scope.district = arr[2];
//     }
//     function getMembers() {
//       memberService.getMembersByTenantId().success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           memberMsgService.setMsg(res.data);
//         }
//       });
//     }
//     $scope.logout = function () {
//      authService.logout().then(function (data) {
//        localStorage.haslogin = 0;
//        $state.go('signin')
//      }, function (error) {
//        localStorage.haslogin = 1;
//        var alertPopup = $ionicPopup.alert({
//          title: '登出失败',
//          template:'请联系技术支持人员！'
//        });
//      });
//     };
//   })
// .controller('WebsitesCtrl', function($scope, $ionicLoading, $state, productService, contentService, productMsgService, $ionicPopover, $stateParams) {
//     init();
//   $scope.doRefresh = function() {
//     getProducts();
//   };
//
//   function getProducts() {
//     productService.getProductBykeyWord('').success(function (res) {
//       if(res.status === 200 && res.msg == 'OK') {
//         // $ionicLoading.hide();
//         productMsgService.setMsg(res.data);
//         $scope.$broadcast('scroll.refreshComplete');
//         init();
//         // $scope.newproductList = productMsgService.getNew();
//         // getReceivers();
//
//       }
//     });
//   }
//
//   $scope.popover = $ionicPopover.fromTemplateUrl('templates/modal/search_popover.html', {
//       scope: $scope
//     });
//
//     $ionicPopover.fromTemplateUrl('templates/modal/search_popover.html', {
//       scope: $scope
//     }).then(function(popover) {
//       $scope.popover = popover;
//     });
//
//     $scope.openSearchPop = function ($event) {
//       $scope.popover.show($event);
//     };
//
//     function init() {
//       var cat = $stateParams.cat;
//       $scope.newproductList = productMsgService.getNew();
//       $scope.bestproductList = productMsgService.getHot();
//       $scope.salesproductList = productMsgService.getSales();
//       if(cat == 'new') {
//         $scope.isNew = true;
//         $scope.isSales = false;
//       } else if(cat == 'sales') {
//         $scope.isNew = false;
//         $scope.isSales = true;
//       } else {
//         contentService.getContentByCode(2).success(function (res) {
//           if(res.msg == 'OK' && res.status == 200) {
//             $scope.banners = res.data;
//           }
//         });
//       }
//     }
// })
// .controller('ChatsCtrl', function($scope, Chats, $ionicActionSheet, $timeout, cartService, $ionicPopup, $state) {
//   var allSelected = false;
//   init();
//   function init() {
//     $scope.productList = [];
//     $scope.productSelectedNum = 0;
//     $scope.productSum = 0;
//     $scope.productsInCart = cartService.getCart();
//   }
//   $scope.selectedProductAll = function () {
//     allSelected = !allSelected;
//     $scope.productSelectedNum = 0;
//     $scope.productSum = 0;
//     angular.forEach($scope.productsInCart,function (product) {
//       product.selected = allSelected;
//       if(product.selected) {
//         $scope.productSelectedNum ++;
//         $scope.productSum = $scope.productSum + product.sellPrice * product.num;
//       }
//     });
//     if(allSelected) {
//       $scope.productList = angular.copy($scope.productsInCart);
//     } else {
//       $scope.productList = [];
//     }
//     $scope.selectedAll = allSelected;
//   };
//   $scope.deleteProduct = function (product) {
//     var deletePop = $ionicPopup.show({
//       title: '您确定要删除该商品吗？',
//       scope: $scope,
//       buttons: [
//         { text: '取消' },
//         {
//           text: '<b>确定</b>',
//           type: 'button-positive',
//           onTap: function(e) {
//             cartService.deleteProduct(product);
//             $scope.productsInCart = _.reject($scope.productsInCart, function (item) {
//               return item.id == product.id;
//             });
//           }
//         },
//       ]
//     });
//   };
//   $scope.minus = function (product) {
//     if(product.num == 1) {
//       var myPopup = $ionicPopup.show({
//         title: '您确定要删除该商品吗？',
//         scope: $scope,
//         buttons: [
//           { text: '取消' },
//           {
//             text: '<b>确定</b>',
//             type: 'button-positive',
//             onTap: function(e) {
//               cartService.deleteProduct(product);
//               if(allSelected){
//                 $scope.productSum = $scope.productSum - product.sellPrice;
//                 $scope.productSelectedNum --;
//               }
//               $scope.productsInCart = _.reject($scope.productsInCart, function (item) {
//                 return item.id == product.id;
//               });
//             }
//           },
//         ]
//       });
//     } else {
//       product.num --;
//       if(allSelected) {
//         $scope.productSum = $scope.productSum - product.sellPrice;
//       }
//     }
//   };
//   $scope.plus = function (product) {
//     if(product.num < product.inventory) {
//       product.num ++;
//       if(allSelected){
//         $scope.productSum = $scope.productSum + product.sellPrice;
//         $scope.productSelectedNum ++;
//       }
//     } else {
//       var plusPopup = $ionicPopup.show({
//         title: '商品数量已经超出商品库存'
//       });
//       $timeout(function() {
//         plusPopup.close();
//       }, 2000);
//     }
//   };
//   $scope.productSelected = function (product) {
//     $scope.productSelectedNum = 0;
//     $scope.productSum = 0;
//     if(product.selected) {
//       $scope.productList.push(product);
//       if($scope.productList.length == $scope.productsInCart.length) {
//         // allSelected = true;
//         $scope.selectedAll = true;
//       }
//     } else {
//       $scope.productList = _.reject($scope.productList, function (prod) {
//         return prod.id == product.id;
//       });
//       // allSelected = false;
//       $scope.selectedAll = false;
//     }
//     angular.forEach($scope.productsInCart, function (p) {
//       if (p.selected) {
//         $scope.productSelectedNum++;
//         $scope.productSum = $scope.productSum + p.sellPrice * p.num;
//       }
//     });
//   };
//   $scope.settleAccounts = function () {
//     if($scope.productList.length == 0) {
//       var alertPopup = $ionicPopup.show({
//         title: '请选择要结算的商品！'
//       });
//       $timeout(function() {
//         alertPopup.close();
//       }, 3000);
//     }else{
//       cartService.setSelectedProductsList($scope.productList);
//       $state.go('purchase');
//     }
//   };
//
//   // $scope.openPop = function (product) {
//   //   var changeNum = $ionicPopup.show({
//   //     title: '修改购买数量',
//   //     templateUrl: 'templates/modal/change_num_popup.html',
//   //     scope: $scope,
//   //     buttons: [
//   //       { text: '取消' },
//   //       {
//   //         text: '<b>确定</b>',
//   //         type: 'button-positive',
//   //         onTap: function(e) {
//   //           cartService.deleteProduct(product);
//   //           $scope.productsInCart = _.reject($scope.productsInCart, function (item) {
//   //             return item.id == product.id;
//   //           });
//   //         }
//   //       },
//   //     ]
//   //   });
//   // };
//   // $scope.changeNum = function (num) {
//   //
//   // };
// })
// .controller('confirmOrderCtrl', function ($scope, cartService, $state, orderService, receiverMsgService, $ionicPopup, $timeout, orderMsgService, $stateParams, $ionicModal) {
//   $scope.productsSum = 0;
//   var type = $stateParams.type;
//   var orderId;
//   $scope.first = true;
//   $scope.second = false;
//   $ionicModal.fromTemplateUrl('templates/modal/select_payway_modal.html', {
//     scope: $scope,
//     animation: 'slide-in-up',
//     backdropClickToClose: true,
//     hardwareBackButtonClose: true
//   }).then(function(modal) {
//     $scope.payModal = modal;
//   });
//   $scope.closeModal = function() {
//     $scope.payModal.hide();
//     $state.go('orederdetail', { orderId: orderId });
//   };
//   $scope.return = function () {
//     $scope.first = true;
//     $scope.second = false;
//   };
//   init();
//   function init() {
//       $scope.productList = cartService.getSelectedProductsList();
//       $scope.receiver = receiverMsgService.getDefaultReceiver();
//       angular.forEach($scope.productList, function (item) {
//         $scope.productsSum = $scope.productsSum + item.sellPrice * item.num;
//       });
//     }
//   $scope.minus = function (product) {
//     if(product.num == 1) {
//       alert('不能在减少了哦！')
//     } else {
//       product.num --;
//     }
//   };
//   $scope.plus = function (product) {
//     if(product.num < product.inventory) {
//       product.num ++;
//     } else {
//       var plusPopup = $ionicPopup.show({
//         title: '商品数量已经超出商品库存'
//       });
//       $timeout(function() {
//         plusPopup.close();
//       }, 2000);
//     }
//   };
//   $scope.createOrder = function () {
//     if($scope.receiver) {
//       var data = {
//         recipientId: $scope.receiver.id,
//         shopId: angular.fromJson(localStorage.tenantInfo).shopId
//       };
//       var productL = [];
//       angular.forEach($scope.productList, function (prod) {
//         var temp = {'productid': prod.id, 'amount': prod.num};
//         productL.push(temp);
//       });
//       data.items = productL;
//       orderService.createOrder(data).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           orderId = res.data;
//           angular.forEach($scope.productList, function (prod) {
//             cartService.deleteProduct(prod);
//           });
//           orderService.getAllOrder().success(function (res) {
//             if(res.status == 200 && res.msg == 'OK') {
//               orderMsgService.setMsg(res.data);
//             }
//           });
//           $scope.payModal.show();
//           // $timeout(function () {
//           //   $state.go('tab.order');
//           // }, 2000);
//         }
//       });
//     }else {
//       var alertPopup = $ionicPopup.show({
//         title: '请先填写收货人地址'
//       });
//       $timeout(function() {
//         plusPopup.close();
//       }, 2000);
//     }
//     };
//   $scope.routeURL = function () {
//     if($scope.receiver) {
//       $state.go('addressSelected');
//     } else {
//       $state.go('addAddress');
//     }
//   };
//   $scope.$on('$destroy', function() {
//     $scope.payModal.remove();
//   });
//   $scope.$on('modal.hidden', function() {
//   });
//   $scope.$on('modal.removed', function() {
//   });
//   $scope.checkPayway = function (data) {
//     var paymentWay;
//     if(data.alipay) {
//       paymentWay = '1';
//     } else if(data.weixin) {
//       paymentWay = '2';
//     } else if(data.COD) {
//       paymentWay = '3';
//     } else if(data.deposit) {
//       paymentWay = '4';
//     }
//     var data = {
//       id: orderId,
//       paymentWay: paymentWay
//     };
//     orderService.updatepayment(data).success(function (res) {
//       if(res.status == 200 && res.msg == 'OK') {
//         if(paymentWay == '4') {
//           $scope.second = true;
//           $scope.first = false;
//           $scope.deposit = res.data;
//         } else {
//           $state.go('orederdetail', { orderId: orderId });
//         }
//       }
//     });
//   };
//   $scope.confirmDeposit = function () {
//     $state.go('orederdetail', { orderId: orderId });
//   };
// })
// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })
// .controller('RegisterCtrl', function ($filter, $scope, $state, $ionicPopup, $ionicPlatform, $ionicModal, $cordovaCamera, $timeout, systemService, authService, registerMsgService, $ionicPopover, $cordovaFileTransfer, areaService, $ionicTabsDelegate, ionicDatePicker, $ionicLoading) {
//   var regMsg = registerMsgService.getMsg();
//   var imgMsg = registerMsgService.getIMG();
//
//   $scope.data = {
//     reg: {
//       userMobile: {value: regMsg.mobile || '', key: 'userMobile'},
//       userMail: {value: regMsg.email || '', key: 'userMail'},
//       salesCode: {value: regMsg.code || '', key: 'salesCode'},
//       password: {value: regMsg.password || '', key: 'password'},
//
//       tenantName: {value: regMsg.tenantName || '', key: 'tenantName'},
//       tenantAreaId: {value: regMsg.area || '', key: 'tenantAreaId'},
//       tenantAddress: {value: regMsg.tenantAddress || '', key: 'tenantAddress'},
//       tenantMobile: {value: regMsg.tenantMobile || '', key: 'tenantMobile'},
//       arrivalTime: {value: regMsg.arrivalTime || '', key: 'arrivalTime'},
//       identifyCardIMG: {value: imgMsg.identifyCardIMG || [], key: 'identifyCardIMG'},
//
//       tenantLicenseNum: {value: regMsg.tenantLicenseNum || '', key: 'tenantLicenseNum'},
//       tenantScope: {value: regMsg.tenantScope || '', key: 'tenantScope'},
//       tenantValidity: {value: regMsg.tenantValidity || '', key: 'tenantValidity'},
//       tenantTerm: {value:regMsg.tenantTerm || '',key:'tenantTerm'},
//       organizationCode: {value: regMsg.organizationCode || '', key: 'organizationCode'},
//       tenantType: {value: regMsg.tenantType || '', key: 'tenantType'},
//       businessLiscenseIMG: {value: imgMsg.businessLiscenseIMG || new Array(), key: 'businessLiscenseIMG'},
//       tenantIMG: {value: imgMsg.tenantIMG || new Array(), key: 'tenantIMG'},
//
//       realName: {value: regMsg.name || '', key: 'name'},
//       identification: {value: regMsg.identify || '', key: 'identify'},
//       cardNum: {value: regMsg.cardNum || '', key: 'cardNum'},
//       cardPhone: {value: regMsg.phone || '', key: 'phone'},
//       bankAccountType: {value: regMsg.bankAccountType || '',key: 'bankAccountType'},
//       bankCode: {value: regMsg.bankCode || '', key: 'bankCode'},
//       bankAccountNum: {value: regMsg.bankAccountNum || '', key: 'bankAccountNum'},
//       bankName: {value: regMsg.bankName || '', key: 'bankName'},
//       bankNum: {value: regMsg.bankNum || '', key: 'bankNum'},
//       cardIMG: {value: imgMsg.cardIMG || new Array(), key: 'cardIMG'}
//     },
//     nextdayArrival: true,
//     todayArrival: false,
//     private: true,
//     public: false,
//   };
//   $scope.startTime;
//   $scope.endTime;
//   $scope.licenseList = [];
//   $scope.nameList = [];
//   $scope.citySelected = {};
//   $scope.districtSelected = {};
//   $scope.provinceSelected = {};
//   $scope.agree = true;
//   $scope.hidden = true;
//   $scope.isLimit = true;
//   $scope.isLicense = false;
//   $scope.provinceList = areaService.getMsg();
//   $scope.tenantArea = registerMsgService.getArea();
//
//   var datename;
//   var imgIdentify = {};
//   var upload_options = {};
//   var server_url = 'http://120.77.40.156:8080/ECommerce/api/pic/upload';
//   upload_options.chunkedMode = false;
//   upload_options.fileKey = 'uploadFile';
//   var weeksList = ["日", "一", "二", "三", "四", "五", "六"];
//   var monthsList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
//   var num = 1;
//
//   $ionicPopover.fromTemplateUrl('templates/modal/protocol_popover.html', {scope: $scope}).then(function (popover) {
//     $scope.protocol_popover = popover;
//   });
//
//   $ionicPopover.fromTemplateUrl('templates/modal/existed_user.html', { scope: $scope}).then(function (popover) {
//     $scope.conflict_popover = popover;
//   });
//
//   $ionicModal.fromTemplateUrl('templates/modal/photo_edit_modal.html',{
//     scope:$scope,
//   }).then(function(modal){
//     $scope.photo_edit_modal = modal;
//   });
//
//   $ionicModal.fromTemplateUrl('templates/modal/select_area_modal.html', {
//     scope: $scope,
//     animation: 'slide-in-up',
//     backdropClickToClose: true,
//     hardwareBackButtonClose: true
//   }).then(function(modal) {
//     $scope.citymodal = modal;
//   });
//
//   $ionicModal.fromTemplateUrl('templates/modal/select_action.html', {
//     scope: $scope,
//     animation: 'slide-in-up',
//     backdropClickToClose: true,
//     hardwareBackButtonClose: true
//   }).then(function (modal) {
//     $scope.actionModal = modal;
//   });
//
//   function init() {
//     $scope.data.nextdayArrival = $scope.data.reg.arrivalTime.value ? ($scope.data.reg.arrivalTime.value == 2 ? true : false) : true;
//     $scope.data.todayArrival =  $scope.data.reg.arrivalTime.value ? ($scope.data.reg.arrivalTime.value == 1 ? true : false) : false;
//     $scope.data.private = $scope.data.reg.bankAccountType.value ? ($scope.data.reg.bankAccountType.value == 2 ? true : false) : true;
//     $scope.data.private = $scope.data.reg.bankAccountType.value ? ($scope.data.reg.bankAccountType.value == 1 ? true : false) : false;
//     angular.forEach(imgMsg.identifyCardIMG, function (item) {
//       switch (item.name) {
//         case 'front':
//           $scope.frontUserphoto = item.url;
//           break;
//         case 'oppsite':
//           $scope.oppsiteUserphoto = item.url;
//           break;
//         case 'hand':
//           $scope.handUserphoto = item.url;
//           break;
//       }
//     });
//     $scope.licenseList = angular.copy(imgMsg.businessLiscenseIMG);
//     angular.forEach(imgMsg.tenantIMG, function (item) {
//       switch (item.name) {
//         case 'door':
//           $scope.doorphoto = item.url;
//           break;
//         case 'counter':
//           $scope.counterphoto = item.url;
//           break;
//         case 'store':
//           $scope.storephoto = item.url;
//           break;
//         case 'agreements':
//           $scope.agreementsphoto = item.url;
//           break;
//       }
//     });
//     $scope.cardphoto = angular.copy(imgMsg.cardIMG[0].url);
//   }
//
//   $scope.openMore = function () {
//     $scope.actionModal.show();
//   };
//
//   function datePickerCallbacks(val) {
//     if(datename == 'tenantTermStart') {
//       $scope.startTime = $filter('date')(val,'yyyy-MM-dd');
//     }else if(datename == 'tenantTermEnd'){
//       $scope.endTime = $filter('date')(val,'yyyy-MM-dd');;
//     }else if(datename == 'tenantValidity') {
//       $scope.data.reg.tenantValidity.value = $filter('date')(val,'yyyy-MM-dd');
//     }
//     if($scope.startTime && $scope.endTime) {
//       $scope.data.reg.tenantTerm.value = $scope.startTime + '~' + $scope.endTime;
//     }
//   }
//
//   function isConflictMobile(mobile) {
//     systemService.checkUserExist(mobile).success(function (res) {
//       if(res.status == 200 && res.msg == 'OK') {
//         $scope.conflictEmail = !!res.data;
//       }else {
//
//       }
//       if($scope.conflictEmail) {
//         // $scope.conflict_popover.show();
//         var conflictPopup = $ionicPopup.show({
//           title: '用户已存在',
//           template:"<div style='text-align:center;'>您可以直接<a ui-sref='signin'>登录</a>！</div>"
//         });
//         $timeout(function() {
//           conflictPopup.close();
//         }, 3000);
//       }
//     });
//   }
//
//   $scope.selectArea = function (object, type) {
//     if(type === 'province') {
//       $scope.citySelected.name = '请选择';
//       $scope.provinceSelected = object;
//       $ionicTabsDelegate.select(1);
//       areaService.getAreaListById(object.id).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           $scope.cityList = res.data;
//         }
//       });
//     } else if(type === 'city') {
//       $scope.districtSelected.name = '请选择';
//       $scope.citySelected = object;
//       $ionicTabsDelegate.select(2);
//       areaService.getAreaListById(object.id).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           $scope.districtList = res.data;
//         }
//       });
//     } else if(type === 'district') {
//       $scope.districtSelected = object;
//       $scope.tenantArea = $scope.provinceSelected.name + '-' + $scope.citySelected.name + '-' + $scope.districtSelected.name;
//       registerMsgService.setArea($scope.tenantArea);
//       $scope.data.reg.tenantAreaId.value = object.id;
//       $scope.closeModal('city');
//     }
//
// };
//
//   $scope.openAreaModal = function () {
//     $scope.citymodal.show();
//   };
//
//   $scope.openLicenseSec = function () {
//     $scope.hidden = !$scope.hidden;
//   };
//
//   $scope.openDatePicker = function ($event) {
//     datename = $event.target.name;
//     ionicDatePicker.openDatePicker(
//       {
//         todayLabel: '今天',
//         closeLabel: '关闭',
//         inputDate: new Date(),
//         mondayFirst: true,
//         weeksList: weeksList,
//         monthsList: monthsList,
//         templateType: 'popup',
//         showTodayButton: 'true',
//         dataFormat: 'yyyy-MM-dd',
//         closeOnSelect: true,
//         from: datename == 'tenantTermEnd' ? $scope.startTime : 0,
//         to: datename == 'tenantTermStart' ? $scope.endTime : 0,
//         callback: function (val) {
//           datePickerCallbacks(val);
//         }
//       }
//     );
//     var ele = document.getElementsByClassName('selected_date_full');
//     ele.innerHTML = '选择日期';
//   };
//
//   $scope.closeModal = function(type) {
//     if(type == "photo") {
//       $scope.photo_edit_modal.hide();
//     }else if(type == "action") {
//       $scope.actionModal.hide();
//     } else if(type == "city") {
//       $scope.citymodal.hide();
//     }
//   };
//
//   $scope.changeArrival = function ($event) {
//     var name = $event.target.name;
//     var status = $event.target.checked;
//     $scope.data.nextdayArrival = ((name == 'nextdayArrival' && !status) || (name == 'todayArrival' && status)) ? false : true;
//     $scope.data.todayArrival = ((name == 'todayArrival' && !status) || (name == 'nextdayArrival' && status)) ? false : true;
//   };
//
//   $scope.changeType = function ($event) {
//     var name = $event.target.name;
//     var status = $event.target.checked;
//     $scope.data.private = ((name == 'private' && !status) || (name == 'public' && status)) ? false : true;
//     $scope.data.public = ((name == 'public' && !status) || (name == 'private' && status)) ? false : true;
//   };
//
//   $scope.confirm = function () {
//     registerMsgService.setMsg($scope.data);
//     var data = registerMsgService.getMsg();
//     authService.register(data).success(function (res) {
//       if(res.status == 200 && res.msg == 'OK') {
//         var user = res.data.userMsg;
//         var tenant = res.data.tenantMsg;
//         authService.setUser(user);
//         authService.setTenant(tenant);
//         localStorage.haslogin = 1;
//         $state.go('mainMenu');
//       }
//     });
//
//   };
//
//   $scope.validate = function (type, form) {
//     switch (type) {
//       case 'phone':
//         if(form.userMobile && form.userMobile.$dirty && form.userMobile.$error.pattern) {
//           //register.html userMobile
//           var alertPopup = $ionicPopup.show({
//             title: '手机格式不正确',
//             template:'<div style="text-align:center;">请检查您填写的手机号信息！</div>'
//           });
//           $timeout(function() {
//             alertPopup.close();
//           }, 3000);
//         } else if(form.tenantMobile && form.tenantMobile.$dirty && form.tenantMobile.$error.pattern) {
//           var alertPopup = $ionicPopup.show({
//             title: '手机格式不正确',
//             template:'<div style="text-align:center;">请检查您填写的手机号信息！</div>'
//           });
//           $timeout(function() {
//             alertPopup.close();
//           }, 3000);
//         } else if (form.cardPhone && form.cardPhone.$dirty && form.cardPhone.$error.pattern) {
//           var alertPopup = $ionicPopup.alert({
//             title: '手机格式不正确',
//             template:'<div style="text-align:center;">请检查您填写的手机号信息！</div>'
//           });
//           $timeout(function() {
//             alertPopup.close();
//           }, 3000);
//         }
//         if(form.userMobile && form.userMobile.$valid){
//           isConflictMobile($scope.data.reg.userMobile.value);
//         }
//         break;
//       case 'mail':
//         if(form.userMail.$dirty && form.userMail.$error.pattern) {
//           var alertPopup = $ionicPopup.show({
//             title: '邮箱格式不正确',
//             template:'<div style="text-align:center;">请检查您填写的邮箱信息！</div>'
//           });
//           $timeout(function() {
//             alertPopup.close();
//           }, 3000);
//         }
//         if(form.userMail.$valid) {
//         }
//         break;
//       // case 'address':
//       //   if(form.tenantAddress.$dirty && form.tenantAddress.$error.pattern) {
//       //     var alertPopup = $ionicPopup.alert({
//       //       title:'详细地址不得少于五个字符',
//       //       template: '请检查您填写的详细地址信息',
//       //       buttons: [{
//       //         text: '我知道了',
//       //         type: 'button-assertive'
//       //       }]
//       //     });
//       //   }
//       //   break;
//       case 'password':
//         if(form.password.$dirty && form.password.$error.pattern) {
//           var alertPopup = $ionicPopup.show({
//             title: '密码格式不正确',
//             template:'<div style="text-align:center;">至少8位字符，至少包含数字，字母或特殊字符！</div>'
//           });
//           $timeout(function() {
//             alertPopup.close();
//           }, 3000);
//         }
//         if(form.password.$valid) {
//         }
//         break;
//       case 'salesCode':
//         if(form.salesCode.$dirty && form.salesCode.$error.pattern) {
//           var alertPopup = $ionicPopup.show({
//             title: '销售代码格式不正确',
//             template: '<div style="text-align:center;">销售代码为六位数字！</div>'
//           });
//           $timeout(function() {
//             alertPopup.close();
//           }, 3000);
//         }
//         break;
//       case 'repeatpw':
//         if(form.repeatpw.$dirty && form.repeatpw.$error.repeat) {
//           var alertPopup = $ionicPopup.show({
//             title: '两次密码输入不一致',
//             template:'<div style="text-align:center;">请检查您填写的确认密码！</div>'
//           });
//           $timeout(function() {
//             alertPopup.close();
//           }, 3000);
//         }
//         if(form.repeatpw.$valid) {
//         }
//         break;
//       case 'realName':
//         if(form.realName.$dirty && form.realName.$error.pattern) {
//           var alertPopup = $ionicPopup.alert({
//             title: '姓名有误',
//             template:'请检查您填写的姓名！'
//           });
//         }
//         break;
//       case 'cardNum':
//         if(form.cardNum.$dirty && form.cardNum.$error.pattern) {
//           var alertPopup = $ionicPopup.alert({
//             title: '银行卡卡号格式不正确',
//             template:'请检查您填写的银行卡信息！'
//           });
//         }
//         break;
//       case 'Id':
//         if(form.identification.$dirty && form.identification.$error.pattern) {
//           var alertPopup = $ionicPopup.alert({
//             title: '身份证号码格式不正确',
//             template:'请检查您填写的身份证信息！'
//           });
//         }
//         break;
//       default:
//         break;
//     }
//   };
//
//   $scope.next = function () {
//     $scope.data.reg.arrivalTime.value = $scope.data.nextdayArrival ? 2 : 1;
//     $scope.data.reg.bankAccountType.value = $scope.data.private ? 2 : 1;
//     registerMsgService.setMsg($scope.data);
//     console.log(registerMsgService.getMsg());
//
//   };
//
//   $scope.deletePicture = function (pic) {
//     var deletePicPopup = $ionicPopup.show({
//       template: '<div style="text-align: center;">是否要删除该图片？</div>',
//       title: '提示',
//       buttons: [
//         { text: '取消' },
//         {
//           text: '确定',
//           type: 'button-assertive',
//           onTap: function(e) {
//             num--;
//             if(num < 5) {
//               $scope.isLimit = true;
//             }
//             nameList.push(pic.name);
//             $scope.licenseList = _.reject($scope.licenseList, function (item) {
//               return item.name == pic.name;
//             });
//             $scope.data.reg.businessLiscenseIMG.value = _.reject($scope.data.reg.businessLiscenseIMG.value, function (item) {
//               return item.name == pic.name;
//             });
//           }
//         }
//       ]
//     });
//
//   };
//
//   $scope.takePicture = function (type) {
//     $ionicPlatform.ready(function () {
//       var options = {
//         quality: 100,
//         destinationType: Camera.DestinationType.FILE_URI,
//         sourceType: Camera.PictureSourceType.CAMERA,
//         allowEdit: false,
//         encodingType: Camera.EncodingType.JPEG,
//         mediaType:0,
//         cameraDirection:0,
//         popoverOptions: CameraPopoverOptions,
//         saveToPhotoAlbum: true
//       };
//         $cordovaCamera.getPicture(options).then(function (photo) {
//           switch (type) {
//             case 'front':
//               $scope.frontUserphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'front';
//               break;
//             case 'oppsite':
//               $scope.oppsiteUserphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'oppsite';
//               break;
//             case 'hand':
//               $scope.handUserphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'hand';
//               break;
//             case 'license':
//               $scope.licensephoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'license';
//               break;
//             case 'door':
//               $scope.doorphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'door';
//               break;
//             case 'counter':
//               $scope.counterphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'counter';
//               break;
//             case 'store':
//               $scope.storephoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'store';
//               break;
//             case 'agreements':
//               $scope.agreementsphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'agreements';
//               break;
//             case 'card':
//               $scope.cardphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'card';
//               break;
//             case 'more':
//               var li = {'name': '', 'url': photo};
//               nameList.length == 0 ? li.name = 'license' + num : li.name = nameList[0];
//               nameList.shift();
//               if(num < 5) {
//                 $scope.licenseList.push(li);
//                 imgIdentify.photo = photo;
//                 imgIdentify.type = li.name;
//                 num++;
//               }
//               if(num > 4) {
//                 $scope.isLimit = false;
//               }
//               break;
//             default:
//               var temp = {'name': type.name, 'url': photo};
//               $scope.licenseList = _.reject($scope.licenseList, function (item) {
//                 return item.name == type.name;
//               });
//               $scope.licenseList.push(temp);
//               imgIdentify.photo = photo;
//               imgIdentify.type = type.name;
//           }
//           $cordovaFileTransfer.upload(server_url, imgIdentify.photo, upload_options).then(function (res) {
//             $ionicLoading.hide();
//             console.log("SUCCESS: " + JSON.stringify(res.response));
//             var pUrl = angular.fromJson(res.response).url;
//             var name = imgIdentify.type;
//             var obj = {'name': name, 'url': pUrl};
//             if(imgIdentify.type == 'front' || imgIdentify.type == 'oppsite' || imgIdentify.type == 'hand') {
//               if($scope.data.reg.identifyCardIMG.value.length !== 0) {
//                 $scope.data.reg.identifyCardIMG.value = _.reject($scope.data.reg.identifyCardIMG.value, function (item) {
//                   return item.name == obj.name;
//                 });
//               }
//               $scope.data.reg.identifyCardIMG.value.push(obj);
//               console.log('id', $scope.data.reg.identifyCardIMG);
//             } else if(imgIdentify.type.indexOf('license') >= 0 ) {
//               if($scope.data.reg.businessLiscenseIMG.value.length !== 0) {
//                 $scope.data.reg.businessLiscenseIMG.value = _.reject($scope.data.reg.businessLiscenseIMG.value, function (item) {
//                   return item.name == obj.name;
//                 });
//               }
//               $scope.data.reg.businessLiscenseIMG.value.push(obj);
//               console.log('license', $scope.data.reg.businessLiscenseIMG);
//             } else if(imgIdentify.type == 'store' || imgIdentify.type == 'counter' || imgIdentify.type == 'door' || imgIdentify.type == 'agreements') {
//               if($scope.data.reg.tenantIMG.value.length !== 0) {
//                 $scope.data.reg.tenantIMG.value = _.reject($scope.data.reg.tenantIMG.value, function (item) {
//                   return item.name == obj.name;
//                 });
//               }
//               $scope.data.reg.tenantIMG.value.push(obj);
//               console.log('tenant', $scope.data.reg.tenantIMG);
//             } else if(imgIdentify.type == 'card') {
//               $scope.data.reg.cardIMG.value[0] = obj;
//               console.log('card', $scope.data.reg.cardIMG);
//             }
//           }, function(err) {
//             console.log("ERROR: " + JSON.stringify(err));
//             alert(JSON.stringify(err));
//           }, function (progress) {
//             $ionicLoading.show({
//               template: '上传中...'
//             });
//           });
//         }, function (err) {
//           console.log(err);
//         });
//     });
//   };
//
//   $scope.openCamera = function (type, rate) {
//     $scope.type = type;
//     $scope.closeModal('action');
//     $ionicPlatform.ready(function () {
//       var options = {
//         quality: 100,
//         destinationType: Camera.DestinationType.FILE_URI,
//         sourceType: Camera.PictureSourceType.CAMERA,
//         allowEdit: false,
//         encodingType: Camera.EncodingType.JPEG,
//         mediaType:0,
//         cameraDirection:0,
//         popoverOptions: CameraPopoverOptions,
//         saveToPhotoAlbum: true
//       };
//       if(!rate) {
//         $cordovaCamera.getPicture(options).then(function (photo) {
//           switch (type) {
//             case 'front':
//               $scope.img = $scope.frontUserphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'front';
//               break;
//             case 'oppsite':
//               $scope.img = $scope.oppsiteUserphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'oppsite';
//               break;
//             case 'hand':
//               $scope.img = $scope.handUserphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'hand';
//               break;
//             case 'license':
//               $scope.img = $scope.licensephoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'license';
//               break;
//             case 'door':
//               $scope.img = $scope.doorphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'door';
//               break;
//             case 'counter':
//               $scope.img = $scope.counterphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'counter';
//               break;
//             case 'store':
//               $scope.img = $scope.storephoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'store';
//               break;
//             case 'agreements':
//               $scope.img = $scope.agreementsphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'agreements';
//               break;
//             case 'card':
//               $scope.img = $scope.cardphoto = photo;
//               imgIdentify.photo = photo;
//               imgIdentify.type = 'card';
//               break;
//             case 'more':
//               var li = {'name': 'license' + i, 'url': photo};
//               if(i < 5) {
//                 $scope.licenseList.push(li);
//                 imgIdentify.photo = photo;
//                 imgIdentify.type = 'license' + i;
//                 i++;
//               } else {
//                 $scope.isLimit = false;
//               }
//             default:
//                 angular.forEach($scope.licenseList, function (item) {
//                   if(item.name == type.name) {
//                     item.photo = photo;
//                   }
//                 });
//                 $scope.type.photo = photo ;
//                 $scope.img = photo;
//                 imgIdentify.photo = photo;
//                 imgIdentify.type = 'license' + i;
//
//           }
//           $cordovaFileTransfer.upload(server_url, imgIdentify.photo, upload_options).then(function (res) {
//             $ionicLoading.hide();
//             console.log("SUCCESS: " + JSON.stringify(res.response));
//             var pUrl = angular.fromJson(res.response).url;
//             var name = imgIdentify.type;
//             var obj = {'name': name, 'url': pUrl};
//             if(imgIdentify.type == 'front' || imgIdentify.type == 'oppsite' || imgIdentify.type == 'hand') {
//               if($scope.data.reg.identifyCardIMG.value.length !== 0) {
//                 $scope.data.reg.identifyCardIMG.value = _.reject($scope.data.reg.identifyCardIMG.value, function (item) {
//                   return item.name == obj.name;
//                 });
//               }
//               $scope.data.reg.identifyCardIMG.value.push(obj);
//               console.log('id', $scope.data.reg.identifyCardIMG);
//             } else if(imgIdentify.type.indexOf('license') >= 0 ) {
//               if($scope.data.reg.businessLiscenseIMG.value.length !== 0) {
//                 $scope.data.reg.businessLiscenseIMG.value = _.reject($scope.data.reg.businessLiscenseIMG.value, function (item) {
//                   return item.name == obj.name;
//                 });
//               }
//               $scope.data.reg.businessLiscenseIMG.value.push(obj);
//               console.log('license', $scope.data.reg.businessLiscenseIMG);
//             } else if(imgIdentify.type == 'store' || imgIdentify.type == 'counter' || imgIdentify.type == 'door' || imgIdentify.type == 'agreements') {
//               if($scope.data.reg.tenantIMG.value.length !== 0) {
//                 $scope.data.reg.tenantIMG.value = _.reject($scope.data.reg.tenantIMG.value, function (item) {
//                   return item.name == obj.name;
//                 });
//               }
//               $scope.data.reg.tenantIMG.value.push(obj);
//               console.log('tenant', $scope.data.reg.tenantIMG);
//             } else if(imgIdentify.type == 'card') {
//                 $scope.data.reg.cardIMG.value[0] = obj;
//               console.log('card', $scope.data.reg.cardIMG);
//             }
//           }, function(err) {
//             console.log("ERROR: " + JSON.stringify(err));
//             alert(JSON.stringify(err));
//           }, function (progress) {
//             $ionicLoading.show({
//               template: '上传中...'
//             });
//           });
//         }, function (err) {
//           console.log(err);
//         });
//       } else {
//         openEditModal(type);
//       }
//     });
//   };
//
//   function openEditModal(type) {
//     switch (type) {
//       case 'front':
//         $scope.img = $scope.frontUserphoto;
//         break;
//       case 'oppsite':
//         $scope.img = $scope.oppsiteUserphoto;
//         break;
//       case 'hand':
//         $scope.img = $scope.handUserphoto;
//         break;
//       case 'license':
//         $scope.img = $scope.licensephoto;
//         break;
//       case 'door':
//         $scope.img = $scope.doorphoto;
//         break;
//       case 'counter':
//         $scope.img = $scope.counterphoto;
//         break;
//       case 'store':
//         $scope.img = $scope.storephoto;
//         break;
//       case 'agreements':
//         $scope.img = $scope.agreementsphoto;
//         break;
//       case 'card':
//         $scope.img = $scope.cardphoto;
//         break;
//       default:
//         $scope.img = type.photo;
//     }
//     $scope.photo_edit_modal.show();
//   }
//
//   $scope.detelePhoto = function (img) {
//     i--;
//     $scope.isLimit = true;
//     $scope.licenseList = _.reject($scope.licenseList, function (item) {
//       return item.content == img;
//     });
//     $scope.actionModal.hide();
//     $scope.photo_edit_modal.hide();
//   };
//
//   $scope.openProtModal = function () {
//     $scope.protocol_popover.show();
//   };
//
//   $scope.closePopover = function() {
//     $scope.protocol_popover.hide();
//   };
//
//   $scope.$on('$destroy', function() {
//     $scope.protocol_popover.remove();
//     $scope.citymodal.remove();
//
//   });
//
// })
// .controller('CompleteInfoCtrl', function () {
// })
// .controller('testCtrl', function ($scope) {
//     var vm=$scope.vm={};
//     vm.cb = function () {
//       console.log(vm.CityPickData1.areaData)
//       console.log(vm.CityPickData2.areaData)
//       console.log(vm.CityPickData3.areaData)
//       console.log(vm.CityPickData4.areaData)
//     };
//     //例1
//     vm.CityPickData1 = {
//       areaData: [],
//       backdrop: true,
//       backdropClickToClose: true,
//       defaultAreaData: ['江苏', '无锡', '江阴市'],
//       buttonClicked: function () {
//         vm.cb()
//       },
//       tag: '-',
//       iconClass: 'ion-location',
//       title: '有icon的数据'
//     };
//     //例2
//     vm.CityPickData2 = {
//       areaData: ['请选择城市'],
//       title: '没有初始城市',
//       hardwareBackButtonClose: false
//     };
//     //例3
//     vm.CityPickData3 = {
//       areaData: [],
//       defaultAreaData: ['江苏', '无锡', '江阴市'],
//       title: '初始城市江苏无锡江阴市'
//     };
//     //例4
//     vm.CityPickData4 = {
//       areaData: [],
//       title: '外部更改值',
//       watchChange: true
//     };
//     vm.change = function () {
//       console.log('change')
//       vm.CityPickData4.areaData = ['上海', '徐汇区']
//     };
//     vm.sync = function () {
//       console.log('sync')
//       vm.CityPickData4.areaData = vm.CityPickData2.areaData
//     };
//   })
// .controller('DiscoveryCtrl', function ($scope, productMsgService, productService) {
//   init();
//   function init() {
//    $scope.productList = productMsgService.getMsg();
//   }
//   $scope.doRefresh = function() {
//     getProducts();
//   };
//
//   function getProducts() {
//     productService.getProductBykeyWord('').success(function (res) {
//       if(res.status === 200 && res.msg == 'OK') {
//         // $ionicLoading.hide();
//         productMsgService.setMsg(res.data);
//         $scope.$broadcast('scroll.refreshComplete');
//         init();
//         // $scope.newproductList = productMsgService.getNew();
//         // getReceivers();
//
//       }
//     });
//   }
// })
// .controller('ProductDetailCtrl', function ($scope, $state, $ionicSlideBoxDelegate, $ionicModal, cartService, $stateParams, productService) {
//   $scope.imageList = [
//     'img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png','img/7.png','img/8.png'
//   ];
//
//   $scope.loadMore = function () {
//     $scope.detail = [];
//   };
//   $scope.$on('stateChangeSuccess', function() {
//     $scope.loadMore();
//   });
//   $scope.moreDataCanBeLoaded = function () {
//     return false;
//   };
//   $scope.open_modal = function (index) {
//       $scope.top_slide_modal.show();
//       $ionicSlideBoxDelegate.$getByHandle('modal_slide').slide(index);
//   };
//   $ionicModal.fromTemplateUrl('templates/modal/top_slide_modal.html',{
//     scope:$scope,
//   }).then(function(modal){
//     $scope.top_slide_modal=modal;
//   });
//   $scope.$on('$destroy', function() {
//     $scope.top_slide_modal.remove();
//   });
//   $scope.close_modal=function(){
//     $scope.top_slide_modal.hide();
//   };
//   $scope.addToCart = function (product) {
//     cartService.setCart(product);
//   };
//   $scope.confirmOrder = function (product) {
//     var list = [];
//     product.num = 1;
//     list.push(product);
//     cartService.setSelectedProductsList(list);
//     $state.go('purchase');
//   };
//
//   function init() {
//     var id = $stateParams.productId;
//     productService.getProductById(id).success(function (res) {
//       if(res.status == 200 && res.msg == 'OK') {
//         $scope.product = res.data;
//         var container = document.getElementById('description');
//         container.innerHTML = $scope.product.description;
//         $scope.product.num = 0;
//       }
//     });
//     $scope.productInCart = cartService.getCart();
//   }
//   init();
// })
// .controller('OrderDetailCtrl', function ($scope, orderService, $stateParams, $ionicHistory) {
//   var orderId = $stateParams.orderId;
//   $scope.state = {
//     unpayed: '等待买家付款',
//     payed: '买家已付款',
//     delivered: '卖家已发货',
//     canceled: '交易关闭',
//     succeed: '交易成功'
//   };
//   init();
//   function init() {
//     orderService.getSingleOrder(orderId).success(function(res) {
//       if(res.status == 200 && res.msg == 'OK') {
//         $scope.order = res.data;
//       }
//     });
//   }
//   $scope.return = function () {
//     $ionicHistory.viewHistory();
//     var title = $ionicHistory.backTitle();
//     if(title == '购买宝贝') {
//       $ionicHistory.goBack(-2);
//     } else {
//       $ionicHistory.goBack(-1);
//     }
//   };
//
// })
// .controller('MsgCtrl', function ($timeout, $state) {
//   $timeout(function() {
//     $state.go('mainMenu'); // 3秒后关闭弹窗
//   }, 3000);
// })
// .controller('PaymentCtrl', function ($scope, orderService, $cordovaBarcodeScanner, paymentService, $state, $ionicLoading) {
//   $scope.seller_msg = {
//     id: angular.fromJson(localStorage.tenantInfo).shopId,
//     name: angular.fromJson(localStorage.tenantInfo).tenantName
//   };
//   $scope.data = {amount: ''};
//   $scope.payway = {
//     alipay: false,
//     weixin: true
//   };
//   var orderId;
//   $scope.scanCode = function () {
//     var data = {
//       shopId: $scope.seller_msg.id,
//       productTotalPrice: $scope.data.amount,
//       paymentWay: $scope.payway.alipay ? 1 : 2
//     };
//     orderService.createOrderByQR(data).success(function (res) {
//       if(res.status == 200 && res.msg == "OK") {
//         orderId = res.data;
//         $cordovaBarcodeScanner.scan().then(function (res) {
//           $ionicLoading.show({
//             template: '数据处理中...'
//           });
//           paymentService.payByScan(res.text, orderId).success(function (res) {
//             $ionicLoading.hide();
//             if(res.status == 200 && res.msg == 'OK'){
//               $state.go('paySuccess');
//             }
//           });
//           console.log(res.text);
//         }, function (error) {
//           console.log('error' + error);
//         });
//       }
//     });
//   };
//
// })
// .controller('ReceiverCtrl', function ($scope, receiverService, receiverMsgService, $stateParams, $ionicPopup, $state, $ionicModal, $ionicTabsDelegate, areaService) {
//   // var vm = $scope.vm = {};
//   // vm.AreaPickData;
//   $scope.citySelected = {};
//   $scope.districtSelected = {};
//   $scope.provinceSelected = {};
//   // $scope.streetSelected = {};
//   $ionicModal.fromTemplateUrl('templates/modal/select_area_modal.html', {
//     scope: $scope,
//     animation: 'slide-in-up',
//     backdropClickToClose: true,
//     hardwareBackButtonClose: true
//   }).then(function(modal) {
//     $scope.citymodal = modal;
//   });
//   function init() {
//     $scope.receiverList = receiverMsgService.getMsg();
//     if($scope.receiverList.length == 0) {
//       receiverService.getReceiverList().success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           $scope.receiverList = res.data;
//           receiverMsgService.setMsg(res.data);
//         }
//       });
//     }
//     if($stateParams.receiverId) {
//       $scope.title = '更改地址';
//       var id = $stateParams.receiverId;
//       $scope.receiver = receiverMsgService.getReceiverById(id)[0];
//       $scope.receiver.phone = parseInt($scope.receiver.phone);
//       $scope.provinceList = areaService.getMsg();
//       var arr = $scope.receiver.area.split('-');
//       $scope.provinceSelected.name = arr[0];
//       $scope.citySelected.name = arr[1];
//       $scope.districtSelected.name = arr[2];
//     } else {
//       $scope.title = '新增地址';
//       $scope.receiver = {};
//       $scope.provinceList = areaService.getMsg();
//     }
//   }
//   init();
//   function initArea() {
//     var arr = $scope.receiver.area.split('-');
//     $scope.provinceSelected.name = arr[0];
//     $scope.citySelected.name = arr[1];
//     $scope.districtSelected.name = arr[2];
//   }
//   $scope.deleteReceiver = function (id) {
//     var deletePop = $ionicPopup.show({
//       title: '您确定要删除该收货人信息吗？',
//       scope: $scope,
//       buttons: [
//         { text: '取消' },
//         {
//           text: '<b>确定</b>',
//           type: 'button-positive',
//           onTap: function(e) {
//             receiverService.deleteReceiver(id).success(function (res) {
//               if(res.status == 200 && res.msg == 'OK') {
//                 $scope.receiverList = _.reject($scope.receiverList, function (item) {
//                   return item.id == id;
//                 });
//                 receiverService.getReceiverList().success(function (res) {
//                   if(res.status == 200 && res.msg == 'OK') {
//                     receiverMsgService.setMsg(res.data);
//                   }
//                 });
//               }
//             });
//           }
//         },
//       ]
//     });
//
//   };
//   $scope.validate = function (type, form) {
//     switch (type) {
//       case 'phone':
//         if(form.receiverPhone && form.receiverPhone.$dirty && form.receiverPhone.$error.pattern) {
//           var alertPopup = $ionicPopup.alert({
//             title: '手机格式不正确',
//             template:'请检查您填写的手机号信息！'
//           });
//         }
//         break;
//       case 'address':
//         if(form.receiverAddress.$dirty && form.receiverAddress.$error.pattern) {
//           var alertPopup = $ionicPopup.alert({
//             title:'详细地址不得少于五个字符',
//             template: '请检查您填写的详细地址信息'
//           });
//         }
//         break;
//       default:
//         break;
//     }
//   };
//   $scope.addReceiver = function () {
//     var data = {
//       id: $scope.receiver.id || null,
//       phone: JSON.stringify($scope.receiver.phone),
//       address: $scope.receiver.address,
//       areaId: $scope.receiver.areaId,
//       name: $scope.receiver.name,
//       shopId: angular.fromJson(localStorage.tenantInfo).shopId,
//       def: $scope.receiver.def || false
//     };
//
//     if(data.id) {
//       receiverService.updateReceiver(data).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           receiverService.getReceiverList().success(function (res) {
//             if(res.status == 200 && res.msg == 'OK') {
//               receiverMsgService.setMsg(res.data);
//               $state.go('addressList');
//             }
//           });
//         }
//       });
//     } else {
//       console.log('receiver', data);
//       receiverService.addReceiver(data).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           receiverService.getReceiverList().success(function (res) {
//             if(res.status == 200 && res.msg == 'OK') {
//               receiverMsgService.setMsg(res.data);
//               // $ionicHistory.goBack(1);
//               // $state.go('addressList');
//               window.history.back();
//             }
//           });
//         }
//       });
//     }
//
//   };
//   $scope.changeDefault = function (receiver) {
//     if(receiver.def) {
//       angular.forEach($scope.receiverList, function (item) {
//         if(receiver.id != item.id) {
//           item.def = false;
//         }
//       });
//       var data = {
//           id: receiver.id,
//           def: receiver.def,
//           shopId : angular.fromJson(localStorage.tenantInfo).shopId
//       };
//
//       receiverService.updateDefault(data).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           receiverService.getReceiverList().success(function (res) {
//             if(res.status == 200 && res.msg == 'OK') {
//               receiverMsgService.setMsg(res.data);
//             }
//           });
//         }
//       })
//     } else {
//       receiver.def = true;
//       alert('至少选择一个默认地址！');
//     }
//   };
//   $scope.selectArea = function (object, type) {
//     if(type === 'province') {
//       $scope.citySelected.name = '请选择';
//       $scope.provinceSelected = object;
//       $ionicTabsDelegate.select(1);
//       areaService.getAreaListById(object.id).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           $scope.cityList = res.data;
//         }
//       });
//     } else if(type === 'city') {
//       $scope.districtSelected.name = '请选择';
//       $scope.citySelected = object;
//       $ionicTabsDelegate.select(2);
//       areaService.getAreaListById(object.id).success(function (res) {
//         if(res.status == 200 && res.msg == 'OK') {
//           $scope.districtList = res.data;
//         }
//       });
//     } else if(type === 'district') {
//       $scope.districtSelected = object;
//       $scope.receiver.area = $scope.provinceSelected.name + '-' + $scope.citySelected.name + '-' + $scope.districtSelected.name;
//       $scope.receiver.areaId = object.id;
//       $scope.closeModal();
//     }
//
//   };
//   $scope.openModal = function () {
//     $scope.citymodal.show();
//   };
//   $scope.closeModal = function() {
//     $scope.citymodal.hide();
//   };
//   $scope.$on('$destroy', function() {
//     $scope.citymodal.remove();
//   });
//   $scope.$on('modal.hidden', function() {
//   });
//   $scope.$on('modal.removed', function() {
//   });
//   $scope.selectReceiver = function (receiver) {
//     receiverMsgService.setSelectedReceiver(receiver);
//     $state.go('purchase');
//   };
//
// })
// .controller('OrderCtrl', function ($scope, orderMsgService, orderService, $ionicModal, $state) {
//   var orderId;
//   init();
//   $scope.state = {
//     unpayed: '等待买家付款',
//     payed: '买家已付款',
//     delivered: '卖家已发货',
//     canceled: '交易关闭',
//     succeed: '交易成功'
//   };
//   function init() {
//     $scope.undeliveredOrder = orderMsgService.getUndeliveredOrder();
//     $scope.unpayedOrder = orderMsgService.getUnPayedOrder();
//     $scope.unrecivedOrder = orderMsgService.getUnReceivedOrder();
//     $scope.orderList = orderMsgService.getMsg();
//   }
//   $scope.cancelOrder = function (id) {
//     orderService.cancelOrder(id).success(function (res) {
//       if(res.status == 200 && res.msg == 'OK') {
//         angular.forEach($scope.orderList, function (order) {
//           if(order.id == id) {
//             order.state = 1;
//           }
//         });
//       }
//     });
//   };
//   $scope.first = true;
//   $scope.second = false;
//   $ionicModal.fromTemplateUrl('templates/modal/select_payway_modal.html', {
//     scope: $scope,
//     animation: 'slide-in-up',
//     backdropClickToClose: true,
//     hardwareBackButtonClose: true
//   }).then(function(modal) {
//     $scope.payModal = modal;
//   });
//   $scope.closeModal = function() {
//     $scope.payModal.hide();
//     $state.go('orederdetail', { orderId: orderId });
//   };
//   $scope.return = function () {
//     $scope.first = true;
//     $scope.second = false;
//   };
//   $scope.$on('$destroy', function() {
//     $scope.payModal.remove();
//   });
//   $scope.$on('modal.hidden', function() {
//   });
//   $scope.$on('modal.removed', function() {
//   });
//   $scope.checkPayway = function (data) {
//     var paymentWay;
//     if(data.alipay) {
//       paymentWay = '1';
//     } else if(data.weixin) {
//       paymentWay = '2';
//     } else if(data.COD) {
//       paymentWay = '3';
//     } else if(data.deposit) {
//       paymentWay = '4';
//     }
//     var data = {
//       id: orderId,
//       paymentWay: paymentWay
//     };
//     orderService.updatepayment(data).success(function (res) {
//       if(res.status == 200 && res.msg == 'OK') {
//         if(paymentWay == '4') {
//           $scope.second = true;
//           $scope.first = false;
//           $scope.deposit = res.data;
//         } else {
//           $scope.closeModal();
//           $state.go('orederdetail', { orderId: orderId });
//         }
//       }
//     });
//   };
//   $scope.confirmDeposit = function () {
//     $scope.closeModal();
//     $state.go('orederdetail', { orderId: orderId });
//   };
//   $scope.payway = function (id) {
//     orderId = id;
//     $scope.payModal.show();
//   };
//   $scope.doRefresh = function() {
//     getOrders();
//   };
//   function getOrders() {
//     orderService.getAllOrder().success(function (res) {
//       if(res.msg == 'OK' && res.status == 200) {
//         orderMsgService.setMsg(res.data);
//         init();
//         $scope.$broadcast('scroll.refreshComplete');
//       }
//     });
//   }
//
// })
// .controller('AddressCtrl', function ($scope) {
//   var vm = $scope.vm = {};
//
//   vm.AreaPickData = {
//     areaData: [],
//     backdrop: true,
//     backdropClickToClose: true,
//     title: '所在地区',
//     tag: '-',
//     defaultAreaData: ['请选择']
//   };
//
//   vm.StreetPickData = {
//     areaData: [],
//     backdrop: true,
//     backdropClickToClose: true,
//     title: '所在街道',
//     tag: '-',
//     defaultAreaData: ['请选择']
//   };
// })
.controller('ContactsCtrl', function($scope, $state, memberMsgService, memberService, $ionicPopup, $stateParams, $http, $ionicModal, systemService, $timeout) {
  $scope.newMember = {};
  init();
  $scope.data = {};
  function init() {
    $scope.memberList = memberMsgService.getMsg();
    if($stateParams.memberId) {
      $scope.title = '更新员工';
      var member = memberMsgService.getMemberById($stateParams.memberId);
      member[0].mobile = parseInt(member[0].mobile);
      member[0].identity = parseInt(member[0].identity);
      $scope.member = member[0];
      if($scope.member.level == 2) {
        $scope.newMember.finance = true;
      }else {
        $scope.newMember.sales = true;
      }
    } else {
        $scope.title = '添加员工';
        $scope.member = {};
    }
    }
  $scope.delete = function (member) {
    var deletePop = $ionicPopup.show({
      title: '您确定要删除该成员吗？',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确定</b>',
          type: 'button-positive',
          onTap: function(e) {
            memberService.deleteMember(member.id).success(function (res) {
              if(res.status == 200 && res.msg == 'OK'){
                $scope.memberList = _.reject($scope.memberList, function (item) {
                  return item.id == member.id;
                });
                memberMsgService.setMsg($scope.memberList);
              }
            });
          }
        },
      ]
    });

  };
  $scope.addMember = function () {
    var data = {
      id: $scope.member.id || null,
      mobile: JSON.stringify($scope.member.mobile),
      identity: JSON.stringify($scope.member.identity),
      level: $scope.member.level,
      name: $scope.member.name,
      shopId: angular.fromJson(localStorage.tenantInfo).shopId
    };

    if(data.id) {
      memberService.updateMember(data).success(function (res) {
        if(res.status == 200 && res.msg == 'OK') {
          memberService.getMembersByTenantId().success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              memberMsgService.setMsg(res.data);
              $state.go('contactsList');
            }
          });
        }
      });
    } else {
      $http.post('http://120.77.40.156:8080/ECommerce/api/user/register', angular.toJson(data)).success(function (res) {
        if(res.status == 200 && res.msg == 'OK') {
          memberService.getMembersByTenantId().success(function (res) {
            if(res.status == 200 && res.msg == 'OK') {
              memberMsgService.setMsg(res.data);
              $state.go('contactsList');
            }
          });
        }
      });
    }

  };
  $scope.validate = function (type, form) {
    switch (type) {
      case 'phone':
        if(form.memberMobile && form.memberMobile.$dirty && form.memberMobile.$error.pattern) {
          var alertPopup = $ionicPopup.alert({
            title: '手机格式不正确',
            template:'请检查您填写的手机号信息！'
          });
        }
        if(form.memberMobile && form.memberMobile.$valid){
          isConflictMobile($scope.member.mobile);
        }
        break;
      case 'Id':
        if(form.memberIdentifyID.$dirty && form.memberIdentifyID.$error.pattern) {
          var alertPopup = $ionicPopup.alert({
            title: '身份证号码格式不正确',
            template:'请检查您填写的身份证信息！'
          });
        }
        break;
      case 'mail':
        if(form.userMail.$dirty && form.userMail.$error.pattern) {
          var alertPopup = $ionicPopup.alert({
            title: '邮箱格式不正确',
            template:'请检查您填写的邮箱信息！'
          });
        }
        if(form.userMail.$valid) {
        }
        break;
      default:
        break;
    }
  };
  function isConflictMobile(mobile) {
    systemService.checkUserExist(mobile).success(function (res) {
      if(res.status == 200 && res.msg == 'OK') {
        $scope.conflictEmail = !!res.data;
      }else {

      }
      if($scope.conflictEmail) {
        var conflictPopup = $ionicPopup.alert({
          title: '用户已存在',
          template:"不可以添加到该门店！"
        });
      }
      $timeout(function() {
        conflictPopup.hide(); // 3秒后关闭弹窗
      }, 3000);
    })
  }
  $ionicModal.fromTemplateUrl('templates/modal/select_role_modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: true,
    hardwareBackButtonClose: true
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
      $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  $scope.$on('modal.hidden', function() {
  });
  $scope.$on('modal.removed', function() {
  });
  $scope.selectRole = function (u) {
    if(u.sales) {
      $scope.member.level = 3;
      $scope.member.role = '销售';
      $scope.closeModal();
    } else if(u.finance) {
      $scope.member.level = 2;
      $scope.member.role = '财务';
      $scope.closeModal();
    }
  };
  $scope.bindMail = function () {
    var id = angular.fromJson(localStorage.userInfo).id;
    var data = {
      email: $scope.data.userMail,
      id: id
    };
    memberService.bindMail(data).success(function (res) {
      if(res.status == 200 && res.msg == 'OK') {
        var user = angular.fromJson(localStorage.userInfo);
        user.email = $scope.data.userMail;
        localStorage.userInfo = angular.toJson(user);
        $state.go('selfInfo');
      }
    });
  };
});
