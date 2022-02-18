<template>
  <div class="wrapper">
    <div class="hide p-5" id="contextmenu">
      <div style="display: flex">
        <i id="btn_cut" class="btn text-white bi bi-x-circle"></i>
        <i id="btn_info" class="btn text-white bi bi-info-lg"></i>
        <p id="selected_cell" class="pt-2 text-white"></p>
        <i id="btn_history" class="btn text-white bi bi-clock-history"></i>
      </div>
    </div>
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3 class="text-center"
            style="padding-top: 4rem; padding-bottom: 1rem; background-color: black">
          <i class="bi bi-wrench-adjustable-circle text-white"></i> Planner
        </h3>
        <p id="count_cell" class="ps-2"></p>
      </div>
    </nav>
    <canvas id="canvas" style="display: block; background-color: #0A0A0F"></canvas>
    <div id="editor" style="width:100%; height:100%; position: absolute"></div>
  </div>
</template>

<script>
export default {
  name: 'ProcessPlanner',
  methods: {
    processplanner () {
      // #### Variables ####

      const maxCellAmount = 100
      const cellWidth = 200
      const cellHeight = 100
      let cells = []
      let selectedCell = {}

      window.addEventListener('resize', resizeCanvas, false)

      window.addEventListener('mouseup', handleMouseClick, false)

      // #### Logic ####

      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')

      function resizeCanvas () {
        canvas.width = 10000
        canvas.height = 5000
        drawGrid()
        showCellCount()
      }

      resizeCanvas()

      function drawGrid () {
        for (let i = 0; i < maxCellAmount; i++) {
          ctx.fillStyle = '#1F1F1F'
          ctx.fillRect((i * cellWidth), 0, 1, canvas.height)
        }
        for (let i = 0; i < maxCellAmount; i++) {
          ctx.fillStyle = '#1F1F1F'
          ctx.fillRect(0, (i * cellHeight), canvas.width, 1)
        }
      }

      function handleMouseClick () {
        const x = getPositionX(event.pageX)
        const y = getPositionY(event.pageY)
        const xc = event.clientX
        const yc = event.clientY

        if (checkOccupied(x, y, xc, yc)) {
          addCell(x, y)
          openMenu(x, y)
        } else {
          const elemUnderCursor = document.elementFromPoint(xc, yc)
          if (elemUnderCursor.id.includes('cell')) {
            openMenu(x, y)
            selectedCell = elemUnderCursor
          } else {
            // Buttons?
            console.log(elemUnderCursor.id.toString())
            if (elemUnderCursor.id.includes('btn')) {
              switch (elemUnderCursor.id.toString()) {
                case 'btn_cut':
                  removeCell(getCellId(selectedCell))
                  break
              }
            }
            document.getElementById('contextmenu').className = 'hide'
            selectedCell = null
          }
        }
        showSelectedCell()
      }

      function addCell (x, y) {
        // JavaScript Part
        const id = (cells.length + 1)
        cells.unshift({
          x: x,
          y: y,
          id: id
        })
        showCellCount()
        drawCells()
        // HTML Part
        const cell = document.createElement('div')
        cell.id = 'cell_' + id
        cell.style.position = 'absolute'
        cell.style.left = ((x + 10) + 'px')
        cell.style.top = ((y + 10) + 'px')
        cell.style.width = ((cellWidth - 20) + 'px')
        cell.style.height = ((cellHeight - 20) + 'px')
        const nameField = document.createElement('input')
        nameField.id = 'cellname_' + id
        nameField.style.width = '100%'
        nameField.style.height = 'auto'
        nameField.style.textAlign = 'center'
        nameField.style.backgroundColor = '#0A0A0A'
        nameField.style.color = 'white'
        nameField.setAttribute('class', 'fw-bold')
        cell.append(nameField)
        document.getElementById('editor').appendChild(cell)
        selectedCell = cell
      }

      function removeCell (id) {
        // Remove Canvas content
        cells = cells.filter(function (ele) {
          return ele.id.toString() !== id.toString()
        })
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid()
        drawCells()
        showCellCount()
        // Now remove HTML content
        const elem = document.getElementById('cell_' + id)
        elem.remove()
      }

      function openMenu (x, y) {
        document.getElementById('contextmenu').className = 'show'
        document.getElementById('contextmenu').style.left = (x + 100) + 'px'
        document.getElementById('contextmenu').style.top = (y - 100) + 'px'
      }

      function getPositionX (mousePos) {
        return Math.floor(mousePos / cellWidth) * cellWidth
      }

      function getPositionY (mousePos) {
        return Math.floor(mousePos / cellHeight) * cellHeight
      }

      function showCellCount () {
        const cellCounter = document.getElementById('count_cell')
        const cellCount = cells.length
        cellCounter.innerText = 'Cells: ' + cellCount
      }

      showCellCount()

      function showSelectedCell () {
        const cellSelected = document.getElementById('selected_cell')
        if (selectedCell === null) {
          cellSelected.innerText = 'Selected:'
          return
        }
        const cellId = getCellId(selectedCell)
        const cellNameField = document.getElementById('cellname_' + cellId)
        cellSelected.innerText = 'Selected: Cell ' + cellId + ' ' + cellNameField.value
      }

      showSelectedCell()

      function getCellId (cell) {
        return cell.id.split('_')[1]
      }

      function drawCells () {
        for (let i = 0; i < cells.length; i++) {
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect((cells[i].x + 10), (cells[i].y + 10), (cellWidth - 20), (cellHeight - 20))
        }
      }

      function checkOccupied (x, y, xc, yc) {
        // First check if we're on the editor div
        const elemUnderCursor = document.elementFromPoint(xc, yc)
        if (elemUnderCursor.id !== 'editor' && elemUnderCursor.id !== 'canvas') return false

        // Now check if there's already a cell here
        for (let i = 0; i < cells.length; i++) {
          if (cells[i].x === x && cells[i].y === y) {
            return false
          }
        }
        return true
      }
    }
  },
  mounted: function () {
    this.processplanner()
  }
}
</script>

<style scoped>

.wrapper {
  display: flex;
  width: 100%;
}

#sidebar {
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
  background: #0A1A1F;
  color: #ffff;
  transition: all 0.3s;
}

.cell {
  position: absolute;
  background-color: white;
}

.show {
  z-index: 1000;
  position: absolute;
  background-color: #0A1A1F;
  border-radius: 2em;
  padding: 4px;
  display: block;
  margin: 0;
  list-style: none;
}

.show a {
  border: 0 !important;
  text-decoration: none;
}

.hide {
  display: none;
}

</style>
