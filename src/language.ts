import {Lexicon, LexiconConfig, makeLexiconWithParams, generateLexiconConfig} from "./lexicon";
import {generateSentence, generateSyntaxConfig, Syntax} from "./syntax";
import {generateMorphology, Morphology, inflectWord} from "./morphology";
import {AlignmentPattern, Categories, CategoryName} from "./grammar";
import {generatePhonology, Phonology, PhonotacticRule} from "./phonology";
import {PWord} from "./vocabulary";

export interface LanguageParams {
    rootsPerCategory: LexiconConfig['rootsPerCategory'],
    order: Syntax['order'],
    alignment: AlignmentPattern,
    categories: Morphology['categories'],
}

export class Language {
    constructor(
        public phonology: Phonology,
        public lexicon: Lexicon,
        public syntax: Syntax,
        public morphology: Morphology) {
    }

    static generate() {
        const phonology = generatePhonology();
        const lexiconConfig = generateLexiconConfig();
        const syntaxConfig = generateSyntaxConfig();
        const lexicon = makeLexiconWithParams({ rootsPerCategory: lexiconConfig.rootsPerCategory }, phonology);
        const syntax: Syntax = { order: syntaxConfig.order };
        const morphology = generateMorphology(phonology);

        return new Language(phonology, lexicon, syntax, morphology);
    }

    generateSentence() {
        return generateSentence(this.lexicon, this.syntax, this.morphology);
    }

    print() {
        const pword = (w: PWord) => w.map(p => p.glyph).join('');

        console.log('=== Phonology ===');
        console.log(`  Profile:     ${this.phonology.profile}`);
        console.log(`  Consonants:  ${this.phonology.consonants.map(p => p.glyph).join(' ')}`);
        console.log(`  Vowels:      ${this.phonology.vowels.map(p => p.glyph).join(' ')}`);
        console.log(`  Syllables:   ${this.phonology.allowedSyllableStructures.join(', ')}`);
        if (this.phonology.forbiddenClusters.length > 0)
            console.log(`  Forbidden:   ${this.phonology.forbiddenClusters.map(([a, b]) => `${a}→${b}`).join(', ')}`);
        if (this.phonology.constraints.length > 0)
            console.log(`  Constraints: ${this.phonology.constraints.map(c => PhonotacticRule[c.type]).join(', ')}`);

        console.log();
        console.log('=== Lexicon ===');
        for (const [pos, words] of Object.entries(this.lexicon.rootsByCategory)) {
            const rendered = (words as unknown as PWord[]).map(pword).join(', ');
            console.log(`  ${pos} (${words.length}): ${rendered}`);
        }

        console.log();
        console.log('=== Syntax ===');
        console.log(`  Order: ${this.syntax.order.join(' → ')}`);

        console.log();
        console.log('=== Morphology ===');
        const alignment = Object.entries(this.morphology.alignment.constituentToValue)
            .map(([k, v]) => `${k}=${v}`).join(', ');
        console.log(`  Alignment: ${alignment}`);

        for (const [catName, values] of Object.entries(this.morphology.categories)) {
            if (!values) continue;

            const category = Categories[catName as CategoryName];
            const samplePos = category?.appliesTo[0];
            const sampleWord = samplePos
                ? (this.lexicon.rootsByCategory[samplePos] as unknown as PWord[])[0]
                : undefined;

            const strategies = Object.values(values)[0]?.strategies.join('+') ?? '';
            console.log(`\n  ${catName}  [${strategies}]`);

            for (const [valueName, inflection] of Object.entries(values)) {
                if (!inflection || !sampleWord) continue;
                const form = inflectWord(sampleWord, [{ category: catName as CategoryName, value: valueName }], this.morphology);
                const markers = inflection.strategies
                    .map(s => inflection.markers[s] ? pword(inflection.markers[s]!) : '∅')
                    .join('+');
                console.log(`    ${valueName.padEnd(14)} ${pword(sampleWord)} → ${form.padEnd(16)} (${markers})`);
            }
        }
    }
}