firebase.auth().onAuthStateChanged(user => {
  if (user) {
    getBookmarks(user)
  } else {
    console.log("No user is signed in");
  }
});

function getBookmarks(user) {
  db.collection("users").doc(user.uid).get()
    .then(userDoc => {
      let bookmarks = userDoc.data().bookmarks;
      console.log(bookmarks);

      let cardTemplate = document.getElementById("cardTemplate");

      bookmarks.forEach(thisHikeID => {
        console.log(thisHikeID);

        db.collection("Hikes").where("id", "==", thisHikeID).get()
          .then(snap => {
            let size = snap.size;
            let queryData = snap.docs;

            if (size == 1) {
              let doc = queryData[0].data();

              let hikeName = doc.name;
              let hikeID = doc.id;
              let hikeLength = doc.length;

              let newCard = cardTemplate.content.cloneNode(true);

              newCard.querySelector('.card-title').innerHTML = hikeName;
              newCard.querySelector('.card-length').innerHTML = `${hikeLength} km`;
              newCard.querySelector('a').onclick = () => setHikeData(hikeID);
              newCard.querySelector('img').src = `./images/${hikeID}.jpg`;
              hikeCardGroup.appendChild(newCard);
            } else {
              console.log("Query has more than one data.")
            }
          })
      })

    })
}