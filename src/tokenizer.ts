
export default function tokenize(sentence: string): string[] {
    const toLowerCaseSentence = sentence.toLowerCase();
    const unescapeSentence = unescape(toLowerCaseSentence);
    const removedUnderscore = unescapeSentence.replace(/[`_0-9]/gi, '');
    const removedSpecialChar = removedUnderscore.replace(/[^\w\s]/gi, '');

    return removedSpecialChar.split(" ")
}