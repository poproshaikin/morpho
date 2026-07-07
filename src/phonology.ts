import {pickRandom, pickRandomCount, pickSubset, toBeOrNotToBe} from "./utils";
import {CONSONANTS, VOWELS, generateSyllableStructures} from "./vocabulary";

export interface Phonology {
    vowels: string[];
    consonants: string[];
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
    readonly phonemes: string[];

    constructor(type: PhonotacticRule, ...phonemes: string[]) {
        this.type = type;
        this.phonemes = phonemes;
    }

    check(sequence: string[]): boolean {
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

export function generatePhonology(): Phonology {
    const allowedSyllableStructures = generateSyllableStructures(1 + Math.floor(Math.random() * 5));
    const forbiddenClustersCount = pickRandomCount(allowedSyllableStructures);
    const forbiddenClusters: [string, string][] = [];
    for (let i = 0; i < forbiddenClustersCount; i++) {
        forbiddenClusters.push([
            pickRandom(allowedSyllableStructures),
            pickRandom(allowedSyllableStructures)
        ]);
    }

    const vowels = pickSubset(VOWELS, 2);
    const consonants = pickSubset(CONSONANTS, 4);

    return {
        vowels,
        consonants,
        allowedSyllableStructures,
        forbiddenClusters,
        constraints: generateConstraints(vowels, consonants),
    };
}

export function generateConstraints(vowels: string[], consonants: string[]): PhonotacticConstraint[] {
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



function syllableToPhonemes(phono: Phonology, structure: string): string[] {
    const phonemes: string[] = [];
    for (const c of structure) {
        switch (c) {
            case 'c': phonemes.push(pickRandom(phono.consonants)!); break;
            case 'v': phonemes.push(pickRandom(phono.vowels)!); break;
        }
    }
    return phonemes;
}

export function generateSyllable(phono: Phonology, structure?: string): string {
    const s = structure ?? pickRandom(phono.allowedSyllableStructures)!;
    for (let attempt = 0; attempt < 10; attempt++) {
        const phonemes = syllableToPhonemes(phono, s);
        if (phono.constraints.every(c => c.check(phonemes)))
            return phonemes.join('');
    }
    return syllableToPhonemes(phono, s).join('');
}

export function generateWord(phono: Phonology): string {
    const syllablesCount = 1 + Math.floor(Math.random() * 3);

    for (let attempt = 0; attempt < 10; attempt++) {
        const phonemes: string[] = [];
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
            return phonemes.join('');
    }

    return generateWord({ ...phono, constraints: [] });
}

export function generateWords(count: number, phono: Phonology) {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
        result.push(generateWord(phono));
    }
    return result;
}