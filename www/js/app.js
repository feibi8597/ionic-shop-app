// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
'use strict';
require('angular');
require('ionic');
require("./services/index");
require("./directives/index");
require("./controllers/index");

module.exports = angular.module('woaijiu', [
  'ionic',
  'woaijiu.controllers',
  'woaijiu.services',
  'woaijiu.directives'
])
  // .run(function($ionicPlatform, $ionicHistory, $ionicConfig, $rootScope) {
  // e.preventDefault();
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //   if($ionicHistory.backView()){
  //     if($cordovaKeyboard.isVisible()) {
  //       $cordovaKeyboard.close();
  //     }else {
  //       window.addEventListener('native.keyboard.isVisible', function (e) {
  //         angular.element(e).css({
  //           'bottom':0
  //         });
  //         cordova.plugins.Keyboard.isVisible = true;
  //         $timeout(function () {
  //           cordova.plugins.Keyboard.isVisible = false;
  //         }, 100);
  //       });
  //       $ionicHistory.goBack();
  //     }
  //   }
  // }, 101);
  // $rootScope.win_W = window.innerWidth;
  // $rootScope.win_H=window.innerHeight;
  // $ionicConfig.platform.ios.tabs.style('standard');
  // $ionicConfig.platform.ios.tabs.position('bottom');
  // $ionicConfig.platform.android.tabs.style('standard');
  // $ionicConfig.platform.android.tabs.position('standard');
  // $ionicPlatform.ready(function() {
  //   // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  //   // for form inputs)
  //   if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
  //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //     cordova.plugins.Keyboard.disableScroll(true);
  //
  //   }
  //   if (window.StatusBar) {
  //     // org.apache.cordova.statusbar required
  //     StatusBar.styleDefault();
  //   }
  // });
// });

