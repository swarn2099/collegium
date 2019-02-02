function startTournament() {
  var name = document.getElementById('epic');
  var washingtonRef = db.collection("weekly").doc(name.value);
  return washingtonRef.update({
      ready: true
  })
  .then(function() {
      console.log("Document successfully updated!");
      M.toast({
        html: 'You have started the tournament. Good luck :)',
        classes: 'rounded green white-text'
      });
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
      M.toast({
        html: 'Something went wrong. Try Again?',
        classes: 'rounded red white-text'
      });
  });
}

function loadPlayer() {


  var docRef = db.collection("tournaments").doc('A6W0IedLgBF6jz9cHaIr');
  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      //header
      var banner = '<header style="position: relative; height: 450px; background: linear-gradient(30deg, #004092, transparent, transparent), url(' + doc.data().bannerImage + ');   background-size: cover; "><div class="row"><div class="col m6"><h3 class="white-text" style="margin-left: 15%; border-radius: 900;">Fortnite Fugazi</h3><p class="white-text container" style="margin-left: 15%;">Welcome to Collegium Weeklys Fortnite Fugazi. Play 5 duo games with your partner and earn points. We will automatically pull your results and rank the winners. Prize money and Redbull is up for grabs</p><div class="col s12 m6 push-m2"><div class="card z-depth-5 hoverable animated fadeInLeft transparent" style="border-radius: 15px; "><section class="grey darken-4" style="border-radius: 15px 15px 0px 0px;"><h5 class="white-text left-align"style="font-weight: 900; padding-left: 20px; padding-top: 15px; padding-bottom: 15px;">Start Tournament</h5></section><div class="card-content white-text" style="padding-top: 2px;"><input id="epic" type="text" class="validate white-text" placeholder="Enter your EPIC name"><br><a class="waves-effect waves-light btn grey darken-4 z-depth-5" style="border-radius: 20px;" onclick="startTournament()"><i class="material-icons right">check</i>begin</a></div></div></div></div><div class="col m6 push-m1"><!-- Twitch Live Stream --><div id="twitch-embed" style="margin-top: 2%;"></div></div></div><header>';

      var bannerMobile = '<header style="position: relative; background: linear-gradient(30deg, #004092, transparent, transparent), url(' + doc.data().bannerImage + ');   background-size: cover; "><div class="row"><div class="col s12"><h4 class="white-text" style="margin-left: 15%; border-radius: 900;">Fortnite Fugazi</h4><div class="col s12"><div class="card z-depth-5 hoverable animated fadeInLeft transparent" style="border-radius: 15px;"><section class="grey darken-4" style="border-radius: 15px 15px 0px 0px;"><h5 class="white-text left-align"style="font-weight: 900; padding-left: 20px; padding-top: 15px; padding-bottom: 15px;">Start Tournament</h5></section><div class="card-content white-text" style="padding-top: 2px;"><input id="epic" type="text" class="validate white-text" placeholder="Enter your EPIC name"><br><a class="waves-effect waves-light btn grey darken-4 z-depth-5" style="border-radius: 20px;" onclick="startTournament()"><i class="material-icons right">check</i>begin</a></div></div></div></div></div><header>';

      $('#banner').append(banner);
      $('#bannerMobile').append(bannerMobile);

      //twitch
      new Twitch.Embed("twitch-embed", {
        width: 650,
        height: 400,
        channel: doc.data().twitch,
        layout: "video"
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  var path = db.collection("weekly");
  // Weekly Ranking
  path.orderBy("points", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(player) {
      // doc.data() is never undefined for query doc snapshots
      console.log(player.id, " => ", player.data());
      if (player.data().ready && player.data().games > 0) {
        $.get({
          url: 'https://cors-anywhere.herokuapp.com/https://fortnite.op.gg/api/v1/player/match/sync/' + player.data().epic + '?seasonId=7',
          success: function(response) {
            var pointsFinal = player.data().points;
            var lengthArr = response.data.records.length;
            console.log("Length of arr: ", response.data.records.length);
            if (player.data().key != response.data.records[lengthArr - 1].timestamp) {
              for (var i = 0; i < response.data.records.length; i++) {
                console.log("Plays " + i, response.data.records[i]);
                pointsFinal += response.data.records[i].kills;

                var gameLeft = player.data().games - response.data.records.length;
                if (gameLeft < 0) {
                  path.doc(player.id).update({
                    games: 0,
                  });
                } else {
                  path.doc(player.id).update({
                    games: gameLeft,
                  });
                }

              }
              console.log("pointsFinal: ", player.data().points);
              return path.doc(player.id).update({
                points: pointsFinal,
                key: response.data.records[lengthArr - 1].timestamp,
              });
            }
          }
        });
      } else {
        console.log(player.data().epic, "is not ready");
      }
      var words = ["FF5733", "C70039", "900C3F", "581845"];
      var word = words[Math.floor(Math.random() * words.length)];
      console.log(word);
      var playerCard = '<div class="col s12 m3"><div class="card z-depth-5 hoverable animated fadeInLeft" style="border-radius: 15px; background-color: #' + word + '"><section class="grey darken-4" style="border-radius: 15px 15px 0px 0px;"><h5 class="white-text center-align"style="font-weight: 900; padding-top: 15px; padding-bottom: 15px;">' + player.data().epic + '</h5></section><div class="card-content white-text" style="padding-top: 2px;"><p class="center" style="font-size: 12px;"> Game ' + player.data().games + '</p><h5 class="center white-text" style="font-weight: 900;"><b>' + player.data().points + ' kills</b></h5><p class="center" style="font-size: 12px;">Duo with ' + player.data().partner + '</p></div></div></div>';


      var playerCardMobile = '<div class="col s12"><div class="card z-depth-5 hoverable animated fadeInLeft" style="border-radius: 15px; background-color: #' + word + '"><section class="grey darken-4" style="border-radius: 15px 15px 0px 0px;"><h5 class="white-text center-align"style="font-weight: 900; padding-top: 15px; padding-bottom: 15px;">' + player.data().epic + '</h5></section><div class="card-content white-text" style="padding-top: 2px;"><p class="center" style="font-size: 12px;"> Game ' + player.data().games + '</p><h5 class="center white-text" style="font-weight: 900;"><b>' + player.data().points + ' kills</b></h5><p class="center" style="font-size: 12px;">Duo with ' + player.data().partner + '</p></div></div></div>';

      $('#playerRow').append(playerCard);
      $('#playerRowMobile').append(playerCardMobile);

    });
  });
}
