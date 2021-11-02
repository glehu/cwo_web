<template>
  <div class="preferences">
    <div class="d-md-none d-block" style="min-height: 10vh"></div>
    <div class="d-md-block d-none" style="min-height: 10vh"></div>
    <div class="container">
      <h1 class="fw-bold text-white p-3" style="border-radius: 1rem; background: black">
        Hey, no running in the hallways!
      </h1>
      <div class="mt-3 p-3"
           style="border-radius: 1rem; background: black">
        <h2 class="text-white">
          This website makes use of cookies!.
        </h2>
        <p class="text-white">
          Cookies (data stored locally on your device) are required for this website.
          <br>Without those, the website cannot operate as intended, and worse, the cookie monster will be saddened.
        </p>
        <div class="d-md-flex">
          <div class="btn-group">
            <button class="btn btn-lg btn-outline-danger" v-on:click="revokeCookieAllowances"
                    style="width: 150px">
              <span>No<br>Cookies</span>
            </button>
            <button class="btn btn-lg btn-outline-info ms-1" v-on:click="allowEssentialCookies"
                    style="width: 150px">
              <span>Essential<br>Cookies</span>
            </button>
          </div>
          <p class="ms-3 text-white">
            Are cookies currently allowed?
            <span class="fw-bold ms-2" style="font-size: 200%">
            {{ generalCookieAllowance }}
          </span>
          </p>
        </div>
      </div>
      <div class="mt-2 p-3" style="border-radius: 1rem; background: black">
        <h2 class="text-white">
          Allow usage tracking?
        </h2>
        <p class="text-white">
          In order to optimize the website, I need your usage data to know what you're doing most of the time.
          <br>No personal data will be sent to the server.
        </p>
        <div class="d-md-flex">
          <div class="btn-group">
            <button class="btn btn-lg btn-outline-danger" v-on:click="denyUsageTracking"
                    style="width: 150px">
              <span>No Usage<br>Tracking</span>
            </button>
            <button class="btn btn-lg btn-outline-info ms-1" v-on:click="allowUsageTracking"
                    style="width: 150px">
              <span>Allow Usage<br>Tracking</span>
            </button>
          </div>
          <p class="ms-3 text-white">
            Is usage tracking currently allowed?
            <span class="fw-bold ms-2" style="font-size: 200%">
            {{ usageTrackingAllowance }}
          </span>
          </p>
        </div>
      </div>
      <div class="mt-3 p-3" style="border-radius: 1rem; background: black">
        <button class="btn btn-lg btn-outline-success mt-2" v-on:click="confirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPreferences',
  computed: {
    generalCookieAllowance () {
      return this.$store.state.cookieAllowance
    },
    usageTrackingAllowance () {
      return this.$store.state.usageTracking
    }
  },
  methods: {
    revokeCookieAllowances () {
      this.$store.commit('revokeAllCookieAllowances')
    },
    allowEssentialCookies () {
      this.$store.commit('allowCookie', 'Essential')
    },
    denyUsageTracking () {
      this.$store.commit('denyUsageTracking')
    },
    allowUsageTracking () {
      this.$store.commit('allowUsageTracking')
    },
    confirm () {
      if (this.generalCookieAllowance) {
        this.$router.push(this.$route.query.redirect.toString() || '/')
      } else {
        this.$notify(
          {
            title: 'Missing cookie allowance!',
            text: 'Essential cookies need to be allowed.',
            type: 'error'
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
