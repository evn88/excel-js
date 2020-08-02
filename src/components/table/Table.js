import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'onmousemove']
    })
  }

  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = e => {
        if (event.target.dataset.resize === 'col') {
          const deltaX = e.pageX - coords.right
          const valueX = coords.width + deltaX

          $parent.css({
            width: valueX + 'px'
          })
          cells.forEach(el => el.style.width = valueX + 'px')
        } else {
          const deltaY = e.pageY - coords.bottom
          const valueY = coords.height + deltaY

          $parent.css({
            height: valueY + 'px'
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}


// 313 msScripting
// 2519 msRendering
// 1247 msPainting
// 588 msSystem
// 4540 msIdle
// 9207 msTotal
