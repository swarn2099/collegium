// global variable
var type = '';
var enrolled = false;

function loadTournamentHub() {
  db.collection("tournamentHub").where("frequency", "==", 'daily').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  });

}

function openTournament(d) {
  window.open("tournament.html", "_self")
  console.log(d.getAttribute("data-tournament"));
  sessionStorage.setItem("tournamentName", d.getAttribute("data-tournament"));
}

function loadTournamentData() {
  var user = firebase.auth().currentUser;

  if (user) {
    console.log("User is: ", user.email);
    // // User is signed in.

    $('#profileMenu').append(user.email);
  }


  var tournamentName = sessionStorage.getItem("tournamentName");
  console.log("Tournament name: ", tournamentName);
  // load tournnament details
  db.collection('tournamentHub').doc(tournamentName).get().then(function(tourney) {
    // name
    $('#header').append(tourney.data().name);
    $('#name').append(tourney.data().name + ' Standings');
    $('#registrationName').append(tourney.data().name + ' Sign Up');

    // banner
    $('.tinted-image').css('background', 'linear-gradient(180deg, rgba(17, 18, 23, 0.5) 0%, rgba(17, 18, 23, 0.95) 99.99%, #111217 100%),url(' + tourney.data().banner + ')');
    // timer
    var countDownDate = new Date(tourney.data().timer).getTime();
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
      document.getElementById("countdown").innerHTML = days + "d " + hours + "h " +
        minutes + "m " + seconds + "s ";
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);

    // prize
    $('#prize').append('$' + tourney.data().prize);
    // type
    type = tourney.data().type;
    // rules
    for (var i = 0; i < tourney.data().rules.length; i++) {
      var rule = '<li style="list-style-type: circle !important"><h6 class="white-text" style="font-weight: 400;">' + tourney.data().rules[i] + '</h6></li>';
      $('#rules').append(rule);
    }

  });

  var rank = 1;
  db.collection(tournamentName).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var playerRow = '<tr><td>' + rank + '</td><td>' + doc.data().name + '</td><td>' + doc.data().points + '</td><td>' + doc.data().lastPlayed + '</td><td>' + doc.data().damageTotal + '</td></tr>';
      $('#tournamentPlayerStats').append(playerRow);
      rank++;

      // Live Now
      $.get({
        url: 'https://api.twitch.tv/kraken/streams/' + doc.data().twitch,
        data: {
          client_id: 'urff2tmjj5swnbqlltvic62bwpn96f'
        },
        error: function(response) {
          console.log("IT DIDNT WORK");
        },
        success: function(response) {
          if (response.stream.stream_type == "live") {
            console.log("EVERYTHING IS GUCCI");
            var liveCard = '<a href="' + response.stream.channel.url + '"><div class="chip z-depth-3 hoverable" style="width: 100%; background-color: #362551; margin-top: 3%;"><img src="' + response.stream.preview.large + '"><p class="white-text left-align" style="font-weight: 900;">' + tourney.data().name + '<span style="font-weight: 100;">is Live</span></p></div></a>';


            $('#liveNow').append(liveCard);
            $('#noOne').hide();
          }
        }
      });

    });
  });

}

function userRegister() {
  console.log("type: ", type);
  var tournamentName = sessionStorage.getItem("tournamentName");
  firebase.auth().onAuthStateChanged(function(userLoggedIn) {
    if (userLoggedIn) {
      // User is signed in.
      var enrolled = false;
      db.collection('users').doc(userLoggedIn.email).get().then(function(user) {
        console.log(user.data());

        // Damage Derby Signup
        if (type == 'damage') {
          console.log("Damage Tournament detected");
          db.collection("apexDamageFree").doc(user.data().apex).get().then(function(doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              M.toast({
                html: "Bro, you're already set up. Play your games",
                classes: 'rounded green white-text'
              });
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              db.collection(tournamentName).doc(user.data().apex).set({
                name: user.data().apex,
                damageTotal: 0,
                diff: 0,
                init: false,
                lastPlayed: 'null',
                platform: user.data().platform,
                points: 0,
                twitch: user.data().twitch
              });
              M.toast({
                html: "Poggers dude, you're all set :)",
                classes: 'rounded green white-text'
              });
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          });
        }


      });
    } else {
      // No user is signed in.
    }
  });

}


function signout() {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    window.location.href = "../index.html";

  }, function(error) {
    window.location.href = "../index.html";
  });
}
