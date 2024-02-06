interface ComponentConfig {
  observed?: string[]
  onAdopt?: () => void
  onChange?: (
    name: string,
    oldValue: string | undefined,
    newValue: string | undefined
  ) => void
  onConnect?: () => void
  onDisconnect?: () => void
}
