/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('contentMsgService', function () {
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
        if(banner.title == 'ads') {
          return banner;
        }
      });
    }
    function getAdvertisement() {
      return advertisement;
    }
    function setMainBanner() {
      main_banner = _.filter(allbanners, function (banner) {
        if(banner.title == 'carousel_main') {
          return banner;
        }
      });
    }
    function getMainBanner() {
      return main_banner;
    }
    function setShopBanner() {
      shop_banner = _.filter(allbanners, function (banner) {
        if(banner.title == 'carousel_shop') {
          return banner;
        }
      });
    }
    function getShopBanner() {
      return shop_banner
    }
    return {
      setMsg: setMsg,
      getAdvertisement: getAdvertisement,
      getMainBanner: getMainBanner,
      getShopBanner: getShopBanner
    }
  });
};
