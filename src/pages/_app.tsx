import type { AppPropsWithLayout } from 'next/app'
import '../styles/reset.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
