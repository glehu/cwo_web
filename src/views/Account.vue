<template>
  <div style="min-height: 10vh"></div>
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
            <div class="d-md-flex justify-content-between text-light p-3"
                 style="border-radius: 1rem; background: black">
              <div class="d-flex">
                <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                        v-on:click="showCart">
                  <i class="bi bi-basket p-1"></i> Cart
                </button>
                <div class="d-md-flex">
                  <div class="d-flex ms-md-2">
                    <i class="bi bi-stack ms-3"></i>
                    <p class="ms-2">
                      {{ this.$store.state.cart.length }} Items
                    </p>
                  </div>
                  <div class="d-flex ms-md-5">
                    <i class="bi bi-cash-stack ms-3"></i>
                    <p class="ms-2">
                      {{ cartTotal }} €
                    </p>
                  </div>
                </div>
              </div>
              <h3 class="d-none d-md-block">View your shopping cart.</h3>
            </div>
          </section>
          <section
            class="container">
            <div class="d-md-flex justify-content-between text-light p-3"
                 style="border-radius: 1rem; background: black">
              <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                      v-on:click="gotoPreferences">
                <i class="bi bi-wrench p-1"></i> Preferences
              </button>
              <h3 class="d-none d-md-block">Cookies and Trackers</h3>
            </div>
          </section>
          <section
            class="container">
            <div class="d-md-flex justify-content-between text-light p-3"
                 style="border-radius: 1rem; background: black">
              <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                      v-on:click="logout">
                <i class="bi bi-door-open p-1"></i> Logout
              </button>
              <h3 class="d-none d-md-block">Want to leave? See you soon.</h3>
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
  computed: {
    cartTotal () {
      let total = 0
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        total += this.$store.state.cart[i].price
      }
      return total
    }
  },
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
            this.$store.state.username + ':' + this.$store.state.password)
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
        this.$router.push('/login?redirect=/account')
      } else {
        console.log('User not logged in.')
      }
    },
    gotoPreferences () {
      this.$router.push('/preferences?redirect=/account')
    }
  }
}
</script>

<style scoped></style>
