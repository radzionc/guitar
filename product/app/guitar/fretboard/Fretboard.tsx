import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'
import { fretboardConfig } from './config'
import { getColor } from '@lib/ui/theme/getters'
import { range } from '@lib/utils/array/range'
import { String } from './String'
import { Fret } from './Fret'
import { getFretMarkers } from '@product/core/guitar/fretMarkers'
import { FretMarkerItem } from './FretMarkerItem'
import { hStack } from '@lib/ui/css/stack'
import { stringsCount, visibleFrets } from '../../guitar/config'
import { ChildrenProp } from '@lib/ui/props'
import { Nut } from './Nut'

const Neck = styled.div`
  height: ${toSizeUnit(fretboardConfig.height)};
  position: relative;

  ${hStack()};
`

const OpenNotes = styled.div`
  width: ${toSizeUnit(fretboardConfig.openNotesSectionWidth)};
`

const Frets = styled.div`
  position: relative;
  flex: 1;
  background: ${getColor('foreground')};
`

export const Fretboard = ({ children }: ChildrenProp) => {
  return (
    <Neck>
      <OpenNotes />
      <Nut />
      <Frets>
        {range(visibleFrets).map((index) => (
          <Fret key={index} index={index} />
        ))}
        {getFretMarkers(visibleFrets).map((value) => (
          <FretMarkerItem key={value.index} value={value} />
        ))}

        {range(stringsCount).map((index) => (
          <String key={index} index={index} />
        ))}
        {children}
      </Frets>
    </Neck>
  )
}
