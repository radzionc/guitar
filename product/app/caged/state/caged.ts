import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { CagedView } from '@product/core/chords/caged'

export type CagedState = {
  view: CagedView
}

export const makeCagedPath = ({ view }: CagedState) => `/caged/${view}`

export const { useValue: useCaged, provider: CagedProvider } =
  getValueProviderSetup<CagedState>('Caged')

export const useChangeCaged = () => {
  const value = useCaged()
  const { push } = useRouter()

  return useCallback(
    (params: Partial<CagedState>) => {
      push(makeCagedPath({ ...value, ...params }))
    },
    [push, value],
  )
}
