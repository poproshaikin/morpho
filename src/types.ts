export const Cases = [
    'Nominative',
    'Genitive',
    'Dative',
    'Accusative',
    'Instrumental',
    'Locative',
    'Vocative'
] as const;

export type Case = typeof Cases[number];

export const CaseMarkingStrategies = [
    'Prefix',
    'Suffix',
    'Preposition',
    'Postposition'
] as const;

export type CaseMarkingStrategy = typeof CaseMarkingStrategies[number];

export const PartsOfSpeech = ['Noun', 'Verb', 'Adjective', 'Adverb'] as const;
export type PartOfSpeech = typeof PartsOfSpeech[number];

export const Constituents = ['Subject', 'Predicate', 'DirectObject', 'IndirectObject'] as const;
export type Constituent = typeof Constituents[number];

//TODO
export const constituentToPartOfSpeech: Record<Constituent, PartOfSpeech> = {
    'Subject': 'Noun',
    'Predicate': 'Verb',
    'DirectObject': 'Noun',
    'IndirectObject': 'Noun',
}

//TODO
export const constituentToCase: Partial<Record<Constituent, Case>> = {
    'Subject': 'Nominative',
    'DirectObject': 'Accusative',
    'IndirectObject': 'Dative',
}

export type Word = {
    root: string;
    form: string;
    partOfSpeech: PartOfSpeech;
    constituent: Constituent;
    grammaticalCase?: Case
}
