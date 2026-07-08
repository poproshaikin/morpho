import {pickRandom, pickRandomCount, pickSubset, toBeOrNotToBe} from "./utils";
import {PWord} from "./vocabulary";

export type PhonemeType = 'alveolar' | 'palatal' | 'uvular' | 'pharyngeal' | 'retroflex' | 'fricative' | 'nasal' | 'approximant';

export type Phoneme = {
    type: PhonemeType;
    ipa: string;
    glyph: string;
}

export type PhonemeProfile = {
    consonants: Phoneme[]
    vowels: Phoneme[];
}

export const PhonemeProfiles: Record<string, PhonemeProfile> = {
    Turkic: {
        consonants: [
            { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
            { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
            { ipa: 't',  glyph: 't',  type: 'alveolar'    },
            { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
            { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
            { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
            { ipa: 'tʃ', glyph: 'ch', type: 'palatal'     },
            { ipa: 'dʒ', glyph: 'j',  type: 'palatal'     },
            { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
            { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
            { ipa: 's',  glyph: 's',  type: 'fricative'   },
            { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
            { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
            { ipa: 'ʒ',  glyph: 'zh', type: 'palatal'     },
            { ipa: 'h',  glyph: 'h',  type: 'fricative'   },
            { ipa: 'ɣ',  glyph: 'gh', type: 'fricative'   },
            { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
            { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
            { ipa: 'ŋ',  glyph: 'ng', type: 'nasal'       },
            { ipa: 'l',  glyph: 'l',  type: 'approximant' },
            { ipa: 'r',  glyph: 'r',  type: 'approximant' },
            { ipa: 'j',  glyph: 'y',  type: 'palatal'     },
            { ipa: 'q',  glyph: 'q',  type: 'uvular'      },
        ],
        vowels: [
            { ipa: 'a', glyph: 'a', type: 'approximant' },
            { ipa: 'e', glyph: 'e', type: 'approximant' },
            { ipa: 'i', glyph: 'i', type: 'approximant' },
            { ipa: 'ɯ', glyph: 'ı', type: 'approximant' },
            { ipa: 'o', glyph: 'o', type: 'approximant' },
            { ipa: 'u', glyph: 'u', type: 'approximant' },
            { ipa: 'ø', glyph: 'ö', type: 'approximant' },
            { ipa: 'y', glyph: 'ü', type: 'approximant' },
        ],
    },
    Romance: {
        consonants: [
            { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
            { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
            { ipa: 't',  glyph: 't',  type: 'alveolar'    },
            { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
            { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
            { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
            { ipa: 'tʃ', glyph: 'ch', type: 'palatal'     },
            { ipa: 'dʒ', glyph: 'j',  type: 'palatal'     },
            { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
            { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
            { ipa: 's',  glyph: 's',  type: 'fricative'   },
            { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
            { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
            { ipa: 'ʒ',  glyph: 'zh', type: 'palatal'     },
            { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
            { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
            { ipa: 'ɲ',  glyph: 'ñ',  type: 'palatal'     },
            { ipa: 'l',  glyph: 'l',  type: 'approximant' },
            { ipa: 'ʎ',  glyph: 'll', type: 'palatal'     },
            { ipa: 'r',  glyph: 'r',  type: 'approximant' },
            { ipa: 'ʀ',  glyph: 'rh', type: 'uvular'      },
            { ipa: 'j',  glyph: 'y',  type: 'palatal'     },
            { ipa: 'w',  glyph: 'w',  type: 'approximant' },
        ],
        vowels: [
            { ipa: 'a', glyph: 'a', type: 'approximant' },
            { ipa: 'e', glyph: 'e', type: 'approximant' },
            { ipa: 'ɛ', glyph: 'è', type: 'approximant' },
            { ipa: 'i', glyph: 'i', type: 'approximant' },
            { ipa: 'o', glyph: 'o', type: 'approximant' },
            { ipa: 'ɔ', glyph: 'ò', type: 'approximant' },
            { ipa: 'u', glyph: 'u', type: 'approximant' },
            { ipa: 'y', glyph: 'ü', type: 'approximant' },
            { ipa: 'ø', glyph: 'œ', type: 'approximant' },
        ],
    },

    Greek: {
        consonants: [
            { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
            { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
            { ipa: 't',  glyph: 't',  type: 'alveolar'    },
            { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
            { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
            { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
            { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
            { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
            { ipa: 'θ',  glyph: 'th', type: 'fricative'   },
            { ipa: 'ð',  glyph: 'dh', type: 'fricative'   },
            { ipa: 's',  glyph: 's',  type: 'fricative'   },
            { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
            { ipa: 'x',  glyph: 'x',  type: 'fricative'   },
            { ipa: 'ɣ',  glyph: 'gh', type: 'fricative'   },
            { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
            { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
            { ipa: 'ŋ',  glyph: 'ng', type: 'nasal'       },
            { ipa: 'l',  glyph: 'l',  type: 'approximant' },
            { ipa: 'r',  glyph: 'r',  type: 'approximant' },
        ],
        vowels: [
            { ipa: 'a', glyph: 'a', type: 'approximant' },
            { ipa: 'e', glyph: 'e', type: 'approximant' },
            { ipa: 'i', glyph: 'i', type: 'approximant' },
            { ipa: 'o', glyph: 'o', type: 'approximant' },
            { ipa: 'u', glyph: 'u', type: 'approximant' },
        ],
    },

    Slavic: {
        consonants: [
            { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
            { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
            { ipa: 't',  glyph: 't',  type: 'alveolar'    },
            { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
            { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
            { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
            { ipa: 'ts', glyph: 'c',  type: 'alveolar'    },
            { ipa: 'tʃ', glyph: 'č',  type: 'palatal'     },
            { ipa: 'dʒ', glyph: 'dž', type: 'palatal'     },
            { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
            { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
            { ipa: 's',  glyph: 's',  type: 'fricative'   },
            { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
            { ipa: 'ʃ',  glyph: 'š',  type: 'palatal'     },
            { ipa: 'ʒ',  glyph: 'ž',  type: 'palatal'     },
            { ipa: 'ɕ',  glyph: 'ś',  type: 'palatal'     },
            { ipa: 'x',  glyph: 'h',  type: 'fricative'   },
            { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
            { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
            { ipa: 'ɲ',  glyph: 'ń',  type: 'palatal'     },
            { ipa: 'l',  glyph: 'l',  type: 'approximant' },
            { ipa: 'ʎ',  glyph: 'lj', type: 'palatal'     },
            { ipa: 'r',  glyph: 'r',  type: 'approximant' },
            { ipa: 'j',  glyph: 'j',  type: 'palatal'     },
        ],
        vowels: [
            { ipa: 'a', glyph: 'a', type: 'approximant' },
            { ipa: 'e', glyph: 'e', type: 'approximant' },
            { ipa: 'i', glyph: 'i', type: 'approximant' },
            { ipa: 'o', glyph: 'o', type: 'approximant' },
            { ipa: 'u', glyph: 'u', type: 'approximant' },
            { ipa: 'ɨ', glyph: 'y', type: 'approximant' },
        ],
    },

    Germanic: {
        consonants: [
            { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
            { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
            { ipa: 't',  glyph: 't',  type: 'alveolar'    },
            { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
            { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
            { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
            { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
            { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
            { ipa: 'θ',  glyph: 'þ',  type: 'fricative'   },
            { ipa: 'ð',  glyph: 'ð',  type: 'fricative'   },
            { ipa: 's',  glyph: 's',  type: 'fricative'   },
            { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
            { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
            { ipa: 'x',  glyph: 'ch', type: 'fricative'   },
            { ipa: 'h',  glyph: 'h',  type: 'fricative'   },
            { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
            { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
            { ipa: 'ŋ',  glyph: 'ng', type: 'nasal'       },
            { ipa: 'l',  glyph: 'l',  type: 'approximant' },
            { ipa: 'r',  glyph: 'r',  type: 'approximant' },
            { ipa: 'j',  glyph: 'j',  type: 'palatal'     },
            { ipa: 'w',  glyph: 'w',  type: 'approximant' },
        ],
        vowels: [
            { ipa: 'a', glyph: 'a', type: 'approximant' },
            { ipa: 'e', glyph: 'e', type: 'approximant' },
            { ipa: 'i', glyph: 'i', type: 'approximant' },
            { ipa: 'o', glyph: 'o', type: 'approximant' },
            { ipa: 'u', glyph: 'u', type: 'approximant' },
            { ipa: 'y', glyph: 'ü', type: 'approximant' },
            { ipa: 'ø', glyph: 'ö', type: 'approximant' },
            { ipa: 'æ', glyph: 'ä', type: 'approximant' },
        ],
    },

    Celtic: {
        consonants: [
            { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
            { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
            { ipa: 't',  glyph: 't',  type: 'alveolar'    },
            { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
            { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
            { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
            { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
            { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
            { ipa: 's',  glyph: 's',  type: 'fricative'   },
            { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
            { ipa: 'x',  glyph: 'ch', type: 'fricative'   },
            { ipa: 'ɣ',  glyph: 'gh', type: 'fricative'   },
            { ipa: 'h',  glyph: 'h',  type: 'fricative'   },
            { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
            { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
            { ipa: 'ŋ',  glyph: 'ng', type: 'nasal'       },
            { ipa: 'l',  glyph: 'l',  type: 'approximant' },
            { ipa: 'ɬ',  glyph: 'll', type: 'fricative'   },
            { ipa: 'r',  glyph: 'r',  type: 'approximant' },
            { ipa: 'j',  glyph: 'y',  type: 'palatal'     },
            { ipa: 'w',  glyph: 'w',  type: 'approximant' },
        ],
        vowels: [
            { ipa: 'a', glyph: 'a', type: 'approximant' },
            { ipa: 'e', glyph: 'e', type: 'approximant' },
            { ipa: 'i', glyph: 'i', type: 'approximant' },
            { ipa: 'o', glyph: 'o', type: 'approximant' },
            { ipa: 'u', glyph: 'u', type: 'approximant' },
            { ipa: 'ə', glyph: 'e', type: 'approximant' },
        ],
    },

    // Invented profile: fluid, palatal-heavy, no stops except p/t/k, many front vowels
    Sylvan: {
        consonants: [
            { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
            { ipa: 't',  glyph: 't',  type: 'alveolar'    },
            { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
            { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
            { ipa: 's',  glyph: 's',  type: 'fricative'   },
            { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
            { ipa: 'θ',  glyph: 'th', type: 'fricative'   },
            { ipa: 'ɬ',  glyph: 'lh', type: 'fricative'   },
            { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
            { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
            { ipa: 'ɲ',  glyph: 'ñ',  type: 'palatal'     },
            { ipa: 'l',  glyph: 'l',  type: 'approximant' },
            { ipa: 'ʎ',  glyph: 'ly', type: 'palatal'     },
            { ipa: 'r',  glyph: 'r',  type: 'approximant' },
            { ipa: 'j',  glyph: 'y',  type: 'palatal'     },
            { ipa: 'w',  glyph: 'w',  type: 'approximant' },
        ],
        vowels: [
            { ipa: 'a', glyph: 'a', type: 'approximant' },
            { ipa: 'e', glyph: 'e', type: 'approximant' },
            { ipa: 'ɛ', glyph: 'ë', type: 'approximant' },
            { ipa: 'i', glyph: 'i', type: 'approximant' },
            { ipa: 'o', glyph: 'o', type: 'approximant' },
            { ipa: 'u', glyph: 'u', type: 'approximant' },
            { ipa: 'y', glyph: 'ü', type: 'approximant' },
            { ipa: 'ø', glyph: 'ö', type: 'approximant' },
            { ipa: 'æ', glyph: 'æ', type: 'approximant' },
        ],
    },
}

export interface Phonology {
    vowels: Phoneme[];
    consonants: Phoneme[];
    profile: string;
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

export function generatePhonology(): Phonology {
    const allowedSyllableStructures = generateSyllableStructures(1 + Math.floor(Math.random() * 5));
    const profile = pickRandomProfile();
    const forbiddenClustersCount = pickRandomCount(allowedSyllableStructures);
    const forbiddenClusters: [string, string][] = [];
    for (let i = 0; i < forbiddenClustersCount; i++) {
        forbiddenClusters.push([
            pickRandom(allowedSyllableStructures),
            pickRandom(allowedSyllableStructures)
        ]);
    }

    const vowels = pickSubset(PhonemeProfiles[profile].vowels, 2);
    const consonants = pickSubset(PhonemeProfiles[profile].consonants, 4);

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

function pickRandomProfile() {
    return pickRandom(Object.keys(PhonemeProfiles));
}

function syllableToPhonemes(phono: Phonology, structure: string): Phoneme[] {
    const phonemes: Phoneme[] = [];
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

function generateSyllableStructures(count: number, maxLength = 4): string[] {
    const pool = allSyllableStructures(maxLength);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}