import sastrawi from "../src/index";

test("Testing default dictionary contain function", () => {
  const defaultDictionary = sastrawi.defaultDictionary();
  const defaultStopWord = sastrawi.defaultStopWord();
  expect(defaultDictionary.contains("abidin")).toEqual(true);
  expect(defaultStopWord.contains("tiba")).toEqual(true);
});

test("Testing default dictionary delete function", () => {
  const newDict = new sastrawi.Dictionary(["mantab", "keren"]);
  newDict.add(["budi"]);
  expect(newDict.contains("budi")).toEqual(true);
  newDict.remove(["budi"]);
  expect(newDict.contains("budi")).toEqual(false);
});
