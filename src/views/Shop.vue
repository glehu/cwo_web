<template>
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
            <div>
              <h1 class="text-end m-2 fw-bold text-white">0R0CHI Batsuzoku</h1>
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
    <section>
      <div class="container">
        <div class="card-group">
          <div class="col-5" v-for="col in itemList" :key="col">
            <div class="card m-5" v-for="item in col" :key="item">
              <div class="card-title">
                <h3 class="fw-bold m-1">
                  {{ JSON.parse(item).description }}
                </h3>
              </div>
              <div class="card-body text-center">
                <i class="bi bi-question-circle"></i>
              </div>
              <hr>
              <div class="card-body">
                <p class="mb-auto">
                  <button class="btn btn-outline-dark btn-md"
                          v-on:click="putInCart(JSON.parse(item).uID)">Add
                  </button>
                </p>
                <p class="mb-auto text-end fw-bold lead">
                  {{ JSON.parse((JSON.parse(item).prices[0])).gp }}$
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
      itemList: {}
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
        .then((data) => (this.itemList = this.chunkedItems(data.resultsList)))
        .catch((err) => console.log(err.message))
      this.scrollTo('itemsSection')
    },
    purchase (id) {
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from(
          this.$store.state.username + ':' + this.$store.state.password)
          .toString('base64')
      )
      fetch(
        'http://localhost:8000/api/m3/neworder/' + id,
        {
          method: 'get',
          headers: headers
        }
      )
    },
    chunkedItems (list) {
      const chunk = require('chunk')
      return chunk(list, 3)
    },
    putInCart (id) {
      this.$store.commit('putInCart', {
        id: id,
        amount: 10
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
