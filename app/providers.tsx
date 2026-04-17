'use client'

import { TamaguiProvider, TamaguiProviderProps } from 'tamagui'
import tamaguiConfig from '../tamagui.config'

export function Providers({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light" {...rest}>
      {children}
    </TamaguiProvider>
  )
}