// .config(function($stateProvider, $urlRouterProvider) {

  // // Ionic uses AngularUI Router which uses the concept of states
  // // Learn more here: https://github.com/angular-ui/ui-router
  // // Set up the various states which the app can be in.
  // // Each state's controller can be found in controllers.js
  // $stateProvider
  //
  // // setup an abstract state for the tabs directive
  // .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tab/tabs.html'
  // })
  //
  // // Each tab has its own nav history stack:
  // // shop home page
  // .state('tab.websites', {
  //   url: '/websites',
  //   views: {
  //     'tab-websites': {
  //       templateUrl: 'templates/tab/tab-websites.html',
  //       controller: 'WebsitesCtrl'
  //     }
  //   }
  // })
  //
  // // shop cart page
  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //
  // .state('tab.chat-detail', {
  //   url: '/chats/:chatId',
  //   views: {
  //     'tab-chats': {
  //       templateUrl: 'templates/tab/chat-detail.html',
  //       controller: 'ChatDetailCtrl'
  //     }
  //   }
  // })
  //
  // //shop account page
  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // })
  //
  // // shop order page
  // .state('tab.order', {
  //   url: '/order',
  //   views: {
  //     'tab-order': {
  //       templateUrl: 'templates/tab/tab-order.html',
  //       controller: 'OrderCtrl'
  //     }
  //   }
  // })
  //
  // // shop discovery page
  // .state('tab.discovery', {
  //   url: '/discovery',
  //   views: {
  //     'tab-discovery': {
  //       templateUrl: 'templates/tab/tab-discovery.html',
  //       controller: 'DiscoveryCtrl'
  //     }
  //   }
  // })
  //
  // .state('mainMenu', {
  //   url: '/mainmenu',
  //   cache:false,
  //   templateUrl: 'templates/main/mainmenu.html',
  //   controller: 'MainCtrl'
  // })
  //
  // .state('scanQRCode', {
  //   url: '/scanQRCode',
  //   cache:false,
  //   templateUrl: 'templates/payment/insertSum.html',
  //   controller: 'PaymentCtrl'
  // })
  //
  // .state('paySuccess', {
  //   url: '/paySuccess',
  //   cache:false,
  //   templateUrl: 'templates/msg/paySuccess.html',
  //   controller: 'MsgCtrl'
  // })
  //
  // .state('addAddress', {
  //   url: '/addAddress/:receiverId',
  //   cache:false,
  //   templateUrl: 'templates/auth/addAddress.html',
  //   controller: 'ReceiverCtrl'
  // })
  //
  // .state('showLogistics', {
  //   url: '/showLogistics',
  //   cache:false,
  //   templateUrl: 'templates/logistics/showLogistics.html',
  //   controller: 'ReceiverCtrl'
  // })
  //
  // .state('list', {
  //   url: '/list/:cat',
  //   cache: false,
  //   templateUrl: 'templates/products/list.html',
  //   controller: 'WebsitesCtrl'
  // })
  //
  // .state('productdetail', {
  //   url: '/product/:productId',
  //   cache: false,
  //   templateUrl: 'templates/products/product_detail.html',
  //   controller: 'ProductDetailCtrl'
  // })
  //
  // .state('orederdetail', {
  //   url: '/order/:orderId',
  //   cache: false,
  //   templateUrl: 'templates/order/order_detail.html',
  //   controller: 'OrderDetailCtrl'
  // })
  //
  // .state('selfInfo', {
  //   url: '/selfInfo',
  //   cache: false,
  //   templateUrl: 'templates/auth/selfInfo.html',
  //   controller: 'AccountCtrl'
  // })
  //
  // .state('setting', {
  //   url: '/setting',
  //   cache: false,
  //   templateUrl: 'templates/auth/setting.html',
  //   controller: 'AccountCtrl'
  // })
  //
  // .state('addressList', {
  //   url: '/addressList',
  //   cache: false,
  //   templateUrl: 'templates/logistics/addressList.html',
  //   controller: 'ReceiverCtrl'
  // })
  //
  // .state('addressSelected', {
  //   url: '/addressSelected',
  //   cache: false,
  //   templateUrl: 'templates/logistics/addressSelected.html',
  //   controller: 'ReceiverCtrl'
  // })
  // .state('confirmReceipt', {
  //   url: '/confirmReceipt',
  //   cache: false,
  //   templateUrl: 'templates/shopping/confirmReceipt.html',
  //   controller: 'OrderCtrl'
  // })
  //
  // .state('register', {
  //   url:'/register',
  //   cache:false,
  //   templateUrl: 'templates/auth/register.html',
  //   controller: 'RegisterCtrl'
  // })
  //
  // .state('forgetpassword', {
  //   url:'/forgetpassword',
  //   cache: false,
  //   templateUrl: 'templates/auth/forgetpassword.html',
  //   controller: 'RegisterCtrl'
  // })
  //
  // .state('resetpassword', {
  //   url: '/resetpassword',
  //   cache: false,
  //   templateUrl: 'templates/auth/resetpassword.html',
  //   controller: 'RegisterCtrl'
  // })
  //
  // .state('completeBasicInfo', {
  //   url: '/completeBasicInfo',
  //   cache: false,
  //   templateUrl: 'templates/auth/completeBasicInfo.html',
  //   controller: 'RegisterCtrl'
  // })
  //
  // .state('completeTenantInfo', {
  //   url: '/completeTenantInfo',
  //   cache: false,
  //   templateUrl: 'templates/auth/completeTenantInfo.html',
  //   controller: 'RegisterCtrl'
  // })
  //
  // .state('bindcard', {
  //   url: '/bindcard',
  //   cache: false,
  //   templateUrl: 'templates/auth/bindcard.html',
  //   controller: 'RegisterCtrl'
  // })
  //
  // .state('contactsList', {
  //   url: '/contactsList',
  //   cache: false,
  //   templateUrl: 'templates/auth/contactsList.html',
  //   controller: 'ContactsCtrl'
  // })
  //
  // .state('addContact', {
  //   url: '/addContact/:memberId',
  //   cache: false,
  //   templateUrl: 'templates/auth/addContact.html',
  //   controller: 'ContactsCtrl'
  // })
  //
  // .state('addCard', {
  //   url: '/addCard',
  //   cache: false,
  //   templateUrl: 'templates/auth/addCard.html',
  //   controller: 'CardCtrl'
  // })
  //
  // .state('bindMail', {
  //   url: '/bindMail',
  //   cache: false,
  //   templateUrl: 'templates/auth/bindMail.html',
  //   controller: 'ContactsCtrl'
  // })
  //
  // .state('property', {
  //   url: '/property',
  //   cache: false,
  //   templateUrl: 'templates/auth/property.html',
  //   controller: 'PropertyCtrl'
  // })
  //
  // .state('coupons', {
  //   url: '/coupons',
  //   cache: false,
  //   templateUrl: 'templates/auth/couponsList.html',
  //   controller: 'CardCtrl'
  // })
  //
  // .state('card', {
  //   url: '/card',
  //   cache: false,
  //   templateUrl: 'templates/auth/cardList.html',
  //   controller: 'CardCtrl'
  // })
  //
  // .state('propertyDetail', {
  //   url: '/propertyDetail',
  //   cache: false,
  //   templateUrl: 'templates/auth/propertyDetail.html',
  //   controller: 'PropertyCtrl'
  // })
  //
  // .state('detail', {
  //   url: '/accountdetail',
  //   cache: false,
  //   templateUrl: 'templates/account/accountdetail.html',
  //   controller: 'AccountCtrl'
  // })
  //
  // .state('signin', {
  //   url:'/signin',
  //   cache: false,
  //   templateUrl: 'templates/auth/signin.html',
  //   controller: 'SignInCtrl'
  // })
  //
  // .state('purchase', {
  //   url:'/purchase',
  //   cache: false,
  //   templateUrl:'templates/shopping/purchase.html',
  //   controller: 'confirmOrderCtrl'
  // })
  //
  // .state('advertisement', {
  //   url: '/advertisement',
  //   cache: false,
  //   templateUrl: 'templates/ad/advertisement.html',
  //   controller: 'adCtrl'
  // });
  //
  // // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('advertisement');

// });
.run(require('./app-main'))
.config(require('./routers'));
