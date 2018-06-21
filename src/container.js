module.exports = class ComponentContainer {
  constructor() {
    this.components = {}
  }

  render(Component, props, instanceId) {
    const component = this.createComponent(Component, props, instanceId)
    return component.render(props)
  }

  createComponent(Component, props, instanceId) {
    const id = Component.prototype.constructor.name + '__' + instanceId
    console.log('ID:', id)

    if (this.components[id]) {
      return this.components[id]
    }

    console.log('Creating:', id)
    const component = new Component(props)

    const _load = component.load
    const _unload = component.unload

    component.load = (el) => {
      console.log('Mount:', id)
      if (_load) {
        _load.call(component, el)
      }
    }

    component.unload = (el) => {
      console.log('Unmount:', id)

      if (_unload && false === _unload.call(component, el)) {
        return
      }

      console.log('Destroy:', id)
      delete this.components[id]
    }

    return this.components[id] = component
  }
}
