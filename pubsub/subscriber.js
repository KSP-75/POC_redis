
const client = require('../client');

async function subscribeToChannel(){
    const channel = 'news';

    console.log(`Subscibing to ${channel}...`);

    await client.subscribe(channel , (message)=>{
        console.log(`Received: ${message}`);
    });
}

subscribeToChannel().catch(console.error);