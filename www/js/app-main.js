/**
 * Created by toothless on 2017/4/25.
 */
'use strict';

function AppMain($ionicPlatform, $ionicHistory, $ionicConfig, $rootScope) {
  $rootScope.win_W = window.innerWidth;
  $rootScope.win_H = window.innerHeight;
  $ionicConfig.platform.ios.tabs.style('standard');
  $ionicConfig.platform.ios.tabs.position('bottom');
  $ionicConfig.platform.android.tabs.style('standard');
  $ionicConfig.platform.android.tabs.position('standard');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}

module.exports = ['$ionicPlatform', '$ionicHistory', '$ionicConfig', '$rootScope', AppMain];
