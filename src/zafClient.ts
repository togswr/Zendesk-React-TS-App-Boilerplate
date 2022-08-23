// The ZAFClient is imported within the index.html file.
// See docs for help regarding the ZAFClient: https://developer.zendesk.com/apps/docs/developer-guide/getting_started

import { ZafClient } from './types/zafClient'

let client: ZafClient

// @ts-expect-error windowオブジェクトのためno-undefを無視
if (typeof ZAFClient === 'undefined') {
  // eslint-disable-line no-undef
  throw new Error('ZAFClient cannot run outside Zendesk')
} else {
  // @ts-expect-error windowオブジェクトのためno-undefを無視
  client = ZAFClient.init() // eslint-disable-line no-undef
}

export default client
