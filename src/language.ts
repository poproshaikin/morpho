import {Lexicon, LexiconConfig, makeLexiconWithParams, generateLexiconConfig} from "./lexicon";
import {generateSentence, generateSyntaxConfig, Syntax} from "./syntax";
import {generateMorphology, Morphology} from "./morphology";
import {AlignmentPattern} from "./grammar";
import {generatePhonology, Phonology} from "./phonology";

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
}