import sastrawi from '../src/index';

test("Testing 'tokenize' function", () => {
    expect(sastrawi.tokenize("Hello")).toBe("hello");
    expect(sastrawi.tokenize("HellloO")).toBe("hellloo");
});