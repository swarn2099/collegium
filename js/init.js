$(document).ready(function(){
  $('.collapsible').collapsible();

    $('.parallax').parallax();

    $('.your-class').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      // arrows: true,
      // dots: true,
      // centerPadding: 10,

    });
    $('.tabs').tabs();
    $('.scrollspy').scrollSpy();
    M.updateTextFields();
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
    });
    $('.modal').modal();

    $('.sidenav').sidenav();
    $('.tooltipped').tooltip();

    $('.dropdown-trigger').dropdown();
    $('.datepicker').datepicker({
      autoClose: true
    });
    $('select').formSelect();
    $('.timepicker').timepicker({
      vibrate: true,
      showClearBtn: true,
    });
    $(".button-collapse").sideNav();

  }); // end of document ready
