const client = require('../client');

async function monitorKeyEventsAndKeyspace() {
    try {
        console.log("Subscribing to keyspace and key event notifications...");

        // Monitor keyspace events (operations on keys like SET, DEL, EXPIRE, etc.)
        await client.pSubscribe('__keyspace@0__:*', (event, channel) => {
            const key = channel.split(':')[1]; // Extract key name from the channel
            console.log(`[Keyspace] Event: ${event}, Key: ${key}`);
        });

        // Monitor key events (specific events like 'expired', 'evicted', etc.)
        await client.pSubscribe('__keyevent@0__:*', (event, channel) => {
            console.log(`[KeyEvent] Event: ${event}`);
        });

        console.log("Subscriptions are active. Listening for events...");
    } catch (error) {
        console.error('Error monitoring keyspace or key events:', error);
    }
}

// Start monitoring
monitorKeyEventsAndKeyspace();
