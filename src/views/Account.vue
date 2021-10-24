<template>
  <section
    class="container">
    <div class="text-light p-3" style="border-radius: 1rem; background: black">
      <h1 class="fw-bold m-2">
        <i class="bi bi-stars mb-2" style="font-size: 300%"></i><br>
        Hey, {{ this.$store.state.username }}.
      </h1>
      <form class="login" @submit.prevent="logout">
        <section>
          <div class="container py-2">
            <div class="card text-white border-1" style="border-radius: 1rem; background: black; border-color: white">
              <div class="card-body text-center">
                <div class="mt-md-0 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Want to leave?</h2>
                  <br>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
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
