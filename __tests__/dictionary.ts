import {defaultDictionary, defaultStopWord, Dictionary} from "../src/index";

test("Testing default dictionary contain function", () => {
  const dict = defaultDictionary();
  const stopWord = defaultStopWord();
  expect(dict.contains("abidin")).toEqual(true);
  expect(stopWord.contains("tiba")).toEqual(true);
});

test("Testing default dictionary delete function", () => {
  const newDict = new Dictionary(["mantab", "keren"]);
  newDict.add(["budi"]);
  expect(newDict.contains("budi")).toEqual(true);
  newDict.remove(["budi"]);
  expect(newDict.contains("budi")).toEqual(false);
});
