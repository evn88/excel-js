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

      document.onmousemove = e => {
        console.log('parent', $parent.data.col)

        if (event.target.dataset.resize === 'col') {
          const deltaX = e.pageX - coords.right
          const valueX = coords.width + deltaX
          $parent.$el.style.width = valueX + 'px'
          document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
              .forEach(el => el.style.width = valueX + 'px')
        } else {
          const deltaY = e.pageY - coords.bottom
          const valueY = coords.height + deltaY
          $parent.$el.style.height = valueY + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
