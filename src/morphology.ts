import {Categories, AlignmentPattern, CategoryInflection, CategoryName} from "./grammar";
import {pickRandom, toBeOrNotToBe} from "./utils";
import {MarkingStrategies, MarkingStrategy} from "./types";
import {PWord, pWordToStr} from "./vocabulary";
import {AlternationRule, Phonology, syllableToPhonemes} from "./phonology";
import {LanguageProfile} from "./profiles";

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
} satisfies Record<string, AlignmentPattern>;

export type AlignmentType = keyof typeof Alignments;

export interface Morphology {
    alignment: AlignmentPattern;
    categories: Partial<Record<string, Record<string, CategoryInflection>>> // { 'Case': { 'Nominative': .... 'Genitive': ... } }
}

export function generateMorphology(phono: Phonology, profile: LanguageProfile): Morphology {
    const alignment: AlignmentPattern = profile.typicalAlignment ? Alignments[profile.typicalAlignment] : pickAlignment();
    const categoryNames = profile.typicalCategories || pickRandomCategories();

    const categoryInflections: Morphology['categories'] = {};

    for (const rndCategoryName of categoryNames) {
        categoryInflections[rndCategoryName] = pickInflection(rndCategoryName, phono, profile);
    }

    return { alignment, categories: categoryInflections };
}

export function inflectWord(
    root: PWord,
    categories: { category: CategoryName, value: string }[],
    morphology: Morphology,
    alternations: AlternationRule[]
): string {
    let stem: PWord = [...root];
    const adpositions: { strategy: 'Preposition' | 'Postposition', marker: PWord }[] = [];

    for (const { category, value } of categories) {
        const inflection = morphology.categories[category]?.[value];
        if (!inflection) continue;

        for (const strategy of inflection.strategies) {
            const marker = inflection.markers[strategy];
            if (!marker) continue;
            switch (strategy) {
                case 'Prefix':
                case 'Suffix': stem = inflectWithAffix(stem, marker, strategy, alternations); break;
                case 'Preposition':
                case 'Postposition': adpositions.push({ strategy, marker }); break;
            }
        }
    }

    return adpositions.reduce((form, { strategy, marker }) =>
        strategy === 'Preposition'
            ? pWordToStr(marker) + ' ' + form
            : form + ' ' + pWordToStr(marker),
        pWordToStr(stem)
    );
}

function inflectWithAffix(stem: PWord, marker: PWord, strategy: 'Suffix' | 'Prefix', alternations: AlternationRule[]): PWord {
    let [first, second] = strategy === 'Suffix' ? [stem, marker] : [marker, stem];

    const last = first[first.length - 1];
    const next = second[0];
    const rule = alternations.find(
        a => a.from === last && (a.triggers.length === 0 || a.triggers.some(t => t.phoneme === next))
    );

    if (rule && last && next) {
        first = [...first.slice(0, -1), rule.to];
    }

    return [...first, ...second];
}

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

const pickWeightedStrategy = (
    weights: Partial<Record<MarkingStrategy, number>>,
    except?: MarkingStrategy
): MarkingStrategy => {
    const entries = (Object.entries(weights) as [MarkingStrategy, number][])
        .filter(([s]) => s !== except);
    const total = entries.reduce((sum, [, w]) => sum + w, 0);
    let r = Math.random() * total;
    for (const [strategy, weight] of entries) {
        r -= weight;
        if (r <= 0) return strategy;
    }
    return entries[entries.length - 1][0];
}

const pickRandomStrategies = (profile: LanguageProfile): MarkingStrategy[] => {
    const count = toBeOrNotToBe() ? 1 : 2;
    const strategies: MarkingStrategy[] = [];

    for (let i = 0; i < count; i++) {
        const last = strategies[strategies.length - 1];
        const strategy = profile.typicalStrategies
            ? pickWeightedStrategy(profile.typicalStrategies, last)
            : last ? pickRandomStrategyNot(last) : pickRandomStrategy();
        strategies.push(strategy);
    }

    return strategies;
}

const pickAlignment = () => {
    const name = pickRandom(Object.keys(Alignments)) as AlignmentType;
    return Alignments[name];
}

const pickRandomMarkers = (strategies: MarkingStrategy[], phono: Phonology) => {
    const markers: Partial<Record<MarkingStrategy, PWord>> = {};

    for (const strategy of strategies) {
        markers[strategy] = syllableToPhonemes(phono, );
    }

    return markers;
}

const pickInflection = (
    categoryName: CategoryName,
    phono: Phonology,
    profile: LanguageProfile
): Record<string, CategoryInflection> => {
    const category = Categories[categoryName];
    const result: Record<string, CategoryInflection> = {};

    for (const value of category.values) {
        const strategies = pickRandomStrategies(profile);
        const markers = pickRandomMarkers(strategies, phono);

        result[value] = {
            strategies,
            markers
        };
    }

    return result;
}
