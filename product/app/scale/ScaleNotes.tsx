import { range } from '@lib/utils/array/range'
import { chromaticNotesNumber } from '@product/core/note'
import { defaultVisibleFrets, Fretboard } from '../guitar/fretboard/Fretboard'
import { stringsCount, tuning } from '../guitar/config'
import { getScaleNotes } from '@product/core/scale/getScaleNotes'
import { useScale } from './state/scale'
import { scalePatterns } from '@product/core/scale/ScaleType'
import { ScaleNote } from './ScaleNote'
import { intervalRange } from '@lib/utils/interval/intervalRange'

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
        return intervalRange(defaultVisibleFrets).map((fret) => {
          const note = (openNote + fret + 1) % chromaticNotesNumber

          if (notes.includes(note)) {
            return (
              <ScaleNote
                key={`${string}-${fret}`}
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
