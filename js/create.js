function createGamer() {
  var first = document.getElementById('first_name');
  var last = document.getElementById('last_name');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var twitch = document.getElementById('twitch');
  var bio = document.getElementById('bio');
  var miniBio = document.getElementById('miniBio');
  var bannerImage = document.getElementById('bannerImage');
  var video1 = document.getElementById('twitchClip1');
  var video2 = document.getElementById('twitchClip2');
  var video3 = document.getElementById('twitchClip3');
  var game1 = document.getElementById('favGame1');
  var game2 = document.getElementById('favGame2');
  var game3 = document.getElementById('favGame3');
  var instagram = document.getElementById('instagram');
  var twitter = document.getElementById('twitter');
  var youtube = document.getElementById('youtube');
  var gameImage = document.getElementById('gameImage');

  if(!bannerImage){
    console.log("They dont want a picture, we'll add one");
  }
  db.collection("gamers").doc(twitch.value).set({
      first: first.value,
      name: last.value,
      email: email.value,
      password: password.value,
      twitch: twitch.value,
      bio: bio.value,
      miniBio: miniBio.value,
      bannerImage: bannerImage.value,
      twitchClip1: video1.value,
      twitchClip2: video2.value,
      twitchClip3: video3.value,
      game1: game1.value,
      game2: game2.value,
      game3: game3.value,
      squad: 0,
      instagram: instagram.value,
      twitter: twitter.value,
      youtube: youtube.value,
      gameImage: gameImage.value

    })
    .then(function() {
      console.log("Document successfully written!");
      M.toast({html: 'Welcome to Collgium Gamer!'})
      M.toast({html: 'Find your new page at the bottom of the Gaming section.'})
      M.toast({html: 'If you want to edit your page, click the settings icon on the left side and login'})

    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

}
