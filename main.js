const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')
const $logs = document.getElementById('logs')

function random (num) {
  return Math.ceil(Math.random() * num)
}

function generateLog (firstPerson, secondPerson, damage, hpLeft, hpTotal) {
  const { name: name1 } = firstPerson
  const { name: name2 } = secondPerson

  const logs = [
    `${name1} замислився, але раптом ${name2} підскочив і дав ляпаса.`,
    `${name1} моргнув, а ${name2} вже встиг вдарити по спині.`,
    `${name1} посковзнувся, і ${name2} скористався шансом для атаки.`,
    `${name1} відволікся, а ${name2} завдав точного удару.`,
    `${name1} спробував ухилитись, але ${name2} швидше — удар у щоку!`,
    `${name1} крикнув щось незрозуміле, а ${name2} у відповідь пробив прямий.`,
    `${name1} зробив крок назад, проте ${name2} кинувся вперед і вдарив.`,
    `${name1} підморгнув, а ${name2} не зрозумів жарту і врізав.`,
    `${name1} почав радіти, що все добре, але ${name2} нагадав, що ні.`,
    `${name1} відкрив рот, щоб щось сказати, але ${name2} прикрив його кулаком.`
  ]

  const text = logs[random(logs.length) - 1]
  return `${text} -${damage} [${hpLeft}/${hpTotal}]`
}

function renderLog (text) {
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}

function createPlayer ({ name, id }) {
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

const character = createPlayer({ name: 'Pikachu', id: 'character' })
const enemy1 = createPlayer({ name: 'Charmander', id: 'enemy1' })
const enemy2 = createPlayer({ name: 'Mister Mime', id: 'enemy2' })

function attack (attacker, defender, maxDamage) {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker)
}

$btnKick.addEventListener('click', function () {
  console.log('Thunder Jolt!')
  attack(character, enemy1, 20)
  attack(character, enemy2, 20)
})

$btnQuick.addEventListener('click', function () {
  console.log('Quick Attack!')
  attack(character, enemy1, 10)
  attack(character, enemy2, 10)
})

function init () {
  console.log('Start Game!')
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
}

init()
