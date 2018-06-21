const html = require('nanohtml')
const NanoComponent = require('nanocomponent')

module.exports = class Button extends NanoComponent {
  constructor() {
    super()
    this.n = 0
    this.alive = 0
  }

  createElement(props) {
    return html`
      <div class="ac">
        <button
          onclick=${e => {
            e.preventDefault()
            this.n++
            this.render(props)
          }}
        >${props.caption} (${this.n} clicks) ${this.alive}s</button>
        <div class="f4 mt05">${props.state.text}</div>
      </div>
    `
  }

  update() {
    return true
  }

  load() {
    this.tick = setInterval(() => {
      this.alive++
      this.rerender()
    }, 1000)
  }

  unload() {
    clearInterval(this.tick)
  }
}
