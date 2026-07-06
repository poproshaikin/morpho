import {Language} from "./language";

const language = Language.generate();
const words = language.generateSentence();
const sentence = words.map(word => word.form).join(' ');

console.log("full sentence: " + sentence);
console.log(JSON.stringify(words, null, 2));
console.log();
console.log(language.lexicon)
console.log(language.syntax)
console.log(JSON.stringify(language.morphology, null, 2));

