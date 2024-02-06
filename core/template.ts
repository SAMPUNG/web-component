if (customElements.get(':host')) {
  console.error('Custom Element [:host] has been defined already.')
}

const styles = [':host { display: block; }', ':host[hidden] { display: none; }']

class JugarComponent extends HTMLElement {
  // Attributes

  constructor() {
    super()
  }

  // Lifecircle
  connectedCallback() {
    const $style = document.createElement('style')
    $style.textContent = styles.join('\n')
    this.appendChild($style)
  }

  // Methods
}

customElements.define(':host', JugarComponent)
