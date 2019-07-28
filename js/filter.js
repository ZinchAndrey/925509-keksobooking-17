'use strict';

(function () {
  var filter = function () {
    console.log('test');
  };
  filter();

  window.filter = {
    filter: filter
  };
})();
