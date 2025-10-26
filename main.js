import { createPlayer } from './Pokemon.js'
import { $btnKick, $btnQuick, random, createClickCounter } from './utils.js'

const character = createPlayer({ name: 'Pikachu', id: 'character' })
const enemy1 = createPlayer({ name: 'Charmander', id: 'enemy1' })
const enemy2 = createPlayer({ name: 'Mister Mime', id: 'enemy2' })

function attack (attacker, defender, maxDamage) {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker)
}

const kickCounter = createClickCounter($btnKick, 7)
const quickCounter = createClickCounter($btnQuick, 7)

$btnKick.addEventListener('click', () => {
  if (kickCounter()) {
    console.log('Thunder Jolt!')
    attack(character, enemy1, 20)
    attack(character, enemy2, 20)
  }
})

$btnQuick.addEventListener('click', () => {
  if (quickCounter()) {
    console.log('Quick Attack!')
    attack(character, enemy1, 10)
    attack(character, enemy2, 10)
  }
})

function init () {
  console.log('Start Game!')
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
}

init()
