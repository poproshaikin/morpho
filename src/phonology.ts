import {pickRandom, pickRandomCount, pickSubset, toBeOrNotToBe} from "./utils";
import {Phoneme, PWord} from "./vocabulary";
import {LanguageProfile} from "./profiles";

export interface Phonology {
    vowels: Phoneme[];
    consonants: Phoneme[];
    profile: LanguageProfile;
    allowedSyllableStructures: string[];
    forbiddenClusters: [string, string][];
    constraints: PhonotacticConstraint[];
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

    const vowels = pickSubset(profile.phonemes.vowels, 2);
    const consonants = pickSubset(profile.phonemes.consonants, 4);

    return {
        vowels,
        consonants,
        profile,
        allowedSyllableStructures,
        forbiddenClusters,
        constraints: generateConstraints(vowels, consonants),
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

    if (Math.random() < 0.25)
        constraints.push(new PhonotacticConstraint(PhonotacticRule.NotSame, pickRandom(all)!));

    return constraints;
}

export function syllableToPhonemes(phono: Phonology, structure?: string): Phoneme[] {
    const phonemes: Phoneme[] = [];
    const effectiveStructure = structure || pickRandom(phono.allowedSyllableStructures)!;
    for (const c of effectiveStructure) {
        switch (c) {
            case 'c': phonemes.push(pickRandom(phono.consonants)!); break;
            case 'v': phonemes.push(pickRandom(phono.vowels)!); break;
        }
    }
    return phonemes;
}

export function generateWord(phono: Phonology): PWord {
    const syllablesCount = 1 + Math.floor(Math.random() * 3);

    for (let attempt = 0; attempt < 10; attempt++) {
        const phonemes: Phoneme[] = [];
        let prevStructure: string | null = null;

        for (let i = 0; i < syllablesCount; i++) {
            const allowedStructures = phono.allowedSyllableStructures.filter(s =>
                prevStructure === null ||
                !phono.forbiddenClusters.some(([a, b]) => a === prevStructure && b === s)
            );
            const structure = pickRandom(allowedStructures.length > 0 ? allowedStructures : phono.allowedSyllableStructures)!;
            phonemes.push(...syllableToPhonemes(phono, structure));
            prevStructure = structure;
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