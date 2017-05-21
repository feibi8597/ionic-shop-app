/**
 * Created by toothless on 2016/12/20.
 */
var m = angular.module('woaijiu.controllers', ['ngCordova', 'ionic-datepicker']);

require('./lib/tab/chats')(m);
require('./lib/tab/account')(m);
require('./lib/tab/websites')(m);
require('./lib/tab/discovery')(m);

require('./lib/msg/message')(m);

require('./lib/order/orderlist')(m);
require('./lib/order/orderdetail')(m);
require('./lib/order/confirm')(m);
require('./lib/order/payment')(m);

require('./lib/product/productdetail')(m);
require('./lib/product/advertisement')(m);

require('./lib/auth/signin')(m);
require('./lib/auth/main')(m);
require('./lib/auth/register')(m);
require('./lib/auth/card')(m);

require('./lib/receiver/receiver')(m);
require('./lib/receiver/contact')(m);

require('./lib/property/property')(m);

module.exports = m;
