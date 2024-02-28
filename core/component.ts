

import type { JugarElement } from '~/types'

export async function createComponent<T>(name: string) {
  if (!customElements.get(name)) {
    await customElements.whenDefined(name)
  }
  const elm = document.createElement(name) as JugarElement
  return elm.model! as T
}
