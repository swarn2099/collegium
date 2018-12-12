$(document).ready(function() {
  $('.modal').modal();
  $('.parallax').parallax();

  M.updateTextFields();
  $('select').formSelect();
  $('.collapsible').collapsible();
  $('input.autocomplete').autocomplete({
    data: {
      "todayIsaw": null,
      "todayIlearned": null,
      "todayifuckedup": null,
    },
  });
  console.log("welcome to collegium");



});
