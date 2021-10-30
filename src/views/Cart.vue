<template>
  <div class="cart">
    <div style="min-height: 10vh"></div>
    <section
      class="container">
      <div class="text-light p-3"
           style="border-radius: 1rem; background: black">
        <h1 class="fw-bold d-flex">
          Shopping Cart
        </h1>
        <br>
        <button class="btn btn-outline-light" v-on:click="clearCart()">Clear Cart</button>
        <button class="btn btn-outline-light ms-5" v-on:click="submitOrder()">Submit Order</button>
      </div>
    </section>
    <div id="itemsSection">
      <section>
        <div class="container">
          <div class="card mt-2"
               v-for="item in items" :key="item"
               style="background: black; color: white; width: 30%">
            <div class="card-title">
              <h3 class="fw-bold m-3">
                {{ item.description }}
              </h3>
            </div>
            <div class="card-body text-center">
              <i class="bi bi-question-circle"></i>
            </div>
            <hr>
            <div class="card-body">
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <br>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {}
  },
  methods: {
    clearCart () {
      this.$store.commit('clearCart')
    },
    submitOrder () {
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from(
          this.$store.state.username + ':' + this.$store.state.password)
          .toString('base64')
      )
      for (let i = 0; i < this.items.length; i++) {
        console.log('Order Item ID ' + this.items[i].id)
        fetch(
          'http://localhost:8000/api/m3/neworder/' + this.items[i].id,
          {
            method: 'post',
            headers: headers,
            body: this.items
          }
        )
      }
      this.clearCart()
    }
  },
  computed: {
    items () {
      return this.$store.state.cart
    }
  }
}
</script>

<style scoped>

</style>
