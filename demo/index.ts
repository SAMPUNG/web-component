import type { JugarElement } from '~/types'

import './web-component'

const app = document.getElementById('app')!

const component = document.createElement('web-component')
component.textContent = 'hello,world'

app.appendChild(component)

const model = (component as JugarElement).model

model.demoBool = true
model.demoNum = 3.4
model.demoStr = 'hi'
model.onclick = () => {
  console.log('clicked once')
  model.onclick = undefined

  component.setAttribute('demo-str', 'clicked')
}
