export const $btnKick = document.getElementById('btn-kick')
export const $btnQuick = document.getElementById('btn-quick')
export const $logs = document.getElementById('logs')

export function random (num) {
  return Math.ceil(Math.random() * num)
}

export function generateLog (
  firstPerson,
  secondPerson,
  damage,
  hpLeft,
  hpTotal
) {
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

export function renderLog (text) {
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}

export const createClickCounter = (button, maxClicks) => {
  let clicks = 0
  const originalText = button.innerText
  return () => {
    if (clicks < maxClicks) {
      clicks++
      const remaining = maxClicks - clicks
      console.log(`Кнопка "${originalText}": натискань ${clicks}/${maxClicks}`)
      button.innerText = `${originalText} (${remaining} залишилось)`
      if (clicks === maxClicks) {
        button.disabled = true
        button.style.opacity = '0.6'
        button.innerText = `${originalText} (0 залишилось)`
        console.log(`Кнопка "${originalText}" більше не активна`)
      }
      return true
    }
    return false
  }
}
