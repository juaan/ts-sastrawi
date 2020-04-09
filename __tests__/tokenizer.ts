import sastrawi from '../src/index';

test("Testing 'tokenize' function", () => {
    expect(sastrawi.tokenize("Hello Pukim444444@@@@@@@@2y")).toEqual(["hello", "pukimy"]);
    expect(sastrawi.tokenize("Whatsssssababbbi111@@!#@!#!@#!@#!@#!@#! my name juan")).toEqual(["whatsssssababbbi", "my", "name", "juan"]);
});