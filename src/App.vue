<template>
  <div id="root" class="home">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: black">
      <div class="container">
        <!--<a href="#" class="navbar-brand fw-bold">
          <img src="../public/orochiicon.png" alt=""/>
          Orochi Batsuzoku
        </a>-->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navmenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link fw-bold">
                <span style="color: white"><i class="bi bi-house"></i> Home</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/artists" class="nav-link fw-bold">
                <span style="color: white"><i class="bi bi-people"></i> Artists</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/songs" class="nav-link fw-bold">
                <span style="color: white"><i class="bi bi-music-note"></i> Songs</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fw-bold">
                <span style="color: white"><i class="bi bi-shop-window"></i> Shop</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link fw-bold">
                <span style="color: white"><i class="bi bi-question-circle"></i> About</span>
              </router-link>
            </li>
            <!-- Account -->
            <li v-if="isLoggedIn"
                class="nav-item">
              <router-link to="/account" class="nav-link">
                <span style="color: white"><i class="bi bi-person-bounding-box"></i> {{
                    this.$store.state.username
                  }}</span>
                <span style="color: white">(<i class="bi bi-stack small"></i> {{
                    this.$store.state.cart.length
                  }})</span>
              </router-link>
            </li>
            <li v-else
                class="nav-item">
              <router-link to="/login?redirect=/account" class="nav-link">
                <span style="color: white"><i class="bi bi-person-bounding-box"></i> Login</span>
                <span style="color: white">(<i class="bi bi-stack small"></i> {{
                    this.$store.state.cart.length
                  }})</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style="min-height: 100vh; background-color: #0A0A0F">
      <router-view/>
    </div>
    <notifications position="bottom right"/>
  </div>
</template>

<style>

@font-face {
  font-family: "JetBrains Mono Medium";
  font-style: normal;
  font-display: auto;
  src: local("JetBrains Mono Medium"), url(./assets/fonts/JetBrainsMono-Medium.ttf) format("truetype");
}

@font-face {
  font-family: "JetBrains Mono Bold";
  font-style: normal;
  font-display: auto;
  src: local("JetBrains Mono Bold"), url(./assets/fonts/JetBrainsMono-Bold.ttf) format("truetype");
}

</style>

<script>
export default {
  mounted () {
    this.checkServerIP()
  },
  data () {
    return {
      angle: '45',
      color1: 'darkred',
      color2: 'rebeccapurple'
    }
  },
  methods: {
    checkServerIP () {
      console.log(this.$store.state.serverIP)
      if (this.$store.state.serverIP === null || this.$store.state.serverIP === undefined) {
        this.$store.commit('setServerIP', 'http://localhost:8000/')
      }
    }
  },
  computed: {
    bg () {
      return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`
    },
    isLoggedIn () {
      return this.$store.state.authenticated
    }
  }
}
</script>
