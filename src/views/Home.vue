<template>
  <div id="top" style="min-height: 100vh">
    <section
      class="text-light text-center text-sm-start p-1 p-lg-2 pt-lg-2">
      <div class="container mt-5">
        <div class="d-sm-flex align-items-center justify-content-between">
          <h1 class="bg-dark p-3 fw-bold" style="border-radius: 1rem">
            Unleash your <span class="text-danger">POTENTIAL</span>
          </h1>
          <h3 class="my-4 text-end">
            Whether you're a total beginner or a professional... <br>
            We've got you covered
          </h3>
        </div>
      </div>
    </section>
    <section
      class="text-light text-center text-sm-start p-1 p-lg-2 pt-lg-2 m-5">
      <div class="container">
        <div class="d-sm-flex align-items-center justify-content-between">
          <h3 class="my-4 text-start">
            Vocalists, producers, graphics designers and video producers... <br>
            From 19 countries across the world
          </h3>
          <h1 class="bg-dark p-3 fw-bold" style="border-radius: 1rem">
            Enjoy <span class="text-danger">DIVERSITY</span>
          </h1>
        </div>
      </div>
    </section>
    <div>
      <section class="bg-dark text-light text-center p-3 d-flex">
        <div class="container">
          <div>
            <h1 class="fw-bold">What we have to offer?<br>Find out below.</h1>
            <button class="btn mdArrow" v-on:click="scrollTo('cards')">
              <i class="bi bi-arrow-down h1" style="color: white"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- Box View -->
  <div id="cards" style="min-height: 100vh">
    <section class="p-1">
      <div class="container card-group mt-5">
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
          <div class="col-md mt-1 d-md-flex">
            <div class="card bg-dark text-light">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-mic"></i>
                </div>
                <h3 class="card-title">
                  Vocals
                </h3>
                <p class="card-text">
                  What would a song be without vocals?
                  Well, an instrumental, but that's not the point here.<br>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card bg-dark text-light">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-broadcast-pin"></i>
                </div>
                <h3 class="card-title">
                  Promotion
                </h3>
                <p class="card-text">
                  We will promote your work on our many platforms and other
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card bg-dark text-light">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-soundwave"></i>
                </div>
                <h3 class="card-title">
                  Mixing & Mastering
                </h3>
                <p class="card-text">
                  We can take care of mixing and/or mastering if needed
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card bg-dark text-light">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-heart"></i>
                </div>
                <h3 class="card-title">
                  Emotional Support
                </h3>
                <p class="card-text">
                  Even if you feel lost and alone, we are here for you
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card bg-dark text-light">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-code-slash"></i>
                </div>
                <h3 class="card-title">
                  Software Development
                </h3>
                <p class="card-text">
                  Wiki Ric G dedicates himself to the creation of software
                  to push limits further than ever before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div>
      <section class="bg-dark text-light text-center p-1 d-flex mt-5">
        <div class="container">
          <div>
            <button class="btn muArrow" v-on:click="scrollTo('top')">
              <i class="bi bi-arrow-up h1" style="color: white"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    scrollTo (content) {
      document.getElementById(content).scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.muArrow, .mdArrow {
  position: relative;
  top: 0;
  transition: top ease 0.5s;
}

.muArrow:hover {
  top: -10px;
}

.mdArrow:hover {
  top: +10px;
}
</style>
