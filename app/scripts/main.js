'use strict';

var myApp = myApp || {};

$(document).ready(function(){

  myApp.toggle.init();

  // custom select only for IE9+
  if($('.lt-ie9').length === 0) {
    $('.js-select').selectpicker()
    myApp.selectAnimate.init();
  }

  // disable disabled
  $('.btn.disabled').on('click', function(e) {
    // this shoudn't unbind custom events
    // custom events shoud be handled elsewhere
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  // IE8 readonly radio and checkbox fix
  if($('.lt-ie9').length !== 0) {
    $('[readonly] + .radio-custom,' +
      '[readonly] + .radio-custom + .radio-label,' +
      '[readonly] + .checkbox-custom,' + 
      '[readonly] + .checkbox-custom + .checkbox-label,' + 
      '.readonly + .radio-custom,' +
      '.readonly + .radio-custom + .radio-label,' +
      '.readonly + .checkbox-custom,' +
      '.readonly + .checkbox-custom + .checkbox-label').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
  }

});