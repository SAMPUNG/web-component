let results: string[] = []

export function generateCode(tagName: string, config: ComponentConfig) {
  resetTemplate(tagName)

  insertHandler('disconnected', config.onDisconnect)
  insertHandler('connected', config.onConnect)
  insertHandler('attributeChanged', config.onChange)
  insertHandler('adopted', config.onAdopt)

  insertObserved(config.observed)

  return results.join('')
}

function insertHandler(name: string, handler?: Function) {
  if (!handler) {
    return
  }

  const pattern = /^on(Adopt|Change|Connect|Disconnect)/
  const replacer = `\n  ${name}Callback`
  const callback = handler.toString().replace(pattern, replacer)
  results.splice(11, 0, callback)
}

function insertObserved(list?: string[]) {
  if (!list) {
    return
  }

  const pieces = [
    '  static get observedAttributes() {\n',
    '    return ["', list.join(`", "`), '"]\n',
    '  }\n\n'
  ]
  results.splice(8, 0, ...pieces)
}

function resetTemplate(tagName: string) {
  results = [
    'if (customElements.get("', tagName, '")) {\n',
    '  console.error("Custom Element [', tagName, '] has been defined already.")\n',
    '}\n\n',
    'class JugarComponent extends HTMLElement {\n',
    '  constructor() {\n',
    '    super()\n',
    '  }\n',
    '\n',
    '}\n\n',
    'customElements.define("', tagName, '", JugarComponent)'
  ]
}
