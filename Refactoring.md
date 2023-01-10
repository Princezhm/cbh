# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

the idea behind the refactor is to split the main function into smaller and more readable chunks, the first thing was to move awat the 2 consts values so they are visible on top of the file, then we proceed to move the hashing functionality and then to move the functionaity to get the `candidate` now renamed as a `key`. with these 2 functionalities abstracted we could reduce the code of the `deterministicPartitionKey`, also along with these changes I additionally reduced the usage of `if` clauses because I think nesting them makes the code less readable
