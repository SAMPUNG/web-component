export interface ComponentInstance {
  oncreate?(): void
  onconnect?(): void
  ondisconnect?(): void
  new (...args: any[]): any
}

export interface JugarElement extends HTMLElement {
  model: JuagrComponent
  onconnect?(): void
  ondisconnect?(): void
}

export type LifeCircle = 'onconnect' | 'oncreate' | 'ondisconnect'

export type Primitive = 'string' | 'number' | 'boolean'

export declare function attr(name: string): {
  (target: Function): void
  (target: Object, propertyKey: string | symbol): void
}

export declare function component(
  name: string
): <T extends ComponentInstance>(Source: T) => void

export declare function format(type: Primitive): {
  (target: Function): void
  (target: Object, propertyKey: string | symbol): void
}

export declare function listen(name: string): {
  (target: Function): void
  (target: Object, propertyKey: string | symbol): void
}
