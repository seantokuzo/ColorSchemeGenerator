const toggler = document.getElementById('toggler')
const colorPicker = document.getElementById('color-picker')
const modeSelector = document.getElementById('mode-selector')
const getSchemeButton = document.getElementById('scheme-btn')
const colorsDiv = document.getElementById('colors-div')
let pickedColor = colorPicker.value.slice(1)
let colorMode = modeSelector.value
let colorsMarkUp = ''

function toggleDarkMode(event) {
  console.log(event.target.checked)
  if (!event.target.checked) {
    document.body.style.backgroundColor = 'var(--bg)'
    document.body.style.color = 'var(--text-light)'
    modeSelector.style.backgroundColor = 'var(--bg)'
    modeSelector.style.color = 'var(--text-light)'
    modeSelector.style.border = '2px solid var(--light-border)'
    getSchemeButton.style.backgroundColor = 'var(--bg)'
    getSchemeButton.style.color = 'var(--text-light)'
    getSchemeButton.style.border = '2px solid var(--light-border)'
    return
  } else {
    document.body.style.backgroundColor = 'var(--bg-dark)'
    document.body.style.color = 'var(--text-dark)'
    modeSelector.style.backgroundColor = 'var(--bg-dark)'
    modeSelector.style.color = 'var(--text-dark)'
    modeSelector.style.border = '2px solid var(--bg)'
    getSchemeButton.style.backgroundColor = 'var(--btn-dark)'
    getSchemeButton.style.color = 'var(--text-dark)'
    getSchemeButton.style.border = 'none'
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

getSchemeButton.addEventListener('click', function () {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${pickedColor}&format=json&mode=${colorMode}&count=5`
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
            .catch(() => console.log('copy failed'))
        })
      })
      const hexCodes = [...document.getElementsByClassName('hex-code')]
      hexCodes.forEach((el) => {
        el.addEventListener('click', () => {
          navigator.clipboard
            .writeText(el.textContent)
            .then(() => alert(`'${el.textContent}' copied to the clipboard`))
            .catch(() => console.log('copy failed'))
        })
      })
    })
})
