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
  let expiredMsg = 'EXPIRED';

  const getTimeRemaining = (t) => {
    const total = Date.parse(t) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  const formatTime = (t) => {
    const timeFormat = ['d', 'h', 'm', 's'].reverse();

    return [
      ...[t.seconds, t.minutes, t.hours].map(e => ('0' + e).slice(-2)),
      t.days
    ].filter(e=>e).map((item, index) => `${item}${timeFormat[index]}`).reverse().join(' ');
  }

  const initializeClock = (clock, endtime, expired = '', prefix = '') => {
    const timeinterval = setInterval(updateClock, 1000);

    function updateClock() {
      const t = getTimeRemaining(endtime);
      
      clock.innerHTML = formatTime(t);

      if (t.total <= 0) {
        clearInterval(timeinterval);
        clock.innerHTML = expired ? expired : expiredMsg;
      }
    }

    updateClock();
  }

  const countdown = document.querySelectorAll('countdown');

  [...countdown].forEach(c => {
    const deadline = new Date(c.dataset.deadline);
    const expired = c.dataset.expired;
    const prefix = c.dataset.prefix;
    initializeClock(c, deadline, expired, prefix);
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