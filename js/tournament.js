var dateGod;
var participants = 0;
function loadPlayer() {
  var docRef = db.collection("tournaments").doc('A6W0IedLgBF6jz9cHaIr');
  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      //header
      dateGod = doc.data().date;
      $('#prize').append("$" + doc.data().prize + " in Pot");
      $('#bio').append(doc.data().bio);
      $('#tournamentTitle').append(doc.data().tournamentTitle);
      $('#image1').append('<img style="filter: blur(3px);" src="'
      +doc.data().bannerImage+'">')
       $("#image1").attr("src",doc.data().bannerImage);
       $("#image2").attr("src",doc.data().bannerImage2);

      // Set the date we're counting down to
      var countDownDate = new Date(doc.data().timer).getTime();

      // Update the count down every 1 second
      var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "EXPIRED";
        }
      }, 1000);




    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  var path = db.collection("fortnitefugazi");
  var killCount = 0, gameCount = 0;

  // Weekly Ranking
  path.orderBy("kills", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(player) {
      participants += 1;
      killCount += player.data().kills;
      gameCount += player.data().games;
      // doc.data() is never undefined for query doc snapshots
      console.log(player.id, " => ", player.data());
      $.get({
        url: 'https://fortnitemaster.com/p/stats/players/' + player.data().uid + '/match-summaries?limit=100&season=season-7',
        success: function(response) {
          console.log(response);
          var killsGod = 0;
          var gamesGod = 0;
          var timestampGod = "";
          for (var i = 0; i < response.matchSummaries.length; i++) {
            if (dateGod == moment(response.matchSummaries[i].timestamp).format('MMMM Do')) {
              if (player.data().timestamp != response.matchSummaries[i].timestamp) {
                killsGod += response.matchSummaries[i].summary.kills;
                gamesGod += response.matchSummaries[i].matchesPlayed;
                timestampGod = response.matchSummaries[i].timestamp;
              }
            }
          }
          if (killsGod != 0 || gamesGod != 0) {
            db.collection("fortnitefugazi").doc(player.id).update({
              kills: killsGod,
              games: gamesGod,
              timestamp: timestampGod
            });
          }

          var words = ["FF5733", "C70039", "900C3F", "581845"];
          var word = words[Math.floor(Math.random() * words.length)];
          var playerCard = '<div class="col s12 m3"><div class="card z-depth-5 hoverable animated fadeInLeft" style="border-radius: 15px; background-color: #' + word + ';"><section class="grey darken-4" style="border-radius: 15px 15px 0px 0px;"><h6 class="white-text center-align"style="font-weight: 900; padding-top: 15px; padding-bottom: 15px;">' + player.data().epic + '</h6></section><div class="card-content white-text" style="padding-top: 2px;"><p class="center" style="font-size: 12px;">' + (gamesGod + player.data().games) + ' Matches</p><h5 class="center white-text" style="font-weight: 900;"><b>' + (killsGod + player.data().kills) + ' kills</b></h5><p class="center-align"> Playing on ' + response.matchSummaries[0].platform + '</p></div></div></div>';

          $('#playerRow').append(playerCard);
          // $('#kills').prepend(killCount + " kills");

        }
      });
    });
    $('#kills').append(killCount + " Kills");
    $('#games').append(gameCount + " Games Played");

    $('#participants').append(participants + " Participants");
  });


}
