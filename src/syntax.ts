import {Lexicon, pickWordsByPartOfSpeech} from "./lexicon";
import {declineNoun, Morphology} from "./morphology";
import {Constituent, Constituents, constituentToCase, constituentToPartOfSpeech, Word} from "./types";

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

export function generateSentence(lexicon: Lexicon, syntax: Syntax, morphology: Morphology): Word[] {
    const calculateConstituentsCount = () => Math.random() < 0.5 ? 1 : 2; // Randomly choose 1 or 2 words for each constituent;

    const words: Word[] = [];

    for (let i = 0; i < syntax.order.length; i++) {
        const constituent = syntax.order[i];
        const partOfSpeech = constituentToPartOfSpeech[constituent];

        const consCount = calculateConstituentsCount();
        const rawWords = pickWordsByPartOfSpeech(lexicon, partOfSpeech, consCount);
        const inflicted: Word[] = rawWords.map(root => {
            if (partOfSpeech === 'Noun') {
                const grammaticalCase = constituentToCase[constituent]!;
                const declined = declineNoun(root, grammaticalCase, morphology);
                return {
                    root,
                    form: declined,
                    grammaticalCase,
                    partOfSpeech,
                    constituent
                };
            }

            return {
                root,
                form: root,
                constituent,
                partOfSpeech
            };
        })

        inflicted.forEach(word => words.push(word));
    }

    return words;
}