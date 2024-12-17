
const client = require('../client');


async function publishMessages(){
    const channel = 'news';
    const messages = ['Breaking News!' , 'Sports Update', 'Weather Report'];

    for(const message of messages){
        console.log(`Publishing: ${message}`);
        await client.publish(channel , message);
        await new Promise(resolve => setTimeout(resolve , 3000));  //simulating delay

    }

    await client.quit();
}

publishMessages().catch(console.error);