const morph = require('nanomorph')
const page = require('./page')

// state
const state = {
  page: 0,
  iteration: 0,
  text: 'accessed global state',
  render,
}

// render emitter
function render() {
  state.iteration++
  morph(document.body, page(state, render))
}

// components
const ComponentContainer = require('./container.js')
const container = new ComponentContainer()

render.component = (Component, props, instanceId) => (
  container.render(Component, props, instanceId)
)

// run
render()
