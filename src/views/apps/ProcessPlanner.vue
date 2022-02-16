<template>
  <canvas id="canvas" style="display: block"></canvas>
</template>

<script>
export default {
  name: 'ProcessPlanner',
  methods: {
    draw () {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')

      window.addEventListener('resize', resizeCanvas, false)

      window.addEventListener('mouseup', handleMouseClick, false)

      function resizeCanvas () {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        doDraw()
      }

      resizeCanvas()

      function doDraw () {
        for (let i = 0; i < window.innerWidth; i += (window.innerWidth / 10)) {
          ctx.fillStyle = '#1F1F1F'
          ctx.fillRect(i, 0, 1, window.innerHeight)
          ctx.fillRect(0, i, window.innerWidth, 1)
        }
      }

      function handleMouseClick () {
        const x = event.clientX
        const y = event.clientY
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect((x - 100), (y - 50), 200, 100)
      }
    }
  },
  mounted: function () {
    this.draw()
  }
}
</script>

<style scoped>

</style>
