<template>
  <div style="min-height: 100vh" class="darkergray">
    <div class="header-margin" style="min-height: 60px; box-shadow: 0 0 20px black; position: relative"></div>
    <div class="clarifier_chatroom" style="display: flex; height: 100%; overflow-y: clip; overflow-x: clip">
      <div id="channel_section" class="channel_section darkgray"
           style="height: 80vh; max-height: 80vh; min-width: 250px">
        <p class="purple channel_section"
           style="font-weight: bold; font-size: 125%; color: white;
           padding: 1ch; margin: 0;
           height: 10%;
           box-shadow: 0 0 20px black; position: relative">
          {{ clarifierUniChatroom.title }}
        </p>
        <div
          style="color: white; z-index: 2;
          height: 90%; overflow-y: auto; overflow-x: clip;">
          <div v-for="session in this.$store.state.clarifierSessions" :key="session">
            <p class="darkergray" style="font-weight: bold; font-size: 125%; padding: 1ch; margin: 0">
              <a class="fw-bold text-white orange-hover" style="text-decoration: none"
                 :href="'/apps/clarifier/wss/' + JSON.parse(session).id">
                <span class="orange-hover">{{ JSON.parse(session).title }}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div id="chat_section" class="chat_section" style="width: 100%; height: 100%">
        <div id="messages_section"
             class="messages_section darkblue"
             style="overflow-y: auto; overflow-x: clip;
             display: flex; flex-direction: column-reverse">
          <!-- Messages -->
          <div v-for="msg in messages" :key="msg"
               style="color: white; padding-left: 25px; padding-right: 25px; padding-bottom: 25px">
            <div style="padding-bottom: 0; margin-bottom: 0; display: block">
              <span style="font-weight: bold">
                {{ JSON.parse(msg).from }}
              </span>
              <span style="color: gray; font-size: 80%; padding-left: 1ch">
                {{ new Date(JSON.parse(msg).timestamp).toLocaleString('de-DE').replace(' ', '&nbsp;') }}
              </span>
            </div>
            <div v-if="JSON.parse(msg).message.startsWith('[c:GIF]')">
              <img :src="JSON.parse(msg).message.substring(7)" :alt="JSON.parse(msg).message.substring(7)">
              <br>
              <div>
                <img src="../../assets/giphy/PoweredBy_200px-Black_HorizText.png" alt="Powered By GIPHY"
                     style="width: 100px"/>
              </div>
            </div>
            <div v-else style="width: 100%; text-wrap: normal; word-wrap: break-word">
              <span>{{ JSON.parse(msg).message }}</span>
            </div>
          </div>
        </div>
        <div style="display: inline;">
          <input id="new_comment"
                 type="text"
                 style="width: 80%; height: 4ch; padding-left: 1ch"
                 v-model="new_message"
                 :placeholder="'Message to ' + clarifierUniChatroom.title"
                 v-on:keyup.enter="addMessage()">
          <button class="btn-dark" style="width: 10%; height: 4ch"
                  v-on:click="toggleSelectingGIF">
            <span class="fw-bold">GIF</span>
          </button>
          <button class="btn-dark" style="width: 10%; height: 4ch"
                  v-on:click="addMessage">
            <i class="bi bi-send"></i>
          </button>
        </div>
      </div>
      <div id="member_section" class="member_section darkgray"
           style="color: white; z-index: 2;
           height: 80vh; max-height: 80vh; overflow-y: auto; overflow-x: clip;
           min-width: 200px">
        <div style="padding: 10px">
          <div v-for="usr in clarifierUniChatroom.members" :key="usr"
               style="padding: 1ch"
               class="user_badge">
            <i class="bi bi-person-badge-fill"></i> {{ JSON.parse(usr).username.split('@')[0] }}
          </div>
          <div class="mt-2" style="padding: 1ch">
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
  <div class="dialog purple" style="overflow: hidden" v-if="isSelectingGIF" @click.stop>
    <div style="width: 100%; margin-top: 68vh; position: absolute">
      <input id="gif_query"
             type="text"
             style="height: 4ch; padding-left: 1ch"
             v-model="gif_query_string"
             :placeholder="'Search for GIFs on GIPHY'"
             v-on:keyup.enter="getGIFSelection(gif_query_string)">
      <img src="../../assets/giphy/PoweredBy_200px-Black_HorizText.png" alt="Powered By GIPHY"
           style="width: 150px; padding-left: 10px"/>
    </div>
    <div style="height: 88%; width: 100%; overflow-x: clip; overflow-y: scroll; margin-top: 1ch" class="darkergray">
      <div v-for="gif in gifSelection" :key="gif"
           style="padding: 10px; display: inline-flex"
           v-on:click="this.addMessagePar('[c:GIF]' + gif.images.fixed_height.url, true)">
        <img :src="gif.images.fixed_height.url" alt=":(" class="selectableGIF"
             style="width: 150px; height: 125px">
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
      gif_query_string: '',
      gifSelection: [],
      showInviteCopied: false,
      isSelectingGIF: false
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
        this.getClarifierMetaData(false)
      }
    },
    addMessage: function () {
      if (this.new_message.trim() === '') {
        this.new_message = ''
        return
      }
      // GIF Lookup?
      if (this.new_message.toLowerCase().startsWith('gif ')) {
        this.getGIF(this.new_message.substring(3))
        this.new_message = ''
        return
      }
      // Handle normal message
      this.connection.send(this.new_message)
      this.new_message = ''
    },
    addMessagePar: function (text, closeGIFSelection = false) {
      this.connection.send(text)
      if (closeGIFSelection) this.isSelectingGIF = false
    },
    getClarifierMetaData: function (updateMessages = true) {
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
        .then(() => (this.processResponse(updateMessages)))
        .catch((err) => console.log(err.message))
    },
    processResponse: function (updateMessages) {
      this.$store.commit('addClarifierSession', {
        id: this.clarifierUniChatroom.chatroomGUID,
        title: this.clarifierUniChatroom.title
      })
      if (updateMessages) {
        this.messages = this.clarifierUniChatroom.messages.reverse()
      }
    },
    getSession: function () {
      return this.$route.params.id
    },
    invite: function () {
      this.showInviteCopied = true
      navigator.clipboard.writeText(this.getSession())
      setTimeout(() => {
        this.showInviteCopied = false
      }, 1000)
    },
    getGIF: function (text) {
      fetch(
        'https://api.giphy.com/v1/gifs/translate?api_key=EHAGwfjtKbbjdR92RAiVNgZyIlQSpUHU&s=' + text,
        {
          method: 'get'
        }
      )
        .then((res) => res.json())
        .then((data) => (this.addMessagePar('[c:GIF]' + data.data.images.fixed_height.url)))
        .catch((err) => console.log(err.message))
    },
    getGIFSelection: function (text) {
      fetch(
        'https://api.giphy.com/v1/gifs/search?api_key=EHAGwfjtKbbjdR92RAiVNgZyIlQSpUHU&q=' + text,
        {
          method: 'get'
        }
      )
        .then((res) => res.json())
        .then((data) => (this.gifSelection = data.data))
        .catch((err) => console.log(err.message))
    },
    toggleSelectingGIF: function () {
      this.isSelectingGIF = !this.isSelectingGIF
    }
  }
}
</script>

<style scoped>

.purple {
  background-color: #8844dd;
}

.darkblue {
  background-color: #041830;
}

.darkgray {
  background-color: #293139;
}

.darkergray {
  background-color: #101010;
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

  .header-margin {
    display: none;
  }

  .messages_section {
    height: 90vh;
    max-height: 90vh;
  }
}

@media only screen and (min-width: 992px) {
  .messages_section {
    height: 80vh;
    max-height: 80vh;
  }

  .dialog {
    transform: translateX(15vw);
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
  background-color: #ff5d37;
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

.orange-hover:hover {
  color: #ff5d37;
  cursor: grab;
}

.selectableGIF:hover {
  cursor: grab;
}

.dialog {
  position: fixed;
  z-index: 1001;
  top: 10vh;
  left: calc(50% - 200px);
  color: white;
  width: 400px;
  height: 75vh;
  padding: 5px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px 10px black;
}

</style>
