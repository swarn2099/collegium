var dateGod;
var participants = 0;

function loadPlayer() {

  Scout.players.search("TheBestOfNaan", "epic", null, "fortnite")
  .then(search => Scout.players.get("fortnite", search.results[0].player.playerId))
  .then(ninja => console.log(ninja))

  var docRef = db.collection("tournaments").doc('A6W0IedLgBF6jz9cHaIr');
  docRef.get().then(function(doc) {
    if (doc.exists) {
      // console.log("Document data:", doc.data());
      //header
      dateGod = doc.data().date;
      $('#prize').append("$" + doc.data().prize + " in Pot");
      $('#bio').append(doc.data().bio);
      $('#tournamentTitle').append(doc.data().tournamentTitle);
      $('#image1').append('<img style="filter: blur(3px);" src="' +
        doc.data().bannerImage + '">')
      $("#image1").attr("src", doc.data().bannerImage);
      $("#image2").attr("src", doc.data().bannerImage2);

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
        document.getElementById("countdown").innerHTML = hours + "h " +
          minutes + "m " + seconds + "s ";

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
  var killCount = 0,
    gameCount = 0;

  // Weekly Ranking
  path.orderBy("kills").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(player) {
      participants += 1;
      killCount += player.data().kills;
      gameCount += player.data().games;
      // doc.data() is never undefined for query doc snapshots
      // console.log(player.id, " => ", player.data());

      var twitchLive = 'https://api.twitch.tv/helix/streams/' + player.data().twitch;
      //client id: urff2tmjj5swnbqlltvic62bwpn96f
      $.get({
        url: 'https://api.twitch.tv/kraken/streams/' + player.data().twitch,
        data: {
          client_id: 'urff2tmjj5swnbqlltvic62bwpn96f'
        },
        error: function(response) {
          console.log("IT DIDNT WORK");
        },
        success: function(response) {
          console.log("response", response);

          console.log(player.data().twitch, " => ", response)
          if (response.stream.stream_type == "live") {
            console.log("EVERYTHING IS GUCCI");
            $('#noLive').hide();
            var words = ["051e3e", "251e3e", "451e3e", "651e3e", "851e3e"];
            var word = words[Math.floor(Math.random() * words.length)];
            console.log(word);



            var livePlayers = '<div class="col m3 animated fadeInRight"><a onclick="openPlayerPage(this)" data-playerName="' + player.data().twitch +
              '"><div class="card z-depth-5 animated infinite slower" style="height: 200px; border-radius: 15px; background-color: #' + word +
              ';"><section class="grey darken-4" style="border-radius: 15px 15px 0px 0px;"><h5 class="white-text center-align" style="font-weight: 900; padding-top: 15px; padding-bottom: 15px;">' + player.data().twitch +
              '</h5></section><div class="card-content white-text"><h6 style="font-weight: 900;" class="white-text">Watch me play ' + response.stream.game + '</h6></div></div></a></div>';
              $('#noLive').hide();
            $('#livePlayers').append(livePlayers);
          }
        }
      });



      $.get({
        url: 'https://fortnitemaster.com/p/stats/players/' + player.data().uid + '/match-summaries?limit=100&season=season-7',
        success: function(response) {
          console.log(player.data().epic, response);
          var killsGod = 0;
          var gamesGod = 0;
          var timestampGod = "";
          // db.collection("fortnitefugazi").doc(player.id).update({
          //   kills: killsGod + player.data().kills,
          //   games: gamesGod + player.data().games,
          //   timestamp: timestampGod
          // });
          // if (dateGod == moment(response.matchSummaries[i].timestamp).format('MMMM Do')) {
          //   killsGod += response.matchSummaries[i].summary.kills;
          //   gamesGod += response.matchSummaries[i].matchesPlayed;
          //   timestampGod = response.matchSummaries[i].timestamp;
          // }
          // db.collection("fortnitefugazi").doc(player.id).update({
          //   kills: killsGod + player.data().kills,
          //   games: gamesGod + player.data().games,
          //   timestamp: timestampGod
          // });
          if (player.data().timestamp == "abc") {
            console.log(" doesn't have a player timestamp yet...creating one now.");

            for(var j = 0; j < response.matchSummaries.length; j++){
              if (dateGod == moment(response.matchSummaries[j].timestamp).format('MMMM Do')) {
                timestampGod = response.matchSummaries[j].timestamp;
                break;
              }
            }
            for (var k = 0; k < response.matchSummaries.length; k++) {
              console.log("this one ran");
              if (dateGod == moment(response.matchSummaries[k].timestamp).format('MMMM Do')) {
                killsGod += response.matchSummaries[k].summary.kills;
                gamesGod += response.matchSummaries[k].matchesPlayed;
              }
            }
            console.log("Ok here's whats up for ", player.data().epic, "=> timestamp: ", timestampGod, " kills: ", killsGod, " Games: ", gamesGod );
            if(timestampGod != ""){
              db.collection("fortnitefugazi").doc(player.id).update({
                kills: killsGod,
                games: gamesGod,
                timestamp: timestampGod
              });
            }
          } else if(player.data().timestamp != "abc") {
            console.log("Oh shit...", player.data().epic , "already has a timestamp");
            for(var a = 0; a < response.matchSummaries.length; a++){
              if (dateGod == moment(response.matchSummaries[a].timestamp).format('MMMM Do')) {
                timestampGod = response.matchSummaries[a].timestamp;
                break;
              }
            }
            var i = 0;
            while (player.data().timestamp != response.matchSummaries[i].timestamp){
              if (dateGod == moment(response.matchSummaries[i].timestamp).format('MMMM Do')) {
                killsGod += response.matchSummaries[i].summary.kills;
                gamesGod += response.matchSummaries[i].matchesPlayed;
              }
              i++;
            }
            console.log("Ok here's whats up for ", player.data().epic, "=> timestamp: ", timestampGod, " kills: ", killsGod, " Games: ", gamesGod );
            db.collection("fortnitefugazi").doc(player.id).update({
              kills: killsGod + player.data().kills,
              games: gamesGod + player.data().games,
              timestamp: timestampGod
            });
          }




          var words = ["FF5733", "C70039", "900C3F", "581845"];
          var word = words[Math.floor(Math.random() * words.length)];
          var playerCard = '<div class="col s12 m3"><div class="card z-depth-5 hoverable animated fadeInLeft" style="border-radius: 15px; background-color: #' + word + ';"><section class="grey darken-4" style="border-radius: 15px 15px 0px 0px;"><h6 class="white-text center-align"style="font-weight: 900; padding-top: 15px; padding-bottom: 15px;">' + player.data().epic + '</h6></section><div class="card-content white-text" style="padding-top: 2px;"><p class="center" style="font-size: 12px;">' + player.data().games + ' Matches</p><h5 class="center white-text" style="font-weight: 900;"><b>' + player.data().kills + ' kills</b></h5><p class="center-align"> Playing on ' + response.matchSummaries[0].platform + '</p></div></div></div>';

          $('#playerRow').append(playerCard);
          // $('#kills').prepend(killCount + " kills");

        }
      });
    });
    $('#kills').append(killCount + " Total Kills");
    $('#games').append(gameCount + " Total Games Played");

    $('#participants').append(participants + " Participants");
  });


}
