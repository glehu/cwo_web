<template>
  <div class="supercenter text-center" style="width: 350px">
    <!-- Icons -->
    <div class="mb-4" style="display: flex; justify-content: space-evenly">
      <div class="doHover">
        <i class="bi bi-search text-white h1 mx-2"/>
      </div>
      <div class="doHover2">
        <i class="bi bi-book text-white h1 mx-2"/>
      </div>
      <div class="doHover3">
        <i class="bi bi-lightning text-white h1 mx-2"/>
      </div>
    </div>
    <h1 class="text-white mb-4 fw-bold">Discover. Learn. Improve.</h1>
    <h3 class="text-white mb-3">Welcome to the Artist Hub</h3>
    <p class="text-light mb-4" style="text-align: justify; text-justify: inter-word; width: 100%">
      Fresh, organic picks out of the garden, whose sole purpose is to please your sonic portals to the world.<br>
      Creative juices sizzling out of excitement, unable to contain themselves any longer, just for you.<br>
      Let's celebrate this moment, where hearts touch and souls connect.
    </p>
    <p class="text-light mb-4">Art at your service:</p>
    <!-- Artists -->
    <button class="btn btn-outline-light btn-lg muArrow fw-bold mt-3"
            v-on:click="gotoArtist('graffitifalls')"
            style="width: 200px; height: 50px">
      Graffiti Falls
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArtistOverview',
  methods: {
    gotoArtist (artist) {
      this.$router.push('/artists/' + artist)
    }
  }
}
</script>

<style scoped>

.muArrow {
  position: relative;
  top: 0;
  transition: top ease 0.5s;
}

.muArrow:hover {
  top: -8px;
}

.supercenter {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 0 0 -175px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.doHover {
  animation: hover 3s ease-in-out infinite;
}

@keyframes hover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20%);
  }
  100% {
    transform: translateY(0);
  }
}

.doHover2 {
  animation: hover2 4s ease-in-out infinite;
}

@keyframes hover2 {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(60%);
  }
  100% {
    transform: translateY(0);
  }
}

.doHover3 {
  animation: hover3 3.5s ease-in-out infinite;
}

@keyframes hover3 {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(40%);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
