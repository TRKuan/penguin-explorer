<template lang="html">
  <div class="add-place-form">
    <form>
      <div class="form-group">
        <label for="textarea">Comment</label>
        <textarea v-if="placeDoc" class="form-control" id="textarea" rows="3" v-model="placeDoc.notes"></textarea>
      </div>
      <div class="custom-file">
        <label class="custom-file-label" for="image-file">Upload an Image</label>
        <input type="file" accept="image/*" class="custom-file-input" id="image-file" @change="onChange($event.target.files)">
      </div>
      <div class="img-div">
        <img v-if="imgUrl" :src="imgUrl">
      </div>
      <div class="submit">
        <button v-if="placeDoc.visited" type="button" class="btn btn-primary" @click="deletePlace()">Delete</button>
        <button type="button" class="btn btn-primary" @click="checkIn()">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */

import { storage, auth, users } from "@/firebaseConfig.js";
import router from "@/router.js";
import JQuery from "jquery";
let $ = JQuery;
export default {
  name: "AddPlaceForm",
  data() {
    return {
      imgUrl: this.placeDoc.imgURL,
      img: null
    };
  },
  firestore() {
    if (auth.currentUser) {
      return {
        places: users.doc(auth.currentUser.uid).collection("places"),
        cities: users.doc(auth.currentUser.uid).collection("cities")
      };
    }
  },
  props: {
    placeDoc: Object
  },
  methods: {
    onChange(files) {
      this.imgUrl = URL.createObjectURL(files[0]);
      this.img = files[0];
    },
    deletePlace(){
      users.doc(auth.currentUser.uid).collection("places").doc(this.placeDoc.id).delete();
      let city = users.doc(auth.currentUser.uid).collection("cities").doc(this.placeDoc.cityName)
      let places = this.cities.filter(c => c.cityName == this.placeDoc.cityName)[0].places-1
      city.update({places})
      if(places==0)
        city.delete()
      if(this.img)
        storage.ref().child(auth.currentUser.uid + "/images/" + this.placeDoc.id).delete()
      $(".modal-backdrop").remove()
      $("#form").hide() 
      router.push({name: 'home'})          
    },
    checkIn() {
      const place = this.placeDoc
      var comment = $("#textarea").val();
      if (this.img) {
        var uploadTask = storage.ref()
          .child(auth.currentUser.uid + "/images/" + place.id)
          .put(this.img);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          }, function(error) {
              // Handle unsuccessful uploads
          },
          function() {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                users.doc(auth.currentUser.uid).collection("places")
                  .doc(place.id).update({
                    imgURL: downloadURL,
                    notes: comment,
                    visited: true
                  });
                console.log("File available at", downloadURL);
                $("#form").hide() 
                router.push('/places/'+ place.id)
              });
          }
        );
      } else{ 
        users.doc(auth.currentUser.uid).collection("places")
          .doc(place.id).update({
            notes: comment,
            visited: true
          });
        $("#form").hide() 
        router.push('/places/'+ place.id)
      } 
        let cityName = place.cityName
        let cities = users.doc(auth.currentUser.uid).collection("cities")
        if (this.cities.filter(c => c.cityName == cityName).length == 0)
          cities.doc(cityName).set({ cityName, places:1});
        else{ 
          let places = this.places.filter(c => c.cityName == cityName).length
          console.log(places)
          cities.doc(cityName).update({places});
        }
    }
  }
};
</script>

<style lang="css">
.add-place-form {
  margin-top: 2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-bottom: 2rem;
}
form {
  width: 90%;
}
div.submit {
  margin-top: 1rem;
  text-align: center;
}
.img-div {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}
img {
  max-width: 100%;
  max-height: 400px;
}
</style>
