/**
 * Created by toothless on 2017/4/26.
 */
module.exports = function (m) {
  m.factory('registerMsgService', function () {
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
  });
};
