$(document).ready(function() {
  $('.sidenav').sidenav();

  $('.tooltipped').tooltip();
  $('.modal').modal();
  $('.parallax').parallax();
  $('.carousel.carousel-slider').carousel({
     fullWidth: true,
     indicators: true
   });

  M.updateTextFields();
  $('select').formSelect();
  $('.collapsible').collapsible();
  $('input.autocomplete').autocomplete({
    data: {
      "#todayisaw": null,
      "#todayilearned": null,
      "#todayifuckedup": null,
    },
  });



});
