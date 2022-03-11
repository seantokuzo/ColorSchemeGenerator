const toggler = document.getElementById('toggler')
const colorPicker = document.getElementById('color-picker')
const modeSelector = document.getElementById('mode-select')
const numberSelector = document.getElementById('number-select')
const getSchemeButton = document.getElementById('scheme-btn')
const colorsDiv = document.getElementById('colors-div')
let pickedColor = colorPicker.value.slice(1)
let colorMode = modeSelector.value
let numberColors = numberSelector.value
let colorsMarkUp = ''

function setLightMode() {
  document.body.style.backgroundColor = 'var(--bg)'
  document.body.style.color = 'var(--text-light)'
  modeSelector.style.backgroundColor = 'var(--bg)'
  modeSelector.style.color = 'var(--text-light)'
  modeSelector.style.border = '2px solid var(--light-border)'
  modeSelector.style.height = '3rem'
  numberSelector.style.backgroundColor = 'var(--bg)'
  numberSelector.style.color = 'var(--text-light)'
  numberSelector.style.border = '2px solid var(--light-border)'
  numberSelector.style.height = '3rem'
  getSchemeButton.style.backgroundColor = 'var(--bg)'
  getSchemeButton.style.color = 'var(--text-light)'
  getSchemeButton.style.border = '2px solid var(--light-border)'
}

function setDarkMode() {
  document.body.style.backgroundColor = 'var(--bg-dark)'
  document.body.style.color = 'var(--text-dark)'
  modeSelector.style.backgroundColor = 'var(--bg-dark)'
  modeSelector.style.color = 'var(--text-dark)'
  modeSelector.style.border = '2px solid var(--bg)'
  modeSelector.style.height = '3rem'
  numberSelector.style.backgroundColor = 'var(--bg-dark)'
  numberSelector.style.color = 'var(--text-dark)'
  numberSelector.style.border = '2px solid var(--bg)'
  numberSelector.style.height = '3rem'
  getSchemeButton.style.backgroundColor = 'var(--btn-dark)'
  getSchemeButton.style.color = 'var(--text-dark)'
  getSchemeButton.style.border = 'none'
}

function toggleDarkMode(event) {
  if (!event.target.checked) {
    setLightMode()
    return
  } else {
    setDarkMode()
    return
  }
}

toggler.addEventListener('change', toggleDarkMode)

function getPickedColor(event) {
  pickedColor = event.target.value.slice(1)
  return pickedColor
}
colorPicker.addEventListener('change', getPickedColor)

function getColorMode(event) {
  colorMode = event.target.value
  return colorMode
}
modeSelector.addEventListener('change', getColorMode)

function getNumberColors(event) {
  numberColors = event.target.value
  return numberColors
}
numberSelector.addEventListener('change', getNumberColors)

getSchemeButton.addEventListener('click', function () {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${pickedColor}&format=json&mode=${colorMode}&count=${numberColors}`
  )
    .then((res) => res.json())
    .then((data) => {
      colorsMarkUp = ''
      data.colors.map((color, i) => {
        colorsMarkUp += `
                  <div id="bar-${i + 1}" class="color-bar" style="background-color:${
          color.hex.value
        };"><p style="display:none;">${color.hex.value}</p></div>
                  <p id="hex-${i + 1}" class="hex-code">${color.hex.value}</p>
              `
        return colorsMarkUp
      })
      colorsDiv.innerHTML = colorsMarkUp
      const colorBars = [...document.getElementsByClassName('color-bar')]
      colorBars.forEach((el) => {
        el.addEventListener('click', () => {
          navigator.clipboard
            .writeText(el.textContent)
            .then(() => alert(`'${el.textContent}' copied to the clipboard`))
            .catch(() => alert('copy failed'))
        })
      })
      const hexCodes = [...document.getElementsByClassName('hex-code')]
      hexCodes.forEach((el) => {
        el.addEventListener('click', () => {
          navigator.clipboard
            .writeText(el.textContent)
            .then(() => alert(`'${el.textContent}' copied to the clipboard`))
            .catch(() => alert('copy failed'))
        })
      })
    })
})
