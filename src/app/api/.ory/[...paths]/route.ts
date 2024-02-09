// @ory/integrations offers a package for integrating with NextJS.
import { createApiHandler } from '@ory/integrations/next-edge'

// We need to export the config.

// And create the Ory Cloud API "bridge".
const handler = createApiHandler({
  fallbackToPlayground: true,
  // Because vercel.app is a public suffix and setting cookies for
  // vercel.app is not possible.
  dontUseTldForCookieDomain: true,
  // we require this since we are proxying the Ory requests through nextjs
  // Ory needs to know about our host to generate the correct urls for redirecting back between flows
  // For example between Login MFA and Settings
  forwardAdditionalHeaders: ['x-forwarded-host'],
})

export { handler as GET, handler as POST }
export { config } from '@ory/integrations/next-edge'
