/**
 * Created by toothless on 2017/4/27.
 */
var m = angular.module("woaijiu.directives", []);

require("./lib/registerDirective")(m);
require("./lib/barDirective")(m);

module.exports = m;
