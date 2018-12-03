<template>
  <div class="home">
    <!--jumbotron-->
    <div class="jumbotron jumbotron-fluid d-flex align-items-center">
        <div class="container-fluid text-center">
            <header>
                <h1>Penguin Explorer</h1>
                <h3 class="slogan text-center">Penguins and where to find them</h3>
            </header>
            <button class="btn btn-primary" @click="signInWithGoogle">Get Started</button>
            <div class="scroll-down-div">
              <a class="text-center scroll-down-btn" href="#section1"><i class="fas fa-angle-down fa-3x"></i></a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig";

export default {
  name: 'home',
  data() {
    return {
      user: null
    };
  },
  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        console.log("redirect");
        this.$router.push('/map');
      }
    });
  },
  methods: {
    signInWithGoogle: function() {
      auth
        .signInWithRedirect(provider)
        .then(result => {
          this.user = result.user;
          console.log("?", this.user);
        })
        .catch(err => console.log(err));
    }
  }
}
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
header {
  margin: 3rem;
}
h1 {
  margin-bottom: 1rem;
}
/**Jumbotron**/
.jumbotron{
  width: 100%;
  height: 100%;
  background-image: url("http://gimesy.com/wp-content/gallery/things-with-wings/Gimesy-3315.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
}
.jumbotron{
  padding-top: 0;
  min-height: 100%;
  margin-bottom: 0;
  font-weight: bold;
}
.jumbotron div{
  max-width: 100%;
  word-wrap:break-word;
}
.jumbotron .slogan{
  font-style: italic;
  font-size: 2rem;
  opacity: 0.7;
}
/**button**/
.btn-primary {
  background-color: rgb(37, 53, 103);
  color: white;
  border: rgb(37, 53, 103);
}
.btn-primary:focus { outline:0; }
.btn-primary:hover, .btn-primary:focus{
  background-color: rgb(42, 60, 120);
  color: white;
}
.btn-primary:active{
  background: rgb(37, 53, 103);
  color: white;
}
</style>
