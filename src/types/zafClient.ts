/**
 * sell-zaf-app-toolbox/types.ts at master · zendesk/sell-zaf-app-toolbox
 *  https://github.com/zendesk/sell-zaf-app-toolbox/blob/master/src/types.ts
 */

export type ZafClient = {
  on: <T>(event: string, callback: (data?: T) => void) => void
  off: <T>(event: string, callback: (data?: T) => void) => void
  has: <T>(event: string, callback: (data?: T) => void) => void
  invoke: <T>(name: string, ...options: unknown[]) => Promise<T>
  get: <T>(name: string | string[]) => Promise<T>
  set: <T>(name: string, value: string) => Promise<T>
  request: <Input, Output>(data: Input) => Promise<Output>
  metadata: <T>() => Promise<ZafMetadata<T>>
  context: () => Promise<ZafContext>
  trigger: (event: string, data?: unknown) => void
  instance: (Guid: string) => ZafClient
}

export type ZafMetadata<T> = {
  appId: number
  name: string
  version: string
  installationId: number
  settings: T
}

export type ZafContext = {
  // eq. "sell"
  product: string
  // location where the app is supposed to show up
  location: ZafAppLocation
  // uniq instance id
  instanceGuid: string
  // account info
  account: ZafAccountContext
  // user info
  currentUser: ZafUserContext
}

export type ZafAppLocation = 'ticket_sidebar' | 'nav_bar' | 'modal'

export type ZafAccountContext = {
  domain: string
  currency: string
  timezone: string
  numberFormat: string
  timeFormat: string
  dateFormat: string
  decimalSeparator: string
}

export type ZafUserContext = {
  id: number
  name: string
  email: string
  status: string
  invited: boolean | null
  confirmed: boolean
  phone: string | null
  role: ZafUserRole
  roles: ZafRole[]
  group: ZafGroup | null
  reportsTo: number | null
  timezone: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  locale: string
}

// https://developer.zendesk.com/api-reference/apps/apps-support-api/all_locations/#userrole
export type ZafUserRole = 'end-user' | 'agent' | 'admin' | number

export type ZafRole = {
  id: number
  name: string
}

export type ZafGroup = {
  id: number
  name: string
}

export type ZafInstancesCreateContext = {
  'instances.create': [{ instanceGuid: string }]
}

export type ZafTicket = {
  ticket: {
    id: number
    comment: ZafComment
  }
  errors: Record<string, unknown>
}

// https://developer.zendesk.com/api-reference/apps/apps-support-api/ticket_sidebar/#comment-object
export type ZafComment = {
  attachments: []
  text: string
  type: ZafCommentType
  useRichText: boolean
}

// https://developer.zendesk.com/api-reference/apps/apps-support-api/ticket_sidebar/#commenttype
export type ZafCommentType =
  | 'facebookPrivateMessage'
  | 'facebookWallReply'
  | 'internalNote'
  | 'publicReply'
  | 'twitterDirectMessage'
  | 'twitterReply'
