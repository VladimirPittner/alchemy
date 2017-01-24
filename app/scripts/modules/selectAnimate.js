// ---------------------------------------------------
// selectAnimate
// script providing correct behavior of select with animation

'use strict';

var myApp = myApp || {};

myApp.selectAnimate = (function($) {

  var _$elements = $('.js-select.custom-select');

  // Bind events to elements
  function _binds() {

    _$elements.on('click', function(){
      // wait for animation to end
      var $dropdown = $($(this).find('.custom-select-dropdown-wrap'));

      if( $(this).hasClass('open')) {
        _waitAndHide($dropdown);
      } else {
        $dropdown.show();
      }

    });
  }

  function _waitAndHide($dropdown) {

    $dropdown.on('transitionend oTransitionEnd transitionend webkitTransitionEnd', function(){
      $(this).hide();
      $(this).parent().find('.dropdown-toggle').focus();
      $(this).off('transitionend oTransitionEnd transitionend webkitTransitionEnd');
    });

  }

  function init(target) {
    if (target) { _$elements = $(target); }
    
    _binds();
  } 

  // Public API
  return {
    init : init
  };

})(jQuery);