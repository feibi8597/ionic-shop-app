/**
 * Created by toothless on 2017/4/25.
 */
 module.exports = function (m){
   m.controller('adCtrl', ['$scope', '$state', 'contentService', 'contentMsgService',
     function ($scope, $state, contentService, contentMsgService) {
       $scope.time = 3;
       var interval;

       $scope.skip = function () {
         if(localStorage.haslogin != 1) {
           $state.go("signin");
         } else {
           $state.go('mainMenu');
         }
         clearInterval(interval);
       };

       function run(){
         if($scope.time == 0){
           $scope.skip();
           return false;
         }
         $scope.time = $scope.time * 1 - 1;
       };

       function init() {
         getContent();
       }

       function getContent() {
         contentService.getContent().success(function (res) {
           if(res.msg == 'OK' && res.status == 200) {
             contentMsgService.setMsg(res.data);
             var ads = contentMsgService.getAdvertisement();
             var temp = ads[0].pic.replace(/\\/g,"/");
             $scope.bg_style = {"background-image": "url(" + temp + ")", "background-size": "100% 100%"};
             interval = window.setInterval(run, 1000);
           }
         });
       }

       init();

     }
  ]);
 };


