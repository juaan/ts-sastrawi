const checkPrefixFirst = (word: string): boolean => {
  var re = new RegExp("^(be.+lah|be.+an|me.+i|di.+i|pe.+i|ter.+i)$");
  return re.test(word);
};

const removeParticle = (word: string): string => {
  const particles = word.match("-*(lah|kah|tah|pun)$");
  if (particles?.length > 0) return word.replace(particles[0], "");

  return word;
};

const removePossesive = (word: string): string => {
  const possesive = word.match("-*(ku|mu|nya)$");
  if (possesive?.length > 0) return word.slice(0, -possesive[0].length);

  return word;
};

const removeSuffix = (word: string): string => {
  const suffixes = word.match("-*(is|isme|isasi|i|kan|an)$");
  if (suffixes?.length > 0) return word.slice(0, -suffixes[0].length);

  return word;
};

// Prefix me
const findPrefixMe1 = (word: string): string[] => {
  return word.match("^me([lrwy][aiueo].*)$");
};

const findPrefixMe2 = (word: string): string[] => {
  return word.match("^mem([bfv].*)$");
};
const findPrefixMe3 = (word: string): string[] => {
  return word.match("^mem(pe.*)$");
};
const findPrefixMe4 = (word: string): string[] => {
  return word.match("^mem(r?[aiueo].*)$");
};
const findPrefixMe5 = (word: string): string[] => {
  return word.match("^men([cdjstz].*)$");
};
const findPrefixMe6 = (word: string): string[] => {
  return word.match("^men([aiueo].*)$");
};
const findPrefixMe7 = (word: string): string[] => {
  return word.match("^meng([ghqk].*)$");
};
const findPrefixMe8 = (word: string): string[] => {
  return word.match("^meng(([aiueo])(.*))$");
};
const findPrefixMe9 = (word: string): string[] => {
  return word.match("^meny(([aiueo])(.*))$");
};
const findPrefixMe10 = (word: string): string[] => {
  return word.match("^mem(p[^e].*)$");
};

// Prefix pe
const findPrefixPe1 = (word: string): string[] => {
  return word.match("^pe([wy][aiueo].*)$"); // pe{w|y}V => pe-{w|y}V
};

const findPrefixPe2 = (word: string): string[] => {
  return word.match("^per([aiueo].*)$"); // perV => per-V OR pe-rV
};
const findPrefixPe3 = (word: string): string[] => {
  return word.match("^per([^aiueor][a-z][^e].*)$"); // perCAP => per-CAP where C != 'r' and P != 'er'
};
const findPrefixPe4 = (word: string): string[] => {
  return word.match("^per([^aiueor][a-z]er[aiueo].*)$"); // perCAerV => per-CAerV where C != 'r'
};
const findPrefixPe5 = (word: string): string[] => {
  return word.match("^pem([bfv].*)$"); // pem{b|f|v} => pem-{b|f|v}
};
const findPrefixPe6 = (word: string): string[] => {
  return word.match("^pem(r?[aiueo].*)$"); // pem{rV|V} => pe-m{rV|V} OR pe-p{rV|V}
};
const findPrefixPe7 = (word: string): string[] => {
  return word.match("^pen([cdjstz].*)$"); // pen{c|d|j|s|t|z} => pen-{c|d|j|s|t|z}
};
const findPrefixPe8 = (word: string): string[] => {
  return word.match("^pen([aiueo].*)$"); // penV => pe-nV OR pe-tV
};
const findPrefixPe9 = (word: string): string[] => {
  return word.match("^peng([^aiueo].*)$"); // pengC => peng-C
};
const findPrefixPe10 = (word: string): string[] => {
  return word.match("^peng(([aiueo])(.*))$"); // pengV => peng-V OR peng-kV OR pengV- where V = 'e'
};

