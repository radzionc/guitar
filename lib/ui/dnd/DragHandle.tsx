import styled, { css } from 'styled-components'
import { centerContent } from '../css/centerContent'
import { getColor, matchColor } from '../theme/getters'
import { defaultTransition } from '../css/transition'
import { IsActiveProp } from '../props'

export const DragHandle = styled.div<IsActiveProp>`
  height: 100%;
  font-size: 20px;
  ${centerContent};
  color: ${matchColor('isActive', {
    true: 'contrast',
    false: 'textSupporting',
  })};
  transition: color ${defaultTransition};
  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        color: ${getColor('text')};
      }
    `}
`
