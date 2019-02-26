var dateGod;
var participants = 0;


function loadFortnite() {

  // This section is to populate the page with Fortnite Information

  var docRef = db.collection("tournaments").doc('fortnitefrenzy');
  docRef.get().then(function(doc) {
    if (doc.exists) {
      dateGod = doc.data().date;
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


  var path = db.collection("fortnitefrenzy");
  // Player Cards and Live Now
  path.orderBy("kills").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(player) {

      // Live Now Section
      var twitchLive = 'https://api.twitch.tv/helix/streams/' + player.data().twitch;
      $.get({
        url: 'https://api.twitch.tv/kraken/streams/' + player.data().twitch,
        data: {
          client_id: 'urff2tmjj5swnbqlltvic62bwpn96f'
        },
        error: function(response) {
          console.log("IT DIDNT WORK");
        },
        success: function(response) {
          console.log(player.data().twitch, " => ", response)
          if (response.stream.stream_type == "live") {
            console.log("EVERYTHING IS GUCCI");
          }
        }
      });

      console.log("Fortnite API: ", 'https://fortnite.op.gg/api/v1/player/stats/trend/' + player.data().epic + '/' + player.data().platform + '?type=GAME');
      // Fortnite Master API Section
      $.get({
        url: 'https://fortnite.op.gg/api/v1/player/stats/trend/' + player.data().epic + '/' + player.data().platform + '?type=GAME',
        success: function(response) {
          console.log(player.data().epic, response);

        }
      });
    });
  });


}
