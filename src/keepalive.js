const html = require('nanohtml')
const NanoComponent = require('nanocomponent')

module.exports = class KeepAlive extends NanoComponent {
  constructor() {
    super()
    this.alive = 0
    this.tick = setInterval(() => {
      this.alive++
      if (this.mounted) {
        this.rerender()
      }
    }, 1000)
  }

  createElement(props) {
    return html`
      <div class="ac">
        <div>Component Won't Get Destroyed</div>
        <div class="f4 mt05">${this.alive}s</div>
      </div>
    `
  }

  update() {
    return true
  }

  load() {
    this.mounted = true
  }

  unload() {
    this.mounted = false
    return false
  }
}
