// import { linkComponent } from '~/core'
import { Compiler } from '../core/compiler'

const compiler = new Compiler('jugar-demo')
compiler.define('getReady', () => {
  console.log('ready')
})
compiler.define('clear', () => {
  console.log('clear')
})
compiler.design('disabled', 'boolean')
compiler.design('name', 'string')
compiler.design('value', 'number')
compiler.observe('name', (oldValue, newValue) => {
  console.log(newValue, oldValue)
})
compiler.observe('value', (oldValue, newValue) => {
  console.log(newValue, oldValue)
})
compiler.when('adopted', () => {
  console.error('adopted')
})
compiler.when('disconnected', () => {
  console.error('disconnected')
})

const $code: HTMLElement = document.getElementById('code')!
$code.textContent = compiler.run()

console.log(compiler)

// linkComponent(code)
