<template>
  <div
    style="min-height: 100vh; min-width: 100vw; max-width: 100vw; background-color: black; overflow-x: hidden"
    :style="{ backgroundImage: 'url('+require('@/assets/'+'account/pexels-cottonbro-9668535.jpg')+')', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
    <div style="min-height: 10vh"></div>
    <div class="container">
      <div id="title" class="shadow-box" style="width: 100%; border: 2px solid white; border-radius: 1em">
        <div class="px-3 pt-2" style="display: flex; justify-content: space-between">
          <div style="display: flex">
            <i class="h2 bi bi-cloud-upload text-white d-none d-lg-flex"/>
            <p class="h2 ps-2 fw-bold text-white jetb">API Dashboard</p>
          </div>
          <p id="clock" class="ps-5 text-white text-end jetb">{{ time }}</p>
        </div>
      </div>
      <div id="settings" class="mt-5 shadow-box" style="width: 100%; border-radius: 1em">
        <div id="_server_ip" class="ps-2">
          <label class="text-white jetb" for="server_ip">Server IP Address</label><br>
          <input class="ms-3 fw-bold" id="server_ip"
                 style="height: 4ch; width: 75%; background: transparent; color: white">
          <button title="Save Setting" class="btn text-white" v-on:click="updateServerIP">
            <i class="bi bi-layer-backward px-1" style="font-size: 150%"/> Save
          </button>
        </div>
        <div id="_server_token" class="ps-2">
          <label class="text-white jetb" for="server_ip">Token</label><br>
          <input class="ms-3 fw-bold" id="server_token"
                 style="height: 4ch; width: 75%; background: transparent; color: white">
          <button title="Save Setting" class="btn text-white" v-on:click="updateServerToken">
            <i class="bi bi-layer-backward px-1" style="font-size: 150%"/> Save
          </button>
          <button title="Retrieve Token" class="btn text-white" v-on:click="serverLogin">
            <i class="bi bi-layer-forward px-1" style="font-size: 150%"/> Request
          </button>
        </div>
      </div>
      <div id="mock-service" class="mt-5 shadow-box" style="width: 100%; border-radius: 1em">
        <div class="ps-2">
          <div style="display: flex">
            <h2 class="ps-2 jetb">M<span><i class="bi bi-hurricane text-white"/></span>CK Service</h2>
            <button class="ms-5 btn text-white text-decoration-underline"
                    v-on:click="toggleExplanation('mock_explanation')">
              What's that?
            </button>
          </div>
          <div id="mock_explanation" style="display: none">
            <hr style="color: white">
            <p class="jetb">
              Test your own API using the brand-new service for anything mocking-server related.
            </p>
            <p class="jetb">
              Send requests and receive either predefined messages or error codes.
              <br>Responses can be sent with or without delay to simulate a more realistic backend.
            </p>
            <p class="jetb">
              Requires a valid token.
            </p>
            <hr style="color: white">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APICentral',
  data () {
    return {
      time: '',
      user: {}
    }
  },
  created () {
    this.getTime()
    setInterval(this.getTime, 1000)
  },
  mounted () {
    this.checkServerIPField()
    this.checkServerTokenField()
  },
  methods: {
    getTime: function () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0')
      const time = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0') + ':' + today.getSeconds().toString().padStart(2, '0')
      this.time = date + ' ' + time
    },
    checkServerIPField: function () {
      const field = document.getElementById('server_ip')
      field.value = this.$store.state.serverIP
    },
    checkServerTokenField: function () {
      const field = document.getElementById('server_token')
      field.value = this.$store.state.token
    },
    updateServerIP: function () {
      const field = document.getElementById('server_ip')
      this.$store.commit('setServerIP', field.value)
      this.$notify(
        {
          title: 'Settings Updated',
          text: 'Server IP change was submitted.',
          type: 'info'
        })
    },
    updateServerToken: function () {
      const field = document.getElementById('server_token')
      this.$store.commit('setServerToken', field.value)
      this.$notify(
        {
          title: 'Settings Updated',
          text: 'Server Token change was submitted.',
          type: 'info'
        })
    },
    serverLogin: function () {
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from(this.$store.state.username + ':' + this.$store.state.password).toString('base64')
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
        .catch((err) => this.$notify(
          {
            title: 'Error',
            text: err.message,
            type: 'error'
          }))
    },
    processLogin: function () {
      if (this.loginResponse.httpCode === 200) {
        this.$store.commit('setServerToken', this.loginResponse.token)
        this.checkServerTokenField()
        this.$notify(
          {
            title: 'Token Retrieved',
            text: 'A Token was received from the server.',
            type: 'info'
          })
      } else {
        this.$notify(
          {
            title: 'Error' + this.loginResponse.httpCode,
            text: 'No Token was received from the server.',
            type: 'error'
          })
      }
    },
    toggleExplanation: function (explanationId) {
      const explanation = document.getElementById(explanationId)
      if (explanation.style.display === 'block') {
        explanation.style.display = 'none'
      } else {
        explanation.style.display = 'block'
      }
    }
  },
  computed: {
    token: function () {
      return this.$store.state.token
    }
  }
}
</script>

<style scoped>

.shadow-box {
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.6);
  border-radius: 1em
}

.jetb, .btn {
  color: white;
  font-family: 'JetBrains Mono Bold', sans-serif;
}

</style>
