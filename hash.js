
const client = require('./client');

(async function (){

    //set fields in a hash
    await client.hSet('hashUser:1', ['name', 'Alice','age','30','country','USA']);
    console.log('HashUser:1 created');

    //get a single field
    const name = await client.hGet('hashUser:1', 'name');
    console.log('HGET name:', name);

    //get all field and values
    const user = await client.hGetAll('hashUser:1');
    console.log('HGETALL user:1', user);

    //check if a field exists
    const nameExists = await client.hExists('hashUser:1' , 'name');
    console.log('HEXISTS name:' , nameExists);

    //delete a field
    await client.hDel('hashUser:1', 'country');
    console.log('Deleted "Country" field');

    //increment a numeric field
    await client.hIncrBy('hashUser:1', 'age' , 5);
    console.log('Age incremented by 5');

    //get all the keys
    const keys = await client.hKeys('hashUser:1');
    console.log('HKEYS hashUser:1 :' , keys);

    //get all values in a hash
    const values = await client.hVals('hashUser:1');
    console.log('HVALS hashUser:1 : ' , values);

    //get the number of fields
    const length = await client.hLen('hashUser:1');
    console.log('HLEN hashUser:1 : ' , length);

    //Set multiple fields (deprecated but supported in older Redis versions)
    await client.hSet('hashUser:2',[ 'name' , 'Bob' , 'age' , '25']);
    console.log('Hash "hashUser:2" created with multiple fields');
    
    //get multiple fields
    const multipleFields = await client.hmGet('hashUser:2' , ['name' , 'age']);
    console.log('HMGET name, age: ' , multipleFields);
 

    //get random fields
    const randomField = await client.hRandField('hashUser:1');
    console.log('Random field form hashUser:1',  randomField);

    //Not working right, it's just returning a random key not any value, even we set true
    const randomFieldsWithValues = await client.hRandField('hashUser:1', 2 , true);
    console.log('Random fields with values:', randomFieldsWithValues);
    
 // --- HSTRLEN: Get the string length of a field ---
 const nameLength = await client.hStrLen('hashUser:1', 'name');
 console.log('HSTRLEN name:', nameLength);
    

  // Iterate over fields in a hash ---not working
//   let cursor = 0;
//   console.log('HSCAN (Iterate over hashUser:1):');
//   do {
//     const [nextCursor, fields] = await client.hScan('hashUser:1', cursor);
//     console.log('Cursor:', cursor, 'Fields:', fields);
//     cursor = nextCursor;
//   } while (cursor !== 0);

  // --- HPEXPIRE: Set expiration (milliseconds) ---
  await client.hPExpire('user:1001', 10000);
  console.log('Hash "user:1001" set to expire in 10 seconds');

  // --- TTL / HTTL: Get TTL of a hash ---
  const ttl = await client.hTtl('user:1001');
  console.log('TTL of user:1001:', ttl);

    //
    client.quit();
})();