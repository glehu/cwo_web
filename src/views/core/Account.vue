<template>
  <div style="min-height: 10vh"></div>
  <section
    class="container">
    <div class="text-light p-3">
      <h2 class="fw-bold my-3 d-flex doHover" style="overflow: hidden">
        <i class="bi bi-stars" style="font-size: 200%"></i><br>
        Hey, {{ this.$store.state.username }}.<br><br>
      </h2>
      <h3 class="pb-1">What's next?</h3>
      <div class="card text-white"
           style="border-radius: 1rem; border-color: black" :style="{ backgroundImage: bg3 }">
        <section
          class="container">
          <div class="d-md-flex justify-content-between text-white mt-3"
               style="border-radius: 1rem;">
            <div class="d-flex">
              <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                      v-on:click="showCart">
                <i class="bi bi-cart p-1"></i><span class="fw-bold"> Cart</span>
              </button>
              <div class="d-lg-flex">
                <div class="d-flex">
                  <i class="bi bi-stack ms-3"></i>
                  <p class="ms-2">
                    {{ this.$store.state.cart.length }} Items
                  </p>
                </div>
                <div class="d-flex">
                  <i class="bi bi-cash-stack ms-3"></i>
                  <p class="ms-2">
                    {{ cartTotal }} €
                  </p>
                </div>
              </div>
            </div>
            <h3 class="d-none d-md-block" style="font-weight: lighter">View your shopping cart.</h3>
          </div>
        </section>
        <section
          class="container">
          <div class="d-md-flex justify-content-between text-white mt-3"
               style="border-radius: 1rem;">
            <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                    v-on:click="gotoInvoices">
              <i class="bi bi-journal-text p-1"></i><span class="fw-bold"> Invoices</span>
            </button>
            <h3 class="d-none d-md-block" style="font-weight: lighter">View your invoices</h3>
          </div>
        </section>
        <section
          class="container">
          <div class="d-md-flex justify-content-between text-white mt-3"
               style="border-radius: 1rem;">
            <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                    v-on:click="gotoPreferences">
              <i class="bi bi-wrench p-1"></i><span class="fw-bold"> Preferences</span>
            </button>
            <h3 class="d-none d-md-block" style="font-weight: lighter">Cookies and Trackers</h3>
          </div>
        </section>
        <section
          class="container">
          <div class="d-md-flex justify-content-between text-white mt-3"
               style="border-radius: 1rem;">
            <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                    v-on:click="gotoAPI">
              <i class="bi bi-cloud-upload p-1"></i><span class="fw-bold"> API Manager</span>
            </button>
            <h3 class="d-none d-md-block" style="font-weight: lighter">API Settings & Authorization</h3>
          </div>
        </section>
        <section
          class="container">
          <div class="d-md-flex justify-content-between text-white mt-3"
               style="border-radius: 1rem;">
            <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                    v-on:click="gotoPlanner">
              <i class="bi bi-wrench-adjustable-circle p-1"></i><span class="fw-bold"> Planner</span>
            </button>
            <h3 class="d-none d-md-block" style="font-weight: lighter">Kanban Style ToDo's et cetera</h3>
          </div>
        </section>
        <section
          class="container">
          <div class="d-md-flex justify-content-between text-white mt-3 mb-3"
               style="border-radius: 1rem;">
            <button class="btn btn-outline-light btn-lg text-start" style="width: 200px"
                    v-on:click="logout">
              <i class="bi bi-door-open p-1"></i><span class="fw-bold"> Logout</span>
            </button>
            <h3 class="d-none d-md-block" style="font-weight: lighter">Want to leave? See you soon.</h3>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      angleC3: '180',
      colorA2: 'rebeccapurple',
      colorB1: 'darkblue'
    }
  },
  computed: {
    bg3 () {
      return `linear-gradient(${this.angleC3}deg, ${this.colorB1}, ${this.colorA2})`
    },
    cartTotal () {
      let total = 0
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        total += (this.$store.state.cart[i].price * this.$store.state.cart[i].amount)
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
    },
    gotoAPI () {
      this.$router.push('/apimanager')
    },
    gotoInvoices () {
      this.$router.push('/invoices')
    },
    gotoPlanner () {
      this.$router.push('/apps/planner')
    }
  }
}
</script>

<style scoped>

.doHover {
  animation: hover 3s ease-in-out infinite;
}

@keyframes hover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
