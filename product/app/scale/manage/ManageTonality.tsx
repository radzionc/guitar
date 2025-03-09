import { GroupedRadioInput } from '@lib/ui/inputs/GroupedRadioInput'
import { useChangeScale, useScale } from '../state/scale'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { tonalities } from '@product/core/tonality'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'

export const ManageTonality = () => {
  const { tonality } = useScale()
  const setValue = useChangeScale()

  return (
    <InputContainer>
      <InputLabel>Tonality: {capitalizeFirstLetter(tonality)}</InputLabel>
      <GroupedRadioInput
        value={tonality}
        onChange={(tonality) => setValue({ tonality })}
        options={tonalities}
        renderOption={(tonality) => capitalizeFirstLetter(tonality)}
      />
    </InputContainer>
  )
}
