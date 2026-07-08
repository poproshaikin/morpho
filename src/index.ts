import {Language} from "./language";

const language = Language.generate();
language.print();

const getSentence = () => {
    const words = language.generateSentence();
    return words.map(word => word.form).join(' ');
}

console.log();
for (let i = 0; i < 5; i++) {
    console.log(getSentence());
}

