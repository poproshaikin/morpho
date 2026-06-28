import {Lexicon, LexiconConfig, generateLexiconWithParams, generateLexiconConfig} from "./lexicon";
import {generateSentence, generateSyntaxConfig, Syntax} from "./syntax";

export interface LanguageParams {
    rootsPerCategory: LexiconConfig['rootsPerCategory'],
    order: Syntax['order']
}

export class Language {
    constructor(public lexicon: Lexicon, public syntax: Syntax) {}

    static generateWithParams(params: LanguageParams) {
        const lexicon = generateLexiconWithParams({ rootsPerCategory: params.rootsPerCategory });
        const syntax: Syntax = { order: params.order };

        return new Language(lexicon, syntax)
    }

    static generate() {
        const lexiconConfig = generateLexiconConfig();
        const syntaxConfig = generateSyntaxConfig();

        return Language.generateWithParams({
            rootsPerCategory: lexiconConfig.rootsPerCategory,
            order: syntaxConfig.order
        });
    }

    generateSentence() {
        return generateSentence(this.lexicon, this.syntax);
    }
}