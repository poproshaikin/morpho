import {Lexicon, LexiconConfig, makeLexiconWithParams, generateLexiconConfig} from "./lexicon";
import {analyzeSentence, generateSentence, generateSyntaxConfig, Syntax} from "./syntax";
import {generateMorphology, Morphology} from "./morphology";

export interface LanguageParams {
    rootsPerCategory: LexiconConfig['rootsPerCategory'],
    order: Syntax['order'],
    cases: Morphology['cases'],
    caseMarkers: Morphology['caseMarkers'],
    caseMarkingByCase: Morphology['caseMarkingByCase'],
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
            cases: morphology.cases,
            caseMarkers: morphology.caseMarkers,
            caseMarkingByCase: morphology.caseMarkingByCase,
        });
    }

    generateSentence() {
        return generateSentence(this.lexicon, this.syntax, this.morphology);
    }

    analyzeSentence(sentence: string) {
        return analyzeSentence(sentence, this.lexicon, this.syntax);
    }
}