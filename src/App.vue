<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: darkred">
      <div class="container">
        <a href="#" class="navbar-brand fw-bold">0R0CHI Batsuzoku</a>
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
              <router-link to="/" class="nav-link fw-bold">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link fw-bold">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/m1" class="nav-link fw-bold">Songs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link fw-bold">Shop</router-link>
            </li>
            <li v-if="isLoggedIn"
                class="nav-item ms-lg-5 mt-sm-3 mt-lg-0">
              <router-link to="/account" class="nav-link">
                <i class="bi bi-person-bounding-box m-2"></i>{{ this.$store.state.username }}
              </router-link>
            </li>
            <li v-else
                class="nav-item ms-lg-5 mt-sm-3 mt-lg-0">
              <router-link to="/login?redirect=/" class="nav-link fw-bold">
                <i class="bi bi-person-bounding-box m-2"></i> Login
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style="min-height: 100vh" :style="{ backgroundImage: bg }">
      <router-view/>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      angle: '180',
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
