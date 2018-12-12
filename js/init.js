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

  db.collection("hashtags").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  });

});
