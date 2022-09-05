import Dictionary from "./dictionary";
import regex from "./regex";

type splittedWord = {
  word: string;
  ext?: string; // could be suffix, particle, or possesive
  rootFound?: boolean;
};

type prefixRemoval = {
  prefix?: string;
  result: string;
  recoding: string[];
};
class Stemmer {
  dictionary: Dictionary;

  constructor(dict: Dictionary) {
    this.dictionary = dict;
  }

  changeDictionary(dict: Dictionary) {
    this.dictionary = dict;
  }

  stem(word: string): string {
    let resultWord = word.toLowerCase();
    if (resultWord.length < 3) {
      return word;
    }

    let suffix = "";
    let possesive = "";
    let particle = "";

    if (this.dictionary.contains(resultWord)) {
      return resultWord;
    }

    if (regex.checkPrefixFirst(resultWord)) {
      // remove prefix
      const prefixRemovalRes = this.removePrefixes(resultWord);
      resultWord = prefixRemovalRes.word;
      if (prefixRemovalRes.rootFound) {
        return resultWord;
      }

      // remove particle
      const particleRemovalRes = this.removeParticle(resultWord);
      particle = particleRemovalRes.ext;
      resultWord = particleRemovalRes.word;
      if (this.dictionary.contains(resultWord)) {
        return resultWord;
      }

      // remove possesive
      const possesiveRemovalRes = this.removePossesive(resultWord);
      possesive = possesiveRemovalRes.ext;
      resultWord = possesiveRemovalRes.word;
      if (this.dictionary.contains(resultWord)) {
        return resultWord;
      }

      // remove suffix
      const suffixRemovalRes = this.removeSuffix(resultWord);
      suffix = suffixRemovalRes.ext;
      resultWord = suffixRemovalRes.word;

      if (this.dictionary.contains(resultWord)) {
        return resultWord;
      }
    } else {
      // remove particle
      const particleRemovalRes = this.removeParticle(resultWord);
      particle = particleRemovalRes.ext;
      resultWord = particleRemovalRes.word;
      if (this.dictionary.contains(resultWord)) {
        return resultWord;
      }

      // remove possesive
      const possesiveRemovalRes = this.removePossesive(resultWord);
      possesive = possesiveRemovalRes.ext;
      resultWord = possesiveRemovalRes.word;
      if (this.dictionary.contains(resultWord)) {
        return resultWord;
      }

      // remove suffix
      const suffixRemovalRes = this.removeSuffix(resultWord);
      suffix = suffixRemovalRes.ext;
      resultWord = suffixRemovalRes.word;
      if (this.dictionary.contains(resultWord)) {
        return resultWord;
      }

      // remove prefix
      const prefixRemovalRes = this.removePrefixes(resultWord);
      resultWord = prefixRemovalRes.word;
      if (prefixRemovalRes.rootFound) {
        return resultWord;
      }
    }

    // If no root found, do loopPengembalianAkhiran
    let removedSuffixes: string[] = ["", suffix, possesive, particle];

    if (suffix === "kan") {
      removedSuffixes = ["", "k", "an", possesive, particle];
    }

    const loopPengembalianAkhiranRes = this.loopPengembalianAkhiran(
      word.toLowerCase(),
      removedSuffixes
    );
    resultWord = loopPengembalianAkhiranRes.word;
    if (loopPengembalianAkhiranRes.rootFound) {
      return resultWord;
    }

    return word.toLowerCase();
  }

  private removeParticle(word: string): splittedWord {
    const resultWord = regex.removeParticle(word);
    const particle = word.replace(resultWord, "");

    return {
      word: resultWord,
      ext: particle,
    };
  }

  private removePossesive(word: string): splittedWord {
    const resultWord = regex.removePossesive(word);
    const possesive = word.replace(resultWord, "");

    return {
      word: resultWord,
      ext: possesive,
    };
  }

  private removeSuffix(word: string): splittedWord {
    const resultWord = regex.removeSuffix(word);
    const suffix = word.replace(resultWord, "");

    return {
      word: resultWord,
      ext: suffix,
    };
  }

  private loopPengembalianAkhiran(
    originalWord: string,
    suffixes: string[]
  ): splittedWord {
    const res: splittedWord = {
      word: "",
      rootFound: false,
    };

    let lenSuffixes = 0;
    suffixes.forEach((suffix) => (lenSuffixes += suffix.length));

    const wordWithoutSuffix = originalWord.slice(
      0,
      originalWord.length - lenSuffixes
    );

    for (let i = 0; i < suffixes.length; i++) {
      let suffixCombination = "";
      for (let j = 0; j <= i; j++) {
        suffixCombination += suffixes[j];
      }

      let resultWord = wordWithoutSuffix + suffixCombination;
      if (this.dictionary.contains(resultWord)) {
        res.word = resultWord;
        res.rootFound = true;
        return res;
      }

      const prefixRemovalRes = this.removePrefixes(resultWord);
      if (prefixRemovalRes.rootFound) {
        res.rootFound = true;
        res.word = prefixRemovalRes.word;
        return res;
      }
    }

    return res;
  }

