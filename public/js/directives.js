'use strict';

angular.module('mean').directive('clock', function($timeout, dateFilter){
    return function(scope, element, attrs){
       var timeoutId; // timeoutId, so that we can cancel the time updates
 
      // schedule update in one second
      function updateLater() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          element.text(dateFilter(new Date(), 'medium'));
          updateLater(); // schedule another update
        }, 1000);
      }

      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
 
      updateLater(); // kick off the UI update process.
    }
});

angular.module('mean').directive('translateInterpreteId', function($timeout, dateFilter){
    return {
        restrict: 'A',
        scope: {
            interpte: '@',
            interpretes: '@'
        },
        link: function (scope, elem, attrs) {
          var nameInterprete = '';
          angular.forEach(eval(attrs.interpretes), function(value, key){
            if(value._id == attrs.interpte){
              nameInterprete = value.name;
            }
          });
          elem.text(nameInterprete);
        }
    };
});

angular.module('mean').directive('translateQueryId', function($timeout, dateFilter){
    return {
        restrict: 'A',
        scope: {
            query: '@',
            querys: '@'
        },
        link: function (scope, elem, attrs) {
          var nameQuery = '';
          angular.forEach(eval(attrs.querys), function(value, key){
            if(value._id == attrs.query){
              nameQuery = value.name;
            }
          });
          elem.text(nameQuery);
        }
    };
});



