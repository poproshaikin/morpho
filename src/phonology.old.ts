// import {
//     isConsonant,
//     isSamePhonemeCategory,
//     randomConsonant, randomConsonantNot,
//     randomVowel, randomVowelNot,
//     SyllableScheme,
//     SyllableSchemes
// } from "./vocabulary";
//
// export function constructSyllable(scheme: SyllableScheme) {
//     return scheme === 'cv' ? randomConsonant() + randomVowel() :
//         scheme === 'vc' ? randomVowel() + randomConsonant() :
//             scheme === 'cvc' ? randomConsonant() + randomVowel() + randomConsonant() :
//                 scheme === 'vcv' ? randomVowel() + randomConsonant() + randomVowel() : 'hujnia';
// }
//
// export function constructWord(syllableCount: number) {
//     let result = '';
//
//     for (let i = 0; i < syllableCount; i++) {
//         const randomScheme = SyllableSchemes![Math.floor(Math.random() * SyllableSchemes!.length)] as SyllableScheme;
//         let syllable = constructSyllable(randomScheme);
//         const lastLetter = result[result.length - 1] || false;
//         const firstLetter = syllable[0];
//         if (lastLetter && isSamePhonemeCategory(lastLetter, firstLetter)) {
//             const lastWasConsonant = isConsonant(lastLetter);
//             if (lastWasConsonant) {
//                 syllable = randomConsonantNot(lastLetter) + syllable.slice(1);
//             }
//             else {
//                 syllable = randomVowelNot(lastLetter) + syllable.slice(1);
//             }
//         }
//         result += syllable;
//     }
//
//     return result;
// }
//
// export function generateWords(wordCount: number) {
//     const words: string[] = [];
//
//     for (let i = 0; i < wordCount; i++) {
//         words.push(constructWord(Math.floor(Math.random() * 3) + 1));
//     }
//
//     return words;
// }
