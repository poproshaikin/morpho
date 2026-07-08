export type PhonemeType = 'alveolar' | 'palatal' | 'uvular' | 'pharyngeal' | 'retroflex' | 'fricative' | 'nasal' | 'approximant';

export type Phoneme = {
    type: PhonemeType;
    ipa: string;
    glyph: string;
}

export type PWord = Phoneme[];

export function pWordToStr(word: PWord): string {
    return word.map(p => p.glyph).join('');
}

export type PhonemeProfile = {
    consonants: Phoneme[];
    vowels: Phoneme[];
}