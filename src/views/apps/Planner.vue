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
    <div id="editor" style="position: absolute"></div>
  </div>
</template>

<script>
import { toRaw } from 'vue'

export default {
  mounted () {
    this.planner()
    this.resizeCanvas()
    this.drawGrid()
    this.load()
  },
  name: 'ProcessPlanner',
  data () {
    return {
      maxCellRows: 25,
      maxCellCols: 15,
      cellWidth: 400,
      cellHeight: 150,
      cells: [],
      selectedCell: {},
      grid: null,
      gridCtx: null,
      canvas: null,
      ctx: null,
      serverResponse: {
        type: '',
        content: ''
      }
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
      if (!this.$route.fullPath.includes('/planner/')) return
      this.save()
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
    },
    addTask (x, y) {
      // JavaScript Part
      const id = (this.cells.length + 1)
      const historyEntry = 'Created by ' + this.$store.state.username
      const history = [historyEntry]
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
      this.getCells.unshift(cCell)
      this.createTaskDom(x, y, id, '', '', true)
      this.update()
      this.save()
      this.openMenu(x, y)
    },
    createTaskDom (x, y, id, name, description, focus = false) {
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
      if (name !== '' && name !== undefined) {
        taskName.value = name
      } else {
        taskName.value = ''
      }
      task.append(taskName)
      // Cell Content
      const taskValue = document.createElement('textarea')
      taskValue.id = 'cellvalue_' + id
      taskValue.style.width = '100%'
      taskValue.style.textAlign = 'center'
      taskValue.style.color = 'black'
      taskValue.setAttribute('class', 'fw-bold')
      if (description !== '' && description !== undefined) {
        taskValue.value = description
      } else {
        taskValue.value = ''
      }
      task.append(taskValue)
      // Append to editor screen
      document.getElementById('editor').appendChild(task)
      this.selectedCell = task
      if (focus) {
        // Focus input field
        document.getElementById('cellname_' + id).focus()
        document.getElementById('cellname_' + id).select()
      }
    },
    addBox (x, y) {
      // JavaScript Part
      const id = (this.cells.length + 1)
      const history = ['Created']
      const boxRows = parseInt(document.getElementById('addmenu_rows').value) + 1
      const cCell = {
        x: x,
        y: y,
        id: id,
        type: 'box',
        rows: boxRows,
        box: -1,
        history: history
      }
      this.getCells.unshift(cCell)
      // HTML Part
      this.createBoxDom(x, y, id, '', true)
      this.update()
      this.save()
      this.openMenu(x, y)
    },
    createBoxDom (x, y, id, name, focus = false) {
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
      const cellName = document.createElement('input')
      cellName.id = 'cellname_' + id
      cellName.style.width = (this.cellWidth - 60) + 'px'
      cellName.style.marginTop = 20 + 'px'
      cellName.style.marginLeft = 20 + 'px'
      cellName.style.borderRadius = '2em'
      cellName.style.fontSize = '130%'
      cellName.style.textAlign = 'center'
      cellName.style.backgroundColor = '#0F2F2F'
      cellName.style.color = 'white'
      cellName.setAttribute('class', 'fw-bold')
      if (name !== '' && name !== undefined) {
        cellName.value = name
      } else {
        cellName.value = ''
      }
      cell.append(cellName)
      // Append to editor screen
      document.getElementById('editor').appendChild(cell)
      this.selectedCell = cell
      if (focus) {
        // Focus input field
        document.getElementById('cellname_' + id).focus()
        document.getElementById('cellname_' + id).select()
      }
    },
    removeCell (id) {
      // Remove HTML content
      let elemToRemove = document.getElementById('cell_' + id)
      elemToRemove.remove()
      elemToRemove = document.getElementById('cell_' + id)
      if (elemToRemove !== null) {
        elemToRemove.remove()
      }
      // Remove Canvas content
      this.cells = this.getCells.filter(function (ele) {
        return ele.id.toString() !== id.toString()
      })
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.save()
      this.update()
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
      // Remove HTML content
      let elemToRemove = document.getElementById('cell_' + id)
      elemToRemove.remove()
      elemToRemove = document.getElementById('cell_' + id)
      if (elemToRemove !== null) {
        elemToRemove.remove()
      }
      // Remove Canvas content
      this.cells = this.getCells.filter(function (ele) {
        return ele.id.toString() !== id.toString()
      })
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.save()
      this.update()
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
      const maxCells = this.maxCellCols * this.maxCellRows
      cellCounter.innerText = 'Elements: ' + cellCount + ' / ' + maxCells
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
      console.log('DRAW', this.getCells)
      let cellElem
      for (let i = 0; i < this.getCells.length; i++) {
        const cell = this.getCells[i]
        switch (cell.type) {
          case 'task':
            // Canvas
            this.ctx.fillStyle = '#0F2F2F'
            this.ctx.fillRect(
              (cell.x + 10),
              (cell.y + 10),
              (this.cellWidth - 20),
              ((this.cellHeight * cell.rows) - 20)
            )
            // HTML
            cellElem = document.getElementById('cell_' + cell.id)
            if (cellElem === null) {
              this.createTaskDom(cell.x, cell.y, cell.id, cell.name, cell.description)
              console.log('Cell Created')
            }
            break
          case 'box':
            // Canvas
            this.ctx.fillStyle = '#0F2F2F'
            this.ctx.fillRect(
              (cell.x + 10),
              (cell.y + 10),
              (this.cellWidth - 20),
              ((this.cellHeight * cell.rows) - 20)
            )
            // HTML
            cellElem = document.getElementById('cell_' + cell.id)
            if (cellElem === null) {
              this.createBoxDom(cell.x, cell.y, cell.id, cell.name)
              console.log('Box Created')
            }
            break
        }
      }
    },
    resizeCanvas () {
      this.canvas.width = this.maxCellCols * this.cellWidth
      this.canvas.height = this.maxCellRows * this.cellHeight
    },
    drawGrid () {
      this.grid.width = this.maxCellCols * this.cellWidth
      this.grid.height = this.maxCellRows * this.cellHeight
      for (let i = 0; i < this.maxCellRows; i++) {
        for (let j = 0; j < this.maxCellRows; j++) {
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
    },
    save () {
      // Gather information
      let cellID
      let containerCell
      const cells = this.getCells
      // Get Name and Description from HTML Content
      for (let i = 0; i < cells.length; i++) {
        cellID = cells[i].id
        containerCell = document.getElementById('cell_' + cellID)
        if (containerCell !== null) {
          cells[i].name = document.getElementById('cellname_' + cellID).value
          if (cells[i].type === 'task') {
            cells[i].description = document.getElementById('cellvalue_' + cellID).value
          }
        }
      }
      this.cells = cells
      console.log('SAVE', this.getCells)
      // Send data to server
      const headers = new Headers()
      headers.set('Authorization', 'Bearer ' + this.$store.state.token)
      headers.set(
        'Content-Type', 'application/json'
      )
      const payload = {
        action: 'save',
        project: this.$store.state.username.split('@')[0],
        cells: this.cells
      }
      fetch(
        'http://localhost:8000/api/planner',
        {
          method: 'post',
          headers: headers,
          body: JSON.stringify(payload)
        }
      )
    },
    load () {
      console.log('Loading Project...')
      this.cells = []
      const headers = new Headers()
      headers.set('Authorization', 'Bearer ' + this.$store.state.token)
      headers.set(
        'Content-Type', 'application/json'
      )
      const payload = {
        action: 'load',
        project: this.$route.params.id
      }
      fetch(
        'http://localhost:8000/api/planner/load',
        {
          method: 'post',
          headers: headers,
          body: JSON.stringify(payload)
        }
      )
        .then((res) => res.json())
        .then((data) => (this.serverResponse = data))
        .then(() => (this.handleLoadResponse()))
        .catch((err) => console.log(err.message))
    },
    handleLoadResponse () {
      if (this.serverResponse === {}) return
      if (this.serverResponse.type !== 'load') return
      this.cells = []
      this.cells = toRaw(this.serverResponse.content)
      console.log('LOADED', this.getCells)
      this.update()
    }
  },
  computed: {
    getCells () {
      return toRaw(this.cells)
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
