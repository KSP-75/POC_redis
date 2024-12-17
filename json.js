const client = require('./client');

(async ()=>{
    //storing a json object
    await client.json.set('jsonUser:1' , '$' , {
        name : 'Jian',
        age : 25,
        interests : ['Singing' , 'Fighting', 'Sports'],
    });
    console.log("Json obj stored");


    //getting the json object      
    const res1 = await client.json.GET('jsonUser:1', {path: ['name', 'interests']});  //this is working for path
    console.log("Res1.. " , res1);

    //update fields in the json object
    await client.json.set('jsonUser:1' , '$.age' , 26);
    console.log('Updated age.');

    //add new fields to the json object
    await client.json.set('jsonUser:1' , '$.location', 'Mars');  //add a new field
    console.log('Added Locaion.');


    //work with arrays
    await client.json.arrAppend('jsonUser:1','$.interests','Beating');  //append to array
    await client.json.arrInsert('jsonUser:1' , '$.interests' , 0 , 'hiking');
    const updatedInterests = await client.json.get('jsonUser:1','$.interests');   //doubt-why only interest array in not getting printed
    console.log('Updated Interests: ',updatedInterests);

    await client.json.numIncrBy('jsonUser:1' , '$.age' , 2);
    const updatedAge = await client.json.get('jsonUser:1' , '$.age');
    console.log('Updated age after increment: ' , updatedAge);

    //get specific fields - not working
    const name = await client.json.get('jsonUser:1', '$.name');
    console.log('Name ' , name);

    //delete a field
    await client.json.del('jsonUser:1' , '$.location');
    const res = await client.json.get('jsonUser:1');
    console.log('res', res);


    //getting index of value in array

    const interestIndex = await client.json.arrIndex('jsonUser:1', '$.interests', 'Singing');
    console.log('Index of interests array : ' , interestIndex);

    //getting array length
    const arrayLength = await client.json.arrLen('jsonUser:1' , '$.interests');
    console.log("Length of interests array : " ,arrayLength);



    await client.quit();



})();