<template>
  <div class="bg-danger bg-gradient" style="min-height: 100vh">
    <form class="login" @submit.prevent="logout">
      <section>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">
                  <div class="mt-md-0 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">Want to leave?</h2>
                    <br>
                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      user: {
        httpCode: 0
      }
    }
  },
  computed: {},
  methods: {
    isLoggedIn () {
      return this.$store.state.authenticated
    },
    logout () {
      if (this.isLoggedIn()) {
        this.$store.commit('logOut')
        console.log('User logged out: ' + this.$store.state.authenticated)
        this.$router.push('/')
      } else {
        console.log('User not logged in.')
      }
    }
  }
}
</script>

<style scoped></style>
