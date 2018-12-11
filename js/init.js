$(document).ready(function(){
   $('.modal').modal();
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

});
