/* global $ */

import 'slick-carousel/slick/slick.min';
import 'perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min';
import dom from './dom';
import SLIDER_API from './slider';

function debounce(func, wait = 10, immediate = true) {
  let timeout;

  return function (...args) {
    const context = this; 
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const PAGE_API = (function () {
  function slickInit() {
    SLIDER_API.mainSliderInit();

    dom.logos_list.slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1,
          },
        },         
      ],
    });

    dom.testimonials_list.slick();
  }

  function initResNavigationActions() {
    const btn = dom.responsiveBtn;
    btn.on('click tap', function () {
      $(this).closest('.l-nav').toggleClass('l-nav__is-active');
    });
  }

  function scrollbarInit() {
    dom.scroll_text.perfectScrollbar({
      scrollYMarginOffset: 20,
    });    
  }

  function preventEmptyLink() {
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });
  }

  function navFixed() {
    const scroll = $(window).scrollTop();
    console.log(scroll);

    if (scroll >= 160) {
      dom.header.addClass('is_fixed');
    } else {
      dom.header.removeClass('is_fixed');
    }
  }

  function setActiveLink() {
    const scrollPos = $(document).scrollTop();

    dom.nav.find('a').each(function () {
      const link = $(this);
      const refElement = $(link.attr('href'));
      const refElementTop = refElement.position().top;

      if (refElementTop < (scrollPos + 15) && refElementTop + refElement.height() > scrollPos) {
        dom.header.find('a').removeClass('is_active');
        link.addClass('is_active');
        return false;
      }
    });
  }  

  function onScroll() {
    navFixed();
    setActiveLink();
  }  

  function setSmoothScrollingToAnchor() {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        let target = $(this.hash);
        const closestIsActive = $(this).closest('.is_active');
        const navHeight = dom.header.height();

        if (closestIsActive.length > 0) {
          closestIsActive.removeClass('is_active');
        }

        target = target.length ? target : $(`[name='${this.hash.slice(1)}]`);
        
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - navHeight,
          }, 1300);
          return false;
        }
      }
    });
  }

  function switchScrollBars() {
    const header = $('.s-wwd__item-header');
    const items = $('.s-wwd__item');

    header.on('click', function () {
      const item = $(this).closest('.s-wwd__item');
      if (item.hasClass('is_active')) return false;
      
      items.removeClass('is_active');
      item.addClass('is_active');
    });
  }

  function init() {
    slickInit();
    scrollbarInit();
    $(document).on('scroll', debounce(onScroll));

    preventEmptyLink();
    setSmoothScrollingToAnchor();
    onScroll();
    switchScrollBars();
    initResNavigationActions();
  }

  return {
    init,
  };
}());

$(document).ready(function () {
  PAGE_API.init();
});
