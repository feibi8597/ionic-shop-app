/**
 * Created by toothless on 2017/4/26.
 */
var m = angular.module('woaijiu.services', []);

require('./lib/auth/auth')(m);
require('./lib/auth/register')(m);

require('./lib/product/product')(m);
require('./lib/product/productMsg')(m);

require('./lib/receiver/receiver')(m);
require('./lib/receiver/receiverMsg')(m);

require('./lib/order/order')(m);
require('./lib/order/orderMsg')(m);

require('./lib/content/content')(m);
require('./lib/content/contentMsg')(m);

require('./lib/logistic/logistic')(m);
require('./lib/logistic/logisticMsg')(m);

require('./lib/member/member')(m);
require('./lib/member/memberMsg')(m);

require('./lib/system/system')(m);
require('./lib/cart/cart')(m);

require('./lib/area/area')(m);

require('./lib/payment/payment')(m);

module.exports = m;
