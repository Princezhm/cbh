const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const randomWord = (length = 20) => {
  let word = "";
  for (let i = 0; i <= length; i++) {
    const index = Math.floor(Math.random() * (length + 1));
    const char = chars[index];
    word += char;
  }

  return word;
};

const getHash = (value) => {
  return crypto.createHash("sha3-512").update(value).digest("hex");
};

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when input is null", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when input is undefined", () => {
    const trivialKey = deterministicPartitionKey(undefined);
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when input is false", () => {
    const trivialKey = deterministicPartitionKey(false);
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when input is 0", () => {
    const trivialKey = deterministicPartitionKey(0);
    expect(trivialKey).toBe("0");
  });

  it("Returns the hash of a plain input (no object)", () => {
    const value = randomWord();
    const hashedValue = getHash(JSON.stringify(value));
    const key = deterministicPartitionKey(value);
    expect(key).toBe(hashedValue);
  });

  it("Returns the hash of a plain input with length more than 256", () => {
    const value = randomWord(257);
    const hashedValue = getHash(JSON.stringify(value));
    const key = deterministicPartitionKey(value);
    expect(key).toBe(hashedValue);
  });

  it("Returns the hash of an Object with no partitionKey", () => {
    const value = {
      keyA: "something",
      keyB: "another",
      foo: {
        bar: "foobar",
      },
    };
    const hashedValue = getHash(JSON.stringify(value));
    const key = deterministicPartitionKey(value);
    expect(key).toBe(hashedValue);
  });

  it("Returns the string value of an Object with PartitionKey as string", () => {
    const value = {
      partitionKey: "string partition key",
    };
    const key = deterministicPartitionKey(value);
    expect(key).toBe("string partition key");
  });

  it("Returns the stringified version of an Object with PartitionKey as an object", () => {
    const value = {
      partitionKey: {
        innerObject: {
          innerInnerObj: {
            value: "something",
          },
        },
      },
    };

    const key = deterministicPartitionKey(value);
    const stringified = JSON.stringify({
      innerObject: {
        innerInnerObj: {
          value: "something",
        },
      },
    });

    expect(key).toBe(stringified);
  });

  it("Returns the hashed version of a object with partionKey as string and with length more than 256", () => {
    const word = randomWord(257);
    const value = {
      partitionKey: word,
    };
    const hashedValue = getHash(word);
    const key = deterministicPartitionKey(value);

    expect(key).toBe(hashedValue);
  });

  it("returns the hashed version of an object with partition key as an object (length of the JSON.stringify() is more than 256)", () => {
    const word = randomWord(257);
    const obj = {
      innerObject: {
        innerInnerObj: {
          value: word,
        },
      },
    };

    const value = {
      partitionKey: obj,
    };

    const hashedValue = getHash(JSON.stringify(obj));
    const key = deterministicPartitionKey(value);

    expect(key).toBe(hashedValue);
  });
});
