<template>
  <div class="home">
    <!--jumbotron-->
    <div class="jumbotron jumbotron-fluid d-flex align-items-center justify-content-around flex-column text-center section-dark">
            <header>
                <h1>PenguinExplorer</h1>
                <h3 class="slogan text-center">Penguins and where to find them</h3>
            </header>
            <button class="btn btn-primary" @click="signInWithGoogle">Get Started</button>
            <div class="scroll-down-div">
              <a href="#section1">
                <font-awesome-icon icon="angle-down" class="fa fa-3x"/>
              </a>
            </div>

    </div>
    <!--main article-->
    <section id="section1" class="container-fluid d-flex align-items-center justify-content-center section-dark">
        <div class="row col-12 align-items-center justify-content-center">
          <article class="col-12 col-sm-6 col-md-7">
            <header>
              <h2 class="article_title">"There are lots of penguins in the city. You just need to know where to find them."</h2>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </article>
          <div class="col-12 col-sm-6 col-md-5 d-flex align-items-center justify-content-center">
            <img class="img-fluid" src="https://image.flaticon.com/icons/svg/141/141726.svg" alt="penguin image" >
          </div>
          <div class="scroll-down-div col-12 text-center">
            <a href="#section2">
              <font-awesome-icon icon="angle-down" class="fa fa-3x"/>
            </a>
          </div>
        </div>
    </section>

    <section id="section2" class="container-fluid d-flex align-items-center justify-content-center">
        <div class="row col-12  justify-content-center flex-sm-row-reverse">
          <article class="col-12 col-sm-6 col-md-7">
            <header>
              <h2 class="article_title">Explor the Cities</h2>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </article>
          <div class="col-12 col-sm-6 col-md-5 d-flex align-items-center justify-content-center">
            <img class="img-fluid" src="https://image.flaticon.com/icons/svg/119/119583.svg" alt="city image" >
          </div>
          <div class="scroll-down-div col-12 text-center">
            <a href="#section3">
              <font-awesome-icon icon="angle-down" class="fa fa-3x"/>
            </a>
          </div>
        </div>
    </section>

    <section id="section3" class="container-fluid d-flex align-items-center justify-content-center section-dark">
        <div class="row col-12 align-items-center justify-content-center">
          <article class="col-12 col-sm-6 col-md-7">
            <header>
              <h2 class="article_title">Checkout Local Places and Restaurants</h2>
            </header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </article>
          <div class="col-12 col-sm-6 col-md-5 d-flex align-items-center justify-content-center">
            <img class="img-fluid" src="https://image.flaticon.com/icons/svg/1329/1329642.svg" alt="image" >
          </div>
          <div class="scroll-down-div col-12 text-center">
            <a href="#section4">
              <font-awesome-icon icon="angle-down" class="fa fa-3x"/>
            </a>
          </div>
        </div>
    </section>

    <!--summary-->
    <section id="section4" class="container-fluid d-flex align-items-center justify-content-center">
        <div class="row col-12 align-items-center justify-content-center flex-sm-row-reverse">
            <article class="col-12 col-sm-6 col-md-7">
              <div>
                <h2 class="article_title">Can't Wait to Start Explor?</h2>
                <button class="btn btn-primary" @click="signInWithGoogle">Get Started</button>
              </div>
            </article>
            <div class="col-12 col-sm-6 col-md-5 d-flex align-items-center justify-content-center">
              <img class="img-fluid" src="https://image.flaticon.com/icons/svg/1090/1090661.svg" alt="image" >
            </div>
        </div>
    </section>
    <div class="footer">
      <div>Group Penguin</div>
      <div class="cite">Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    </div>
  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig"
import jquery from 'jquery'
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
    jquery(function() {
      jquery('a[href*="#"]').on('click', function(e) {
        e.preventDefault()
        jquery('html, body').animate({ scrollTop: jquery(jquery(this).attr('href')).offset().top-parseInt(jquery('#app').css('padding-top'))}, 'slow', 'swing');
      })
    })
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
  margin-bottom: 1rem;
}
section {
  min-height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
section div.row{max-width: 1000px;}
h1 {
  margin-bottom: 1rem;
}
img {
  width:250px;
}
/**Jumbotron**/
.jumbotron{
  width: 100%;
  height: 100%;
  background-image: url("http://gimesy.com/wp-content/gallery/things-with-wings/Gimesy-4298.jpg");
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
  opacity: 0.9;
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
.scroll-down-div {
  margin-top: 1rem;
}
.fa {
  color: black;
}
/**Different section backgrounds**/
.section-dark{
  color: white;
  background-color: rgb(37, 53, 103);
}
.section-dark .scroll-down-div .fa {
  color: white;
}
/**footer**/
div.footer {
  min-height: 50px;
  padding: 1rem;
  background-color: rgb(37, 53, 103);
  color: white;
  text-align: center;
}
.cite {
  margin-top: 0.5rem;
}
</style>
