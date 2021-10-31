<template>
  <div id="top" style="min-height: 100vh;" :style="{ backgroundImage: bg1 }">
    <div class="d-md-none d-block" style="min-height: 10vh"></div>
    <div class="d-md-block d-none" style="min-height: 25vh"></div>
    <section
      class="container">
      <div class="align-items-center justify-content-between text-light p-3"
           style="border-radius: 1rem; background: black">
        <section class="mt-2">
          <h1 class="fw-bold m-3 d-flex">
            <i class="bi bi-stars" style="font-size: 200%"></i><br>
            Welcome.<br>
          </h1>
          <h2>Discover a new world of possibilities for artists.</h2>
        </section>
        <hr>
        <section class="d-md-flex">
          <h1 class="fw-bold text-start">
            Unleash your <span style="color: mediumvioletred; font-size: 200%">POTENTIAL</span>
          </h1>
          <h3 class="text-center fw-bold">
            Whether you're a total beginner or a professional... <br><br>
            We've got you covered.
          </h3>
        </section>
      </div>
    </section>
    <div>
      <section class="text-center p-3 d-flex">
        <div class="container">
          <div>
            <button class="btn mdArrow" v-on:click="scrollTo('middle')">
              <i class="bi bi-arrow-down h1" style="color: white"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div id="middle" style="min-height: 100vh" :style="{ backgroundImage: bg2 }">
    <div class="d-md-none d-block" style="min-height: 10vh"></div>
    <div class="d-md-block d-none" style="min-height: 25vh"></div>
    <section
      class="container">
      <div class="align-items-center justify-content-between text-light p-3"
           style="border-radius: 1rem; background: black">
        <section class="container mt-5">
          <h1 style="font-weight: bold; color: white">Be part of the collective.</h1>
        </section>
        <hr>
        <section class="d-md-flex">
          <h3 class="text-center fw-bold">
            Vocalists, producers, graphics designers and video producers... <br><br>
            From <span style="font-size: 200%">19</span> countries across the world.
          </h3>
          <h1 class="fw-bold text-start">
            Enjoy <span style="color: blue; font-size: 200%">DIVERSITY</span>
          </h1>
        </section>
      </div>
    </section>
    <section class="text-center p-3 d-flex">
      <div class="container">
        <div>
          <button class="btn mdArrow" v-on:click="scrollTo('bottom')">
            <i class="bi bi-arrow-down h1" style="color: white"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
  <!-- Box View -->
  <div id="bottom" style="min-height: 100vh" :style="{ backgroundImage: bg3 }">
    <div class="d-md-none d-block" style="min-height: 10vh"></div>
    <div class="d-md-block d-none" style="min-height: 10vh"></div>
    <section
      class="container">
      <div class="d-md-flex align-items-center justify-content-between text-light p-3">
        <h1 class="fw-bold text-start mb-5">
          <span style="color: white; font-size: 200%">
                Join now.<br>
                0R0CHI Batsuzoku
              </span>
        </h1>
        <div class="d-flex">
          <div class="text-center">
            <button title="Soundcloud"
                    class="btn bi-cloud-fill btn-lg muArrow"
                    style="color: white"
                    v-on:click="redirectSoundcloud"/>
            <br>
            <button title="Discord"
                    class="btn bi-discord btn-lg muArrow mt-3"
                    style="color: white"
                    v-on:click="redirectDiscord"/>
            <br>
            <button title="Instagram"
                    class="btn bi-instagram btn-lg muArrow mt-3"
                    style="color: white"
                    v-on:click="redirectInstagram"/>
            <br>
            <button title="GitHub"
                    class="btn bi-github btn-lg muArrow mt-3"
                    style="color: white"
                    v-on:click="redirectGitHub"/>
          </div>
          <div class="ms-5">
            <button v-show="!isLoggedIn"
                    class="btn btn-outline-light btn-lg muArrow fw-bold"
                    v-on:click="gotoLogin()"
                    style="width: 200px">
              Login
            </button>
            <br>
            <button v-show="!isLoggedIn"
                    class="btn btn-outline-light btn-lg muArrow fw-bold mt-3"
                    v-on:click="gotoRegister()"
                    style="width: 200px">
              Register
            </button>
            <button v-show="isLoggedIn"
                    class="btn btn-outline-light btn-lg muArrow fw-bold mt-3"
                    v-on:click="gotoAccount()"
                    style="width: 200px">
              Account
            </button>
            <br>
            <button class="btn btn-outline-light btn-lg muArrow fw-bold mt-3"
                    v-on:click="gotoShop()"
                    style="width: 200px">
              Shop
            </button>
            <br>
            <button class="btn btn-outline-light btn-lg muArrow fw-bold mt-3"
                    v-on:click="scrollTo('root')"
                    style="width: 200px">
              Beam me up
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="p-1">
      <div class="container card-group">
        <div class="row text-center">
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-file-earmark-music"></i>
                </div>
                <h3 class="card-title">
                  Beats & Instrumentals
                </h3>
                <p class="card-text">
                  Commission beats from our many producers.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-mic"></i>
                </div>
                <h3 class="card-title">
                  Vocals
                </h3>
                <p class="card-text">
                  What would a song be without vocals?
                  Well, an instrumental, but that's not the point here.<br>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-broadcast-pin"></i>
                </div>
                <h3 class="card-title">
                  Promotion
                </h3>
                <p class="card-text">
                  We will promote your work on our many platforms.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-soundwave"></i>
                </div>
                <h3 class="card-title">
                  Mixing & Mastering
                </h3>
                <p class="card-text">
                  We can take care of mixing and/or mastering if needed.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-heart"></i>
                </div>
                <h3 class="card-title">
                  Emotional Support
                </h3>
                <p class="card-text">
                  Even if you feel lost and alone, we are here for you.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-shop-window"></i>
                </div>
                <h3 class="card-title">
                  Web Shop
                </h3>
                <p class="card-text">
                  Sell products and services through our own web shop solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      angle: '180',
      colorA1: 'darkred',
      colorA2: 'rebeccapurple',
      colorB1: 'darkblue',
      colorC1: 'gray'
    }
  },
  methods: {
    scrollTo (content) {
      document.getElementById(content).scrollIntoView({ behavior: 'smooth' })
    },
    gotoRegister () {
      this.$router.push('/register')
    },
    gotoAccount () {
      this.$router.push('/account')
    },
    gotoShop () {
      this.$router.push('/shop')
    },
    gotoLogin () {
      this.$router.push('/login?redirect=/account')
    },
    redirectDiscord () {
      window.open('https://discord.gg/pr2vwr8')
    },
    redirectInstagram () {
      window.open('https://www.instagram.com/0r0chiclan/')
    },
    redirectSoundcloud () {
      window.open('https://soundcloud.com/orochiclan')
    },
    redirectGitHub () {
      window.open('https://github.com/glehu')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.authenticated
    },
    bg1 () {
      return `linear-gradient(${this.angle}deg, ${this.colorA1}, ${this.colorA2})`
    },
    bg2 () {
      return `linear-gradient(${this.angle}deg, ${this.colorA2}, ${this.colorB1})`
    },
    bg3 () {
      return `linear-gradient(${this.angle}deg, ${this.colorB1}, ${this.colorC1})`
    }
  }
}
</script>

<style scoped>
.muArrow, .mdArrow {
  position: relative;
  top: 0;
  transition: top ease 0.5s;
}

.muArrow:hover {
  top: -8px;
}

.mdArrow:hover {
  top: +8px;
}
</style>
