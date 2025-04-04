import { getNoteFromPosition } from '../../note/getNoteFromPosition'
import { normalizeFretPositions } from '../../note/normalizeFretPositions'
import { NotePosition } from '../../note/NotePosition'
import { getPentatonicPattern } from '../pentatonic/getPentatonicPattern'
import { Scale } from '../Scale'

import { getBlueNote } from './getBlueNote'

type Input = {
  index: number
  scale: Omit<Scale, 'type'>
}

export const getBluesScalePattern = (input: Input) => {
  const pentatonicPattern = getPentatonicPattern(input)

  const { scale } = input

  const blueNote = getBlueNote(scale)

  const result: NotePosition[] = []

  pentatonicPattern.forEach((position, noteIndex) => {
    result.push(position)

    const note = getNoteFromPosition({ position })
    if (noteIndex === 0 && note - 1 === blueNote) {
      result.push({
        string: position.string,
        fret: position.fret - 1,
      })
    } else if (
      noteIndex < pentatonicPattern.length - 1 &&
      note + 1 === blueNote
    ) {
      result.push({
        string: position.string,
        fret: position.fret + 1,
      })
    }
  })

  return normalizeFretPositions(result)
}
