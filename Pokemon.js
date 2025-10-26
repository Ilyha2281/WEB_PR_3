import { generateLog, renderLog } from './utils.js'

export function createPlayer ({ name, id }) {
  const elHP = document.getElementById(`health-${id}`)
  const elProgressbar = document.getElementById(`progressbar-${id}`)
  return {
    name,
    defaultHP: 100,
    damageHP: 100,
    lost: false,
    elHP,
    elProgressbar,
    renderHPLife () {
      this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`
    },
    renderProgressbarHP () {
      this.elProgressbar.style.width = `${this.damageHP}%`
      if (this.damageHP > 60) {
        this.elProgressbar.style.background = '#4CAF50'
      } else if (this.damageHP > 30) {
        this.elProgressbar.style.background = '#FF9800'
      } else {
        this.elProgressbar.style.background = '#F44336'
      }
    },
    renderHP () {
      this.renderHPLife()
      this.renderProgressbarHP()
    },
    changeHP (count, enemy) {
      if (this.damageHP <= count) {
        this.damageHP = 0
        this.renderHP()
        if (!this.lost) {
          alert(`Бідний ${this.name} програв бій!`)
          this.lost = true
        }
      } else {
        this.damageHP -= count
        this.renderHP()
        const log = generateLog(
          enemy,
          this,
          count,
          this.damageHP,
          this.defaultHP
        )
        renderLog(log)
      }
    }
  }
}
