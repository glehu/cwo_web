<template>
  <section
    class="container">
    <div class="text-light p-3"
         style="border-radius: 1rem; background: black">
      <h1 class="fw-bold m-3 d-flex">
        <i class="bi bi-stars mb-2" style="font-size: 200%"></i><br>
        Hey, {{ this.$store.state.username }}.<br><br>
      </h1>
      <h3>What's next?</h3>
      <div class="container py-2">
        <div class="card text-white border-2"
             style="border-radius: 1rem; background: black; border-color: white">
          <section
            class="container">
            <div class="d-md-flex align-items-center justify-content-between text-light p-3"
                 style="border-radius: 1rem; background: black">
              <button class="btn btn-outline-light btn-lg px-5"
                      v-on:click="logout">
                Logout
              </button>
              <h3 class="">Want to leave? See you soon.</h3>
            </div>
          </section>
          <section
            class="container">
            <div class="d-md-flex align-items-center justify-content-between text-light p-3"
                 style="border-radius: 1rem; background: black">
              <button class="btn btn-outline-light btn-lg px-5"
                      v-on:click="showCart">
                Cart
              </button>
              <h3 class="">View shopping cart.</h3>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  methods: {
    isLoggedIn () {
      return this.$store.state.authenticated
    },
    showCart () {
      this.$router.push('/cart')
    },
    logout () {
      if (this.isLoggedIn()) {
        const headers = new Headers()
        headers.set(
          'Authorization',
          'Basic ' + Buffer.from(
            this.$store.state.email + ':' + this.$store.state.password)
            .toString('base64')
        )
        fetch(
          'http://localhost:8000/logout',
          {
            method: 'get',
            headers: headers
          }
        )
        this.$store.commit('logOut')
        this.$store.commit('clearCart')
        console.log('User logged in: ' + this.$store.state.authenticated)
        this.$router.push('/')
      } else {
        console.log('User not logged in.')
      }
    }
  }
}
</script>

<style scoped></style>
