
const client = require('./client');

(async () => {

  // 1. APPEND - Append a value to an existing key
  await client.set('greeting', 'Hello');
  await client.append('greeting', ' World!');
  console.log(await client.get('greeting')); // Output: Hello World!

  // 2. DECR - Decrement a key's integer value by 1
  await client.set('counter', 10);
  await client.decr('counter');
  console.log(await client.get('counter')); // Output: 9

  // 3. DECRBY - Decrement a key's integer value by a specified amount
  await client.set('counter', 20);
  await client.decrBy('counter', 5);
  console.log(await client.get('counter')); // Output: 15

  // 4. GET - Get the value of a key
  await client.set('user:1', 'Deimos');
  console.log(await client.get('user:1')); // Output: Deimos

//   /*
  // 5. GETDEL - Get the value of a key and delete it(version mismatch, this command is available in  v-6.2)
  await client.set('temp', 'value to delete');
  const valueDel = await client.getDel('temp');
  console.log(valueDel); // Output: value to delete
// */

// /*
// 6. GETEX - Get the value of a key and set its expiration time(available in v 6.2)
await client.set('session', 'active');
const sessionValue = await client.getEx('session', { EX: 10 });
console.log(sessionValue); // Output: active (but will expire in 10 seconds)
// */

  // 7. GETRANGE - Get a substring from a key's value
  await client.set('phrase', 'Kshitij is awesome!');
  const substring = await client.getRange('phrase', 0, 6);
  console.log(substring); // Output: Kshitij

  // 8. GETSET - Set a new value for a key and return its old value
  await client.set('status', 'old');
  const oldStatus = await client.getSet('status', 'new');
  console.log(oldStatus); // Output: old

  // 9. INCR - Increment the integer value of a key
  await client.set('counter', 0);
  await client.incr('counter');
  console.log(await client.get('counter')); // Output: 1

  // 10. INCRBY - Increment the integer value of a key by a specified amount
  await client.incrBy('counter', 5);
  console.log(await client.get('counter')); // Output: 6

  // 11. INCRBYFLOAT - Increment the value of a key by a float
  await client.set('balance', '100.5');
  await client.incrByFloat('balance', 2.5);
  console.log(await client.get('balance')); // Output: 103.0

//   /*
  // 12. LCS - Longest Common Subsequence between two strings(available from v7)
  await client.set('string1', 'abcde');
  await client.set('string2', 'ace');
  const lcs = await client.lcs('string1', 'string2');
  console.log(lcs); // Output: ace
//   */

  // 13. MGET - Get the values of multiple keys
  await client.mSet({ 'user:2': 'Ares', 'user:3': 'Vanth' });
  const values = await client.mGet(['user:1', 'user:2', 'user:3']);
  console.log(values); // Output: ['Deimos', 'Ares', 'Vanth']

  // 14. MSET - Set multiple key-value pairs at once
  await client.mSet({ 'user:4': 'Hera', 'user:5': 'Athena' });
  console.log(await client.mGet(['user:4', 'user:5'])); // Output: ['Hera', 'Athena']

  // 15. MSETNX - Set multiple key-value pairs only if none of the keys exist
  const resultMsetNX = await client.mSetNX({ 'user:6': 'Apollo', 'user:7': 'Artemis' });
  console.log(resultMsetNX); // Output: true (if all keys did not exist)

  // 16. PSETEX - Set a key's value with a specified expiration time in milliseconds
  await client.pSetEx('tempKey', 5000, 'expires in 5 seconds');
  console.log(await client.get('tempKey')); // Output: expires in 5 seconds

  // 17. SET - Set the value of a key
  await client.set('app', 'RedisApp');
  console.log(await client.get('app')); // Output: RedisApp

  // 18. SETEX - Set the value of a key with an expiration time (in seconds)
//   await client.setEx('sessionKey', 10, 'active');
//   console.log(await client.get('sessionKey')); // Output: active (expires in 10 seconds)
  const check = await client.get('sessionKey');
  console.log("Check is : " , check);

  // 19. SETNX - Set the value of a key only if it does not already exist 
  const setNxResult = await client.setNX('uniqueKey', 'uniqueValue');
  console.log(setNxResult); // Output: true (if key didn't exist)
  // 20. SETRANGE - Overwrite part of a string stored at a key
  await client.set('greeting', 'Hello World');
  await client.setRange('greeting', 6, 'Redis');
  console.log(await client.get('greeting')); // Output: Hello Redis

  // 21. STRLEN - Get the length of the string stored at a key
  await client.set('message', 'Hello Redis');
  const length = await client.strLen('message');
  console.log(length); // Output: 12

  // 22. SUBSTR - Get a substring from a string stored at a key
  const subString = await client.getRange('message', 0, 4);
  console.log(subString); // Output: Hello

  // Terminate the connection
  await client.quit();
})();
