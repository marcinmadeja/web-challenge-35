/* global $ */
import dom from './dom';

const SLIDER_API = (function () {
  const progressInterval = 300;

  function resetProgress(element) {
    console.log(element);
    element[0].style.flexBasis = 0;
  }

  function updateProgress(element, progress, time) {
    const percent = ((progress / time) * 100);
    const currentTime = progress + progressInterval;
    element[0].style.flexBasis = `${percent}%`;

    console.log(currentTime);

    setTimeout(() => {
      if (percent < 100) {
        updateProgress(element, currentTime, time);
      } else {
        resetProgress(element);
      }
    }, progressInterval);
  }

  function startProgressBar(element, time, startProgress = 0) {
    console.log(element);

    setTimeout(() => {
      updateProgress(element, startProgress, time);
    }, progressInterval);
  }


  function mainSliderInit() {
    const mainSliderLabels = ['intro', 'work', 'about', 'contacts'];

    dom.slider.slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 760,
          settings: {
            dots: false,
          },
        },
      ],      
    });

    const sliderDots = $('.slick-dots li');
    sliderDots.each(function (index) {
      const number = `0${index + 1}`;
      $(this).html(`
        <div class="h-slider__progress"><div class="h-slider__progress-filled"></div></div>
        <div class="h-slider__dots-text">
          <strong>${number}</strong> ${mainSliderLabels[index]}
        </div>
      `);
    });   
  }

  return {
    mainSliderInit,
  };
}());

export default SLIDER_API;
