import {Constituent, MarkingStrategy, PartOfSpeech} from "./types";

export type GrammaticalCategory = {
    name: string;
    values: string[];
    appliesTo: PartOfSpeech[];
}

export const GrammaticalCategories = {
    'Case': {
        name: 'Case',
        values: ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Ergative', 'Absolutive'] as const,
        appliesTo: ['Noun'] as PartOfSpeech[],
    } as const,
    'Tense': {
        name: 'Tense',
        values: ['Present', 'Past', 'Future', 'Evidential'],
        appliesTo: ['Verb'] as PartOfSpeech[],
    } as const
} satisfies Record<string, GrammaticalCategory>;


export type GrammaticalCategoryName = keyof typeof GrammaticalCategories;

export function getCategoriesFor(pos: PartOfSpeech): GrammaticalCategoryName[] {
    return (Object.keys(GrammaticalCategories) as GrammaticalCategoryName[])
        .filter(name => GrammaticalCategories[name].appliesTo.includes(pos))
}

export type AlignmentPattern = {
    constituentToValue: Partial<Record<Constituent, string>>;
}

export type CategoryInflection = {
    strategies: MarkingStrategy[];
    markers: Partial<Record<MarkingStrategy, string>>;
}
