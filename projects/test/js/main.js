// Hamburger animation
$(document).ready(function () {
  $('.hamburger').click(function () {
    $(this).toggleClass("is-active");
    if($(this).hasClass("is-active")){
      $('#sidebar').css("width", "250px");
    } else{
      $('#sidebar').css("width", "0");
    }
  });
});

// Images sliding in
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  sliderImages.forEach(sliderImage => {
    // halfway through the image
    const slideInAt = (window.scrollY + window.innerHeight) -
      sliderImage.height / 2;
    // bottom of image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown & isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

const easeImages = document.querySelectorAll('.ease-in');

function checkEase(e) {
  easeImages.forEach(easeImages => {
    // halfway through the image
    const easeInAt = (window.scrollY + window.innerHeight) -
      easeImages.height / 2;
    // bottom of image
    const imageBottom = easeImages.offsetTop + easeImages.height;
    const isHalfShown = easeInAt > easeImages.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown & isNotScrolledPast) {
      easeImages.classList.add('active');
    } else {
      easeImages.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkEase));
window.addEventListener('scroll', debounce(checkSlide));

// Smooth Scroll
var scroll = new SmoothScroll('a[href*="#"]');