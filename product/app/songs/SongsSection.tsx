import { vStack, VStack } from '@lib/ui/css/stack'
import { ValueProp } from '@lib/ui/props'
import { songs } from '@product/core/songs'
import { GuitarTheoryTopic } from '@product/core/songs/GuitarTheoryTopic'
import { getGuitarTheorySongId } from '@product/core/songs/Song'
import { SongItem } from './SongItem'
import { SongsSectionHeader } from './SongSectionHeader'
import { useExpandedSongTopics } from './state/expandedSongTopics'
import styled from 'styled-components'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

const Content = styled.div`
  ${vStack({ gap: 12 })}
  ${verticalPadding(8)}
`

export const SongsSection = ({ value }: ValueProp<GuitarTheoryTopic>) => {
  const items = songs[value]

  const [expandedTopics] = useExpandedSongTopics()

  const isExpanded = expandedTopics.includes(value)

  return (
    <VStack>
      <SongsSectionHeader value={value} />
      {isExpanded && (
        <Content>
          {items.map((song) => (
            <SongItem
              key={getGuitarTheorySongId(value, song)}
              song={song}
              topic={value}
            />
          ))}
        </Content>
      )}
    </VStack>
  )
}
