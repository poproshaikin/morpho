import {Lexicon, LexiconConfig, makeLexiconWithParams, generateLexiconConfig} from "./lexicon";
import {generateSentence, generateSyntaxConfig, Syntax} from "./syntax";
import {generateMorphology, Morphology} from "./morphology";
import {AlignmentPattern} from "./grammar";

export interface LanguageParams {
    rootsPerCategory: LexiconConfig['rootsPerCategory'],
    order: Syntax['order'],
    alignment: AlignmentPattern,
    categories: Morphology['categories'],
}

export class Language {
    constructor(
        public lexicon: Lexicon,
        public syntax: Syntax,
        public morphology: Morphology) {
    }

    static makeWithParams(params: LanguageParams) {
        const lexicon = makeLexiconWithParams({ rootsPerCategory: params.rootsPerCategory });
        const syntax: Syntax = { order: params.order };
        const morphology = generateMorphology();

        return new Language(lexicon, syntax, morphology);
    }

    static generate() {
        const lexiconConfig = generateLexiconConfig();
        const syntaxConfig = generateSyntaxConfig();
        const morphology = generateMorphology();

        return Language.makeWithParams({
            rootsPerCategory: lexiconConfig.rootsPerCategory,
            order: syntaxConfig.order,
            categories: morphology.categories,
            alignment: morphology.alignment
        });
    }

    generateSentence() {
        return generateSentence(this.lexicon, this.syntax, this.morphology);
    }
}