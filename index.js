const { deterministicPartitionKey } = require("./dpk");

console.log(deterministicPartitionKey());
console.log(deterministicPartitionKey(null));
console.log(deterministicPartitionKey(undefined));
console.log(deterministicPartitionKey(false));
console.log(deterministicPartitionKey(true));
console.log(deterministicPartitionKey(0));
console.log(deterministicPartitionKey("0"));
console.log(deterministicPartitionKey(15));
console.log(deterministicPartitionKey("15"));
console.log(deterministicPartitionKey(150));
console.log(deterministicPartitionKey("150"));
console.log(deterministicPartitionKey("TEST"));
console.log(
  deterministicPartitionKey({
    partitionKey: "test",
  })
);
console.log(
  deterministicPartitionKey({
    partitionKey: {
      innerObject: {
        innerInnerObj: {
          value:
            "TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTT",
        },
      },
    },
  })
);
