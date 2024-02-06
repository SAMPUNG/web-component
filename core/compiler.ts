import template from './template.ts?raw'

type Lifecircle = 'adopted' | 'connected' | 'disconnected'
type Observation = (
  oldValue: string | undefined,
  newValue: string | undefined
) => void
type Primitive = 'boolean' | 'number' | 'string'

export class Compiler {
  attributes: Record<string, Primitive> = {}
  code: string[] = []
  lifecicle = {
    adopted: () => {},
    connected: () => {},
    disconnected: () => {},
  }
  methods: Record<string, Function> = {}
  observations: Record<string, Observation> = {}

  constructor(tagName: string) {
    if (!tagName.includes('-')) {
      console.error(
        'Custom Element Name [:host] has not include -. eg. app-header'
      )
      return
    }
    this.code = template.replace(/:host/g, tagName).split('\r\n')
  }

  define(name: string, func: Function) {
    this.methods[name] = func

    let source = func.toString().split('\n')
    source[0] = source[0].replace(/(.+) => \{/, `${name}$1{`)
    source = source.map((item) => '  ' + item)

    const index = this.code.indexOf('  // Methods')
    this.code.splice(index + 1, 0, source.join('\n'))
  }

  design(name: string, type: Primitive) {
    this.attributes[name] = type
  }

  observe(name: string, observation: Observation) {
    this.observations[name] = observation
  }

  run() {
    return this.code.join('\n')
  }

  when(lifetime: Lifecircle, callback: () => void) {
    this.lifecicle[lifetime] = callback

    let source = callback.toString().split('\n')
    source.splice(0, 1, `${lifetime}Callback {`)
    source = source.map((item) => '  ' + item)

    const index = this.code.indexOf('  // Lifecircle')
    this.code.splice(index + 1, 0, source.join('\n'))
  }
}
