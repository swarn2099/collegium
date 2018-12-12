db.collection("hashtags").orderBy("followers").limit(3).get()
.then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    console.log("Popular Hastags");
      console.log(doc.id, "=>", doc.data());
      $("#threadsGoHere").append('<div class="col m4 s12" data-title="'+doc.data().title+'" data-description="'+doc.data().description+'" onclick="hashtagPageLoad(this)"><div id="hashtagCard" class="card-panel tag1 grey darken-4 white-text z-depth-3" style="border-color: black; border-width: 1px;" ><h5 style="font-weight: 800;" class="amount"  >'+doc.data().title+'</h5><br><p style="font-weight: 800;" class="amount">'+doc.data().description+'</p></div></div>');
     });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
});
