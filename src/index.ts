import {Language} from "./language";

const name = 'Turkic'
const language = Language.generate(name);
language.print();

const getSentence = () => {
    const words = language.generateSentence();
    return words.map(word => word.form).join(' ');
}
