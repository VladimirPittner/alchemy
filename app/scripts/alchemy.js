'use strict';

var alchemyApp = alchemyApp || {};

$(document).ready(function(){

  SmoothScroll.init();
  HeaderCollapse.init('body', 0);
  Sidebars.init();
  prettyPrint();

});

// ----------------------------
// HeaderCollapse

  var HeaderCollapse = {
    init: function(target, offset) {
      this.element = $('.js-header');
      this.offset = offset;
      this.target = $(target);
      this.didScroll = true;
      this.binds();
      this.animating = false
      this.tempScroll = 0;
    },
    binds: function(){
      var self = this;

      $(window).on('scroll', function(){
        self.didScroll = true;
      });

      setInterval(function(){
        if(self.didScroll) {

          if($(this).scrollTop() > 0 && $(this).scrollTop() > self.tempScroll) {

            if( !self.animating) {
              if(!self.target.hasClass('scrolled')) {
                self.target.addClass('scrolled');
                self.animating = true;
                $(window).trigger('scrolled');
                setTimeout(function(){
                  self.animating = false;
                },200)
              }
            }
          } else if($(this).scrollTop() < self.tempScroll && $(this).scrollTop() < 1){
            if( !self.animating) {
              if(self.target.hasClass('scrolled')) {
                self.target.removeClass('scrolled');
                self.animating = true;
                $(window).trigger('scrolled');
                setTimeout(function(){
                  self.animating = false;
                },200)
              }
            }
          }
          self.didScroll = false;
          self.tempScroll = $(this).scrollTop();
        }
      }, 100);
    }
  }

// ----------------------------
// Sidebars

  var Sidebars = {
    init: function(){
        this.sidebars = $('.js-scrollbar');
        this.didResize = true;

        this.setHeights($('body').hasClass('scrolled')?72:100);
        this.binds();
        this.setScollbars();
    },
    binds: function(){
        var self = this;
        $(window).on('resize', function(){
            self.didResize = true;
        });

        $(window).on('scrolled', function(){
          if($('body').hasClass('scrolled')) {
            self.setHeights(72);
          } else {
            self.setHeights(100);
          }
        })

        setInterval(function(){
          if(self.didResize) {
            self.setHeights($('body').hasClass('scrolled')?72:100);
            self.didResize = false;
          }
        }, 250);
    },
    setHeights: function(offset){
        var viewportHeight = $(window).height() - offset;
        this.sidebars.each(function(){
            $(this).css('height', viewportHeight);
        });
    },
    setScollbars: function(){
        this.sidebars.mCustomScrollbar({
            theme: 'dark-thick',
            scrollButtons: {
                enable: false
            },
            scrollInertia: 200,
            autoHideScollbar: true,
            advanced: {
                updateOnContentResize: true
            }
        });
    }
  } // /Sidebars

// ----------------------------
// SmoothScroll

var SmoothScroll = {
    options: {
        offset: 0,
        duration: 500
    },
    init: function(options){
        this.$triggers = $('[data-smoothscroll]');

        this.options.offset = (options && options.offset) || this.options.offset;
        this.options.duration = (options && options.duration) || this.options.duration;

        this.binds();
    },
    binds: function(){
        var that = this;
        that.$triggers.on('click.smoothscroll', function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).data('smoothscroll') != 'none' ? that.smoothscroll($(this)) : '';
        });
    },
    smoothscroll: function($trigger){
        var that = this;
        var $target = $($trigger.data('smoothscroll'));

        that.options.offset = parseInt($('body').css('padding-top'),10);

        var offset = $target.offset().top - that.options.offset;
        var scroll = $('body').scrollTop() == 0 ?
            $('html').scrollTop() :
            $('body').scrollTop(); // Scroll position fix
        var duration = Math.abs(offset - scroll) < 5 ? 0 : that.options.duration;

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - that.options.offset
        }, duration, 'swing', function () {
            //window.location.hash = $trigger.data('smoothscroll');
            $('body').trigger('smoothscroll-stop');
        });
    }
} // /SmoothScroll
