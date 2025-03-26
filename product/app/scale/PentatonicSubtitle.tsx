import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { getColor } from '@lib/ui/theme/getters'
import { getPairComplement } from '@lib/utils/pair/getPairComplement'
import { getScaleName } from '@product/core/scale/getScaleName'
import { getPentatonicRelativeTonalityRootNote } from '@product/core/scale/pentatonic/getPentatonicRelativeTonalityRootNote'
import { tonalities } from '@product/core/tonality'
import styled from 'styled-components'

import { useChangeScale, useScale } from './state/scale'

const Button = styled(UnstyledButton)`
  &:hover {
    color: ${getColor('textPrimary')};
  }
`

export const PentatonicSubtitle = () => {
  const scale = useScale()

  const changeScale = useChangeScale()

  const relativeRootNote = getPentatonicRelativeTonalityRootNote(scale)
  const relativeTonality = getPairComplement(tonalities, scale.tonality)
  const relativeScale = {
    ...scale,
    rootNote: relativeRootNote,
    tonality: relativeTonality,
  }

  return (
    <Button onClick={() => changeScale(relativeScale)}>
      (same notes as in {getScaleName(relativeScale)})
    </Button>
  )
}
