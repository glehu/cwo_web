<template>
  <div style="min-height: 100vh">
    <div style="min-height: 10vh"></div>
    <div class="" style="display: flex">
      <div id="channel_section" class="channel_section"
           style="color: white;
           min-width: 250px;
           background-color: #052939">
        <p style="font-weight: bold; font-size: 125%; padding: 1ch; margin: 0; background-color: #003F3F">
          {{ clarifierUniChatroom.title }}
        </p>
      </div>
      <div id="chat_section" style="width: 100%;">
        <div id="messages_section"
             style="height: 80vh; max-height: 80vh; overflow-y: auto; overflow-x: clip;
             background-color: #041828;
             display: flex; flex-direction: column-reverse">
          <!-- Messages -->
          <div v-for="msg in messages" :key="msg"
               style="padding: 20px; color: white;">
            <div style="padding-bottom: 0; margin-bottom: 0; display: block">
              <span style="font-weight: bold">
                {{ JSON.parse(msg).from }}
              </span>
              <span style="color: gray; font-size: 80%; padding-left: 1ch">
                {{ new Date(JSON.parse(msg).timestamp).toLocaleString('de-DE').replace(' ', '&nbsp;') }}
              </span>
            </div>
            <div style="width: 100%; text-wrap: normal; word-wrap: break-word">
              <span>{{ JSON.parse(msg).message }}</span>
            </div>
          </div>
        </div>
        <div style="display: inline; margin-bottom: 20px">
          <div style="margin-left: 10px; margin-right: 10px">
            <input id="new_comment"
                   type="text"
                   style="width: 90%; height: 4ch; margin-top: 2ch"
                   v-model="new_message"
                   :placeholder="'Message to ' + clarifierUniChatroom.title"
                   v-on:keyup.enter="addMessage()">
            <button class="btn-dark" style="width: 10%; height: 4ch"
                    v-on:click="addMessage">
              <i class="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="member_section" class="member_section"
           style="color: white;
           min-width: 200px;
           background-color: #052939">
        <div style="padding: 10px">
          <div v-for="usr in clarifierUniChatroom.members" :key="usr"
               style="padding: 1ch"
               class="user_badge">
            <i class="bi bi-person-circle"></i> {{ JSON.parse(usr).username.split('@')[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clarifier',
  data () {
    return {
      session: '3628f6a2-d590-4fff-8732-85863cd1ad67',
      clarifierUniChatroom: {},
      connection: null,
      messages: [],
      new_message: ''
    }
  },
  created () {
    this.connection = new WebSocket('wss://wikiric.xyz/clarifier/' + this.session)
    this.connection.onopen = () => {
      this.connection.send(this.$store.state.token)
    }
    this.connection.onmessage = (event) => {
      this.showMessage(event.data)
    }
  },
  mounted () {
    this.getClarifierMetaData()
  },
  methods: {
    showMessage: function (msg) {
      this.messages.unshift(msg)
    },
    addMessage: function () {
      this.connection.send(this.new_message)
      this.new_message = ''
    },
    getClarifierMetaData () {
      this.clarifierUniChatroom = {}
      const headers = new Headers()
      headers.set('Authorization', 'Bearer ' + this.$store.state.token)
      fetch(
        this.$store.state.serverIP + '/api/m5/getchatroom/' + this.session,
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.clarifierUniChatroom = data))
        .catch((err) => console.log(err.message))
    }
  }
}
</script>

<style scoped>

@media only screen and (max-width: 991px) {
  .channel_section {
    display: none;
  }
}

@media only screen and (max-width: 1150px) {
  .member_section {
    display: none;
  }
}

.user_badge:hover {
  transition: 0.5s ease-in-out;
  border-radius: 1em;
  background-color: gray;
}

</style>
