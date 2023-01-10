/**
 * EXPLANATION:
 * the idea behind the refactor is to split the main function into smaller and more readable chunks, the first thing was to move awat the 2 consts values
 * so they are visible on top of the file, then we proceed to move the hashing functionality and then to move the functionaity to get the `candidate`
 * now renamed as a `key`. with these 2 functionalities abstracted we could reduce the code of the `deterministicPartitionKey`, also along with these changes
 * I additionally reduced the usage of `if` clauses because I think nesting them makes the code less readable
 */

const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * @param {string} data: data to be hashed using sha3
 * @return {string} hashed value of {data} with a length of 128
 */
const hash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

/**
 * @param {any|object} event: object-like item where we will take the partitionKey entry or the whole object if no key present.
 * @return {string} the string value of the partition key or if no partitionKey preset hashes the whole object and returns it
 */
const getKey = (event) => {
  const { partitionKey } = event;

  if (partitionKey) {
    return typeof partitionKey !== "string"
      ? JSON.stringify(partitionKey)
      : partitionKey;
  }

  return hash(JSON.stringify(event));
};

/**
 * @param {event} event: object-like parameter
 * @return {string} hashed version of the event
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  let key = getKey(event);

  if (key && key.length > MAX_PARTITION_KEY_LENGTH) {
    return hash(key);
  }

  return key;
};
