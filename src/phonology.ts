import {pickRandom, pickRandomCount, pickSubset, pickWeighted, toBeOrNotToBe} from "./utils";
import {ALTERNATION_WEIGHTS, Phoneme, PhonemeType, PWord, TRANSITION_MATRIX} from "./vocabulary";
import {LanguageProfile} from "./profiles";

export interface Phonology {
    vowels: Phoneme[];
    consonants: Phoneme[];
    allowedSyllableStructures: string[];
    forbiddenClusters: [string, string][];
    constraints: PhonotacticConstraint[];
    alternations: AlternationRule[];
}

export enum PhonotacticRule {
    OnlyStart = 1,
    OnlyEnd,
    NotAfter,
    NotSame
}

export class PhonotacticConstraint {
    readonly type: PhonotacticRule;
    readonly phonemes: Phoneme[];

    constructor(type: PhonotacticRule, ...phonemes: Phoneme[]) {
        this.type = type;
        this.phonemes = phonemes;
    }

    check(sequence: Phoneme[]): boolean {
        switch (this.type) {
            case PhonotacticRule.OnlyStart:
                return sequence.every((p, i) => i === 0 || p !== this.phonemes[0]);
            case PhonotacticRule.OnlyEnd:
                return sequence.every((p, i) => i === sequence.length - 1 || p !== this.phonemes[0]);
            case PhonotacticRule.NotAfter:
                return !sequence.some((p, i) => i > 0 && sequence[i - 1] === this.phonemes[0] && p === this.phonemes[1]);
            case PhonotacticRule.NotSame:
                return !sequence.some((p, i) => i > 0 && p === sequence[i - 1]);
        }
    }
}

export type AlternationTrigger = {
    type: 'before' | 'after';
    phoneme: Phoneme;
}

export class AlternationRule {
    public constructor(
        public from: Phoneme,
        public to: Phoneme,
        public triggers: AlternationTrigger[]
    ) {
    }
}

export function generatePhonology(profile: LanguageProfile): Phonology {
    const allowedSyllableStructures = generateSyllableStructures(1 + Math.floor(Math.random() * 5), profile);
    const forbiddenClustersCount = pickRandomCount(allowedSyllableStructures);
    const forbiddenClusters: [string, string][] = [];
    for (let i = 0; i < forbiddenClustersCount; i++) {
        forbiddenClusters.push([
            pickRandom(allowedSyllableStructures),
            pickRandom(allowedSyllableStructures)
        ]);
    }

    const vowels = pickSubset(profile.phonemes.vowels, 3);
    const consonants = pickSubset(profile.phonemes.consonants, 8);

    const constraints = generateConstraints(vowels, consonants);
    const alternations = generateAlternations(vowels, consonants, profile);

    return {
        vowels,
        consonants,
        allowedSyllableStructures,
        forbiddenClusters,
        constraints,
        alternations
    };
}

function generateConstraints(vowels: Phoneme[], consonants: Phoneme[]): PhonotacticConstraint[] {
    const all = [ ...vowels, ...consonants];
    const constraints: PhonotacticConstraint[] = [];

    if (Math.random() < 0.3)
        constraints.push(new PhonotacticConstraint(PhonotacticRule.OnlyStart, toBeOrNotToBe() ? pickRandom(vowels)! : pickRandom(consonants)!));

    if (Math.random() < 0.4)
        constraints.push(new PhonotacticConstraint(PhonotacticRule.NotAfter, pickRandom(all)!, pickRandom(all)!));

    if (Math.random() < 0.25)
        constraints.push(new PhonotacticConstraint(PhonotacticRule.OnlyEnd, toBeOrNotToBe() ? pickRandom(vowels)! : pickRandom(consonants)!));

    if (Math.random() < 0.65)
        constraints.push(new PhonotacticConstraint(PhonotacticRule.NotSame, pickRandom(all)!));

    return constraints;
}

