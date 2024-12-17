const client = require('./client');


(async ()=>{
    await client.sAdd('setA', 'orange','banana','cherry','apple');
    await client.sAdd('setB' , 'banana' , 'date' , 'fig','orange');
    
    console.log('Set A: ' , await client.sMembers('setA'));
    console.log('Set B: ' , await client.sMembers('setB'));

    //cardinality(size) of sets
    // console.log('SCARD(Set A size):' , await client.sCard('setA'));
    

    //set difference
    console.log('SDIFF(Set A - Set B):' , await client.sDiff(['setA' , 'setB']));
    await client.sDiffStore('setC',[ 'setA' , 'setB']);  //store difference in set c
    console.log('SDIFFSOTRE(Set C):' , await client.sMembers('setC'));

    //set intersection
    console.log('SINTER(Set A intersection Set B):' , await client.sInter(['setA','setB']));

    //getting error here
    // console.log('SINTERCARD(Count of common elements):', await client.sInterCard(2,[ 'setA' , 'setB']));  //Number of common elements

    //ERROR
    await client.sInterStore('setC','setA', 'setB'); //store intersection
    console.log('SINTERSTORE(Set C): ' , await client.sMembers('setC'));

    //set union
    console.log('SUNION(Set A union Set B):' , await client.sUnion(['setB' , 'setA']));  //union
    await client.sUnionStore('setC' , 'setA','setB');  //storing union in setC
    console.log('SUNIONSTORE (Set C):' , await client.sMembers('setC'));


    //checking if something is member of a set
    console.log('SISMEMBER(banana in Set A):', await client.sIsMember('setA','banana'));
    console.log('SMISMEMBER(Multiple membership checks):', await client.smIsMember('setA', ['banana', 'fig', 'apple']));

    //random and pop operations
    console.log('SRANDMEMBER(Random member from Set A):', await client.sRandMember('setA'));
    console.log('SPOP (Remove random member from Set A):' , await client.sPop('setA'));
    console.log('Set A after SPOP:', await client.sMembers('setA'));

    //Move elements between sets
    await client.sMove('setB','setA', 'date');  //move 'date' from setB to setA
    console.log('Set  A after SMOVE:' , await client.sMembers('setA'));
    console.log('Set B after SMOVE:', await client.sMembers('setB'));


    //Remove specific elements
    await client.sRem('setB', 'banana');
    console.log('Set B after SREM:' , await client.sMembers('setB'));


    //Iterating over sets with SSCAN- not workign
    console.log('SSCAN (Iterate over Set C):');
    let cursor = '0'; // Start with cursor as a string
    
    do {
      const result = await client.sScan('setC', cursor); // Fetch SSCAN result
      console.log('Raw Result:', result);
    
      // Check if result is an object with properties
      if (Array.isArray(result)) {
        const [nextCursor, elements] = result; // Destructure if result is an array
        console.log('Cursor:', cursor, 'Elements:', elements);
        cursor = nextCursor; // Update the cursor
      } else {
        // Handle if result is an object
        cursor = result.cursor || '0';
        const elements = result.elements || [];
        console.log('Cursor:', cursor, 'Elements:', elements);
      }
    } while (cursor !== '0'); // Loop until the cursor is "0"
    
    
    client.quit();
})();