import { component, listen, attr, format } from '../core/decorator'

@component('web-component')
export class WebComponent {
  @attr('demo-bool')
  @format('boolean')
  demoBool = false

  @attr('demo-str')
  demoStr = 'hello,world'

  @attr('demo-num')
  @format('number')
  demoNum = 1.52

  @listen('click')
  onclick?: Function

  ready = false

  declare elm: HTMLElement

  onconnect() {
    console.log('connected ===> ', this.elm.tagName)
  }

  oncreate() {
    console.log('created ===> ', this.elm.tagName)
  }

  ondisconnect() {
    console.log('disconnected ===> ', this.elm.tagName)
  }
}
