import {Language} from "./language";
import {PWord} from "./vocabulary";
import {Categories, CategoryName} from "./grammar";

function hasVisibleAlternation(language: Language): boolean {
    const { phonology, lexicon, morphology } = language;
    if (phonology.alternations.length === 0) return false;

    for (const [catName, values] of Object.entries(morphology.categories)) {
        if (!values) continue;
        const category = Categories[catName as CategoryName];
        if (!category) continue;

        // only check sample word — the one print() uses for the morphology table
        const samplePos = category.appliesTo[0];
        const sampleWord = (lexicon.rootsByCategory[samplePos] as unknown as PWord[])[0];
        if (!sampleWord) continue;

        for (const inflection of Object.values(values)) {
            if (!inflection) continue;
            for (const strategy of inflection.strategies) {
                if (strategy !== 'Suffix' && strategy !== 'Prefix') continue;
                const marker = inflection.markers[strategy];
                if (!marker) continue;

                const [first, second] = strategy === 'Suffix' ? [sampleWord, marker] : [marker, sampleWord];
                const last = first[first.length - 1];
                const next = second[0];
                if (!last || !next) continue;

                if (phonology.alternations.some(
                    a => a.from.ipa === last.ipa && (a.triggers.length === 0 || a.triggers.some(t => t.phoneme.ipa === next.ipa))
                )) return true;
            }
        }
    }
    return false;
}

let language: Language;
let attempts = 0;
do {
    language = Language.generate('Slavic');
    attempts++;
} while (!hasVisibleAlternation(language));

console.log(`(found after ${attempts} attempt${attempts !== 1 ? 's' : ''})\n`);
language.print();