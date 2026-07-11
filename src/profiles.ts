import {PhonemeProfile} from "./vocabulary";
import {Constituent, MarkingStrategy} from "./types";
import {pickRandom} from "./utils";
import {CategoryName} from "./grammar";
import {AlternationRule} from "./phonology";

export type LanguageProfile = {
    // morphologicalType: 'agglutinative' | 'fusional' | 'isolating'
    phonemes: PhonemeProfile;
    typicalAlignment?: 'NominativeAccusative' | 'ErgativeAbsolutive';
    typicalWordOrder?: Constituent[];
    typicalSyllableStructures?: string[];
    typicalStrategies?: Partial<Record<MarkingStrategy, number>>;
    typicalCategories?: CategoryName[];
    typicalAlternations?: { fromIpa: string, toIpa: string}[]
}

export function pickRandomProfile(): [ProfileName, LanguageProfile] {
    const name = pickRandom(Object.keys(LanguageProfiles))! as ProfileName;
    return [name, LanguageProfiles[name]];
}

export const LanguageProfiles = {
    Slavic: {
        typicalSyllableStructures: ['cv', 'cvv', 'vcv', 'cvc', 'v'],
        typicalWordOrder: ['Subject', 'Predicate', 'IndirectObject', 'DirectObject'],
        typicalAlignment: 'NominativeAccusative',
        typicalStrategies: {
            Preposition: 0.3,
            Suffix: 0.7
        },
        typicalCategories: ['Case', 'Tense'],
        typicalAlternations: [
            { fromIpa: 'k',  toIpa: 'tʃ' },  // k → č
            { fromIpa: 'g',  toIpa: 'ʒ'  },  // g → ž
            { fromIpa: 's',  toIpa: 'ʃ'  },  // s → š
            { fromIpa: 'z',  toIpa: 'ʒ'  },  // z → ž
            { fromIpa: 'n',  toIpa: 'ɲ'  },  // n → ń
        ],
        phonemes: {
            consonants: [
                { ipa: 'p',  glyph: 'p',  type: 'alveolar',    weight: 3 },
                { ipa: 'b',  glyph: 'b',  type: 'alveolar',    weight: 3 },
                { ipa: 't',  glyph: 't',  type: 'alveolar',    weight: 3 },
                { ipa: 'd',  glyph: 'd',  type: 'alveolar',    weight: 3 },
                { ipa: 'k',  glyph: 'k',  type: 'alveolar',    weight: 3 },
                { ipa: 'g',  glyph: 'g',  type: 'alveolar',    weight: 3 },
                { ipa: 'ts', glyph: 'c',  type: 'alveolar',    weight: 2 },
                { ipa: 'tʃ', glyph: 'č',  type: 'palatal',     weight: 2 },
                { ipa: 'dʒ', glyph: 'dž', type: 'palatal',     weight: 1 },
                { ipa: 'v',  glyph: 'v',  type: 'fricative',   weight: 3 },
                { ipa: 's',  glyph: 's',  type: 'fricative',   weight: 3 },
                { ipa: 'z',  glyph: 'z',  type: 'fricative',   weight: 3 },
                { ipa: 'ʃ',  glyph: 'š',  type: 'palatal',     weight: 2 },
                { ipa: 'ʒ',  glyph: 'ž',  type: 'palatal',     weight: 2 },
                { ipa: 'ɕ',  glyph: 'ś',  type: 'palatal',     weight: 1 },
                { ipa: 'x',  glyph: 'h',  type: 'fricative',   weight: 2 },
                { ipa: 'm',  glyph: 'm',  type: 'nasal',       weight: 3 },
                { ipa: 'n',  glyph: 'n',  type: 'nasal',       weight: 3 },
                { ipa: 'ɲ',  glyph: 'ń',  type: 'palatal',     weight: 1 },
                { ipa: 'l',  glyph: 'l',  type: 'approximant', weight: 3 },
                { ipa: 'ʎ',  glyph: 'lj', type: 'palatal',     weight: 1 },
                { ipa: 'r',  glyph: 'r',  type: 'approximant', weight: 3 },
                { ipa: 'j',  glyph: 'j',  type: 'palatal',     weight: 2 },
            ],
            vowels: [
                { ipa: 'a', glyph: 'a', type: 'approximant', weight: 3 },
                { ipa: 'e', glyph: 'e', type: 'approximant', weight: 3 },
                { ipa: 'i', glyph: 'i', type: 'approximant', weight: 3 },
                { ipa: 'o', glyph: 'o', type: 'approximant', weight: 3 },
                { ipa: 'u', glyph: 'u', type: 'approximant', weight: 2 },
                { ipa: 'ɨ', glyph: 'y', type: 'approximant', weight: 1 },
            ],
        },
    },
    Turkic: {
        typicalSyllableStructures: ['v', 'cv', 'cvc', 'vcc'],
        typicalWordOrder: ['Subject', 'DirectObject', 'IndirectObject', 'Predicate'],
        typicalAlignment: 'NominativeAccusative',
        typicalStrategies: {
            Suffix: 0.9,
            Postposition: 0.1
        },
        typicalCategories: ['Case', 'Tense'],
        typicalAlternations: [
            { fromIpa: 'k',  toIpa: 'tʃ' },  // k → č (before front vowels)
            { fromIpa: 'g',  toIpa: 'dʒ' },  // g → j
            { fromIpa: 'n',  toIpa: 'ŋ'  },  // n → ng (velar nasal assimilation)
        ],
        phonemes: {
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
        }},

    // Romance: {
    //     phonemes: {
    //         consonants: [
    //             { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
    //             { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
    //             { ipa: 't',  glyph: 't',  type: 'alveolar'    },
    //             { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
    //             { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
    //             { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
    //             { ipa: 'tʃ', glyph: 'ch', type: 'palatal'     },
    //             { ipa: 'dʒ', glyph: 'j',  type: 'palatal'     },
    //             { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
    //             { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
    //             { ipa: 's',  glyph: 's',  type: 'fricative'   },
    //             { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
    //             { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
    //             { ipa: 'ʒ',  glyph: 'zh', type: 'palatal'     },
    //             { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
    //             { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
    //             { ipa: 'ɲ',  glyph: 'ñ',  type: 'palatal'     },
    //             { ipa: 'l',  glyph: 'l',  type: 'approximant' },
    //             { ipa: 'ʎ',  glyph: 'll', type: 'palatal'     },
    //             { ipa: 'r',  glyph: 'r',  type: 'approximant' },
    //             { ipa: 'ʀ',  glyph: 'rh', type: 'uvular'      },
    //             { ipa: 'j',  glyph: 'y',  type: 'palatal'     },
    //             { ipa: 'w',  glyph: 'w',  type: 'approximant' },
    //         ],
    //         vowels: [
    //             { ipa: 'a', glyph: 'a', type: 'approximant' },
    //             { ipa: 'e', glyph: 'e', type: 'approximant' },
    //             { ipa: 'ɛ', glyph: 'è', type: 'approximant' },
    //             { ipa: 'i', glyph: 'i', type: 'approximant' },
    //             { ipa: 'o', glyph: 'o', type: 'approximant' },
    //             { ipa: 'ɔ', glyph: 'ò', type: 'approximant' },
    //             { ipa: 'u', glyph: 'u', type: 'approximant' },
    //             { ipa: 'y', glyph: 'ü', type: 'approximant' },
    //             { ipa: 'ø', glyph: 'œ', type: 'approximant' },
    //         ],
    //     }
    // },
    // Greek: {
    //     phonemes: {
    //         consonants: [
    //             { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
    //             { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
    //             { ipa: 't',  glyph: 't',  type: 'alveolar'    },
    //             { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
    //             { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
    //             { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
    //             { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
    //             { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
    //             { ipa: 'θ',  glyph: 'th', type: 'fricative'   },
    //             { ipa: 'ð',  glyph: 'dh', type: 'fricative'   },
    //             { ipa: 's',  glyph: 's',  type: 'fricative'   },
    //             { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
    //             { ipa: 'x',  glyph: 'x',  type: 'fricative'   },
    //             { ipa: 'ɣ',  glyph: 'gh', type: 'fricative'   },
    //             { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
    //             { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
    //             { ipa: 'ŋ',  glyph: 'ng', type: 'nasal'       },
    //             { ipa: 'l',  glyph: 'l',  type: 'approximant' },
    //             { ipa: 'r',  glyph: 'r',  type: 'approximant' },
    //         ],
    //         vowels: [
    //             { ipa: 'a', glyph: 'a', type: 'approximant' },
    //             { ipa: 'e', glyph: 'e', type: 'approximant' },
    //             { ipa: 'i', glyph: 'i', type: 'approximant' },
    //             { ipa: 'o', glyph: 'o', type: 'approximant' },
    //             { ipa: 'u', glyph: 'u', type: 'approximant' },
    //         ],
    //     }
    // },
    // Germanic: {
    //     phonemes: {
    //         consonants: [
    //             { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
    //             { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
    //             { ipa: 't',  glyph: 't',  type: 'alveolar'    },
    //             { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
    //             { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
    //             { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
    //             { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
    //             { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
    //             { ipa: 'θ',  glyph: 'þ',  type: 'fricative'   },
    //             { ipa: 'ð',  glyph: 'ð',  type: 'fricative'   },
    //             { ipa: 's',  glyph: 's',  type: 'fricative'   },
    //             { ipa: 'z',  glyph: 'z',  type: 'fricative'   },
    //             { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
    //             { ipa: 'x',  glyph: 'ch', type: 'fricative'   },
    //             { ipa: 'h',  glyph: 'h',  type: 'fricative'   },
    //             { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
    //             { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
    //             { ipa: 'ŋ',  glyph: 'ng', type: 'nasal'       },
    //             { ipa: 'l',  glyph: 'l',  type: 'approximant' },
    //             { ipa: 'r',  glyph: 'r',  type: 'approximant' },
    //             { ipa: 'j',  glyph: 'j',  type: 'palatal'     },
    //             { ipa: 'w',  glyph: 'w',  type: 'approximant' },
    //         ],
    //         vowels: [
    //             { ipa: 'a', glyph: 'a', type: 'approximant' },
    //             { ipa: 'e', glyph: 'e', type: 'approximant' },
    //             { ipa: 'i', glyph: 'i', type: 'approximant' },
    //             { ipa: 'o', glyph: 'o', type: 'approximant' },
    //             { ipa: 'u', glyph: 'u', type: 'approximant' },
    //             { ipa: 'y', glyph: 'ü', type: 'approximant' },
    //             { ipa: 'ø', glyph: 'ö', type: 'approximant' },
    //             { ipa: 'æ', glyph: 'ä', type: 'approximant' },
    //         ],
    //     }
    // },
    // Celtic: {
    //     phonemes: {
    //         consonants: [
    //             { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
    //             { ipa: 'b',  glyph: 'b',  type: 'alveolar'    },
    //             { ipa: 't',  glyph: 't',  type: 'alveolar'    },
    //             { ipa: 'd',  glyph: 'd',  type: 'alveolar'    },
    //             { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
    //             { ipa: 'g',  glyph: 'g',  type: 'alveolar'    },
    //             { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
    //             { ipa: 'v',  glyph: 'v',  type: 'fricative'   },
    //             { ipa: 's',  glyph: 's',  type: 'fricative'   },
    //             { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
    //             { ipa: 'x',  glyph: 'ch', type: 'fricative'   },
    //             { ipa: 'ɣ',  glyph: 'gh', type: 'fricative'   },
    //             { ipa: 'h',  glyph: 'h',  type: 'fricative'   },
    //             { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
    //             { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
    //             { ipa: 'ŋ',  glyph: 'ng', type: 'nasal'       },
    //             { ipa: 'l',  glyph: 'l',  type: 'approximant' },
    //             { ipa: 'ɬ',  glyph: 'll', type: 'fricative'   },
    //             { ipa: 'r',  glyph: 'r',  type: 'approximant' },
    //             { ipa: 'j',  glyph: 'y',  type: 'palatal'     },
    //             { ipa: 'w',  glyph: 'w',  type: 'approximant' },
    //         ],
    //         vowels: [
    //             { ipa: 'a', glyph: 'a', type: 'approximant' },
    //             { ipa: 'e', glyph: 'e', type: 'approximant' },
    //             { ipa: 'i', glyph: 'i', type: 'approximant' },
    //             { ipa: 'o', glyph: 'o', type: 'approximant' },
    //             { ipa: 'u', glyph: 'u', type: 'approximant' },
    //             { ipa: 'ə', glyph: 'e', type: 'approximant' },
    //         ],
    //     }
    // },
    //
    // Sylvan: {
    //     phonemes: {
    //         consonants: [
    //             { ipa: 'p',  glyph: 'p',  type: 'alveolar'    },
    //             { ipa: 't',  glyph: 't',  type: 'alveolar'    },
    //             { ipa: 'k',  glyph: 'k',  type: 'alveolar'    },
    //             { ipa: 'f',  glyph: 'f',  type: 'fricative'   },
    //             { ipa: 's',  glyph: 's',  type: 'fricative'   },
    //             { ipa: 'ʃ',  glyph: 'sh', type: 'palatal'     },
    //             { ipa: 'θ',  glyph: 'th', type: 'fricative'   },
    //             { ipa: 'ɬ',  glyph: 'lh', type: 'fricative'   },
    //             { ipa: 'm',  glyph: 'm',  type: 'nasal'       },
    //             { ipa: 'n',  glyph: 'n',  type: 'nasal'       },
    //             { ipa: 'ɲ',  glyph: 'ñ',  type: 'palatal'     },
    //             { ipa: 'l',  glyph: 'l',  type: 'approximant' },
    //             { ipa: 'ʎ',  glyph: 'ly', type: 'palatal'     },
    //             { ipa: 'r',  glyph: 'r',  type: 'approximant' },
    //             { ipa: 'j',  glyph: 'y',  type: 'palatal'     },
    //             { ipa: 'w',  glyph: 'w',  type: 'approximant' },
    //         ],
    //         vowels: [
    //             { ipa: 'a', glyph: 'a', type: 'approximant' },
    //             { ipa: 'e', glyph: 'e', type: 'approximant' },
    //             { ipa: 'ɛ', glyph: 'ë', type: 'approximant' },
    //             { ipa: 'i', glyph: 'i', type: 'approximant' },
    //             { ipa: 'o', glyph: 'o', type: 'approximant' },
    //             { ipa: 'u', glyph: 'u', type: 'approximant' },
    //             { ipa: 'y', glyph: 'ü', type: 'approximant' },
    //             { ipa: 'ø', glyph: 'ö', type: 'approximant' },
    //             { ipa: 'æ', glyph: 'æ', type: 'approximant' },
    //         ],
    //     }
    // },
} satisfies Record<string, LanguageProfile>

export type ProfileName = keyof typeof LanguageProfiles;