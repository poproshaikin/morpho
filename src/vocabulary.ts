export const CONSONANTS = ['b', 'c', 'd', 'ð', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
export const VOWELS = ['a', 'ä', 'ə', 'æ', 'e', 'ë', 'i', 'o', 'ø', 'u', 'ö','y'];

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

export function generateSyllableStructures(count: number, maxLength = 4): string[] {
    const pool = allSyllableStructures(maxLength);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}
