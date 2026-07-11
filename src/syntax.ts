import {Lexicon, pickWordsByPartOfSpeech} from "./lexicon";
import {Morphology, Alignments, inflectWord} from "./morphology";
import {Constituent, Constituents, PartOfSpeech, Word} from "./types";
import {getCategoriesFor, CategoryName} from "./grammar";
import {pickRandom} from "./utils";
import {LanguageProfile} from "./profiles";
import {Phonology} from "./phonology";

export interface Syntax {
    order: Constituent[];
}

export interface SyntaxConfig {
    order: Constituent[];
}

export function generateSyntax(profile: LanguageProfile): Syntax {
    const order = profile.typicalWordOrder ?? [...Constituents].sort(() => Math.random() - 0.5);
    return { order };
}

const ConstituentToPartOfSpeech: Record<Constituent, PartOfSpeech> = {
    'Subject': 'Noun',
    'Predicate': 'Verb',
    'DirectObject': 'Noun',
    'IndirectObject': 'Noun',
}

export function generateSentence(phono: Phonology, lexicon: Lexicon, syntax: Syntax, morphology: Morphology): Word[] {
    const words: Word[] = [];

    for (let i = 0; i < syntax.order.length; i++) {
        const constituent = syntax.order[i];
        const partOfSpeech = ConstituentToPartOfSpeech[constituent];
        const categories = getCategoriesFor(partOfSpeech);

        const rawWords = pickWordsByPartOfSpeech(lexicon, partOfSpeech, 1);
        const inflicted: Word[] = rawWords.map(root => {
            const inflectionsToApply: { category: CategoryName, value: string }[] = [];

            for (const categoryName of categories) {
                const categoryMorphology = morphology.categories[categoryName];
                if (!categoryMorphology) continue;

                const alignmentValue = morphology.alignment.constituentToValue[constituent];
                const value = alignmentValue && categoryMorphology[alignmentValue]
                    ? alignmentValue
                    : pickRandom(Object.keys(categoryMorphology));

                inflectionsToApply.push({ category: categoryName, value });
            }

            const form = inflectWord(root, inflectionsToApply, morphology, phono.alternations);
            return { root, form, constituent, partOfSpeech, inflections: inflectionsToApply };
        })

        inflicted.forEach(word => words.push(word));
    }

    return words;
}