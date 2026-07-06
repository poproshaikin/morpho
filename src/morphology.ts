import {GrammaticalCategories, AlignmentPattern, CategoryInflection, GrammaticalCategoryName} from "./grammar";
import {pickRandom, toBeOrNotToBe} from "./utils";
import {MarkingStrategies, MarkingStrategy} from "./types";
import {constructSyllable} from "./phonology";
import {SyllableSchemes} from "./vocabulary";

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

export function generateMorphology(): Morphology {
    const pickRandomCategories = () => {
        const categories: string[] = [];
        Object.keys(GrammaticalCategories).forEach(name => {
            if (toBeOrNotToBe())
                categories.push(name);
        })

        return categories as GrammaticalCategoryName[];
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

    const pickMarkers = (strategies: MarkingStrategy[]) => {
        const markers: Partial<Record<MarkingStrategy, string>> = {};

        for (const strategy of strategies) {
            markers[strategy] = constructSyllable(pickRandom(SyllableSchemes));
        }

        return markers;
    }

    const alignment = pickAlignment();
    const rndCategoryNames = pickRandomCategories();

    const categoryInflections: Record<string, CategoryInflection> = {};

    for (const rndCategoryName of rndCategoryNames) {
        if (toBeOrNotToBe()) continue;

        const category = GrammaticalCategories[rndCategoryName];
        const useOneStrategy = toBeOrNotToBe();
        const strategies = pickRandomStrategies(useOneStrategy ? 1 : 2);
        const markers = pickMarkers(strategies);

        categoryInflections[category.name] = {
            strategies,
            markers
        }
    }

    return { alignment, categories: categoryInflections };
}

export function inflectWord(
    root: string,
    categories: { category: GrammaticalCategoryName, value: string }[],
    morphology: Morphology
) {

}