import 'reflect-metadata'

import type { ComponentInstance, Primitive } from '~/types'

import { createHandler } from './handler'
import { DESIGN_TYPE, EVENT_TYPE, ATTRIBUTE } from './meta-data'

export function attr(name: string) {
  return Reflect.metadata(ATTRIBUTE, name)
}

export function component(name: string) {
  return function <T extends ComponentInstance>(Source: T) {
    class JugarElement extends HTMLElement {
      model: T
      onconnect?(): void
      ondisconnect?(): void
      constructor() {
        super()
        const source = new Source()
        source.elm = this

        const handler = createHandler(this)
        this.model = new Proxy(source, handler)

        source.oncreate?.()
        this.onconnect = source.onconnect
        this.ondisconnect = source.ondisconnect
      }
      connectedCallback() {
        this.onconnect?.call(this.model)
      }
      disconnectedCallback() {
        this.ondisconnect?.call(this.model)
      }
    }
    customElements.define(name, JugarElement)
  }
}

export function format(type: Primitive) {
  return Reflect.metadata(DESIGN_TYPE, type)
}

export function listen(name: string) {
  return Reflect.metadata(EVENT_TYPE, name)
}
