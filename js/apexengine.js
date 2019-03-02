function loadStatsApex() {
  console.log("Welcome to Project Phoenix's Apex Engine...all systems go!");
  db.collection("apex").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(team) {
      console.log(team.id, "=>", team.data());
      var tempArr = [];
      var initArr = [];
      if(team.data().teamReady == true){
        team.data().players.forEach(function(player) {
          db.collection("apex").doc(team.id).update({
              "counter": team.data().counter + 1
            })
            .then(function() {
              console.log("Document successfully updated!");
            });
          // console.log(player);idk if this is working
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://cors-anywhere.herokuapp.com/https://public-api.tracker.gg/apex/v1/standard/profile/' + player.platform + '/' + player.name,
            "method": "GET",
            "headers": {
              "TRN-Api-Key": "1a753f25-4dce-4936-8092-554a2b44b927",
              "cache-control": "no-cache",
              "Postman-Token": "4c031e3e-695e-47de-b078-6c71a76badf2"
            }
          };
          $.ajax(settings).done(function(apex) {
            // console.log(apex.data.metadata.platformUserHandle, "=>", apex.data);
            var damage = apex.data.stats.find(o => o.metadata.key === 'Damage');
            // console.log(player.name, "has done", damage.value, "much damage");
            // console.log("The difference for", player.name, "is: ", difference);
            var change = "false";
            if (team.data().initialized == false) {
              console.log("running inital load");
              player.overallDamage = damage.value;
              initArr.push(player);
              if (initArr.length == 3) {
                db.collection("apex").doc(team.id).update({
                    "players": initArr,
                    initialized: true
                  })
                  .then(function() {
                    console.log("Init successfully updated!");
                  });
              }
            }else{
              console.log("Running checcking system");
              var difference = (damage.value - player.overallDamage);

              if (difference > player.difference) {
                // console.log("Difference Found...updating player values");
                player.difference = difference;
                change = true;
                // console.log("New Player Values: ", player);
              }
              player.overallDamage = damage.value;
              tempArr.push(player);
              console.log(team.id, "Temp Array is: ", tempArr);
              if (tempArr.length == 3) {
                db.collection("apex").doc(team.id).update({
                    "players": tempArr
                  })
                  .then(function() {
                    console.log("Document successfully updated!");
                  });
              }
            }
          });
        });
      }
    });
  })
  db.collection("apex").orderBy("damageTotal", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var teamDamage = doc.data().players[0].difference + doc.data().players[1].difference + doc.data().players[2].difference;

      var teamCard = '<div class="card horizontal transparent z-depth-5 hoverable" style="height: 150px;"><div class="card-image"><img style="border-radius: 15px 0px 0px 15px; height: 150px; width: 200px;" src="' + doc.data().banner + '"></div><div class="card-stacked"><div class="card-content grey darken-4" style="border-radius: 0px 15px 15px 0px; padding: 10px; padding-top: 0px; padding-bottom: 0px;"><div class="row"><div class="col m6"><h5 class="white-text center-align"> Team ' + doc.data().teamName + ' </h5></div><div class="col m6"><h4 class="white-text right-align"> ' + teamDamage + ' PTS</h4></div></div><div class="row" style="margin-top: -1%;"><div class="col m4 hoverable"><p class="white-text center-align" style="font-size: 15px;"> ' + doc.data().players[0].difference + ' PTS</p><p class="white-text center-align" style="font-size: 12px;"> ' + doc.data().players[0].name + '</p></div><div class="col m4 hoverable"><p class="white-text center-align" style="font-size: 15px;"> ' + doc.data().players[1].difference + ' PTS</p><p class="white-text center-align" style="font-size: 12px;"> ' + doc.data().players[1].name + '</p></div><div class="col m4 hoverable"><p class="white-text center-align" style="font-size: 15px;"> ' + doc.data().players[2].difference + ' PTS</p><p class="white-text center-align" style="font-size: 12px;"> ' + doc.data().players[2].name + '</p></div></div></div></div></div>';
      $('#teamSection').append(teamCard);
      $('.progress').hide();

      db.collection("apex").doc(doc.id).update({
          "damageTotal": teamDamage
        })
        .then(function() {
          // console.log("Document successfully updated!");
        });
      // Live Now Section
      // doc.data().players.forEach(function(player) {
      //   $.get({
      //     url: 'https://api.twitch.tv/kraken/streams/' + player.twitch,
      //     data: {
      //       client_id: 'urff2tmjj5swnbqlltvic62bwpn96f'
      //     },
      //     error: function(response) {
      //       console.log("IT DIDNT WORK");
      //     },
      //     success: function(response) {
      //       if (response.stream.stream_type == "live") {
      //         console.log("EVERYTHING IS GUCCI");
      //         var liveCard = '<section style="background-color: #2E3353; border-radius: 50px;" class="z-depth-5 hoverable"><div class="row"><div class="col m4"><img src="' + response.stream.preview.large + '" alt="" class="circle responsive-img z-depth-5" style="margin-top: 5%; margin-left: 15px; height: 40px; width: 40px;"></div><div class="col m5 pull-m2"><h6 class="white-text" style="margin-top: 10%;">' + player.name + ' went live</h6></div><div class="col m3 pull-m2" style="margin-top: 2%;"><a href="' + response.stream.channel.url + '" class="waves-effect waves-light btn" style="border-radius: 20px; background-color: #171C2F; width: 150px;">Watch Now</a></div></div></section>';
      //         $('#liveNow').append(liveCard);
      //       }
      //     }
      //   });
      // })


    });
  });
}
$( document ).ready(function() {
  console.log("Welcome to Project Phoenix's Apex Engine...all systems go!");
  db.collection("apex").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(team) {
      console.log(team.id, "=>", team.data());
      var tempArr = [];
      var initArr = [];
      if(team.data().teamReady == true){
        team.data().players.forEach(function(player) {
          db.collection("apex").doc(team.id).update({
              "counter": team.data().counter + 1
            })
            .then(function() {
              console.log("Document successfully updated!");
            });
          // console.log(player);idk if this is working
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'https://cors-anywhere.herokuapp.com/https://public-api.tracker.gg/apex/v1/standard/profile/' + player.platform + '/' + player.name,
            "method": "GET",
            "headers": {
              "TRN-Api-Key": "1a753f25-4dce-4936-8092-554a2b44b927",
              "cache-control": "no-cache",
              "Postman-Token": "4c031e3e-695e-47de-b078-6c71a76badf2"
            }
          };
          $.ajax(settings).done(function(apex) {
            // console.log(apex.data.metadata.platformUserHandle, "=>", apex.data);
            var damage = apex.data.stats.find(o => o.metadata.key === 'Damage');
            // console.log(player.name, "has done", damage.value, "much damage");
            // console.log("The difference for", player.name, "is: ", difference);
            var change = "false";
            if (team.data().initialized == false) {
              console.log("running inital load");
              player.overallDamage = damage.value;
              initArr.push(player);
              if (initArr.length == 3) {
                db.collection("apex").doc(team.id).update({
                    "players": initArr,
                    initialized: true
                  })
                  .then(function() {
                    console.log("Init successfully updated!");
                  });
              }
            }else{
              console.log("Running checcking system");
              var difference = (damage.value - player.overallDamage);

              if (difference > player.difference) {
                // console.log("Difference Found...updating player values");
                player.difference = difference;
                change = true;
                // console.log("New Player Values: ", player);
              }
              player.overallDamage = damage.value;
              tempArr.push(player);
              console.log(team.id, "Temp Array is: ", tempArr);
              if (tempArr.length == 3) {
                db.collection("apex").doc(team.id).update({
                    "players": tempArr
                  })
                  .then(function() {
                    console.log("Document successfully updated!");
                  });
              }
            }
          });
        });
      }
    });
  })
  db.collection("apex").orderBy("damageTotal", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var teamDamage = doc.data().players[0].difference + doc.data().players[1].difference + doc.data().players[2].difference;

      var teamCard = '<div class="card horizontal transparent z-depth-5 hoverable" style="height: 150px;"><div class="card-image"><img style="border-radius: 15px 0px 0px 15px; height: 150px; width: 200px;" src="' + doc.data().banner + '"></div><div class="card-stacked"><div class="card-content grey darken-4" style="border-radius: 0px 15px 15px 0px; padding: 10px; padding-top: 0px; padding-bottom: 0px;"><div class="row"><div class="col m6"><h5 class="white-text center-align"> Team ' + doc.data().teamName + ' </h5></div><div class="col m6"><h4 class="white-text right-align"> ' + teamDamage + ' PTS</h4></div></div><div class="row" style="margin-top: -1%;"><div class="col m4 hoverable"><p class="white-text center-align" style="font-size: 15px;"> ' + doc.data().players[0].difference + ' PTS</p><p class="white-text center-align" style="font-size: 12px;"> ' + doc.data().players[0].name + '</p></div><div class="col m4 hoverable"><p class="white-text center-align" style="font-size: 15px;"> ' + doc.data().players[1].difference + ' PTS</p><p class="white-text center-align" style="font-size: 12px;"> ' + doc.data().players[1].name + '</p></div><div class="col m4 hoverable"><p class="white-text center-align" style="font-size: 15px;"> ' + doc.data().players[2].difference + ' PTS</p><p class="white-text center-align" style="font-size: 12px;"> ' + doc.data().players[2].name + '</p></div></div></div></div></div>';
      $('#teamSection').append(teamCard);
      $('.progress').hide();

      db.collection("apex").doc(doc.id).update({
          "damageTotal": teamDamage
        })
        .then(function() {
          // console.log("Document successfully updated!");
        });
      // Live Now Section
      // doc.data().players.forEach(function(player) {
      //   $.get({
      //     url: 'https://api.twitch.tv/kraken/streams/' + player.twitch,
      //     data: {
      //       client_id: 'urff2tmjj5swnbqlltvic62bwpn96f'
      //     },
      //     error: function(response) {
      //       console.log("IT DIDNT WORK");
      //     },
      //     success: function(response) {
      //       if (response.stream.stream_type == "live") {
      //         console.log("EVERYTHING IS GUCCI");
      //         var liveCard = '<section style="background-color: #2E3353; border-radius: 50px;" class="z-depth-5 hoverable"><div class="row"><div class="col m4"><img src="' + response.stream.preview.large + '" alt="" class="circle responsive-img z-depth-5" style="margin-top: 5%; margin-left: 15px; height: 40px; width: 40px;"></div><div class="col m5 pull-m2"><h6 class="white-text" style="margin-top: 10%;">' + player.name + ' went live</h6></div><div class="col m3 pull-m2" style="margin-top: 2%;"><a href="' + response.stream.channel.url + '" class="waves-effect waves-light btn" style="border-radius: 20px; background-color: #171C2F; width: 150px;">Watch Now</a></div></div></section>';
      //         $('#liveNow').append(liveCard);
      //       }
      //     }
      //   });
      // })


    });
  });
});
