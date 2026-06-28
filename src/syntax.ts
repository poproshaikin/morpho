import {Lexicon, PartOfSpeech, pickWordByPartOfSpeech, pickWordsByPartOfSpeech} from "./lexicon";

export const Constituents = ['Subject', 'Predicate', 'DirectObject'] as const;
export type Constituent = typeof Constituents[number];

const constituentToPartOfSpeech: Record<Constituent, PartOfSpeech> = {
    'Subject': 'Noun',
    'Predicate': 'Verb',
    'DirectObject': 'Noun',
}

export interface Syntax {
    order: Constituent[];
}

export interface SyntaxConfig {
    order: Constituent[];
}

export function generateSyntaxConfig(): SyntaxConfig {
    const shuffled = [...Constituents].sort(() => Math.random() - 0.5);
    return { order: shuffled };
}

export function generateSentence(lexicon: Lexicon, syntax: Syntax): string[] {
    const calculateConstituentsCount = () => Math.random() < 0.5 ? 1 : 2; // Randomly choose 1 or 2 words for each constituent;

    return syntax.order.map(constituent => {
        const partOfSpeech = constituentToPartOfSpeech[constituent];
        const consCount = calculateConstituentsCount()
        return pickWordsByPartOfSpeech(lexicon, partOfSpeech, consCount).join(' ');
    });
}