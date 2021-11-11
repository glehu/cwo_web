<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'APICentral',
  methods: {
    oauthSignIn () {
      const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
      const form = document.createElement('form')
      form.setAttribute('method', 'GET')
      form.setAttribute('action', oauth2Endpoint)

      const params = {
        client_id: '160324291103-uofbdac53lmtgut8h3muhkbftc6vc6dh.apps.googleusercontent.com',
        redirect_uri: 'https://orochi.netlify.app',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
        include_granted_scopes: 'true',
        state: 'pass-through value'
      }

      // Add form parameters as hidden input values.
      for (const p in params) {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
      }

      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form)
      form.submit()
    }
  }
}
</script>

<style scoped>

</style>
