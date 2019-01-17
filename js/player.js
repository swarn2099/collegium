
function openPlayerPage(d) {
  window.open("player.html", "_self")

  console.log(d.getAttribute("data-playerName"));
  sessionStorage.setItem("playerDataName", d.getAttribute("data-playerName"));
}
function openPlayerPagefromHome(d) {
  window.open("www/player.html", "_self")

  console.log(d.getAttribute("data-playerName"));
  sessionStorage.setItem("playerDataName", d.getAttribute("data-playerName"));
}

function loadPlayer() {

  var playerName = sessionStorage.getItem("playerDataName");
console.log("SESSION PLAYER NAME IS: ", playerName);
  var docRef = db.collection("gamers").doc(playerName);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());

      //header
      var banner = '<header style="position: relative; height: 450px; background: linear-gradient(30deg, #004092, transparent, transparent), url(' + doc.data().bannerImage + ');   background-size: cover; "><div class="row"><div class="col s4"><h3 class="white-text" style="margin-left: 25%;">' + doc.data().twitch + '</h3><h6 class="white-text" style="margin-left: 25%;">'+doc.data().miniBio+'</h6><hr color="white" /><div class="row" style="margin-left: 25%;"><div class="col s6"></div></div><div class="row" style="margin-left: 25%;"><div class="col s3"><a href="'+doc.data().instagram+'"><img width="50%" src="https://cdn2.iconfinder.com/data/icons/instagram-new/512/instagram-logo-color-512.png"></img></a></div><div class="col s3 "><a href="'+doc.data().twitter+'"><img width="50%" src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png"></img></a></div><div class="col s3 "><a href="'+doc.data().youtube+'"><img width="50%" src="https://images.vexels.com/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo-by-vexels.png"></img></a></div><div class="col s3"><a class="waves-effect waves-light btn white black-text" style="margin-left: 25%; border-radius: 20px;"></a></div></div></div><div class="col s3 push-s1"><!-- Twitch Live Stream --><div id="twitch-embed" style="margin-top: 5%;"></div></div><div class="row s6 right-align"><iframe frameborder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/embed/'+doc.data().twitch+'/chat" height="400" width="300" style="margin-top: 1%; margin-right: 1%;"></iframe></div></div></header>';
      $('#banner').append(banner);


      //squads


      //twitch
      new Twitch.Embed("twitch-embed", {
        width: 650,
        height: 400,
        channel: doc.data().twitch,
        layout: "video"
      });
      if(doc.data().twitchClip1 == ""){
        console.log("Something is there");
      }else{
        $('#twitchClips').hide();
        //twitch clips
        var clip1 = doc.data().twitchClip1;
        var clip12 = clip1.split("clip/");
        var clip123 = clip12[1];
        var clip1234 = clip123.split("?");
        var clip12345 = clip1234[0];
        //
        var clipA = doc.data().twitchClip2;
        var clipAB = clipA.split("clip/");
        var clipABC = clipAB[1];
        var clipABCD = clipABC.split("?");
        var clipABCDE = clipABCD[0];
        //
        var clipA1 = doc.data().twitchClip3;
        var clipAB1 = clipA1.split("clip/");
        var clipABC1 = clipAB1[1];
        var clipABCD1 = clipABC1.split("?");
        var clipABCDE1 = clipABCD1[0];

        console.log("SPLIT STRING => ", clip12345);
        var twitch1 = '<iframe src="https://clips.twitch.tv/embed?clip=' + clip12345 + '" width="400" height="360" frameborder="0" scrolling="no" allowfullscreen="true" autoplay="false"> </iframe>';
        var twitch2 = '<iframe src="https://clips.twitch.tv/embed?clip=' + clipABCDE  + '" width="400" height="360" frameborder="0" scrolling="no" allowfullscreen="true" autoplay="false"> </iframe>';
        var twitch3 = '<iframe src="https://clips.twitch.tv/embed?clip=' + clipABCDE1  + '" width="400" height="360" frameborder="0" scrolling="no" allowfullscreen="true" autoplay="false"> </iframe>';

        $('#twitch1').append(twitch1);
        $('#twitch2').append(twitch2);
        $('#twitch3').append(twitch3);
      }

      if(doc.data().bio == ""){
        console.log("Something isn't there");
      }else{
        $('#bioHide').hide();
        //twitch clips
        //my bio
        console.log("bio", " => ", doc.data().bio);
        var bio = doc.data().bio
        $('#bio').append(bio);
      }





      //my games

      var game1 = '<div class="left-align"><div class="card   black-text " style="width: 50%; margin-left: 5%;"><div class="card-content black-text"><span class="card-title center-align"><h6><b>' + doc.data().game1 + '</b></h6></span></div></div></div>';
      var game2 = '<div class="left-align"><div class="card   black-text " style="width: 50%; margin-left: 5%;"><div class="card-content black-text"><span class="card-title center-align"><h6><b>' + doc.data().game2 + '</b></h6></span></div></div></div>';
      var game3 = '<div class="left-align"><div class="card   black-text " style="width: 50%; margin-left: 5%;"><div class="card-content black-text"><span class="card-title center-align"><h6><b>' + doc.data().game3 + '</b></h6></span></div></div></div>';
      if(doc.data().game1 == ""){
        console.log("nothing here");
      } else {
        $('#gameHide').hide();
        $('#game1').append(game1);
      }
      if(doc.data().game2 == ""){
        console.log("nothing here");
      } else {
        $('#gameHide').hide();
        $('#game2').append(game2);
      }
      if(doc.data().game3 == ""){
        console.log("nothing here");
      } else {
        $('#gameHide').hide();
        $('#game3').append(game3);
      }


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

}



function commentThreadHome() {

  var commentContent = document.getElementById('commentHome');
  console.log(commentContent.value);
  db.collection("gamers").doc("marcoflores").update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        name: "Bro",
        content: commentContent.value
      })
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}
