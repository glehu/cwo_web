<template>
  <div class="wrapper">
    <div class="hide" id="contextmenu">
      <div style="display: flex; align-items: center">
        <i id="btn_done" title="Done" class="btn text-white bi-check2-circle muArrow" style="font-size: 150%"></i>
        <i id="btn_info" title="Info" class="btn text-white bi-info-circle muArrow" style="font-size: 150%"></i>
        <i id="btn_cut" title="Remove" class="btn text-white bi-x-circle muArrow" style="font-size: 150%"></i>
        <i id="btn_history" title="History" class="btn text-white bi-clock-history muArrow" style="font-size: 150%"></i>
        <i id="btn_deselect" title="Deselect" class="btn text-white bi-x-lg ps-5 muArrow" style="font-size: 150%"></i>
        <p id="selected_cell" class="text-white pt-3" style="width: 250px"></p>
      </div>
    </div>
    <div class="hide" id="addmenu">
      <div style="display: flex; align-items: center">
        <i id="btn_addbox" title="Add Box" class="btn text-white bi-square" style="font-size: 200%"></i>
        <input id="addmenu_rows" class="bg-black text-white p-2"
               type="number" value="5" min="1" max="50" size="2"
               style="border-radius: 1rem">
        <i id="btn_addtask" title="Add Task" class="btn text-white bi-file-earmark-check doHover"
           style="font-size: 200%"></i>
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
  mounted () {
    this.planner()
    this.resizeCanvas()
    this.drawGrid()
    this.update()
  },
  name: 'ProcessPlanner',
  data () {
    return {
      maxCellAmount: 20,
      cellWidth: 400,
      cellHeight: 150,
      cells: [],
      selectedCell: {},
      grid: null,
      gridCtx: null,
      canvas: null,
      ctx: null
    }
  },
  methods: {
    planner () {
      window.addEventListener('resize', this.resizeCanvas, false)

      window.addEventListener('mouseup', this.handleMouseClick, false)

      this.grid = document.getElementById('grid')
      this.gridCtx = this.grid.getContext('2d')

      this.canvas = document.getElementById('canvas')
      this.ctx = this.canvas.getContext('2d')
    },
    handleMouseClick () {
      const x = this.getPositionX(event.pageX)
      const y = this.getPositionY(event.pageY)
      const xc = event.clientX
      const yc = event.clientY

      if (this.checkOccupied(x, y, xc, yc)) {
        document.getElementById('contextmenu').className = 'hide'
        this.selectedCell = {
          x: x,
          y: y
        }
        this.openAddMenu(x, y)
      } else {
        const elemUnderCursor = document.elementFromPoint(xc, yc)
        if (elemUnderCursor.id.includes('cell')) {
          document.getElementById('addmenu').className = 'hide'
          this.selectedCell = elemUnderCursor
          this.openMenu(x, y)
        } else {
          // Buttons?
          if (elemUnderCursor.id.includes('btn')) {
            switch (elemUnderCursor.id.toString()) {
              case 'btn_addbox':
                document.getElementById('addmenu').className = 'hide'
                this.addBox(this.selectedCell.x, this.selectedCell.y)
                break
              case 'btn_addtask':
                document.getElementById('addmenu').className = 'hide'
                this.addTask(this.selectedCell.x, this.selectedCell.y)
                break
              case 'btn_done':
                this.finishCell(this.getCellId(this.selectedCell), this.selectedCell.type)
                document.getElementById('contextmenu').className = 'hide'
                break
              case 'btn_cut':
                this.removeCell(this.getCellId(this.selectedCell), this.selectedCell.type)
                document.getElementById('contextmenu').className = 'hide'
                break
              case 'btn_history':
                alert(this.getCell(this.getCellId(this.selectedCell)).history[0])
                break
              case 'btn_deselect':
                document.getElementById('contextmenu').className = 'hide'
                this.selectedCell = null
                break
              case 'btn_deselect2':
                document.getElementById('addmenu').className = 'hide'
                this.selectedCell = null
                break
            }
          }
        }
      }
      this.update()
    },
    addTask (x, y) {
      // JavaScript Part
      const id = (this.cells.length + 1)
      const history = ['Created']
      let belongsToBox = -1
      for (let i = this.cells.length - 1; i >= 0; i--) {
        if (this.cells[i].x === x) {
          if (this.cells[i].type === 'box') {
            // Check if the cell is inside the box's boundaries
            const boxStart = this.cells[i].y
            const boxEnd = (this.cells[i].rows * this.cellHeight)
            if (y >= boxStart && y <= boxEnd) {
              // Reference the box
              belongsToBox = this.cells[i].id
            }
          }
        }
      }
      const cCell = {
        x: x,
        y: y,
        id: id,
        type: 'task',
        rows: '1',
        box: belongsToBox,
        history: history
      }
      console.log(cCell)
      this.cells.unshift(cCell)
      this.update()
      // HTML Part
      // Container Cell
      const task = document.createElement('div')
      task.id = 'cell_' + id
      task.style.position = 'absolute'
      task.style.left = ((x + 20) + 'px')
      task.style.top = ((y + 20) + 'px')
      task.style.width = ((this.cellWidth - 40) + 'px')
      task.style.height = ((this.cellHeight - 40) + 'px')
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
      this.selectedCell = task
      // Focus input field
      document.getElementById('cellname_' + id).focus()
      document.getElementById('cellname_' + id).select()
      this.openMenu(x, y)
    },
    addBox (x, y) {
      // JavaScript Part
      const id = (this.cells.length + 1)
      const history = ['Created']
      const boxRows = parseInt(document.getElementById('addmenu_rows').value) + 1
      this.cells.unshift({
        x: x,
        y: y,
        id: id,
        type: 'box',
        rows: boxRows,
        box: -1,
        history: history
      })
      this.update()
      // HTML Part
      // Container Cell
      const cell = document.createElement('div')
      cell.id = 'cell_' + id
      cell.style.position = 'absolute'
      cell.style.backgroundColor = '#0A5F4F'
      cell.style.left = ((x + 10) + 'px')
      cell.style.top = ((y + 10) + 'px')
      cell.style.width = ((this.cellWidth - 20) + 'px')
      cell.style.height = ((this.cellHeight - 20) + 'px')
      // Cell Name
      const nameField = document.createElement('input')
      nameField.id = 'cellname_' + id
      nameField.style.width = (this.cellWidth - 60) + 'px'
      nameField.style.marginTop = 20 + 'px'
      nameField.style.marginLeft = 20 + 'px'
      nameField.style.borderRadius = '2em'
      nameField.style.fontSize = '130%'
      nameField.style.textAlign = 'center'
      nameField.style.backgroundColor = '#0F2F2F'
      nameField.style.color = 'white'
      nameField.setAttribute('class', 'fw-bold')
      cell.append(nameField)
      // Append to editor screen
      document.getElementById('editor').appendChild(cell)
      this.selectedCell = cell
      // Focus input field
      document.getElementById('cellname_' + id).focus()
      document.getElementById('cellname_' + id).select()
      this.openMenu(x, y)
    },
    removeCell (id) {
      // Remove Canvas content
      this.cells = this.cells.filter(function (ele) {
        return ele.id.toString() !== id.toString()
      })
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.update()
      // Now remove HTML content
      document.getElementById('cell_' + id).remove()
    },
    finishCell (id) {
      // Container Cell
      const cell = document.createElement('div')
      cell.id = 'finished_' + id
      cell.style.width = '100%'
      // Cell Name
      const cellId = this.getCellId(this.selectedCell)
      const cellName = document.getElementById('cellname_' + cellId).value
      let boxInfo = ''
      if (this.getCell(id).box !== -1) {
        boxInfo = '[' + document.getElementById('cellname_' + this.getCell(id).box).value + '] '
      }
      const valueString = '✓ ' + boxInfo + cellName
      const nameField = document.createTextNode(valueString)
      cell.append(nameField)
      const finishedList = document.getElementById('hall_of_fame')
      finishedList.insertBefore(cell, finishedList.children[0])
      // Remove Canvas content
      this.cells = this.cells.filter(function (ele) {
        return ele.id.toString() !== id.toString()
      })
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.update()
      // Now remove HTML content
      document.getElementById('cell_' + id).remove()
    },
    update () {
      this.drawCells()
      this.showCellCount()
    },
    openMenu (x, y) {
      this.showSelectedCell()
      document.getElementById('contextmenu').className = 'show'
      document.getElementById('contextmenu').style.left = x + 'px'
      document.getElementById('contextmenu').style.top = (y - (this.cellHeight / 2)) + 'px'
    },
    openAddMenu (x, y) {
      document.getElementById('addmenu').className = 'show'
      document.getElementById('addmenu').style.left = x + 'px'
      document.getElementById('addmenu').style.top = (y - (this.cellHeight / 2)) + 'px'
    },
    showCellCount () {
      const cellCounter = document.getElementById('count_cell')
      const cellCount = this.cells.length
      cellCounter.innerText = 'Elements: ' + cellCount
    },
    showSelectedCell () {
      const cellSelected = document.getElementById('selected_cell')
      if (this.selectedCell === null) {
        cellSelected.innerText = ''
        return
      }
      const cellId = this.getCellId(this.selectedCell)
      const cellNameField = document.getElementById('cellname_' + cellId)
      let valueString = ': ' + cellNameField.value
      if (cellNameField.value === '') valueString = ''
      cellSelected.innerText = 'ID:' + cellId + valueString
    },
    drawCells () {
      for (let i = 0; i < this.cells.length; i++) {
        switch (this.cells[i].type) {
          case 'task':
            break
          case 'box':
            this.ctx.fillStyle = '#0F2F2F'
            this.ctx.fillRect(
              (this.cells[i].x + 10), (this.cells[i].y + 10), (this.cellWidth - 20), ((this.cellHeight * this.cells[i].rows) - 20)
            )
            break
        }
      }
    },
    resizeCanvas () {
      this.canvas.width = this.maxCellAmount * this.cellWidth
      this.canvas.height = this.maxCellAmount * this.cellHeight
      this.update()
    },
    drawGrid () {
      this.grid.width = this.maxCellAmount * this.cellWidth
      this.grid.height = this.maxCellAmount * this.cellHeight
      for (let i = 0; i < this.maxCellAmount; i++) {
        for (let j = 0; j < this.maxCellAmount; j++) {
          // Lines
          this.gridCtx.fillStyle = '#1F1F1F'
          this.gridCtx.fillRect((i * this.cellWidth), (j * this.cellHeight), this.cellWidth, 2)
          this.gridCtx.fillRect((i * this.cellWidth), (j * this.cellHeight), 2, this.cellHeight)
          // Dots
          this.gridCtx.fillStyle = 'white'
          this.gridCtx.fillRect(((i * this.cellWidth) - 1), ((j * this.cellHeight) - 1), 4, 4)
        }
      }
    },
    getPositionX: function (mousePos) {
      return (Math.floor(mousePos / this.cellWidth) * this.cellWidth)
    },
    getPositionY: function (mousePos) {
      return (Math.floor(mousePos / this.cellHeight) * this.cellHeight)
    },
    checkOccupied: function (x, y, xc, yc) {
      // First check if we're on the editor div
      const elemUnderCursor = document.elementFromPoint(xc, yc)
      if (elemUnderCursor.id !== 'editor' && elemUnderCursor.id !== 'canvas') return false

      // Now check if there's already a cell here
      for (let i = 0; i < this.cells.length; i++) {
        if (this.cells[i].x === x && this.cells[i].y === y) {
          return false
        }
      }
      return true
    },
    getCellId: function (cell) {
      return cell.id.split('_')[1]
    },
    getCell: function (id) {
      return this.cells.filter(function (ele) {
        return ele.id.toString() === id.toString()
      })[0]
    }
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
  background: #0A2C2F;
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
  background-color: #0A2C2F;
  border-radius: 2em;
  border: 3px solid black;
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

.muArrow {
  position: relative;
  top: 0;
  transition: top ease 0.5s;
}

.muArrow:hover {
  top: -5px;
}

.doHover {
  animation: hover 3s ease-in-out infinite;
}

@keyframes hover {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5%);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
