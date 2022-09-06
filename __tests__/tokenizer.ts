import {tokenize} from "../src/index";

test("Testing 'tokenize' function", () => {
  expect(tokenize("Hello Pukim444444@@@@@@@@2y")).toEqual([
    "hello",
    "pukimy",
  ]);
  expect(
    tokenize("Whatsssssababbbi111@@!#@!#!@#!@#!@#!@#! my name juan")
  ).toEqual(["whatsssssababbbi", "my", "name", "juan"]);
});
