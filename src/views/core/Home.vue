<template>
  <div style="height: 100vh; overflow: hidden"
       :style="{backgroundImage: 'url('+require('@/assets/'+'account/pexels-anni-roenkae-2156881.jpg')+')',
       backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
    <section>
      <div style="width: 100%; padding-top: 50px">
        <div class="row d-flex justify-content-center align-items-center text-center h-100">
          <div class="deconstructed">
            wikiric.xyz
            <div class="wow">wikiric.xyz</div>
            <div class="wow">wikiric.xyz</div>
            <div class="wow">wikiric.xyz</div>
            <div class="wow">wikiric.xyz</div>
          </div>
          <div class="d-none d-md-block" style="padding: 10px; margin: 120px 10px 10px;"></div>
          <div class="slider mt-5">
            <div class="caption">
              ~#
              <div class="text-box">
                <div class="fw-bold">API&nbsp;Hub</div>
                <div class="fw-bold">DevOps</div>
                <div class="fw-bold">Analytics</div>
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
  name: 'Home'
}
</script>

<style scoped>

.slider {
  text-align: center;
  position: relative;
  animation: slideColor 10s forwards infinite;
}

.caption {
  line-height: 100px;
  font-size: 5vw;
  color: #fff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin-left: -300px;
}

.text-box {
  display: inline-block;
  position: relative;
}

.text-box div {
  display: inline-block;
  position: absolute;
  top: -200px;
  transform: rotateX(-90deg);
  opacity: 0;
  animation-timing-function: ease;
}

.text-box div:nth-child(1) {
  animation: rollDown 10s forwards infinite;
}

.text-box div:nth-child(2) {
  animation: rollDown2 10s forwards infinite;
}

.text-box div:nth-child(3) {
  animation: rollDown3 10s forwards infinite;
}

@keyframes rollDown {
  0% {
    top: -200px;
    transform: rotateX(-90deg);
  }
  11% {
    top: -74px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  22% {
    top: -74px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  33% {
    top: 50px;
    transform: rotateX(30deg);
    opacity: 0;
  }
}

@keyframes rollDown2 {
  33% {
    top: -200px;
    transform: rotateX(-90deg);
  }
  44% {
    top: -74px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  55% {
    top: -74px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  66% {
    top: 50px;
    transform: rotateX(30deg);
    opacity: 0;
  }
}

@keyframes rollDown3 {
  66% {
    top: -200px;
    transform: rotateX(-90deg);
  }
  77% {
    top: -74px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  88% {
    top: -74px;
    transform: rotateX(0deg);
    opacity: 1;
  }
  99% {
    top: 50px;
    transform: rotateX(30deg);
    opacity: 0;
  }
}

@keyframes slide {
  0% {
    top: 0;
  }
  25% {
    top: -4rem;
  }
  50% {
    top: -8rem;
  }
  75% {
    top: -12.25rem;
  }
}

.wow {
  color: black;
  text-shadow: 5px 5px 0 rebeccapurple,
  10px 10px 0 #052939,
  15px 15px 0 #46b59b,
  20px 20px 0 #017e7f,
  25px 25px 0 #052939;
}

.deconstructed {
  position: relative;
  margin: auto;
  color: transparent;
  font-size: 15vw;
  font-weight: 1000;
  overflow: hidden;
}

.deconstructed > div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.deconstructed > div:nth-child(1) {
  mask-image: linear-gradient(black 25%, transparent 25%);
  animation: deconstructed1 10s ease-in-out infinite;
}

.deconstructed > div:nth-child(2) {
  mask-image: linear-gradient(transparent 25%, black 25%, black 50%, transparent 50%);
  animation: deconstructed2 10s ease-in-out infinite;
}

.deconstructed > div:nth-child(3) {
  mask-image: linear-gradient(transparent 50%, black 50%, black 75%, transparent 75%);
  animation: deconstructed3 10s ease-in-out infinite;
}

.deconstructed > div:nth-child(4) {
  mask-image: linear-gradient(transparent 75%, black 75%);
  animation: deconstructed4 10s ease-in-out infinite;
}

@keyframes deconstructed1 {
  0% {
    transform: translateX(0%);
  }
  33% {
    transform: translateX(2%);
  }
  66% {
    transform: translateX(-0.6%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes deconstructed2 {
  0% {
    transform: translateX(0%);
  }
  33% {
    transform: translateX(1.2%);
  }
  66% {
    transform: translateX(-1%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes deconstructed3 {
  0% {
    transform: translateX(0%);
  }
  33% {
    transform: translateX(-1.6%);
  }
  66% {
    transform: translateX(2%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes deconstructed4 {
  0% {
    transform: translateX(0%);
  }
  33% {
    transform: translateX(-0.2%);
  }
  66% {
    transform: translateX(1%);
  }
  100% {
    transform: translateX(0);
  }
}

</style>
