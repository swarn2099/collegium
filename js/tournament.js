function loadPlayer() {
  var docRef = db.collection("tournaments").doc('A6W0IedLgBF6jz9cHaIr');
  docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      //header
      var banner = '<header style="position: relative; height: 450px; background: linear-gradient(30deg, #004092, transparent, transparent), url(' + doc.data().bannerImage + ');   background-size: cover; "><div class="row"><div class="col m6"><h4 class="white-text" style="margin-left: 15%;">Fortnite Weeklys Fugazi</h4><p class="white-text container" style="margin-left: 15%;">Welcome to Collegium Weeklys Fortnite Fugazi. Play 5 duo games with your partner and earn points. We will automatically pull your results and rank the winners. Prize money and Redbull is up for grabs</p><br><a style="margin-left: 15%; border-radius: 20px;" class="waves-effect waves-light btn z-depth-5 white black-text typeform-share button" href="https://swarnsingh.typeform.com/to/aQWe0s" data-mode="drawer_right" style="border-radius: 20px;"><span style="font-weight: 900;">Reserve your spot</span></a></div><div class="col m6 push-m1"><!-- Twitch Live Stream --><div id="twitch-embed" style="margin-top: 2%;"></div></div></div>< header>';
      $('#banner').append(banner);
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

  // Weekly Ranking
  db.collection("weekly").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // https://fortnite.op.gg/api/v1/player/match/sync/marcoflowers?seasonId=7&platform=pc
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://fortnite.op.gg/api/v1/player/match/sync/marcoflowers?seasonId=7&platform=pc"; // site that doesn’t send Access-Control-*
      fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(contents => console.log(contents))
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    });
  });
}

function ranking() {



}
