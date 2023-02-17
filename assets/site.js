(function ($) {

var _nef = window._nef || {};

_nef.utils = (() => {
  document.onkeydown((e) => {
    console.log(e)
  })
})

var $grid = $('.grid--masonry');

_nef.masonry = function() {
  
  $grid.imagesLoaded( function() {
    $grid.masonry();
  });

};

_nef.stickyHeader = function() {

  var delta = 5;
  var scrollPosition = $(window).scrollTop();
  
  var scrollDown = function() {
    $('body').addClass('has-scrolled');
  };
  
  var scrollUp = function() {
    if ( (window.innerHeight + window.scrollY + delta) < document.body.offsetHeight ) {
      $('body:not(.prevent-scrolling)').removeClass('has-scrolled');
    }
  };
  
  $(window).on('resize', function(e) {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 0) {
      scrollDown();
    } else {
      scrollUp();
    }
  }).on('scroll', function(e) {
    var scrollTop = $(window).scrollTop();
    var headerHeight = $('.site-header').height();

    if (Math.abs(scrollPosition - scrollTop) <= delta) {
      return;
    }
    
    if (scrollTop > scrollPosition && scrollTop > headerHeight) {
      scrollDown();
    } else {
      scrollUp();
    }
    scrollPosition = scrollTop;
  });

};

_nef.readMore = function() {

  $('.readmore__toggle').on('click', function(e) {
    e.preventDefault();
    $(this).hide();
    $(this).siblings('.readmore__short').hide();
    $(this).siblings('.readmore__full').show();
    $grid.masonry();
  });

};

_nef.smoothScroll = function() {

  var headerHeight = $('.site-header').height();

  var options = {
    duration: 800,
    easing: 'easeOutQuint'
  };

  $(".smooth-scroll a, a.smooth-scroll").on("click", function (e) {
    e.preventDefault();
    const href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(href).offset().top - headerHeight }, options);
  });

};

_nef.carousel = function() {

  $(window).on('shopify:section:load', function() {
    $('.carousel').flickity({
      imagesLoaded: true,
      wrapAround: true,
      prevNextButtons: false
    });
  });

};

$(function() {
  _nef.utils()
  _nef.masonry()
  _nef.stickyHeader()
  _nef.readMore()
  _nef.smoothScroll()
  _nef.carousel()
})

})(jQuery)