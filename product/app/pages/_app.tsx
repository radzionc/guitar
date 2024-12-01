import type { AppProps } from 'next/app'
import { ReactNode, useState } from 'react'
import { GlobalStyle } from '@lib/ui/css/GlobalStyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from 'next/font/google'
import { ThemePreference } from '@lib/ui/theme/ThemePreference'
import { DarkLightThemeProvider } from '@lib/ui/theme/DarkLightThemeProvider'
import { Page } from '@lib/next-ui/Page'
import {
  usePersistentState,
  PersistentStateKey,
} from '../state/persistentState'
import { WebsiteLayout } from '../layout/WebsiteLayout'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

interface MyAppProps extends AppProps {
  Component: Page
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const component = getLayout(<Component {...pageProps} />)

  const [theme, setTheme] = usePersistentState<ThemePreference>(
    PersistentStateKey.ThemePreference,
    'dark',
  )

  return (
    <QueryClientProvider client={queryClient}>
      <DarkLightThemeProvider value={theme} onChange={setTheme}>
        <GlobalStyle fontFamily={inter.style.fontFamily} />
        <WebsiteLayout>{component}</WebsiteLayout>
      </DarkLightThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
