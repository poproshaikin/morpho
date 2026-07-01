import {pickRandom, toBeOrNotToBe} from "./utils";
import {constructSyllable} from "./phonology";
import {SyllableSchemes} from "./vocabulary";
import {Case, CaseMarkingStrategies, CaseMarkingStrategy, Cases} from "./types";

function pickRandomCases() {
    const cases = [] as Case[];
    for (const c of Cases) {
        if (toBeOrNotToBe()) {
            cases.push(c);
        }
    }
    return cases;
}

function pickRandomStrategy() {
    return pickRandom(CaseMarkingStrategies);
}

function pickRandomStrategyNot(except: CaseMarkingStrategy) {
    let strategy: CaseMarkingStrategy;
    do {
        strategy = pickRandomStrategy();
    } while (strategy === except);
    return strategy;
}

function pickRandomStrategies(count: number) {
    const strategies = [] as CaseMarkingStrategy[];

    for (let i = 0; i < count; i++) {
        const last = strategies[strategies.length - 1] || false;
        strategies.push(last ? pickRandomStrategyNot(last) : pickRandomStrategy());
    }

    return strategies;
}

export interface Morphology {
    cases: Case[];
    caseMarkingByCase: Partial<Record<Case, CaseMarkingStrategy[]>>;
    caseMarkers: Partial<Record<Case, Partial<Record<CaseMarkingStrategy, string>>>>;
}

export function generateMorphology(): Morphology {
    const cases = pickRandomCases();

    const caseMarkingByCase: Partial<Record<Case, CaseMarkingStrategy[]>> = {};
    cases.forEach(c => {
        const useOneStrategy = toBeOrNotToBe();
        caseMarkingByCase[c] = pickRandomStrategies(useOneStrategy ? 1 : 2);
    })

    const caseMarkers: Morphology['caseMarkers'] = {};
    cases.forEach(c => {
        const strategies = caseMarkingByCase[c];
        caseMarkers[c] = {};
        for (const strategy of strategies!) {
            caseMarkers[c][strategy] = constructSyllable(pickRandom(SyllableSchemes));
        }
    })

    return {
        cases,
        caseMarkingByCase,
        caseMarkers,
    }
}

export function declineNoun(noun: string, grammaticalCase: Case, morpho: Morphology): string {
    const strategies = morpho.caseMarkingByCase[grammaticalCase];
    if (!strategies || strategies.length === 0) {
        return noun;
    }

    const caseMarker = morpho.caseMarkers[grammaticalCase];
    if (!caseMarker) {
        console.error({
            noun,
            Case: grammaticalCase,
            strategies
        }, " caseMarker was null");
        return noun;
    }

    strategies.forEach(strategy => {
        const marker = morpho.caseMarkers[grammaticalCase]![strategy]!;
        switch (strategy) {
            case 'Prefix':      noun = marker + noun; break;
            case 'Suffix':      noun = noun + marker; break;
            case 'Preposition': noun = marker + ' ' + noun; break;
            case 'Postposition': noun = noun + ' ' + marker; break;
        }
    })

    return noun;
}
