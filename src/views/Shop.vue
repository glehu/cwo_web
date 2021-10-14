<template>
  <div class="bg-danger bg-gradient fill-height" style="min-height: 100vh">
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
      <div class="card-group row-cols-lg-3 row-cols-md-2">
        <div v-for="col in itemList" :key="col">
          <div class="card border-0 bg-light m-5" v-for="item in col" :key="item">
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
  </div>
</template>

<script>

export default {
  data () {
    return {
      itemList:
        [['{"uID":1,"description":"T-Shirt","articleNumber":"?","ean":"?","manufacturerCode":"?","productInfoJson":"?","prices":{"0":"{\\"n\\":0,\\"d\\":\\"default\\",\\"v\\":19.0,\\"gp\\":12.0}"}}'],
          ['{"uID":2,"description":"Sticker Pack","articleNumber":"?","ean":"?","manufacturerCode":"?","productInfoJson":"?","prices":{"0":"{\\"n\\":0,\\"d\\":\\"default\\",\\"v\\":19.0,\\"gp\\":4.99}"}}'],
          ['{"uID":3,"description":"Hat","articleNumber":"?","ean":"?","manufacturerCode":"?","productInfoJson":"?","prices":{"0":"{\\"n\\":0,\\"d\\":\\"default\\",\\"v\\":19.0,\\"gp\\":25.0}"}}'],
          ['{"uID":4,"description":"Wristband","articleNumber":"?","ean":"?","manufacturerCode":"?","productInfoJson":"?","prices":{"0":"{\\"n\\":0,\\"d\\":\\"default\\",\\"v\\":19.0,\\"gp\\":9.0}"}}'],
          ['{"uID":5,"description":"Signed Card","articleNumber":"?","ean":"?","manufacturerCode":"?","productInfoJson":"?","prices":{"0":"{\\"n\\":0,\\"d\\":\\"default\\",\\"v\\":19.0,\\"gp\\":5.0}"}}'],
          ['{"uID":6,"description":"Poop Scented Candle","articleNumber":"?","ean":"?","manufacturerCode":"?","productInfoJson":"?","prices":{"0":"{\\"n\\":0,\\"d\\":\\"default\\",\\"v\\":19.0,\\"gp\\":34.0}"}}'],
          ['{"uID":7,"description":"Pain","articleNumber":"?","ean":"?","manufacturerCode":"?","productInfoJson":"?","prices":{"0":"{\\"n\\":0,\\"d\\":\\"default\\",\\"v\\":19.0}"}}']]
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
      return chunk(list, 3)
    }
  }
}
</script>

<style>
</style>
