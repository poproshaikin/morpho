import {PWord} from "./vocabulary";

export const MarkingStrategies = [
    'Prefix',
    'Suffix',
    'Preposition',
    'Postposition'
] as const;

export type MarkingStrategy = typeof MarkingStrategies[number];

export const PartsOfSpeech = ['Noun', 'Verb', 'Adjective', 'Adverb'] as const;
export type PartOfSpeech = typeof PartsOfSpeech[number];

export const Constituents = ['Subject', 'Predicate', 'DirectObject', 'IndirectObject'] as const;
export type Constituent = typeof Constituents[number];

export type Word = {
    root: PWord;
    form: string;
    partOfSpeech: PartOfSpeech;
    constituent: Constituent;
    inflections: { category: string, value: string }[];
}

