import {
  Client,
  Config,
  Event,
  Logger,
  OnErrorCallback
} from '@bugsnag/core'

type AfterErrorCallback = (err: any, event: Event, logger: Logger) => void
type OnSendErrorCallback = OnErrorCallback

interface MainConfig extends Config {
  enabledErrorTypes?: {
    unhandledExceptions?: boolean
    unhandledRejections?: boolean
    nativeCrashes?: boolean
  }
  endpoints?: {
    notify: string
    sessions: string
  }
  onSendError?: OnSendErrorCallback | OnSendErrorCallback[]
  onUncaughtException?: AfterErrorCallback
  onUnhandledRejection?: AfterErrorCallback
  projectRoot?: string
  launchDurationMillis?: number
}

// a renderer is only allowed a subset of properties from Config
// this must match the "ALLOWED_IN_RENDERER" list in the renderer config
type AllowedRendererConfig = Pick<Config, 'onError'|'onBreadcrumb'|'logger'|'metadata'|'user'|'context'|'plugins'|'appType'>

interface RendererConfig extends AllowedRendererConfig {
  codeBundleId?: string
  trackInlineScripts?: boolean
}

declare class ElectronClient extends Client {
  markLaunchComplete: () => void
}

interface ElectronBugsnagStatic extends ElectronClient {
  start: (apiKeyOrOpts?: string | MainConfig | RendererConfig) => Client
  createClient: (apiKeyOrOpts?: string | MainConfig | RendererConfig) => Client
}

declare const Bugsnag: ElectronBugsnagStatic

export default Bugsnag
export * from '@bugsnag/core'
export { ElectronClient as Client, MainConfig, RendererConfig }
