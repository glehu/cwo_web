<template>
  <div class="text-center">
    <div class="card container">
      <h5 class="card-header">CWO_ERP M1 API</h5>
      <div class="card-body">
        <input
          v-model="message"
          v-on:keyup.enter="processInput(message)"
          placeholder="Search text"
        />
      </div>

      <table class="table table-bordered">
        <thead>
        <tr>
          <th>uID</th>
          <th>Name</th>
          <th>Vocalist</th>
          <th>Producer</th>
          <th>Type</th>
          <th>Album Name</th>
          <th>Comment</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in myObj.resultsList" :key="item.uID">
          <td>{{ JSON.parse(item).uID }}</td>
          <td>{{ JSON.parse(item).name }}</td>
          <td>{{ JSON.parse(item).vocalist }}</td>
          <td>{{ JSON.parse(item).producer }}</td>
          <td>{{ JSON.parse(item).type }}</td>
          <td>{{ JSON.parse(item).nameAlbum }}</td>
          <td>{{ JSON.parse(item).comment }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'get-request',
  data () {
    return {
      songResults: null,
      message: '',
      myObj: {},
      fields: ['uID', 'name', 'vocalist']
    }
  },
  methods: {
    getSongFromUID (uID) {
      this.myObj = {}
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from(
          this.$store.state.username + ':' + this.$store.state.password)
          .toString('base64')
      )
      fetch(
        'http://localhost:8000/api/m1/entry/' + uID + '?type=name&format=json&lock=false',
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.myObj = data))
        .catch((err) => console.log(err.message))
    },
    processInput (searchString) {
      this.getSongFromUID(searchString)
    }
  }
}
</script>

<style>
</style>