function generateAlternations(vowels: Phoneme[], consonants: Phoneme[], profile?: LanguageProfile): AlternationRule[] {
    const count = pickRandomCount({ length: 10 });
    const typicalAlternations = (profile?.typicalAlternations ?? [])
        .map(({ fromIpa, toIpa }) => ({
            from: [...vowels, ...consonants].find(p => p.ipa === fromIpa),
            to:   [...vowels, ...consonants].find(p => p.ipa === toIpa),
            triggers: [] as AlternationTrigger[],
        }))
        .filter(r => r.from && r.to) as AlternationRule[]

    const rules: AlternationRule[] = [];

    for (let i = 0; i < count; i++) {
        if (typicalAlternations.length > 1 && Math.random() < 0.5) {
            console.log(' picked typical alternation rule')
            rules.push(pickRandom(typicalAlternations)!);
            continue;
        }

        rules.push(generateRandomAlternation(vowels, consonants));
    }

    return rules;
}

function generateRandomAlternation(vowels: Phoneme[], consonants: Phoneme[]) {
    const from = pickRandom([...vowels, ...consonants])!;
    const to = pickNextPhoneme(pickRandom([[...vowels], [...consonants]]), from);

    const triggerCount = pickRandomCount({ length: 3 });
    const triggers: AlternationTrigger[] = [];

    for (let j = 0; j < triggerCount; j++) {
        triggers.push({
            type: toBeOrNotToBe() ? 'before' : 'after',
            phoneme: pickRandom([...vowels, ...consonants])!
        });
    }

    return { from, to, triggers };
}

export function syllableToPhonemes(phono: Phonology, structure?: string, last?: Phoneme): Phoneme[] {
    const phonemes: Phoneme[] = [];
    const effectiveStructure = structure || pickRandom(phono.allowedSyllableStructures)!;

    for (const c of effectiveStructure) {
        // choose next phoneme by c/v, which is compatible with last phoneme type, using transition matrix
        const next = pickNextPhoneme(c === 'c' ? phono.consonants : phono.vowels, last);
        phonemes.push(next);
    }
    return phonemes;
}

function pickNextPhoneme(
    candidates: Phoneme[],
    last?: Phoneme
): Phoneme {
    const transitions = last ? ALTERNATION_WEIGHTS[last.type] : undefined;

    const weighted = candidates.map(p => ({
        ...p,
        weight: (transitions?.[p.type] ?? 1) * (p.weight ?? 1),
    }));

    return pickWeighted(weighted)!;
}

export function generateWord(phono: Phonology): PWord {
    const syllablesCount = 1 + Math.floor(Math.random() * 3);

    for (let attempt = 0; attempt < 10; attempt++) {
        const phonemes: Phoneme[] = [];
        let prevStructure: string | undefined = undefined;
        let lastPhoneme: Phoneme | undefined = undefined;

        for (let i = 0; i < syllablesCount; i++) {
            const allowedStructures = phono.allowedSyllableStructures.filter(s =>
                !prevStructure ||
                !phono.forbiddenClusters.some(([a, b]) => a === prevStructure && b === s)
            );
            const structure = pickRandom(allowedStructures.length > 0 ? allowedStructures : phono.allowedSyllableStructures)!;
            const pword = syllableToPhonemes(phono, structure, lastPhoneme);
            phonemes.push(...pword);
            prevStructure = structure;
            lastPhoneme = pword[pword.length - 1];
        }

        if (!phono.constraints || phono.constraints.every(c => c.check(phonemes)))
            return phonemes;
    }

    return generateWord({ ...phono, constraints: [] });
}

export function generateWords(count: number, phono: Phonology) {
    const result: PWord[] = [];
    for (let i = 0; i < count; i++) {
        result.push(generateWord(phono));
    }
    return result;
}

function isNatural(structure: string): boolean {
    return structure.includes('v') && !/vv/.test(structure) && !/ccc/.test(structure);
}

function allSyllableStructures(maxLength = 4): string[] {
    const result: string[] = [];
    for (let len = 1; len <= maxLength; len++) {
        for (let i = 0; i < Math.pow(2, len); i++) {
            const s = i.toString(2).padStart(len, '0').replace(/0/g, 'c').replace(/1/g, 'v');
            if (isNatural(s)) result.push(s);
        }
    }
    return result;
}

function generateSyllableStructures(count: number, profile?: LanguageProfile, maxLength = 4): string[] {
    const pool = profile?.typicalSyllableStructures || allSyllableStructures(maxLength);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}