  private removePrefixes(word: string): splittedWord {
    let result = word;
    let currentPrefix = "";
    let removedPrefix = "";

    for (let i = 0; i < 3; i++) {
      if (result.length < 3) {
        return {
          word,
          rootFound: false,
        };
      }

      currentPrefix = result.slice(0, 2);
      if (currentPrefix === removedPrefix) {
        break;
      }

      const removePrefixResult = this.removePrefix(result);
      removedPrefix = removePrefixResult.prefix;
      result = removePrefixResult.result;
      if (this.dictionary.contains(result)) {
        return {
          word: result,
          rootFound: true,
        };
      }

      for (let j = 0; j < removePrefixResult?.recoding?.length; j++) {
        const char = removePrefixResult?.recoding[j];
        if (this.dictionary.contains(char + result)) {
          return {
            word: char + result,
            rootFound: true,
          };
        }
      }
    }

    return {
      word: result,
      rootFound: false,
    };
  }

  private removePrefix(word: string): prefixRemoval {
    const res: prefixRemoval = {
      recoding: [],
      result: "",
      prefix: "",
    };
    if (word.startsWith("kau")) {
      res.prefix = "kau";
      res.result = word.slice(3, word.length);
      return res;
    }

    const prefix = word.slice(0, 2);

    res.prefix = prefix;
    switch (prefix) {
      case "di":
      case "ke":
      case "se":
      case "ku":
        res.result = word.slice(2, word.length);
        break;
      case "me":
        const prefixMeWord = this.removePrefixMe(word);
        res.recoding = prefixMeWord.recoding;
        res.result = prefixMeWord.result;
        break;
      case "pe":
        const prefixPeWord = this.removePrefixPe(word);
        res.recoding = prefixPeWord.recoding;
        res.result = prefixPeWord.result;
        break;
      case "be":
        const prefixBeWord = this.removePrefixBe(word);
        res.recoding = prefixBeWord.recoding;
        res.result = prefixBeWord.result;
        break;
      case "te":
        const prefixTeWord = this.removePrefixTe(word);
        res.recoding = prefixTeWord.recoding;
        res.result = prefixTeWord.result;
        break;
      default:
        const infixWord = this.removeInfix(word);
        res.recoding = infixWord.recoding;
        res.result = infixWord.result;
        break;
    }

    return res;
  }

