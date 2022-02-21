<template>
  <div class="wrapper">
    <div class="hide" id="contextmenu">
      <div style="display: flex; align-items: center">
        <i id="btn_done" title="Done" class="btn text-white bi-check2-circle" style="font-size: 150%"></i>
        <i id="btn_info" title="Info" class="btn text-white bi-info-circle" style="font-size: 150%"></i>
        <i id="btn_cut" title="Remove" class="btn text-white bi-x-circle" style="font-size: 150%"></i>
        <i id="btn_history" title="History" class="btn text-white bi-clock-history" style="font-size: 150%"></i>
        <i id="btn_deselect" title="Deselect" class="btn text-white bi-x-lg ps-5" style="font-size: 150%"></i>
        <p id="selected_cell" class="text-white pt-3" style="width: 250px"></p>
      </div>
    </div>
    <div class="hide" id="addmenu">
      <div style="display: flex; align-items: center">
        <i id="btn_addbox" title="Add Box" class="btn text-white bi-square" style="font-size: 200%"></i>
        <input id="addmenu_rows" class="bg-black text-white p-2"
               type="number" value="10" min="1" max="50" size="2"
               style="border-radius: 1rem">
        <i id="btn_addtask" title="Add Task" class="btn text-white bi-list-task" style="font-size: 200%"></i>
        <i id="btn_deselect2" title="Deselect" class="btn text-white bi-x-lg pt-2 ps-5" style="font-size: 150%"></i>
      </div>
    </div>
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3 class="text-center"
            style="padding-top: 4rem; padding-bottom: 1rem; background-color: black">
          <i class="bi bi-wrench-adjustable-circle text-white"></i> <span class="fw-bold">Planner</span>
        </h3>
        <p id="count_cell" class="ps-2"></p>
        <hr style="color:white">
        <p class="fw-bold ps-2">Done:</p>
        <div id="hall_of_fame" class="ps-3"></div>
      </div>
    </nav>
    <canvas id="grid" style="position: absolute; display: block; background-color: #0A0A0F"></canvas>
    <canvas id="canvas" style="position: absolute; display: block"></canvas>
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
      const cellWidth = 400
      const cellHeight = 150
      let cells = []
      let selectedCell = {}

      window.addEventListener('resize', resizeCanvas, false)

      window.addEventListener('mouseup', handleMouseClick, false)

      // #### Logic ####

      const grid = document.getElementById('grid')
      const gridCtx = grid.getContext('2d')

      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')

      function resizeCanvas () {
        canvas.width = 10000
        canvas.height = 10000
        grid.width = 10000
        grid.height = 10000
        update()
        drawGrid()
      }

      resizeCanvas()

      function drawGrid () {
        for (let i = 0; i < maxCellAmount; i++) {
          gridCtx.fillStyle = '#1F1F1F'
          gridCtx.fillRect((i * cellWidth), 0, 1, grid.height)
        }
        for (let i = 0; i < maxCellAmount; i++) {
          gridCtx.fillStyle = '#1F1F1F'
          gridCtx.fillRect(0, (i * cellHeight), grid.width, 1)
        }
      }

      function handleMouseClick () {
        const x = getPositionX(event.pageX)
        const y = getPositionY(event.pageY)
        const xc = event.clientX
        const yc = event.clientY

        if (checkOccupied(x, y, xc, yc)) {
          document.getElementById('contextmenu').className = 'hide'
          selectedCell = {
            x: x,
            y: y
          }
          openAddMenu(x, y)
        } else {
          const elemUnderCursor = document.elementFromPoint(xc, yc)
          if (elemUnderCursor.id.includes('cell')) {
            document.getElementById('addmenu').className = 'hide'
            openMenu(x, y)
            selectedCell = elemUnderCursor
            showSelectedCell()
          } else {
            // Buttons?
            console.log(elemUnderCursor.id.toString())
            if (elemUnderCursor.id.includes('btn')) {
              switch (elemUnderCursor.id.toString()) {
                case 'btn_addbox':
                  document.getElementById('addmenu').className = 'hide'
                  addBox(selectedCell.x, selectedCell.y)
                  break
                case 'btn_addtask':
                  document.getElementById('addmenu').className = 'hide'
                  addTask(selectedCell.x, selectedCell.y)
                  break
                case 'btn_done':
                  finishCell(getCellId(selectedCell), selectedCell.type)
                  document.getElementById('contextmenu').className = 'hide'
                  break
                case 'btn_cut':
                  removeCell(getCellId(selectedCell), selectedCell.type)
                  document.getElementById('contextmenu').className = 'hide'
                  break
                case 'btn_history':
                  alert(getCell(getCellId(selectedCell)).history[0])
                  break
                case 'btn_deselect':
                  document.getElementById('contextmenu').className = 'hide'
                  selectedCell = null
                  break
                case 'btn_deselect2':
                  document.getElementById('addmenu').className = 'hide'
                  selectedCell = null
                  break
              }
            }
          }
        }
        update()
      }

      function addTask (x, y) {
        // JavaScript Part
        const id = (cells.length + 1)
        const history = ['Created']
        cells.unshift({
          x: x,
          y: y,
          id: id,
          type: 'task',
          rows: '1',
          history: history
        })
        update()
        // HTML Part
        // Container Cell
        const task = document.createElement('div')
        task.id = 'cell_' + id
        task.style.position = 'absolute'
        task.style.left = ((x + 20) + 'px')
        task.style.top = ((y + 20) + 'px')
        task.style.width = ((cellWidth - 40) + 'px')
        task.style.height = ((cellHeight - 40) + 'px')
        // Cell Name
        const taskName = document.createElement('input')
        taskName.id = 'cellname_' + id
        taskName.style.width = '100%'
        taskName.style.textAlign = 'center'
        taskName.style.backgroundColor = '#0A0A0A'
        taskName.style.color = 'white'
        taskName.setAttribute('class', 'fw-bold')
        task.append(taskName)
        // Cell Content
        const taskValue = document.createElement('textarea')
        taskValue.id = 'cellvalue_' + id
        taskValue.style.width = '100%'
        taskValue.style.textAlign = 'center'
        taskValue.style.color = 'black'
        taskValue.setAttribute('class', 'fw-bold')
        task.append(taskValue)
        // Append to editor screen
        document.getElementById('editor').appendChild(task)
        selectedCell = task
      }

      function addBox (x, y) {
        console.log('addBox')
        // JavaScript Part
        const id = (cells.length + 1)
        const history = ['Created']
        const boxRows = parseInt(document.getElementById('addmenu_rows').value) + 1
        cells.unshift({
          x: x,
          y: y,
          id: id,
          type: 'box',
          rows: boxRows,
          history: history
        })
        update()
        // HTML Part
        // Container Cell
        const cell = document.createElement('div')
        cell.id = 'cell_' + id
        cell.style.position = 'absolute'
        cell.style.left = ((x + 10) + 'px')
        cell.style.top = ((y + 10) + 'px')
        cell.style.width = ((cellWidth - 20) + 'px')
        cell.style.height = ((cellHeight - 20) + 'px')
        // Cell Name
        const nameField = document.createElement('input')
        nameField.id = 'cellname_' + id
        nameField.style.width = '100%'
        nameField.style.fontSize = '120%'
        nameField.style.textAlign = 'center'
        nameField.style.backgroundColor = '#0F2F2F'
        nameField.style.color = 'white'
        nameField.setAttribute('class', 'fw-bold')
        cell.append(nameField)
        // Append to editor screen
        document.getElementById('editor').appendChild(cell)
        selectedCell = cell
      }

      function getCell (id) {
        return cells.filter(function (ele) {
          return ele.id.toString() === id.toString()
        })[0]
      }

      function removeCell (id) {
        // Remove Canvas content
        cells = cells.filter(function (ele) {
          return ele.id.toString() !== id.toString()
        })
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        update()
        // Now remove HTML content
        document.getElementById('cell_' + id).remove()
      }

      function finishCell (id) {
        // Container Cell
        const cell = document.createElement('div')
        cell.id = 'finished_' + id
        cell.style.width = '100%'
        // Cell Name
        const cellId = getCellId(selectedCell)
        const cellNameField = document.getElementById('cellname_' + cellId)
        const valueString = '✓ ' + cellNameField.value
        const nameField = document.createTextNode(valueString)
        cell.append(nameField)
        const finishedList = document.getElementById('hall_of_fame')
        finishedList.insertBefore(cell, finishedList.children[0])
        // Remove Canvas content
        cells = cells.filter(function (ele) {
          return ele.id.toString() !== id.toString()
        })
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        update()
        // Now remove HTML content
        document.getElementById('cell_' + id).remove()
      }

      function update () {
        drawCells()
        showCellCount()
      }

      function openMenu (x, y) {
        document.getElementById('contextmenu').className = 'show'
        document.getElementById('contextmenu').style.left = x + 'px'
        document.getElementById('contextmenu').style.top = (y - (cellHeight / 2)) + 'px'
      }

      function openAddMenu (x, y) {
        document.getElementById('addmenu').className = 'show'
        document.getElementById('addmenu').style.left = x + 'px'
        document.getElementById('addmenu').style.top = (y - (cellHeight / 2)) + 'px'
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
        cellCounter.innerText = 'Elements: ' + cellCount
      }

      showCellCount()

      function showSelectedCell () {
        const cellSelected = document.getElementById('selected_cell')
        if (selectedCell === null) {
          cellSelected.innerText = ''
          return
        }
        const cellId = getCellId(selectedCell)
        const cellNameField = document.getElementById('cellname_' + cellId)
        let valueString = ': ' + cellNameField.value
        if (cellNameField.value === '') valueString = ''
        cellSelected.innerText = 'ID:' + cellId + valueString
      }

      showSelectedCell()

      function getCellId (cell) {
        return cell.id.split('_')[1]
      }

      function drawCells () {
        console.log(cells)
        for (let i = 0; i < cells.length; i++) {
          switch (cells[i].type) {
            case 'task':
              ctx.fillStyle = '#FFFFFF'
              break
            case 'box':
              ctx.fillStyle = '#0F2F2F'
              break
          }
          ctx.fillRect(
            (cells[i].x + 10), (cells[i].y + 10), (cellWidth - 20), ((cellHeight * cells[i].rows) - 20)
          )
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
