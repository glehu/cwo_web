<template>
  <div style="min-height: 100vh">
    <div style="min-height: 60px; box-shadow: 0 0 20px black; position: relative"></div>
    <div class="" style="display: flex">
      <div id="channel_section" class="channel_section"
           style="color: white; z-index: 2;
           min-width: 250px">
        <p class="purple" style="font-weight: bold; font-size: 125%; padding: 1ch; margin: 0">
          {{ clarifierUniChatroom.title }}
        </p>
      </div>
      <div id="chat_section" style="width: 100%;">
        <div id="messages_section"
             class="darkblue"
             style="height: 80vh; max-height: 80vh; overflow-y: auto; overflow-x: clip;
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
          <input id="new_comment"
                 type="text"
                 style="width: 90%; height: 4ch; margin-top: 2ch; padding-left: 1ch"
                 v-model="new_message"
                 :placeholder="'Message to ' + clarifierUniChatroom.title"
                 v-on:keyup.enter="addMessage()">
          <button class="btn-dark" style="width: 10%; height: 4ch"
                  v-on:click="addMessage">
            <i class="bi bi-send"></i>
          </button>
        </div>
      </div>
      <div id="member_section" class="member_section"
           style="color: white; z-index: 2;
           height: 80vh; max-height: 80vh; overflow-y: auto; overflow-x: clip;
           min-width: 200px">
        <div style="padding: 10px">
          <div v-for="usr in clarifierUniChatroom.members" :key="usr"
               style="padding: 1ch"
               class="user_badge">
            <i class="bi bi-person-badge-fill"></i> {{ JSON.parse(usr).username.split('@')[0] }}
          </div>
          <div class="text-center mt-2">
            <span>
              <button class="text-white btn-no-outline"
                      title="Invite"
                      v-on:click="invite()">
                <i class="bi bi-envelope-plus lead"></i>
              </button>
              <span class="tooltip-mock-destination" :class="{'show':showInviteCopied}">Copied!</span>
            </span>
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
      clarifierUniChatroom: {},
      connection: null,
      messages: [],
      new_message: '',
      showInviteCopied: false
    }
  },
  created () {
    this.connection = new WebSocket('wss://wikiric.xyz/clarifier/' + this.getSession())
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
      if ((JSON.parse(msg).message).includes('[LoginNotification]')) {
        this.getClarifierMetaData()
      }
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
        this.$store.state.serverIP + '/api/m5/getchatroom/' + this.getSession(),
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.clarifierUniChatroom = data))
        .then(this.processResponse)
        .catch((err) => console.log(err.message))
    },
    processResponse: function () {
      this.$store.commit('addClarifierSession', {
        id: this.clarifierUniChatroom.chatroomGUID,
        title: this.clarifierUniChatroom.title
      })
    },
    getSession: function () {
      return this.$route.params.id
    },
    invite: function () {
      this.showInviteCopied = true
      const link = this.$store.state.serverIP + '/apps/clarifier/wss/' + this.getSession()
      navigator.clipboard.writeText(link)
      setTimeout(() => {
        this.showInviteCopied = false
      }, 1000)
    }
  }
}
</script>

<style scoped>

.purple {
  background-color: #8844dd;
}

.darkblue {
  background-color: #021425;
}

.darkgray {
  background-color: #494149;
}

.gray {
  background-color: #b1a8b9;
}

.orange {
  background-color: #ff5d37;
}

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
  background-color: #494149;
}

.tooltip-mock-destination.show {
  opacity: 1;
  transition: 0.5s;
  transform: translateY(-60%);
}

.tooltip-mock-destination {
  margin-left: 1ch;
  color: #ffff;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  width: auto;
  opacity: 0;
  transform: translateY(0);
}

.btn-no-outline {
  background-color: transparent;
  border: none;
}

.btn-no-outline:hover, .btn-no-outline:focus {
  outline: none;
}

</style>
