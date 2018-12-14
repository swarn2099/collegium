function homePageQuery() {
  //Popular Hashtags
  db.collection("hashtags").orderBy("followers", "desc").limit(3).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // console.log("Popular Hastags");
        // console.log(doc.id, "=>", doc.data());

        //Desktop
        $("#tagsGoHere").append('<div class="col m4 bubble" data-title="' + doc.data().title + '" data-description="' + doc.data().description + '" onclick="hashtagPageLoad(this)"><div id="hashtagCard" class="card-panel tag1 grey darken-4 white-text z-depth-3" style="border-color: black; border-width: 1px;"><h5 style="font-weight: 800;" class="amount"  >' + doc.data().title + '</h5><br><p style="font-weight: 800;" class="amount">' + doc.data().description + '</p></div></div>').fadeIn(3000);

        //mobile
          $("#tagsMobileGoHere").append('<div class="col s12 bubble" data-title="' + doc.data().title + '" data-description="' + doc.data().description + '" onclick="hashtagPageLoad(this)"><div id="hashtagMobileCard" class="card-panel tag1 white black-text z-depth-5 left-align" style="border-color: black; border-width: 1px;"><h6 style="font-weight: 900;" class="amount"  >' + doc.data().title + '</h6><p style="font-weight: 200;" class="amount">' + doc.data().description + '</p></div></div>').fadeIn(3000);
      });
    })

//Popular Threads
  db.collection("hashtags").doc("#todayilearned").collection("threads").orderBy("upvotes", "desc").limit(4).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // console.log("Popular Threads");
        var commentCard='';
        for(var i = 0; i < doc.data().comments.length; i++){
          console.log(doc.data().comments[i].name);
          commentCard += '<div class="row commentCard" style="  margin-left: 1%;"><h6><b>'+doc.data().comments[i].name+'</b></h6><p style="font-family: "Athiti"; font-weight: 400; font-size:15px;"class="blacktext">'+doc.data().comments[i].content+'</p></div><hr/>';
        }
        $("ul.collapsible").append('<li class="hideTags" ><div class="collapsible-header row" style="padding-bottom: 0 !important;"><div class="col s8 left hide-on-med-and-down"><h6 class="left-align" style="font-weight: 900; margin-right: 5%;">' + doc.data().title + '</h6></div><div class="col s4 right hide-on-med-and-down"><div class="row"><div class="col s4 push-s4"><p class="center-align green-text" style="margin-right: 5%; font-weight: 900;">'+doc.data().upvotes+'<i class="small material-icons" style="font-size: 15px;">arrow_upward</i></p></div><div class="col s4 push-s2 red-text"><p class="center-align" style="margin-right: 5%; font-weight: 900;">'+doc.data().downvotes+'<i class="small material-icons" style="font-size: 15px;">arrow_downward</i></p></div><div class="col s4 blue-text"><p class="center-align" style="margin-right: 5%; font-weight: 900;">'+doc.data().comments.length+'<i class="small material-icons" style="font-size:15px;">mode_comment</i><p></div></div></div></div><div class="col s12 left hide-on-med-and-up"><h6 class="center-align" style="font-weight: 900;">' + doc.data().title + '</h6></div><div class="collapsible-body left-align" style="padding-top: 0 !important"><p class="threadConent" style="opacity: 0.5; margin-top: -3%;">By '+doc.data().author+'</p><p class="threadConent" style="margin-top: 0%;">' + doc.data().content + '</p><h5>Comments</h5><hr color="#04204c" /><div class="row"><div class="input-field col s10"><i class="material-icons prefix">account_circle</i><input id="commentHome" type="text" class="validate"><label for="icon_prefix">Leave a comment...</label></div><div class="col s2"><a class="waves-effect waves-light btn light-blue darken-4" style="margin-top: 25%;" data-threadName="' + doc.id + '" onclick="commentThreadHome(this)">comment<a></div></div><section class="comments"><div data-threadName="'+doc.id+'">'+commentCard+'</section></div></div></li>').fadeIn(3000);

      });
    })
}



function commentThreadHome(e) {

  var commentContent = document.getElementById('commentHome');
  console.log(commentContent.value);
  db.collection("hashtags").doc("#todayilearned").collection("threads").doc(e.getAttribute("data-threadName")).update({
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



function writeThread() {
  // var commentContent = document.getElementById('threadtitle');
  // console.log(threadTitle.value);
  // db.collection("hashtags").doc(autocompleteHash.value).collection("threads").doc(threadTitle.value).set({
  //     title: threadTitle.value,
  //     author: "CA",
  //     content: threadDescription.value,
  //     upvotes: 0,
  //     downvotes: 0,
  //     views: 0
  //   })
  //   .then(function() {
  //     console.log("Document successfully written!");
  //   })
  //   .catch(function(error) {
  //     console.error("Error writing document: ", error);
  //   });
}
