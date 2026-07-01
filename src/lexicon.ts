import {generateWords} from "./phonology";
import {PartOfSpeech} from "./types";

export type LexiconConfig = {
    rootsPerCategory: Record<PartOfSpeech, number>;
}

export type Lexicon = {
    rootsByCategory: Record<PartOfSpeech, string[]>;
}

export function pickWordByPartOfSpeech(lexicon: Lexicon, partOfSpeech: PartOfSpeech): string {
    const words = lexicon.rootsByCategory[partOfSpeech];
    if (words.length === 0) {
        throw new Error(`No words available for part of speech: ${partOfSpeech}`);
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

export function pickWordsByPartOfSpeech(lexicon: Lexicon, partOfSpeech: PartOfSpeech, count: number): string[] {
    const words = [] as string[];
    for (let i = 0; i < count; i++) {
        words.push(pickWordByPartOfSpeech(lexicon, partOfSpeech));
    }
    return words;
}

export function makeLexiconWithParams(config: LexiconConfig): Lexicon {
    const rootsByCategory: Record<PartOfSpeech, string[]> = {
        'Noun': generateWords(config.rootsPerCategory['Noun']),
        'Verb': generateWords(config.rootsPerCategory['Verb']),
        'Adjective': generateWords(config.rootsPerCategory['Adjective']),
        'Adverb': generateWords(config.rootsPerCategory['Adverb']),
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
