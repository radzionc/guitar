import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { hStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { Center } from '@lib/ui/layout/Center'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { IsActiveProp, ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { without } from '@lib/utils/array/without'
import { songs } from '@product/core/songs'
import {
  GuitarTheoryTopic,
  guitarTheoryTopicNames,
} from '@product/core/songs/GuitarTheoryTopic'
import { getGuitarTheorySongId } from '@product/core/songs/Song'
import styled from 'styled-components'

import { SongItemFrame } from './SongItemFrame'
import { useCheckedSongs } from './state/checkedSongs'
import { useExpandedSongTopics } from './state/expandedSongTopics'

const CompletionIndicator = styled.div<IsActiveProp>`
  ${round}
  ${sameDimensions(10)}
  background: ${matchColor('isActive', {
    true: 'success',
    false: 'mistExtra',
  })};
`

const CollapseIndicator = styled(CollapsableStateIndicator)`
  font-size: 20px;
  color: ${getColor('textSupporting')};
`

const Container = styled(UnstyledButton)`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  })}
  ${verticalPadding(8)}

  &:hover ${CollapseIndicator} {
    color: ${getColor('contrast')};
  }
`

export const SongsSectionHeader = ({ value }: ValueProp<GuitarTheoryTopic>) => {
  const items = songs[value]
  const [checkedSongs] = useCheckedSongs()

  const hasCheckedSong = checkedSongs.some((songId) =>
    items.some((song) => getGuitarTheorySongId(value, song) === songId),
  )

  const [expandedTopics, setExpandedTopics] = useExpandedSongTopics()

  const isExpanded = expandedTopics.includes(value)

  return (
    <Container
      onClick={() =>
        setExpandedTopics(
          isExpanded
            ? without(expandedTopics, value)
            : [...expandedTopics, value],
        )
      }
    >
      <SongItemFrame>
        <Center>
          <ClientOnly>
            <CompletionIndicator isActive={hasCheckedSong} />
          </ClientOnly>
        </Center>
        <Text color="contrast" as="h3" weight={700} size={18}>
          {guitarTheoryTopicNames[value]}
        </Text>
      </SongItemFrame>
      <ClientOnly>
        <CollapseIndicator isOpen={isExpanded} />
      </ClientOnly>
    </Container>
  )
}
