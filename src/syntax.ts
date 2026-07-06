import {Lexicon, pickWordsByPartOfSpeech} from "./lexicon";
import {Morphology, Alignments, inflectWord} from "./morphology";
import {Constituent, Constituents, PartOfSpeech, Word} from "./types";
import {getCategoriesFor, GrammaticalCategories, GrammaticalCategoryName} from "./grammar";

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

const ConstituentToPartOfSpeech: Record<Constituent, PartOfSpeech> = {
    'Subject': 'Noun',
    'Predicate': 'Verb',
    'DirectObject': 'Noun',
    'IndirectObject': 'Noun',
}

export function generateSentence(lexicon: Lexicon, syntax: Syntax, morphology: Morphology): Word[] {
    const calculateConstituentsCount = () => Math.random() < 0.5 ? 1 : 2; // Randomly choose 1 or 2 words for each constituent;


    const words: Word[] = [];

    for (let i = 0; i < syntax.order.length; i++) {
        const constituent = syntax.order[i];
        const partOfSpeech = ConstituentToPartOfSpeech[constituent];
        const categories = getCategoriesFor(partOfSpeech);
        const inflections = Object.keys(morphology.categories).map(categoryName => {
            return morphology.categories[categoryName]!;
        });

        const consCount = calculateConstituentsCount();
        const rawWords = pickWordsByPartOfSpeech(lexicon, partOfSpeech, consCount);
        const inflicted: Word[] = rawWords.map(root => {
            const inflectionsToApply = categories.map(name => {
                return inflections.;
            })

            let result = root;
            for (const category of categories) {
                result = inflectWord(result, )
            }


            // if (partOfSpeech === 'Noun') {
            //     const grammaticalCase = constituentToCase[constituent]!;
            //     const declined = declineNoun(root, grammaticalCase, morphology);
            //     return {
            //         root,
            //         form: declined,
            //         grammaticalCase,
            //         partOfSpeech,
            //         constituent
            //     };
            // }

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