
const client = require('../client');
const SubClient = require('./SubClient');


(async ()=>{
    console.log("Subscribing to keyspace and key event notifications...");

    //monitor keyevent events
    await SubClient.pSubscribe("__keyevent@0__:expired" , async (event)=>{
        console.log(`[KeyEvent] Event: ${event}`);

        const key = event.replace('copy:', '');

        console.log("Logging the splitted key here..." , key);

        const data = await client.getDel(key);

        console.log("The data is properly fetcched🫡...", data);
    })

})()