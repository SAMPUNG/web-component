import 'reflect-metadata'

import { DESIGN_TYPE, EVENT_TYPE, ATTRIBUTE, LIFE_CIRCLE } from './meta-data'

const READONLY = ['elm', 'render']

export const createHandler = (elm: HTMLElement) => ({
  get(target: Object, prop: string) {
    if (prop === 'elm') {
      return elm
    }

    const attr = Reflect.getMetadata(ATTRIBUTE, target, prop) ?? prop
    const type = Reflect.getMetadata(DESIGN_TYPE, target, prop) ?? 'string'

    switch (type) {
      case 'boolean': {
        return elm.hasAttribute(attr)
      }
      case 'number': {
        return Number(elm.getAttribute(attr))
      }
      case 'string': {
        return elm.getAttribute(attr)
      }
      default: {
        return undefined
      }
    }
  },
  set(target: Object, prop: string, value?: string | number | boolean) {
    if (READONLY.includes(prop)) {
      return false
    }

    if (Reflect.getMetadata(LIFE_CIRCLE, target, prop)) {
      Reflect.set(target, prop, value)
      return true
    }

    const evt: string | null = Reflect.getMetadata(EVENT_TYPE, target, prop)
    if (evt) {
      if (typeof value === 'function') {
        elm.addEventListener(evt, value)
        Reflect.set(target, prop, value)
      } else {
        const listener = Reflect.get(target, prop)
        elm.removeEventListener(evt, listener)
        Reflect.deleteProperty(target, prop)
      }
      return true
    }

    const attr = Reflect.getMetadata(ATTRIBUTE, target, prop) ?? prop

    switch (typeof value) {
      case 'string': {
        elm.setAttribute(attr, value)
        return true
      }
      case 'boolean': {
        elm.toggleAttribute(attr, value)
        return true
      }
      case 'number': {
        elm.setAttribute(attr, value.toFixed(2))
        return true
      }
      case 'undefined': {
        elm.removeAttribute(attr)
        return true
      }
      default: {
        elm.removeAttribute(attr)
        return false
      }
    }
  },
})
