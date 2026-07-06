import {pickRandom, pickRandomCount, pickSubset} from "./utils";
import {CONSONANTS, VOWELS, generateSyllableStructures} from "./vocabulary";

export interface Phonology {
    vowels: string[];
    consonants: string[];
    allowedSyllableStructures: string[];
    forbiddenClusters: [string, string][];
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

    return {
        vowels: pickSubset(VOWELS, 2),
        consonants: pickSubset(CONSONANTS, 4),
        allowedSyllableStructures,
        forbiddenClusters,
    };
}

export function generateSyllable(phono: Phonology, structure?: string): string {
    const s = structure ?? pickRandom(phono.allowedSyllableStructures)!;
    let result = "";
    for (const c of s) {
        switch (c) {
            case 'c': result += pickRandom(phono.consonants); break;
            case 'v': result += pickRandom(phono.vowels); break;
        }
    }
    return result;
}

export function generateWord(phono: Phonology): string {
    const syllablesCount = 1 + Math.floor(Math.random() * 3);
    const syllables: string[] = [];
    let prevStructure: string | null = null;

    for (let i = 0; i < syllablesCount; i++) {
        const allowed = phono.allowedSyllableStructures.filter(s =>
            prevStructure === null ||
            !phono.forbiddenClusters.some(([a, b]) => a === prevStructure && b === s)
        );
        const structure = pickRandom(allowed.length > 0 ? allowed : phono.allowedSyllableStructures)!;
        syllables.push(generateSyllable(phono, structure));
        prevStructure = structure;
    }

    return syllables.join('');
}

export function generateWords(count: number, phono: Phonology) {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
        result.push(generateWord(phono));
    }
    return result;
}