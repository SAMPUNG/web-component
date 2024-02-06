import { linkComponent } from '~/core'
import { generateCode } from '../core/generator'

const code = generateCode('jugar-demo', {
  onAdopt() {
    console.warn('adpoted')
  },
  onChange(name, oldValue, newValue) {
    console.warn('diff', name, oldValue, newValue)
  },
  onConnect() {
    console.warn('connected')
  },
  onDisconnect() {
    console.error('disconnected')
  },
  observed: ['name', 'value'],
})

const $code: HTMLElement = document.getElementById('code')!
$code.textContent = code

linkComponent(code)
