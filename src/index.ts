import {Language} from "./language";

const language = Language.generate();


const words = language.generateSentence();
const word = words.join(' ');

console.log(word);
console.log();
console.log(language.lexicon)
console.log(language.syntax)
