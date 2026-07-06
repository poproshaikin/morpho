# morpho — conlang generator

Pet project: TypeScript program that generates an artificial language (conlang) from parameters — phonology, morphology, basic sentence grammar. Built iteratively, one small step at a time.

## Architecture

### `vocabulary.ts`
Primitive phonological inventory and syllable schemes.
- `consonants`, `vowels` arrays
- `SyllableSchemes = ['cv', 'vc', 'cvc', 'vcv'] as const` + `SyllableScheme` type
- Helpers: `randomConsonant/Vowel`, `randomConsonantNot/VowelNot`, `isConsonant`, `isVowel`, `isSamePhonemeCategory`

### `phonology.old.ts`
Word construction from syllables.
- `constructSyllable(scheme)` — builds one syllable by scheme
- `constructWord(syllableCount)` — concatenates syllables with hiatus fix (same phoneme category at junction → replace leading phoneme of next syllable)
- `generateWords(count)` — generates `count` words with random syllable count (1–3)

### `lexicon.ts`
Vocabulary by grammatical category.
- `PartsOfSpeech = ['Noun', 'Verb', 'Adjective', 'Adverb'] as const` + `PartOfSpeech` type
- `Lexicon = { rootsByCategory: Record<PartOfSpeech, string[]> }`
- `LexiconConfig = { rootsPerCategory: Record<PartOfSpeech, number> }`
- `generateLexiconConfig()` — random counts per category
- `generateLexiconWithParams(config)` — fills lexicon using `generateWords`
- `pickWordByPartOfSpeech / pickWordsByPartOfSpeech` — random word lookup

### `syntax.ts`
Sentence structure.
- `Constituents = ['Subject', 'Predicate', 'DirectObject'] as const` + `Constituent` type
- `constituentToPartOfSpeech: Record<Constituent, PartOfSpeech>` — role → POS mapping
- `Syntax = { order: Constituent[] }` — encodes word order (SVO/SOV/etc.)
- `generateSyntaxConfig()` — shuffles Constituents randomly
- `generateSentence(lexicon, syntax)` — picks 1–2 words per constituent in syntax order
- `analyzeSentence(sentence, lexicon, syntax)` — splits sentence, maps each word via `analyzeWord`

### `morphology.old.ts`
Case inflection system.
- `Cases = ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Instrumental', 'Locative', 'Vocative'] as const`
- `CaseMarkingStrategies = ['suffix', 'prefix', 'preposition', 'postposition'] as const`
- `CaseMarkers = Record<Case, string>` — marker string per case (empty string = base form)
- `MorphologyConfig = { strategy: CaseMarkingStrategy, markers: CaseMarkers }`
- `decline(root, grammaticalCase, config)` — applies marker: suffix/prefix concat, preposition/postposition add space-separated word (skipped if marker is empty)
- `generateMorphologyConfig()` — random strategy + random CV-syllable markers (Nominative always empty = base form)
- `analyzeWord(word, lexicon, syntax)` — looks up word in lexicon, returns `{ word, partOfSpeech }`

### `language.ts`
Facade class.
- `Language` class with `lexicon: Lexicon`, `syntax: Syntax`
- `Language.generate()` — random full language
- `Language.generateWithParams(params)` — deterministic construction
- `language.generateSentence()`, `language.analyzeSentence(sentence)`

## Established patterns

- `as const` arrays + `typeof X[number]` for union types (never raw string literals)
- `Record<K, V>` with exhaustive literal keys to force coverage of all members
- Functional style everywhere except `Language` (facade class)
- Config object separates "what to generate" from generated artifact (e.g. `LexiconConfig` → `Lexicon`)
- No comments unless WHY is non-obvious

## Status / roadmap

- [x] Phonology: syllable schemes, hiatus fix, word generation
- [x] Lexicon: POS categories, random root generation
- [x] Syntax: constituent order (SVO/SOV/etc.), sentence generation, word analysis
- [x] MorphologyOld MVP: 7 cases, 4 strategies, `decline()`, config generation
- [ ] Wire morphology into `Language` facade and `generateSentence` (apply case to each constituent's words)
- [ ] MorphologyOld: suffix chaining (plural + case stacked, e.g. Turkish-style)
- [ ] MorphologyOld: stem alternations (vowel harmony, consonant mutation at junction)
- [ ] Lematizer / DAFSA-based FST for reverse lookup of inflected forms
- [ ] More constituents: IndirectObject, Attribute, Adverbial
- [ ] Verb morphology: tense/aspect markers
