import {PartOfSpeech} from "./types";
import {generateWords, Phonology} from "./phonology";
import {PWord} from "./vocabulary";

export type LexiconConfig = {
    rootsPerCategory: Record<PartOfSpeech, number>;
}

export type Lexicon = {
    rootsByCategory: Record<PartOfSpeech, PWord[]>;
}

export function pickWordByPartOfSpeech(lexicon: Lexicon, partOfSpeech: PartOfSpeech): PWord {
    const words = lexicon.rootsByCategory[partOfSpeech];
    if (words.length === 0) {
        throw new Error(`No words available for part of speech: ${partOfSpeech}`);
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

export function pickWordsByPartOfSpeech(lexicon: Lexicon, partOfSpeech: PartOfSpeech, count: number): PWord[] {
    const words = [] as PWord[];
    for (let i = 0; i < count; i++) {
        words.push(pickWordByPartOfSpeech(lexicon, partOfSpeech));
    }
    return words;
}

export function makeLexiconWithParams(config: LexiconConfig, phono: Phonology): Lexicon {
    const rootsByCategory: Record<PartOfSpeech, PWord[]> = {
        'Noun': generateWords(config.rootsPerCategory['Noun'], phono),
        'Verb': generateWords(config.rootsPerCategory['Verb'], phono),
        'Adjective': generateWords(config.rootsPerCategory['Adjective'], phono),
        'Adverb': generateWords(config.rootsPerCategory['Adverb'], phono),
    };

    return {
        rootsByCategory,
    };
}

export function generateLexiconConfig(): LexiconConfig {
    const rootsPerCategory: Record<PartOfSpeech, number> = {
        'Noun': Math.floor(Math.random() * 10) + 5,
        'Verb': Math.floor(Math.random() * 10) + 5,
        'Adjective': Math.floor(Math.random() * 10) + 5,
        'Adverb': Math.floor(Math.random() * 10) + 5,
    }

    return {
        rootsPerCategory
    }
}
