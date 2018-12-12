$('.autocomplete').on('click', function() {
  if ($("ul").hasClass("autocomplete-content")) {
    $("ul").css({"margin-top": "-50px;"});

  }
  console.log("clicked");
});



$('.tag1').on('click', function() {
  var hashtagTitle = $(this).closest('div[class^=col]').find('.amount').html();
  sessionStorage.setItem("hashtagTitle", hashtagTitle);
  $('.tag1').animateCss('bounce', function() {
    window.open("hashtag.html", '_self');
  });
});

$('.tag2').on('click', function() {
  var hashtagTitle = $(this).closest('div[class^=col]').find('.amount').html();
  sessionStorage.setItem("hashtagTitle", hashtagTitle);
  $('.tag2').animateCss('bounce', function() {
    window.open("hashtag.html", '_self');
  });
});

$('.tag3').on('click', function() {
  var hashtagTitle = $(this).closest('div[class^=col]').find('.amount').html();
  sessionStorage.setItem("hashtagTitle", hashtagTitle);
  $('.tag3').animateCss('bounce', function() {
    window.open("hashtag.html", '_self');
  });
});

$('.hideTags').on('click', function() {
  if ($("li").hasClass("active")) {
    $("#popularTags").show('fadeInDown');
    $("#popularThreadText").show('fadeInDown');
  } else {
    $("#popularTags").hide('fadeOutUp');
    $("#popularThreadText").hide('fadeOutUp');
  }
  console.log("clicked");
});
$('.active').on('click', function() {
  $("#popularTags").show();
  $("#popularThreadText").show();

});

function hashtagPage() {
  var hashtagTitle = sessionStorage.getItem("hashtagTitle");
  console.log(hashtagTitle);
  $('#pageTitle').html(hashtagTitle);
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
