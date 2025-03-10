import { range } from '@lib/utils/array/range'
import { chromaticNotesNumber } from '@product/core/note'
import { Fretboard } from '../guitar/fretboard/Fretboard'
import { stringsCount, tuning, visibleFrets } from '../guitar/config'
import { getScaleNotes } from '@product/core/scale/getScaleNotes'
import { useScale } from './state/scale'
import { scalePatterns } from '@product/core/scale/ScaleType'
import { ScaleNote } from './ScaleNote'

export const ScaleNotes = () => {
  const { type, tonality, rootNote } = useScale()

  const pattern = scalePatterns[type][tonality]

  const notes = getScaleNotes({
    pattern,
    rootNote,
  })

  return (
    <Fretboard>
      {range(stringsCount).map((string) => {
        const openNote = tuning[string]
        return range(visibleFrets + 1).map((index) => {
          const note = (openNote + index) % chromaticNotesNumber
          const fret = index - 1

          if (notes.includes(note)) {
            return (
              <ScaleNote
                key={`${string}-${index}`}
                string={string}
                fret={fret}
              />
            )
          }

          return null
        })
      })}
    </Fretboard>
  )
}
