export const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
export const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

export const SyllableSchemes = ['cv', 'vc', 'cvc', 'vcv'] as const;
export type SyllableScheme = typeof SyllableSchemes[number];

export const isConsonant = (letter: string) => consonants.includes(letter.toLowerCase());
export const isVowel = (letter: string) => vowels.includes(letter.toLowerCase());

export const randomConsonant = () => consonants[Math.floor(Math.random() * consonants.length)];
export const randomVowel = () => vowels[Math.floor(Math.random() * vowels.length)];

export const randomConsonantNot = (except: string) => {
    do {
        const cons = randomConsonant();
        if (cons !== except) {
            return cons;
        }
    }
    while (true);
}

export const randomVowelNot = (except: string) => {
    do {
        const vowel = randomVowel();
        if (vowel !== except) {
            return vowel;
        }
    }
    while (true);
}

export const isSamePhonemeCategory = (l: string, r: string) => {
    return vowels.includes(l.toLowerCase()) && vowels.includes(r.toLowerCase()) ||
        consonants.includes(l.toLowerCase()) && consonants.includes(r.toLowerCase());
}
