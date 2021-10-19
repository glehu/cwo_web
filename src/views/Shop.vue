<template>
  <div class="shop bg-dark text-light">
    <!-- Box View -->
    <section class="p-1">
      <div class="container">
        <div class="row text-center">
          <div class="col-md mt-1 d-md-flex">
            <button class="btn text-dark fw-bold" v-on:click="getItems()">
              <div class="card bg-light text-dark">
                <div class="card-body text-center">
                  <div class="h1 mb-3">
                    <i class="bi bi-bag"></i>
                  </div>
                  <h3 class="card-title">
                    Merchandise
                  </h3>
                  <p class="fw-bold text-dark">View Items</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <section class="">
    <div class="card-group">
      <div v-for="col in itemList" :key="col">
        <div class="col card border-0 bg-light m-5" v-for="item in col" :key="item">
          <div class="card-header">
            <h3 class="card-title fw-bold">
              {{ JSON.parse(item).description }}
            </h3>
          </div>
          <div class="card-body text-center">
            <i class="bi bi-question-circle"></i>
          </div>
          <div class="card-footer">
            <p class="mb-auto">
              <button class="btn d-flex bg-dark text-light">Buy</button>
            </p>
            <p class="mb-auto text-end fw-bold lead">
              {{ JSON.parse((JSON.parse(item).prices[0])).gp }}$
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="text-end m-2">
    <h1 class="fw-bold">0R0CHI Batsuzoku</h1>
  </div>
</template>

<script>

export default {
  data () {
    return {
      resultsList: {},
      itemList: {}
    }
  },
  methods: {
    getItems () {
      this.itemList = {}
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from('admin' + ':' + 'admin').toString('base64')
      )
      fetch(
        'http://localhost:8000/api/m4/entry/*?type=name&format=json&lock=false',
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.itemList = this.chunkedItems(data.resultsList)))
        .catch((err) => console.log(err.message))
    },
    chunkedItems (list) {
      console.log(list)
      const chunk = require('chunk')
      const chunked = chunk(list, 3)
      console.log(chunked)
      return chunked
    }
  }
}
</script>

<style>
</style>
