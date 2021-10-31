<template>
  <div style="min-height: 10vh"></div>
  <div class="shop text-light">
    <!-- Box View -->
    <section class="p-1">
      <div class="container">
        <div class="row">
          <div class="col-md mt-1 d-md-flex">
            <button class="btn text-dark fw-bold" v-on:click="getItems()">
              <div class="card bg-light text-dark animEmp">
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
            <div class="text-start">
              <h1 class="m-2 fw-bold text-white">0R0CHI Batsuzoku</h1>
              <button class="btn text-white animRot" v-on:click="console.log('')">
                <i class="bi bi-arrow-clockwise h1 text-start"></i>
              </button>
              Change Artist
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div id="itemsSection">
    <div class="mt-4" style="min-height: 8vh"></div>
    <section :style="{ backgroundImage: bg }">
      <div class="container">
        <div class="card-group">
          <div class="col-5" v-for="col in shopItemList" :key="col">
            <div class="card m-5"
                 v-for="item in col" :key="item"
                 style="background: black; color: white">
              <div class="card-title">
                <h3 class="fw-bold m-3">
                  {{ JSON.parse(item).description }}
                </h3>
              </div>
              <div class="card-body text-center">
                <i class="bi bi-question-circle"></i>
              </div>
              <hr>
              <div class="card-body">
                <p class="mb-auto">
                  <button class="btn btn-outline-light btn-md"
                          v-on:click="putInCart(JSON.parse(item))">Add
                  </button>
                </p>
                <p class="mb-auto text-end fw-bold lead">
                  {{ JSON.parse((JSON.parse(item).prices[0])).gp }} €
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      resultsList: {},
      itemList: {},
      angle: '180',
      color1: 'rebeccapurple',
      color2: 'darkblue'
    }
  },
  computed: {
    bg () {
      return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`
    },
    shopItemList () {
      return this.$store.state.shop
    }
  },
  methods: {
    scrollTo (content) {
      document.getElementById(content).scrollIntoView({ behavior: 'smooth' })
    },
    getItems () {
      this.itemList = {}
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from(
          this.$store.state.username + ':' + this.$store.state.password)
          .toString('base64')
      )
      fetch(
        'http://localhost:8000/api/m4/entry/*?type=name&format=json&lock=false',
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.$store.commit('putShopItems', this.chunkedItems(data.resultsList))))
        .then(() => (this.scrollTo('itemsSection')))
        .catch((err) => console.log(err.message))
    },
    chunkedItems (list) {
      const chunk = require('chunk')
      return chunk(list, 3)
    },
    putInCart (item) {
      this.$store.commit('putInCart', {
        id: item.uID,
        description: item.description,
        amount: 1,
        price: JSON.parse(item.prices[0]).gp
      })
      this.$notify(
        {
          title: item.description + ' added to the cart.',
          text: '',
          type: 'info'
        })
    }
  }
}
</script>

<style>
.animEmp {
  position: relative;
  top: 0;
  left: 0;
  transition: all ease 0.5s;
}

.animEmp:hover {
  top: -5px;
  left: +5px;
  box-shadow: -5px 5px black;
}

.animRot {
  position: relative;
  transition: all ease 0.5s;
}

.animRot:hover {
  transform: rotate(30deg);
}

</style>
