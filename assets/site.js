(function ($) {

const _nef = window._nef || {};

const $grid = $('.grid--masonry');

_nef.masonry = () => {
  $grid.imagesLoaded( () => $grid.masonry() );
};

_nef.stickyHeader = () => {
  const delta = 5;
  let scrollPosition = $(window).scrollTop();
  
  const scrollDown = () => $('body').addClass('has-scrolled');
  
  const scrollUp = () => {
    if ( (window.innerHeight + window.scrollY + delta) < document.body.offsetHeight ) {
      $('body:not(.prevent-scrolling)').removeClass('has-scrolled');
    }
  };
  
  $(window).on('resize', function(e) {
    const scrollTop = $(window).scrollTop();
    (scrollTop > 0) ? scrollDown() : scrollUp();
  }).on('scroll', function(e) {
    const scrollTop = $(window).scrollTop();
    const headerHeight = $('.site-header').height();

    if (Math.abs(scrollPosition - scrollTop) <= delta) {
      return;
    }
    
    (scrollTop > scrollPosition && scrollTop > headerHeight) ? scrollDown() : scrollUp();
    scrollPosition = scrollTop;
  });
};

_nef.readMore = () => {
  $('.readmore__toggle').on('click', function(e) {
    e.preventDefault();
    $(this).hide();
    $(this).siblings('.readmore__short').hide();
    $(this).siblings('.readmore__full').show();
    $grid.masonry();
  });
};

_nef.smoothScroll = () => {
  const headerHeight = $('.site-header').height();
  const options = {
    duration: 100,
    easing: 'easeOutExpo'
  };

  $(".smooth-scroll a, a.smooth-scroll").on("click", function (e) {
    e.preventDefault();
    const href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(href).offset().top - headerHeight }, options);
  });
};

_nef.carousel = () => {
  $(window).on('shopify:section:load', () => {
    $('.carousel').flickity({
      imagesLoaded: true,
      wrapAround: true,
      prevNextButtons: false
    });
  });
};

_nef.countdown = () => {
  const countdown = document.querySelectorAll('countdown');

  countdown.forEach(c => {
    const cDate = new Date(c.dataset.date).getTime();
      
      const x = setInterval(() => {
        var now = new Date().getTime();
        var dist = cDate - now;
        var d = Math.floor(dist / (1000 * 60 * 60 * 24));
        var h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((dist % (1000 * 60)) / 1000);

        c.innerHTML = d + "d " + h + "h " + m + "m " + s + "s ";

        if (dist < 0) {
          clearInterval(x);
          c.innerHTML = "EXPIRED";
        }
      }, 1000);
  });
}

$(function() {
  _nef.masonry();
  _nef.stickyHeader();
  _nef.readMore();
  _nef.smoothScroll();
  _nef.carousel();
  _nef.countdown();
})

})(jQuery)