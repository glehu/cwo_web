<template>
  <div id="root" class="home">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: black">
      <div class="container">
        <a href="#" class="navbar-brand fw-bold">
          <img src="../public/orochiicon.png" alt=""/>
          Orochi Batsuzoku
        </a>
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
                <i class="bi bi-house"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link fw-bold">
                <i class="bi bi-question-circle"></i> About
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/m1" class="nav-link fw-bold">
                <i class="bi bi-music-note"></i> Songs
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fw-bold">
                <i class="bi bi-shop-window"></i> Shop
              </router-link>
            </li>
            <!-- Account -->
            <li v-if="isLoggedIn"
                class="nav-item">
              <router-link to="/account" class="nav-link">
                <i class="bi bi-person-bounding-box"></i> {{ this.$store.state.username }}
                (<i class="bi bi-stack small"></i> {{ this.$store.state.cart.length }})
              </router-link>
            </li>
            <li v-else
                class="nav-item">
              <router-link to="/login?redirect=/account" class="nav-link">
                <i class="bi bi-person-bounding-box"></i> Login
                (<i class="bi bi-stack small"></i> {{ this.$store.state.cart.length }})
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style="min-height: 100vh" :style="{ backgroundImage: bg }">
      <router-view/>
    </div>
    <notifications position="bottom right"/>
  </div>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      angle: '45',
      color1: 'darkred',
      color2: 'rebeccapurple'
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
