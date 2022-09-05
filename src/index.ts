import tokenize from "./tokenizer";
import Dictionary from "./dictionary";
import defaultDictionary from "./dictionary-default";
import defaultStopWord from "./dictionary-stopword";
import Stemmer from "./stemmer";

const sastrawi = {
  tokenize,
  Dictionary,
  defaultDictionary,
  defaultStopWord,
  Stemmer,
};

export default sastrawi;
