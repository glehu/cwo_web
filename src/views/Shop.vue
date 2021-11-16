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
  <div style="min-height: 10vh"></div>
  <section id="itemsSection" style="min-height: 100vh" :style="{ backgroundImage: bg }">
    <div style="min-height: 5vh"/>
    <div class="container mt-2">
      <div class="card-group">
        <div class="col" v-for="col in shopItemList" :key="col">
          <div class="card m-5"
               v-for="item in col" :key="item"
               style="background: black; color: white">
            <div class="card-title">
              <h3 class="fw-bold m-3">
                {{ JSON.parse(item).description }}
              </h3>
            </div>
            <div class="card-body text-center">
              <img style="max-width: 75%; max-height: 75%" v-bind:src="getImg(item)" alt="No Image Available."/>
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
    },
    usageTracker () {
      return this.$store.state.usageTracking
    }
  },
  methods: {
    scrollTo (content) {
      document.getElementById(content).scrollIntoView({ behavior: 'smooth' })
    },
    getItems () {
      this.itemList = {}
      const headers = new Headers()
      headers.set('Authorization', 'Bearer ' + this.$store.state.token)
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
      const chunkedItems = chunk(list, 2)
      console.log(chunkedItems)
      return chunkedItems
    },
    putInCart (item) {
      this.$store.commit('putInCart', {
        id: item.uID,
        description: item.description,
        amount: 1,
        price: JSON.parse(item.prices[0]).gp,
        imageBase64String: item.imageBase64String
      })
      this.$notify(
        {
          title: item.description + ' added to the cart.',
          text: '',
          type: 'info'
        })
      if (this.usageTracker) {
        this.sendUsageData({
          source: 'web',
          module: 'shop',
          action: 'putInCart'
        })
      }
    },
    async sendUsageData (usageObj) {
      const headers = new Headers()
      headers.set('Authorization', 'Bearer ' + this.$store.state.token)
      headers.set(
        'Content-Type', 'application/json'
      )
      fetch(
        'http://localhost:8000/api/utr',
        {
          method: 'post',
          headers: headers,
          body: JSON.stringify(usageObj)
        }
      ).then(r => console.log(r))
    },
    getImg (item) {
      return 'data:image/jpeg;base64,' + JSON.parse(item).imageBase64String
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
