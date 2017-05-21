/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('authService', [
    '$q', '$http',
    function ($q, $http) {
      var _userInfo = null;
      var _tenantInfo = null;

      function retrieveUserInfo(token) {
        return $http.get("/ECommerce/api/auth/getLoginUser?token=" + token);
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
        $http.post('/ECommerce/api/user/login', angular.toJson(data)).success(function (result) {
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
        $http.get('/ECommerce/api/user/logout?token=' + localStorage.access_token).success(function (res) {
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
        return $http.post('/ECommerce/api/user/register', object);
      }

      return {
        login: login,
        logout: logout,
        register: register,
        setUser: setUser,
        setTenant: setTenant
      }
    }
  ]);
};