  private removePrefixMe(word: string): prefixRemoval {
    let matchesWord: string[] = [];
    const res: prefixRemoval = {
      result: word,
      recoding: [],
    };

    // Pattern 1
    // me{l|r|w|y}V => me-{l|r|w|y}V
    matchesWord = regex.findPrefixMe1(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 2
    // mem{b|f|v} => mem-{b|f|v}
    matchesWord = regex.findPrefixMe2(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 3
    // mempe => mem-pe
    matchesWord = regex.findPrefixMe3(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 4
    // // mem{rV|V} => mem-{rV|V} OR me-p{rV|V}
    matchesWord = regex.findPrefixMe4(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["m", "p"];
      return res;
    }

    // Pattern 5
    // men{c|d|j|s|t|z} => men-{c|d|j|s|t|z}
    matchesWord = regex.findPrefixMe5(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 6
    // menV => nV OR tV
    matchesWord = regex.findPrefixMe6(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["n", "t"];
      return res;
    }

    // Pattern 7
    // meng{g|h|q|k} => meng-{g|h|q|k}
    matchesWord = regex.findPrefixMe7(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 8
    // mengV => meng-V OR meng-kV OR me-ngV OR mengV- where V = 'e'
    matchesWord = regex.findPrefixMe8(word) || [];
    if (matchesWord.length != 0) {
      if (matchesWord[2] === "e") {
        res.result = matchesWord[3];
      } else {
        res.result = matchesWord[1];
        res.recoding = ["ng", "k"];
      }
      return res;
    }

    // Pattern 9
    // menyV => meny-sV OR me-nyV to stem menyala
    matchesWord = regex.findPrefixMe9(word) || [];
    if (matchesWord.length != 0) {
      if (matchesWord[2] === "a") {
        res.result = `ny${matchesWord[1]}`;
      } else {
        res.result = `s${matchesWord[1]}`;
      }
      return res;
    }

    // Pattern 10
    // mempV => mem-pA where A != 'e'
    matchesWord = regex.findPrefixMe10(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    return res;
  }

  private removePrefixPe(word: string): prefixRemoval {
    let matchesWord: string[] = [];
    const res: prefixRemoval = {
      result: word,
      recoding: [],
    };

    // Pattern 1
    // pe{w|y}V => pe-{w|y}V
    matchesWord = regex.findPrefixPe1(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 2
    // perV => per-V OR pe-rV
    matchesWord = regex.findPrefixPe2(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["r"];
      return res;
    }

    // Pattern 3
    // perCAP => per-CAP where C != 'r' and P != 'er'
    matchesWord = regex.findPrefixPe3(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 4
    // perCAerV => per-CAerV where C != 'r'
    matchesWord = regex.findPrefixPe4(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 5
    // pem{b|f|v} => pem-{b|f|v}
    matchesWord = regex.findPrefixPe5(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 6
    // pem{rV|V} => pe-m{rV|V} OR pe-p{rV|V}
    matchesWord = regex.findPrefixPe6(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["m", "p"];
      return res;
    }

    // Pattern 7
    // pen{c|d|j|s|t|z} => pen-{c|d|j|s|t|z}
    matchesWord = regex.findPrefixPe7(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 8
    // penV => pe-nV OR pe-tV
    matchesWord = regex.findPrefixPe8(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["n", "t"];
      return res;
    }

    // Pattern 9
    // pengC => peng-C
    matchesWord = regex.findPrefixPe9(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 10
    // pengV => peng-V OR peng-kV OR pengV- where V = 'e'
    matchesWord = regex.findPrefixPe10(word) || [];
    if (matchesWord.length != 0) {
      if (matchesWord[2] === "e") {
        res.result = matchesWord[3];
      } else {
        res.result = matchesWord[1];
        res.recoding = ["k"];
      }
      return res;
    }

    // Pattern 11
    // penyV => peny-sV OR pe-nyV
    matchesWord = regex.findPrefixPe11(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["s", "ny"];
      return res;
    }

    // Pattern 12
    // pelV => pe-lV OR pel-V for pelajar
    matchesWord = regex.findPrefixPe12(word) || [];
    if (matchesWord.length != 0) {
      if (word == "pelajar") {
        res.result = "ajar";
      } else {
        res.result = matchesWord[1];
      }
      return res;
    }

    // Pattern 13
    // peCerV => peC-erV where C != {r|w|y|l|m|n}
    matchesWord = regex.findPrefixPe13(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 14
    // peCP => pe-CP where C != {r|w|y|l|m|n} and P != 'er'
    matchesWord = regex.findPrefixPe14(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 15
    // peC1erC2 => pe-C1erC2 where C1 != {r|w|y|l|m|n}
    matchesWord = regex.findPrefixPe15(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    return res;
  }

  private removePrefixBe(word: string): prefixRemoval {
    let matchesWord: string[] = [];
    const res: prefixRemoval = {
      result: word,
      recoding: [],
    };

    // Pattern 1
    // berV => ber-V OR be-rV
    matchesWord = regex.findPrefixBe1(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["r"];
      return res;
    }

    // Pattern 2
    // berCAP => ber-CAP where C != 'r' and P != 'er'
    matchesWord = regex.findPrefixBe2(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 3
    // berCAerV => ber-CAerV where C != 'r'
    matchesWord = regex.findPrefixBe3(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 4
    // belajar => bel-ajar
    matchesWord = regex.findPrefixBe4(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 5
    // beC1erC2 => be-C1erC2 where C1 != {'r'|'l'}
    matchesWord = regex.findPrefixBe5(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    return res;
  }

  private removePrefixTe(word: string): prefixRemoval {
    let matchesWord: string[] = [];
    const res: prefixRemoval = {
      result: word,
      recoding: [],
    };

    // Pattern 1
    // terV => ter-V OR te-rV
    matchesWord = regex.findPrefixTe1(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      res.recoding = ["r"];
      return res;
    }

    // Pattern 2
    // terCerV => ter-CerV where C != 'r'
    matchesWord = regex.findPrefixTe2(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 3
    // terCP => ter-CP where C != 'r' and P != 'er'
    matchesWord = regex.findPrefixTe3(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 4
    // teC1erC2 => te-C1erC2 where C1 != 'r'
    matchesWord = regex.findPrefixTe4(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    // Pattern 5
    // terC1erC2 => ter-C1erC2 where C1 != 'r'
    matchesWord = regex.findPrefixTe5(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[1];
      return res;
    }

    return res;
  }

  private removeInfix(word: string): prefixRemoval {
    let matchesWord: string[] = [];
    const res: prefixRemoval = {
      result: word,
      recoding: [],
    };

    // Pattern 1
    // CerV => CerV OR CV
    matchesWord = regex.findInfix1(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[3];
      res.recoding = [matchesWord[1], matchesWord[2]];
      return res;
    }

    // Pattern 2
    // CinV => CinV OR CV
    matchesWord = regex.findInfix2(word) || [];
    if (matchesWord.length != 0) {
      res.result = matchesWord[3];
      res.recoding = [matchesWord[1], matchesWord[2]];
      return res;
    }

    return res;
  }
}

export default Stemmer;
