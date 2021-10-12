<template>
  <div class="shop bg-dark text-light">
    <!-- Box View -->
    <section class="p-1">
      <div class="container">
        <div class="row text-center">
          <div class="col-md mt-1 d-md-flex">
            <div class="card bg-dark text-light">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-file-earmark-music"></i>
                </div>
                <h3 class="card-title">
                  Beats & Instrumentals
                </h3>
                <p class="card-text">
                  Commission beats from our many producers.
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
      myObj: {}
    }
  },
  beforeMount () {
    this.myObj = {}
    const headers = new Headers()
    headers.set(
      'Authorization',
      'Basic ' + Buffer.from('admin' + ':' + 'admin').toString('base64')
    )
    fetch(
      'http://localhost:8000/api/m1/entry/' + 1 + '?type=name&format=json&lock=false',
      {
        method: 'get',
        headers: headers
      }
    )
      .then((res) => res.json())
      .then((data) => (this.myObj = data))
      .catch((err) => console.log(err.message))
  }
}
</script>

<style scoped>

</style>
