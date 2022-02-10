<template>
  <div class="supercenter text-center text-white" style="width: 350px">
    <p class="fw-bold doHover" style="font-size: 400%;">404</p>
    <p class="doHover" style="color: gray; font-size: 200%;">(╯°□°）╯︵ ┻━┻</p>
    <p style="color: gray">How could this happen...</p>
    <p class="fw-bold mt-5">
      <i class="bi bi-door-closed mx-2"/><a href="/">Homepage</a>
    </p>
  </div>
</template>

<script>

export default {
  name: 'NotFoundErrorPage'
}

</script>

<style scoped>

h1 {
  font-size: 2em;
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
    transform: translateY(15%);
  }

  100% {
    transform: translateY(0);
  }
}

</style>
