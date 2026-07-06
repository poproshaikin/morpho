export const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
export const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];

function allSyllableStructures(maxLength = 4): string[] {
    const result: string[] = [];
    for (let len = 1; len <= maxLength; len++) {
        for (let i = 0; i < Math.pow(2, len); i++) {
            result.push(
                i.toString(2).padStart(len, '0').replace(/0/g, 'c').replace(/1/g, 'v')
            );
        }
    }
    return result;
}

export function generateSyllableStructures(count: number, maxLength = 4): string[] {
    const pool = allSyllableStructures(maxLength);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}

// export const isConsonant = (letter: string) => CONSONANTS.includes(letter.toLowerCase());
// export const isVowel = (letter: string) => VOWELS.includes(letter.toLowerCase());
//
// export const randomConsonant = () => CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
// export const randomVowel = () => VOWELS[Math.floor(Math.random() * VOWELS.length)];
//
// export const randomVowels = (count: number) => {
//     const vowels = [];
//     for (let i = 0; i < count; i++) {
//         vowels.push(randomVowel());
//     }
//     return vowels;
// }
//
// export const randomConsonantNot = (except: string) => {
//     do {
//         const cons = randomConsonant();
//         if (cons !== except) {
//             return cons;
//         }
//     }
//     while (true);
// }
//
// export const randomVowelNot = (except: string) => {
//     do {
//         const vowel = randomVowel();
//         if (vowel !== except) {
//             return vowel;
//         }
//     }
//     while (true);
// }
//
// export const isSamePhonemeCategory = (l: string, r: string) => {
//     return VOWELS.includes(l.toLowerCase()) && VOWELS.includes(r.toLowerCase()) ||
//         CONSONANTS.includes(l.toLowerCase()) && CONSONANTS.includes(r.toLowerCase());
// }
