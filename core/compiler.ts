import template from './template.ts?raw'

export class Compiler {
  code: string = ''

  constructor(tagName: string) {
    if (!tagName.includes('-')) {
      console.error('Custom Element Name [:host] has not include -. eg. app-header')
      return
    }
    this.code = template.replace(':host', tagName)
  }
}
