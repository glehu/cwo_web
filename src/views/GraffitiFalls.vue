<template>
  <div class="container" style="top: 10vh">
    <div class="col-md d-md-flex supercenter mt-5">
      <img
        src="https://static.wixstatic.com/media/67f686_b76a2f6ff2b2429c912cfca5196566f1~mv2.jpg/v1/crop/x_0,y_206,w_640,h_735/fill/w_478,h_549,al_c,q_80,usm_0.66_1.00_0.01/IMG_7343.webp"
        class="mb-5" style="width: 200px; height: 200px" alt="">
      <div class="ms-md-5" style="text-align: justify; text-justify: inter-word; width: 300px">
        <p class="h1 fw-bold text-white">Graffiti Falls</p>
        <p class="text-white fw-lighter">
          We are a somerset based band, we play many genres of music ranging from mellow acoustic songs to a gritty
          blues style. The band is formed from 4 members, Gus with vocals and guitar, Sam on guitar, joe on drums and
          Oscar on the bass. We have music out on youtube and soundcloud the links are under social media, We have
          played at local festivals and have done many gigs around the area. We are very keen to perform live and have
          many plans from upcoming music and music videos.
        </p>
      </div>
      <div class="ms-4" style="width: 200px">
        <div class="ms-2">
          <button title="Soundcloud"
                  class="btn bi-cloud-fill btn-lg muArrow mt-4" style="color: white;"
                  v-on:click="redirectSoundcloud"/>
          <br>
          <button title="Instagram"
                  class="btn bi-instagram btn-lg muArrow mt-4" style="color: white;"
                  v-on:click="redirectInstagram"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GraffitiFalls',
  methods: {
    redirectSoundcloud () {
      if (this.usageTracker) {
        this.sendUsageData({
          source: 'web',
          module: 'graffitifalls',
          action: 'redirectSoundcloud'
        })
      }
      window.open('https://soundcloud.com/graffiti_falls')
    },
    redirectInstagram () {
      if (this.usageTracker) {
        this.sendUsageData({
          source: 'web',
          module: 'graffitifalls',
          action: 'redirectInstagram'
        })
      }
      window.open('https://www.instagram.com/graffitifallsband/')
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
  top: -8px;
}

.mdArrow:hover {
  top: +8px;
}

.supercenter {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 0 0 -150px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

</style>
