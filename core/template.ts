if (customElements.get(':host')) {
  console.error('Custom Element [:host] has been defined already.')
}

const styles = [':host { display: block; }', ':host[hidden] { display: none; }']

class JugarComponent extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const $style = document.createElement('style')
    $style.textContent = styles.join('\n')
    this.appendChild($style)
  }
}

customElements.define(':host', JugarComponent)
