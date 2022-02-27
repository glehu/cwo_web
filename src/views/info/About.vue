<template>
  <div class="about">
    <div style="min-height: 10ch"></div>
    <div class="container text-white wrapper">
      <div class="text-wrapper mb-5" style="text-align: justify; text-justify: inter-word; margin: auto">
        <span class="h1 fw-bold"><i class="bi bi-fingerprint"/> About us </span>
        <span class="p-2">
            <i class="bi bi-dot"/>What/Who is Orochi Batsuzoku?
            Orochi Batsuzoku, or in short Orochi, is a collective that dedicates
            itself to the creation of art in many forms. We also want to put effort into
            making the music and art industry a fair competition without capitalistic exploitation.
            <br><br><i class="bi bi-dot"/>How did it start?
            Originally, some of the current members got to know each other on the
            Trash Gang website chat room.
            On the 2019.08.20 the three founding members Di$, Lich and
            Wiki created their own discord server, migrating all previously known
            people to their newly created home.
            <br><br><i class="bi bi-dot"/>How can I join?
            Just join our
            <a :href="'https://discord.gg/pr2vwr8'" style="color: white">Discord</a>
            server!
            We will discuss everything else afterwards.
            It could not be simpler than that.
          </span>
        <p class="text-end pt-5">
          Designed with <i class="bi bi-heart-fill" style="color: red"></i> by
          <br>
          <a style="color: white" :href="'https://www.instagram.com/blk.ghst/'">BLKGHST 死霊</a> &
          <a style="color: white" :href="'https://www.instagram.com/11.nrv/'">NIRV</a> &
          <a style="color: white" :href="'https://www.instagram.com/wikiricg/'">Wiki Ric G</a>
        </p>
      </div>
      <div class="text-center" style="margin: auto">
        <p class="h1 fw-bold pb-5">More info:</p>
        <button class="btn btn-outline-light"
                style="font-size: 250%"
                v-on:click="gotoVision">
          V i s i o n
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    gotoVision () {
      this.$router.push('/vision')
    }
  }
}
</script>

<style scoped>

.wrapper {
  display: grid;
  gap: 1em;
  grid-auto-rows: minmax(100px, auto);
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 300px) {
  .wrapper {
    grid-template-columns: repeat(1, 1fr);
  }

  .text-wrapper {
    width: 350px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .text-wrapper {
    width: 500px;
  }
}

</style>
