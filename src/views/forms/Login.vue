<template>
  <div
    style="min-height: 100vh; min-width: 100vw; max-width: 100vw; background-color: black; overflow-x: hidden"
    :style="{ backgroundImage: 'url('+require('@/assets/'+'account/pexels-adrien-olichon-2387819.jpg')+')', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
    <div style="min-height: 10vh"></div>
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
                        placeholder="Email"
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
                    <p class="mt-5">Don't have an account?
                      <button v-on:click="gotoRegister()" class="btn text-white muArrow">Sign Up</button>
                    </p>
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
      user: {
        token: '',
        email: '',
        password: ''
      },
      loginResponse: {
        httpCode: 0,
        token: ''
      }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.authenticated
    },
    usageTracker () {
      return this.$store.state.usageTracking
    }
  },
  methods: {
    login () {
      if (!this.isLoggedIn) {
        // Bypass login for testing purposes
        if (this.user.email === 'test@cwo') {
          this.$store.commit('logIn', {
            email: 'test@cwo',
            password: 'test',
            token: '! Test Account - No Token In Offline Mode !'
          })
          this.$router.push(this.$route.query.redirect.toString() || '/')
        } else {
          // Regular login
          this.serverLogin()
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
        this.$store.state.serverIP + '/login',
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.loginResponse = JSON.parse(data.contentJson)))
        .then(this.processLogin)
        .catch(() => this.$notify(
          {
            title: 'Login Failed',
            text: 'Check Credentials or Register.',
            type: 'error'
          }))
    },
    processLogin () {
      if (this.loginResponse.httpCode === 200) {
        this.user.token = this.loginResponse.token
        this.$store.commit('logIn', this.user)
        console.log('User logged in: ' + this.$store.state.authenticated)
        if (this.usageTracker) {
          this.sendUsageData({
            source: 'webshop',
            module: 'login',
            action: 'login'
          })
        }
        this.$router.push(this.$route.query.redirect.toString() || '/')
      } else {
        this.user.password = ''
      }
    },
    gotoRegister () {
      this.$router.push('/register')
    },
    async sendUsageData (usageObj) {
      const headers = new Headers()
      headers.set('Authorization', 'Bearer ' + this.$store.state.token)
      headers.set(
        'Content-Type', 'application/json'
      )
      fetch(
        this.$store.state.serverIP + '/api/utr',
        {
          method: 'post',
          headers: headers,
          body: JSON.stringify(usageObj)
        }
      ).then(r => console.log(r))
    }
  }
}
</script>

<style scoped>
.muArrow {
  position: relative;
  top: 0;
  transition: top ease 0.5s;
}

.muArrow:hover {
  top: -5px;
}
</style>
