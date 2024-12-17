
const client = require('./client');

(async()=>{
    //adds elements to the list
    // await client.lPush('myList' ,[ 'a' , 'b' , 'c']);
    // console.log('LPUSH:', await client.lRange('myList',0,10));

    //append elements to the list
    // await client.rPush('myList' ,[ 'd' , 'e']); 
    // console.log('RPUSH:', await client.lRange('myList',0,-1));

    //get list length
    console.log("LLEN: " , await client.lLen('myList'));

    //get elements by index
    console.log('LINDEX(index 2):' , await client.lIndex('myList' ,2));

    //insert element before/after a value
    // await client.lInsert('myList', 'BEFORE', 'a' , 'x');
    // await client.lInsert('myList', 'AFTER', 'a','y');
    // console.log('LINSERT: ' , await client.lRange('myList', 0 , -1));


    //remove elements
    // await client.lRem('myList' , 1 , 'x');
    // console.log("LREM:" , await client.lRange('myList' , 0, -1));

    //trim the list
    // await client.lTrim('myList' , 1,3);
    // console.log("LTRIM:" , await client.lRange('myList',0,-1));

    //set value at a specific index
    // await client.lSet('myList' , 1, 'z');
    // console.log("LSET:" , await client.lRange('myList', 0 , -1));

    //pop elements
    // console.log('LPOP:', await client.lPop('myList'));
    // console.log('RPOP:', await client.rPop('myList'));

    //push elements only is list exists
    // await client.rPushX('myList', 'k'); //add to the right only if list exists
    // await client.lPushX('myList' , 'j'); //add to the left only if list exists
    // console.log('RPUSHX & LPUSHX:', await client.lRange('myList' , 0,-1));


    //move elements between lists
    // await client.lPush('anotherList' ,[ '3' ,'2']);
    // await client.rPopLPush('anotherList', 'myList');
    // console.log('RPOPLPUSH:' , await client.lRange('myList' , 0 , -1));


    //Block pop operations
    //Use BLPOP/BRPOP to block until an element is available

    // setTimeout(() => {
    //     client.rPush('myList', 'i'); // Add 'q' to unblock
    //   }, 5000);
    //   console.log('BLPOP:', await client.blPop('myList', 0)); // Blocks until element is available


    await client.quit();

})();