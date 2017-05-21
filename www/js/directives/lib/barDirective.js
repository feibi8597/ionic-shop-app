/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function(m) {
  m.directive('translucentBar', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
    return {
      scope:false.false,
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        var el = angular.element(element);
        var ion = angular.element(element).parent().find('ion-content').css({top: 0});
        var delegateHandle = attrs.translucentBar;
        var translucentColorOpacity = attrs.translucentColorOpacity;
        var translucentColor = attrs.translucentColor;
        var translucentScrollMaxtop = attrs.translucentScrollMaxtop;
        var translucentColorTotal = attrs.translucentColorTotal;
        if(!delegateHandle) {
          console.log('please dingfine the ion-content of delegate-handle');
        }
        if(!translucentColorOpacity) {
          console.log('you must set translucentColorOpacity directive of the value');
        }
        if(!translucentColor) {
          console.log('you must set translucentColor directive of the value');
        }

        if(!translucentScrollMaxtop) {
          translucentScrollMaxtop = 88;
        }

        if(!translucentColorTotal) {
          translucentColorTotal = 90;
        }

        var rgb = translucentColor.substring(4,translucentColor.length-1);

        var initCss = {
          'background': "rgba("+rgb+","+translucentColorOpacity+")"
        };

        el.css(initCss);

        var scroollTop = null;
        var distance = null;
        var opacity  = null;
        var translucentCss = null;

        scope.$$childHead.$onScroll = function() {
          distance   = $ionicScrollDelegate.$getByHandle(delegateHandle).getScrollPosition();
          scroollTop = distance.top;

          if(scroollTop <= translucentScrollMaxtop) {
            opacity = scroollTop / translucentColorTotal;
            translucentCss = {
              'background': "rgba("+rgb+","+opacity+")"
            };

            el.css(translucentCss);
          }
        }
      }
    };
    }
  ]);
};
