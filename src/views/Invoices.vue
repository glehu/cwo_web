<template>
  <div class="invoices">
    <div style="min-height: 10vh"></div>
    <section
      class="container">
      <div class="text-light p-3"
           style="border-radius: 1rem; background: black">
        <div class="d-flex">
          <h1 class="fw-bold">
            Invoices
          </h1>
          <button class="btn btn-outline-warning ms-5" v-on:click="loadInvoices()">Show Invoices</button>
        </div>
      </div>
    </section>
    <div v-show="!emptyInvoices" id="invoicesSection" :style="{ backgroundImage: bg }" style="min-height: 100vh">
      <section>
        <div class="mt-4" style="min-height: 3vh"></div>
        <div class="container">
          <div class="col" v-for="invoice in invoicesList" :key="invoice">
            <div class="card m-2 text-center mb-5"
                 style="background: black; color: white">
              <div class="card-title">
                <h3 class="fw-bold m-3">
                  <i class="bi bi-file-earmark-text ms-md-5"/>
                  {{ JSON.parse(invoice).text }}
                  #{{ JSON.parse(invoice).uID }}
                  <i class="bi bi-calendar3-event ms-5"/>
                  {{ JSON.parse(invoice).date }}
                </h3>
              </div>
              <table>
                <tr>
                  <th>Description</th>
                  <th>Net Price</th>
                  <th>Gross Price</th>
                </tr>
                <tr v-for="item in JSON.parse(invoice).items" :key="item">
                  <td>{{ JSON.parse(item).d }}</td>
                  <td>{{ JSON.parse(item).np }}€</td>
                  <td>{{ JSON.parse(item).gp }}€</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <th></th>
                  <th><span class="h2 fw-bold">{{ JSON.parse(invoice).grossTotal }}€</span></th>
                </tr>
              </table>
              <div class="text-start text-black fw-bold p-2 m-3" style="border-radius: 1rem; background: white">
                Customer Note:
                <span class="ms-2 fw-bolder lead">{{ JSON.parse(invoice).customerNote }}</span>
              </div>
            </div>
          </div>
        </div>
        <div style="min-height: 5vh"></div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invoices',
  data () {
    return {
      invoicesList: {},
      angle: '180',
      color1: 'rebeccapurple',
      color2: 'darkblue'
    }
  },
  computed: {
    bg () {
      return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`
    },
    emptyInvoices () {
      const x = JSON.stringify(this.invoicesList) === '{}'
      console.log(x)
      return x
    }
  },
  methods: {
    loadInvoices () {
      this.invoicesList = {}
      const headers = new Headers()
      headers.set(
        'Authorization',
        'Basic ' + Buffer.from(
          this.$store.state.username + ':' + this.$store.state.password)
          .toString('base64')
      )
      fetch(
        'http://localhost:8000/api/m3/entry/' + this.$store.state.username + '?type=name&format=json&index=2',
        {
          method: 'get',
          headers: headers
        }
      )
        .then((res) => res.json())
        .then((data) => (this.invoicesList = data.resultsList))
    }
  }
}
</script>

<style scoped>
th {
  padding: 15px;
  font-size: 125%;
}

td, th {
  border: 1px dotted gray;
  border-collapse: collapse;
}
</style>
