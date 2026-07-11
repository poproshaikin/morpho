export type PhonemeType = 'alveolar' | 'palatal' | 'uvular' | 'pharyngeal' | 'retroflex' | 'fricative' | 'nasal' | 'approximant';

export type Phoneme = {
    type: PhonemeType;
    ipa: string;
    glyph: string;
    weight?: number;
}

export type PWord = Phoneme[];

export function pWordToStr(word: PWord): string {
    return word.map(p => p.glyph).join('');
}

export type PhonemeProfile = {
    consonants: Phoneme[];
    vowels: Phoneme[];
}

export const TRANSITION_MATRIX: Partial<Record<PhonemeType, Partial<Record<PhonemeType, number>>>> = {
    // after a stop (p,t,k,b,d,g) — vowel or sonorant flows naturally
    alveolar:    { approximant: 4, nasal: 2, fricative: 2, palatal: 1 },
    // after a fricative (s,z,f,v,h) — stop or vowel feels natural
    fricative:   { approximant: 4, alveolar: 3, nasal: 2, palatal: 1 },
    // after a nasal (n,m) — vowel or stop
    nasal:       { approximant: 4, alveolar: 3, fricative: 1 },
    // after a palatal (š,ž,č,j) — vowel strongly preferred
    palatal:     { approximant: 4, nasal: 1, alveolar: 1 },
    // after a sonorant or vowel (l,r,a,e,i) — anything goes
    approximant: { alveolar: 3, fricative: 3, nasal: 3, palatal: 2 },
}

export const ALTERNATION_WEIGHTS: Partial<Record<PhonemeType, Partial<Record<PhonemeType, number>>>> = {
    alveolar:    { palatal: 4, fricative: 2 },
    fricative:   { palatal: 4, alveolar: 2 },
    approximant: { palatal: 2 },
    nasal:       { palatal: 2 }
}