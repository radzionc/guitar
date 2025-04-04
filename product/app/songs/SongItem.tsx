import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { Text } from '@lib/ui/text'
import { CopyText } from '@lib/ui/text/CopyText'
import { without } from '@lib/utils/array/without'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { GuitarTheoryTopic } from '@product/core/songs/GuitarTheoryTopic'
import { getGuitarTheorySongId, Song } from '@product/core/songs/Song'

import { SongItemFrame } from './SongItemFrame'
import { useCheckedSongs } from './state/checkedSongs'

type SongItemProps = {
  song: Song
  topic: GuitarTheoryTopic
}

export const SongItem = ({ song, topic }: SongItemProps) => {
  const [checkedSongs, setCheckedSongs] = useCheckedSongs()

  const songId = getGuitarTheorySongId(topic, song)

  const isChecked = checkedSongs.includes(songId)

  const songText = `"${song.name}" by ${song.artist}`

  return (
    <SongItemFrame>
      <CheckStatus as="label" isInteractive value={isChecked}>
        <InvisibleHTMLCheckbox
          value={isChecked}
          onChange={(value) =>
            setCheckedSongs((prev) =>
              value ? [...prev, songId] : without(prev, songId),
            )
          }
        />
      </CheckStatus>
      <Text>
        <CopyText content={songText}>
          <Text as="span" color="contrast">
            {songText}
          </Text>
        </CopyText>
        {song.details && (
          <Text color="supporting" style={{ marginLeft: 8 }} as="span">
            ({capitalizeFirstLetter(song.details)})
          </Text>
        )}
      </Text>
    </SongItemFrame>
  )
}
