import {Categories, AlignmentPattern, CategoryInflection, CategoryName} from "./grammar";
import {pickRandom, toBeOrNotToBe} from "./utils";
import {MarkingStrategies, MarkingStrategy} from "./types";
import {PWord, pWordToStr} from "./vocabulary";
import {Phonology, syllableToPhonemes} from "./phonology";

export const Alignments = {
    'NominativeAccusative': {
        constituentToValue: {
            Subject: 'Nominative',
            DirectObject: 'Accusative',
            IndirectObject: 'Dative',
        }
    },
    'ErgativeAbsolutive': {
        constituentToValue: {
            Subject: 'Ergative',
            DirectObject: 'Absolutive',
            IndirectObject: 'Dative',
        }
    },
    // 'Neutral': {
    //     constituentToValue: {}
    // }
} satisfies Record<string, AlignmentPattern>;

export type AlignmentType = keyof typeof Alignments;

export interface Morphology {
    alignment: AlignmentPattern;
    categories: Partial<Record<string, Record<string, CategoryInflection>>> // { 'Case': { 'Nominative': .... 'Genitive': ... } }
}

export function generateMorphology(phono: Phonology): Morphology {
    const pickRandomCategories = () => {
        const categories: string[] = [];
        Object.keys(Categories).forEach(name => {
            if (toBeOrNotToBe())
                categories.push(name);
        })

        return categories as CategoryName[];
    }
    const pickRandomStrategy = () => {
        return pickRandom(MarkingStrategies);
    }

    const pickRandomStrategyNot = (except: MarkingStrategy) => {
        let strategy: MarkingStrategy;
        do {
            strategy = pickRandomStrategy();
        } while (strategy === except);
        return strategy;
    }

    const pickRandomStrategies = (count: number) => {
        const strategies = [] as MarkingStrategy[];

        for (let i = 0; i < count; i++) {
            const last = strategies[strategies.length - 1] || false;
            strategies.push(last ? pickRandomStrategyNot(last) : pickRandomStrategy());
        }

        return strategies;
    }

    const pickAlignment = (): AlignmentPattern => {
        const name = pickRandom(Object.keys(Alignments)) as AlignmentType;
        return Alignments[name];
    }

    const pickRandomMarkers = (strategies: MarkingStrategy[]) => {
        const markers: Partial<Record<MarkingStrategy, PWord>> = {};

        for (const strategy of strategies) {
            markers[strategy] = syllableToPhonemes(phono, );
        }

        return markers;
    }

    const pickInflection = (categoryName: CategoryName): Record<string, CategoryInflection> => {
        const category = Categories[categoryName];
        const result: Record<string, CategoryInflection> = {};

        for (const value of category.values) {
            const strategies = pickRandomStrategies(toBeOrNotToBe() ? 1 : 2);
            const markers = pickRandomMarkers(strategies, );

            result[value] = {
                strategies,
                markers
            };
        }

        return result;
    }

    const alignment = pickAlignment();
    const rndCategoryNames = pickRandomCategories();

    const categoryInflections: Morphology['categories'] = {};

    for (const rndCategoryName of rndCategoryNames) {
        categoryInflections[rndCategoryName] = pickInflection(rndCategoryName);
    }

    return { alignment, categories: categoryInflections };
}

export function inflectWord(
    root: PWord,
    categories: { category: CategoryName, value: string }[],
    morphology: Morphology
): string {
    let result = root.map(p => p.glyph).join('');
    for (const { category, value } of categories) {
        const inflection = morphology.categories[category]?.[value];
        if (!inflection) continue;

        for (const strategy of inflection.strategies) {
            const marker = inflection.markers[strategy];
            if (!marker) continue;
            switch (strategy) {
                case 'Prefix':       result = pWordToStr(marker) + result; break;
                case 'Suffix':       result = result + pWordToStr(marker); break;
                case 'Preposition':  result = pWordToStr(marker) + ' ' + result; break;
                case 'Postposition': result = result + ' ' + pWordToStr(marker); break;
            }
        }
    }
    return result;
}