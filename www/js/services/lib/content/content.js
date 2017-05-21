/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('contentService', [
    '$http', function ($http) {
      function getContentByCode(code) {
        return $http.get('/ECommerce/api/content/get?cat=' + code);
      }
      function getContent() {
        return $http.get('/ECommerce/api/content/list');
      }
      return {
        getContentByCode: getContentByCode,
        getContent: getContent
      }
    }
  ]);
};
