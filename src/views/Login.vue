<template>
  <form class="login" @submit.prevent="login">
    <section>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card text-white" style="border-radius: 1rem; background: black">
              <div class="card-body p-5 text-center">
                <div class="mt-md-0 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <div class="form-outline form-white mb-4">
                    <input
                      required
                      v-model="user.email"
                      type="email"
                      placeholder="EMail"
                    />
                  </div>
                  <div class="form-outline form-white mb-4">
                    <input
                      required
                      v-model="user.password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#">Forgot password?</a></p>
                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                  <p class="mt-5">Don't have an account? <a href="#" class="text-white-50 fw-bold">Sign Up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<script>
export default {
  data () {
    return {
      user: {
        httpCode: 0,
        email: '',
        password: ''
      }
    }
  },
  computed: {},
  methods: {
    isLoggedIn () {
      return this.$store.state.authenticated
    },
    login () {
      if (!this.isLoggedIn()) {
        // Bypass login for testing purposes
        if (this.user.email === 'test@cwo') {
          this.$store.commit('logIn', {
            email: 'test@cwo',
            password: 'test'
          })
          this.$router.push(this.$route.query.redirect.toString() || '/')
        } else {
          // Regular login
          this.serverLogin()
          setTimeout(() => {
            if (this.user.httpCode === 200) {
              this.$store.commit('logIn', this.user)
              console.log('User logged in: ' + this.$store.state.authenticated)
              this.$router.push(this.$route.query.redirect.toString() || '/')
            } else {
              this.user.password = ''
            }
          }, 1000)
        }
      } else {
        console.log('User already logged in.')
      }
    },
    serverLogin () {
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from(this.user.email + ':' + this.user.password).toString('base64')
      )
      fetch(
        'http://localhost:8000/login',
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.user.httpCode = JSON.parse(data.contentJson).httpCode))
        .catch((err) => console.log(err.message))
    }
  }
}
</script>

<style scoped></style>
