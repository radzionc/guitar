import { ComponentWithIndexProps } from '@lib/ui/props'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { visibleFrets, totalFrets } from '../state/guitar'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toPercents } from '@lib/utils/toPercents'
import { getFretPosition } from '@product/core/guitar/getFretPosition'

const Container = styled.div`
  background: ${getColor('textShy')};
  height: 100%;
  width: 1px;
`

export const Fret = ({ index }: ComponentWithIndexProps) => {
  return (
    <PositionAbsolutelyCenterVertically
      fullHeight
      left={toPercents(
        getFretPosition({
          index,
          visibleFrets,
          totalFrets,
        }).end,
      )}
    >
      <Container key={index} />
    </PositionAbsolutelyCenterVertically>
  )
}