const client = require("../client");

(async ()=>{
    await client.configSet('notify-keyspace-events' , 'KEA');

    const key = "Key1"
    await client.set(key, 'value1');
    console.log('Set Key1 ');


    // const copyKey = "copy"+key;
    await client.set(`copy:${key}`, "");

    await client.expire(`copy:${key}` , 10);
    console.log('Expired testkey for 10 seconds');

    // await client.quit();

})();