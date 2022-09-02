class Dictionary {
  dictionary: Record<string, any>;

  constructor(words: string[]) {
    const newDict: Record<string, any> = {};
    words.forEach((word) => {
      newDict[word] = "";
    });
    this.dictionary = newDict;
  }

  // count returns the size of dictionary
  count(): number {
    return Object.keys(this.dictionary).length;
  }

  // contains is used for to check if word exists within dictionary
  contains(word: string): boolean {
    return this.dictionary.hasOwnProperty(word);
  }

  // add new words to dictionary
  add(words: string[]) {
    words.forEach((word) => {
      this.dictionary[word] = "";
    });
  }

  // remove words from dictionary
  remove(words: string[]) {
    words.forEach((word) => {
      delete this.dictionary[word];
    });
  }
}

export default Dictionary;
