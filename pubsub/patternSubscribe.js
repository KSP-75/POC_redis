const client = require('../client');

async function subscribeToPattern() {

    console.log("Subscribing to pattern: 'news*'");
    await client.pSubscribe('news*', (message, channel) => {
        console.log(`Received on ${channel}: ${message}`);
    });
}

subscribeToPattern().catch(console.error);
