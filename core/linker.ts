export function linkComponent(code: string) {
  const $script = document.createElement('script')
  $script.textContent = code
  $script.type = 'module'

  document.head.appendChild($script)
}
