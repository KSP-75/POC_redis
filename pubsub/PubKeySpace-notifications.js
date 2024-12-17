const client = require('../client');

async function triggerKeyspaceEvents() {

    await client.configSet('notify-keyspace-events', 'KEA');
    // Triggering keyspace events
    await client.set('testKey', 'value1');
    console.log('SET testKey');

    await client.expire('testKey', 10);
    console.log('EXPIRE testKey for 10 seconds');

    await client.del('testKey');
    console.log('DEL testKey');


    // Trigger key event: Expired
    await client.set('expiringKey', 'value');
    await client.expire('expiringKey', 5); // Set TTL for the key
    console.log('Set expiringKey with a TTL of 5 seconds.');

    // Trigger key event: Evicted
    // console.log('Trying to trigger eviction (requires Redis maxmemory policy)...');
    // for (let i = 0; i < 10 i++) {
    //     await client.set(`tempKey${i}`, 'value'); // Create many keys to exceed memory
    // }
    // console.log('Eviction keys created. Eviction will only occur if maxmemory is configured.');

    // Trigger key event: Rename
    await client.set('renameKey', 'value');
    await client.rename('renameKey', 'newKey');
    console.log('Renamed key from renameKey to newKey.');

    // Cleanup
    await client.del('newKey');
    console.log('Deleted newKey.');


    await client.quit();
}

triggerKeyspaceEvents().catch(console.error);
