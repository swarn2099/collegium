$('li').on('click', function() {
  $('.tag1').animateCss('bounce', function() {
    window.open("hashtag.html", '_self');
  });
});


function hashtagPageLoad(d) {
  // var hashtagTitle = $(this).data("title")
  console.log(d.getAttribute("data-title"));
  sessionStorage.setItem("hashtagTitle", d.getAttribute("data-title"));
  sessionStorage.setItem("hashtagDescription", d.getAttribute("data-description"));
    window.open("hashtag.html", '_self');

  // $('.tag1').animateCss('bounce', function() {
  // });
}
// function moveUpandHide(){
//   $('.hideTags').on('click', function() {
//   if ($("li").hasClass("active")) {
//     $("#popularTags").show('fadeInDown');
//     $("#popularThreadText").show('fadeInDown');
//   } else {
//     $("#popularTags").hide('fadeOutUp');
//     $("#popularThreadText").hide('fadeOutUp');
//   }
//   console.log("clicked");
// });
// $('.active').on('click', function() {
//   $("#popularTags").show();
//   $("#popularThreadText").show();
// });
// }

function hashtagPage() {
  var hashtagTitle = sessionStorage.getItem("hashtagTitle");
  var hashtagDescription = sessionStorage.getItem("hashtagDescription");

  $('#pageTitle').html(hashtagTitle);
  $('#pageDescription').html(hashtagDescription);

}












//
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});
