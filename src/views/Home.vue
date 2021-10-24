<template>
  <div id="top" style="min-height: 100vh;">
    <br>
    <section
      class="container mt-5">
      <div class="d-md-flex align-items-center justify-content-between text-light p-3"
           style="border-radius: 1rem; background: black">
        <h1 class="fw-bold text-start">
          Unleash your <span style="color: mediumpurple; font-size: 200%">POTENTIAL</span>
        </h1>
        <h3 class="text-center fw-bold">
          Whether you're a total beginner or a professional... <br><br>
          We've got you covered.
        </h3>
      </div>
    </section>
    <div>
      <section class="text-center p-3 d-flex">
        <div class="container">
          <div>
            <button class="btn mdArrow" v-on:click="scrollTo('middle')">
              <i class="bi bi-arrow-down h1" style="color: white"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div id="middle" style="min-height: 100vh">
    <br>
    <section
      class="container mt-5">
      <div class="d-md-flex align-items-center justify-content-between text-light p-3"
           style="border-radius: 1rem; background: black">
        <h3 class="text-center fw-bold">
          Vocalists, producers, graphics designers and video producers... <br><br>
          From 19 countries across the world.
        </h3>
        <h1 class="fw-bold text-start">
          Enjoy <span style="color: mediumpurple; font-size: 200%">DIVERSITY</span>
        </h1>
      </div>
    </section>
    <div>
      <section class="text-center p-3 d-flex">
        <div class="container">
          <div>
            <button class="btn mdArrow" v-on:click="scrollTo('bottom')">
              <i class="bi bi-arrow-down h1" style="color: white"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- Box View -->
  <div id="bottom" style="min-height: 100vh">
    <section class="p-1">
      <div class="container card-group mt-5">
        <div class="row text-center">
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
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
            <div class="card text-light" style="background: black">
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
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-broadcast-pin"></i>
                </div>
                <h3 class="card-title">
                  Promotion
                </h3>
                <p class="card-text">
                  We will promote your work on our many platforms.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-soundwave"></i>
                </div>
                <h3 class="card-title">
                  Mixing & Mastering
                </h3>
                <p class="card-text">
                  We can take care of mixing and/or mastering if needed.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-heart"></i>
                </div>
                <h3 class="card-title">
                  Emotional Support
                </h3>
                <p class="card-text">
                  Even if you feel lost and alone, we are here for you.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md mt-1 d-md-flex">
            <div class="card text-light" style="background: black">
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
    <section
      class="container mt-5">
      <div class="d-md-flex align-items-center justify-content-between text-light p-3">
        <h1 class="fw-bold text-start">
          <span style="color: white; font-size: 200%">
                Join now.<br>
                0R0CHI Batsuzoku
              </span>
        </h1>
        <button class="btn muArrow" v-on:click="scrollTo('top')">
          <i class="bi bi-arrow-up h1 m-5" style="color: white"></i>
        </button>
      </div>
    </section>
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
