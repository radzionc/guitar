export const tonalities = ['minor', 'major'] as const
export type Tonality = (typeof tonalities)[number]
