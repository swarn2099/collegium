var timer;

function loadTournamentHub() {
  // daily
  db.collection("tournamentHub").where("frequency", "==", 'daily').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // timer
      timer = doc.data().timer;
      var dailyTournament = '<div class="col s12 m4"><div class="card z-depth-5 hoverable second-color" style="border-radius: 15px;"><div class="card-image z-depth-1"><img style="border-radius: 5px; height: 200px;" src="'+doc.data().banner+'"></div><div class="row" style="padding: 15px;"><div class="col m8"><h5 class="left-align white-text">'+doc.data().name+'</h5><p class="left-align grey-text dailyTimer" id="countdown"></p></div><div class="col m4 push-m1"><div class="chip white-text z-depth-5" style="background-color: #111217; margin-top: 10px;">'+doc.data().mode+'</div></div><a data-tournament="'+doc.data().path+'" onclick="openTournament(this);" class="waves-effect waves-light btn z-depth-5 '+doc.data().button+'" style="border-radius: 20px;">Join Tournament</a></div></div></div>';
      $('#dailyRow').append(dailyTournament);
    });
  });
timerFunc();

}

function timerFunc() {
  var dailyDate = moment().add(1, 'days').format('ll') + ' 23:59:59';
  var finalTimer;
  var countDownDate = new Date(dailyDate).getTime();
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
      $(".dailyTimer").text("Time Remaining: "+days + "d " + hours + "hr " +
        minutes + "min ");

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

}