const findPrefixPe11 = (word: string): string[] => {
  return word.match("^peny([aiueo].*)$"); // penyV => peny-sV OR pe-nyV
};
const findPrefixPe12 = (word: string): string[] => {
  return word.match("^pe(l[aiueo].*)$"); // pelV => pe-lV OR pel-V for pelajar
};
const findPrefixPe13 = (word: string): string[] => {
  return word.match("^pe[^aiueorwylmn](er[aiueo].*)$"); // peCerV => per-erV where C != {r|w|y|l|m|n}
};
const findPrefixPe14 = (word: string): string[] => {
  return word.match("^pe([^aiueorwylmn][^e].*)$"); // peCP => pe-CP where C != {r|w|y|l|m|n} and P != 'er'
};
const findPrefixPe15 = (word: string): string[] => {
  return word.match("^pe([^aiueorwylmn]er[^aiueo].*)$");
};

// Prefix be
const findPrefixBe1 = (word: string): string[] => {
  return word.match("^ber([aiueo].*)$"); // berV => ber-V || be-rV
};
const findPrefixBe2 = (word: string): string[] => {
  return word.match("^ber([^aiueor][a-z][^e].*)$"); // berCAP => ber-CAP where C != 'r' and P != 'er'
};
const findPrefixBe3 = (word: string): string[] => {
  return word.match("^ber([^aiueor][a-z]er[aiueo].*)$"); // berCAerV => ber-CAerV where C != 'r'
};
const findPrefixBe4 = (word: string): string[] => {
  return word.match("^bel(ajar)$"); // belajar => bel-ajar
};
const findPrefixBe5 = (word: string): string[] => {
  return word.match("^be([^aiueorl]er[^aiueo].*)$"); // beC1erC2 => be-C1erC2 where C1 != {'r'|'l'}
};

// Prefix te
const findPrefixTe1 = (word: string): string[] => {
  return word.match("^ter([aiueo].*)$"); // terV => ter-V OR te-rV
};
const findPrefixTe2 = (word: string): string[] => {
  return word.match("^ter([^aiueor]er[aiueo].*)$"); // terCerV => ter-CerV where C != 'r'
};
const findPrefixTe3 = (word: string): string[] => {
  return word.match("^ter([^aiueor][^e].*)$"); // terCP => ter-CP where C != 'r' and P != 'er'
};
const findPrefixTe4 = (word: string): string[] => {
  return word.match("^te([^aiueor]er[^aiueo].*)$"); // teC1erC2 => te-C1erC2 where C1 != 'r'
};
const findPrefixTe5 = (word: string): string[] => {
  return word.match("^ter([^aiueor]er[^aiueo].*)$"); // terC1erC2 => ter-C1erC2 where C1 != 'r'
};

// infix
const findInfix1 = (word: string): string[] => {
  return word.match("^(([^aiueo])e[rlm])([aiueo].*)$"); // Ce{r|l|m}V => Ce{r|l|m}V OR CV
};
const findInfix2 = (word: string): string[] => {
  return word.match("^(([^aiueo])in)([aiueo].*)$"); // CinV => CinV OR CV
};

export default {
  checkPrefixFirst,
  removeParticle,
  removePossesive,
  removeSuffix,
  findPrefixMe1,
  findPrefixMe2,
  findPrefixMe3,
  findPrefixMe4,
  findPrefixMe5,
  findPrefixMe6,
  findPrefixMe7,
  findPrefixMe8,
  findPrefixMe9,
  findPrefixMe10,
  findPrefixPe1,
  findPrefixPe2,
  findPrefixPe3,
  findPrefixPe4,
  findPrefixPe5,
  findPrefixPe6,
  findPrefixPe7,
  findPrefixPe8,
  findPrefixPe9,
  findPrefixPe10,
  findPrefixPe11,
  findPrefixPe12,
  findPrefixPe13,
  findPrefixPe14,
  findPrefixPe15,
  findPrefixBe1,
  findPrefixBe2,
  findPrefixBe3,
  findPrefixBe4,
  findPrefixBe5,
  findPrefixTe1,
  findPrefixTe2,
  findPrefixTe3,
  findPrefixTe4,
  findPrefixTe5,
  findInfix1,
  findInfix2,
};
