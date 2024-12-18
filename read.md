#generalCommands


#string
-store sequences of bytes including text, serialized objects, and binary arrays.
-redis keys are string
-By default, a single Redis string can be a maximum of 512 MB.
-values can be strings of any kind, can store jpeg image inside a value. A value can't be bigger than 512 MB.
-set, get => the way we set and retrieve a string value.
    *set - it is used to store the value in form of string, will override the if the key already exists even it has different data type value.
        - there are important options associated with set
                -NX => set to fail if key already exists.
                -XX => only succeed if key already exists.
    *get - it is used to fetch the key's value.
-GETSET => Atomically sets key to value and returns the old value stored at key.
-Strings as counter (   INCR, INCRBY , DECR , DECRBY)  
Explanation for Each Command:
APPEND: Appends a value to an existing key. If the key doesn't exist, it behaves like SET.
DECR: Decrements the integer value of a key.
DECRBY: Decrements a key's integer value by a specified amount.
GET: Gets the value stored at the key.
GETDEL: Gets the value and deletes the key.
GETEX: Gets the value of a key and sets an expiration.
GETRANGE: Retrieves a substring from a string stored at a key.
GETSET: Sets the key to a new value and returns the old value.
INCR: Increments the integer value of a key.
INCRBY: Increments the integer value of a key by a specified amount.
INCRBYFLOAT: Increments the value by a floating-point number.
LCS: Finds the longest common subsequence between two strings.
MGET: Gets the values of multiple keys.
MSET: Sets multiple key-value pairs.
MSETNX: Sets multiple keys only if none of them exist.
PSETEX: Sets a key with expiration time in milliseconds.
SET: Sets a key's value.
SETEX: Sets a key with expiration time in seconds.
SETNX: Sets a key only if it doesn't exist.
SETRANGE: Overwrites part of a string stored at a key.
STRLEN: Gets the length of the value stored at a key.
SUBSTR: Retrieves a substring of the value stored at a key.  



#JSON
JSON.SET	Sets a JSON object or updates specific fields.
JSON.GET	Retrieves JSON data by key and path.
JSON.DEL	Deletes specific fields or entire JSON objects.
JSON.ARRAPPEND	Appends values to a JSON array.
JSON.ARRINSERT	Inserts values into a JSON array at a specific position.
JSON.ARRINDEX	Finds the index of a value in a JSON array.
JSON.ARRLEN	Gets the length of a JSON array.
JSON.NUMINCRBY	Increments a numeric field by a specific amount.



#LISTS

Redis lists are linkedLists of string values. Redis lists are frequently used to:
 -Implement Stacks and Queues
 -Build queue management for background worker systems.
 
 -Basic Commands
    LPUSH - adds a new element to the head of the list
    RPUSH - add new element to the tail fo the list
    LPOP  - removes and returns an element from the head of the list.
    RPOP - removes and return an element from the tails of the list.
    LLEN - returns the length of the list.
    LMOVE - automatically moves elements from one list to another
    LRANGE - extracts a range of elements from a list.
    LTRIM - reduces a list to the specified range of elements.

-Blocking Commands
    BLPOP - removes and returns an element from the head of the list. If the list is empty, the command blocks untill an element becomes available or until the specified timeout is reached.
    BLMOVE - automatically moves element from a source list to target list. If the source is empty, the command will block until a new element becomes  available.


-Common use cases for lists
Lists are useful for a number of tasks, two very representative use cases are the following:

Remember the latest updates posted by users into a social network.
Communication between processes, using a consumer-producer pattern where the producer pushes items into a list, and a consumer (usually a worker) consumes those items and executes actions. Redis has special list commands to make this use case both more reliable and efficient.


-Limits
The max length of a Redis list is 2^32 - 1 (4,294,967,295) elements.



#SETS
A Redis set is an unordered collection of unique strings (members). You can use Redis sets to efficiently:

Track unique items (e.g., track all unique IP addresses accessing a given blog post).
Represent relations (e.g., the set of all users with a given role).
Perform common set operations such as intersection, unions, and differences.


-Basic commands
SADD adds a new member to a set.
SREM removes the specified member from the set.
SISMEMBER tests a string for set membership.
SINTER returns the set of members that two or more sets have in common (i.e., the intersection).
SCARD returns the size (a.k.a. cardinality) of a set.





#Redis hashes
Redis hashes are record types structured as collections of field-value pairs. You can use hashes to represent basic objects and to store groupings of counters, among other things.

-
Quick starts
Client tools
Client APIs
Understand data types
Strings
JSON
Lists
Sets
Hashes
Sorted sets
Streams
Geospatial
Bitmaps
Bitfields
Probabilistic
Time series
Interact with data
Redis for AI
Use Redis
Reference
Libraries and tools
Redis products
Commands
DocsDocs
→
Develop with Redis
→
Understand Redis data types
→
Redis hashes
Redis hashes
Introduction to Redis hashes

Redis hashes are record types structured as collections of field-value pairs. You can use hashes to represent basic objects and to store groupings of counters, among other things.


>_ Redis CLI

Python

Node.js
const res1 = await client.hSet(
  'bike:1',
  {
    'model': 'Deimos',
    'brand': 'Ergonom',
    'type': 'Enduro bikes',
    'price': 4972,
  }
)
console.log(res1) // 4

const res2 = await client.hGet('bike:1', 'model')
console.log(res2)  // 'Deimos'

const res3 = await client.hGet('bike:1', 'price')
console.log(res3)  // '4972'

const res4 = await client.hGetAll('bike:1')
console.log(res4)  
/*
{
  brand: 'Ergonom',
  model: 'Deimos',
  price: '4972',
  type: 'Enduro bikes'
}
*/


Java-Sync

Go

C#
While hashes are handy to represent objects, actually the number of fields you can put inside a hash has no practical limits (other than available memory), so you can use hashes in many different ways inside your application.

The command HSET sets multiple fields of the hash, while HGET retrieves a single field. HMGET is similar to HGET but returns an array of values:


>_ Redis CLI

Python

Node.js
const res5 = await client.hmGet('bike:1', ['model', 'price'])
console.log(res5)  // ['Deimos', '4972']


Java-Sync

Go

C#
There are commands that are able to perform operations on individual fields as well, like HINCRBY:


>_ Redis CLI

Python

Node.js
const res6 = await client.hIncrBy('bike:1', 'price', 100)
console.log(res6)  // 5072
const res7 = await client.hIncrBy('bike:1', 'price', -100)
console.log(res7)  // 4972


Java-Sync

Go

C#
You can find the full list of hash commands in the documentation.

It is worth noting that small hashes (i.e., a few elements with small values) are encoded in special way in memory that make them very memory efficient.

-Basic commands
HSET: sets the value of one or more fields on a hash.
HGET: returns the value at a given field.
HMGET: returns the values at one or more given fields.
HINCRBY: increments the value at a given field by the integer provided.


-Common field expiration use cases
Event Tracking: Use a hash key to store events from the last hour. Set each event's TTL to one hour. Use HLEN to count events from the past hour.

Fraud Detection: Create a hash with hourly counters for events. Set each field's TTL to 48 hours. Query the hash to get the number of events per hour for the last 48 hours.

Customer Session Management: Store customer data in hash keys. Create a new hash key for each session and add a session field to the customer’s hash key. Expire both the session key and the session field in the customer’s hash key automatically when the session expires.

Active Session Tracking: Store all active sessions in a hash key. Set each session's TTL to expire automatically after inactivity. Use HLEN to count active sessions.


Redis sorted sets
Introduction to Redis sorted sets

A Redis sorted set is a collection of unique strings (members) ordered by an associated score. When more than one string has the same score, the strings are ordered lexicographically. Some use cases for sorted sets include:

Leaderboards. For example, you can use sorted sets to easily maintain ordered lists of the highest scores in a massive online game.
Rate limiters. In particular, you can use a sorted set to build a sliding-window rate limiter to prevent excessive API requests.
You can think of sorted sets as a mix between a Set and a Hash. Like sets, sorted sets are composed of unique, non-repeating string elements, so in some sense a sorted set is a set as well.

However while elements inside sets are not ordered, every element in a sorted set is associated with a floating point value, called the score (this is why the type is also similar to a hash, since every element is mapped to a value).

Moreover, elements in a sorted set are taken in order (so they are not ordered on request, order is a peculiarity of the data structure used to represent sorted sets). They are ordered according to the following rule:

If B and A are two elements with a different score, then A > B if A.score is > B.score.
If B and A have exactly the same score, then A > B if the A string is lexicographically greater than the B string. B and A strings can't be equal since sorted sets only have unique elements.





#PUB-SUB
-What is Pub/Sub?
Redis Pub/Sub (Publish/Subscribe) is a messaging mechanism that allows a publisher to send messages to channels, and subscribers to listen to those channels.
Key Concepts:
Publisher: Sends messages to a channel.
Subscriber: Listens to messages from a channel.
Channel: Acts as a message routing entity.



Redis keyspace notifications
Monitor changes to Redis keys and values in real time

Keyspace notifications allow clients to subscribe to Pub/Sub channels in order to receive events affecting the Redis data set in some way.

Examples of events that can be received are:

All the commands affecting a given key.
All the keys receiving an LPUSH operation.
All the keys expiring in the database 0.
Note: Redis Pub/Sub is fire and forget; that is, if your Pub/Sub client disconnects, and reconnects later, all the events delivered during the time the client was disconnected are lost.

Type of events
Keyspace notifications are implemented by sending two distinct types of events for every operation affecting the Redis data space. For instance a DEL operation targeting the key named mykey in database 0 will trigger the delivering of two messages, exactly equivalent to the following two PUBLISH commands:

PUBLISH __keyspace@0__:mykey del
PUBLISH __keyevent@0__:del mykey
The first channel listens to all the events targeting the key mykey and the other channel listens only to del operation events on the key mykey

The first kind of event, with keyspace prefix in the channel is called a Key-space notification, while the second, with the keyevent prefix, is called a Key-event notification.

In the previous example a del event was generated for the key mykey resulting in two messages:

The Key-space channel receives as message the name of the event.
The Key-event channel receives as message the name of the key.
It is possible to enable only one kind of notification in order to deliver just the subset of events we are interested in.




K     Keyspace events, published with __keyspace@<db>__ prefix.
E     Keyevent events, published with __keyevent@<db>__ prefix.
g     Generic commands (non-type specific) like DEL, EXPIRE, RENAME, ...
$     String commands
l     List commands
s     Set commands
h     Hash commands
z     Sorted set commands
t     Stream commands
d     Module key type events
x     Expired events (events generated every time a key expires)
e     Evicted events (events generated when a key is evicted for maxmemory)
m     Key miss events (events generated when a key that doesn't exist is accessed)
n     New key events (Note: not included in the 'A' class)
A     Alias for "g$lshztxed", so that the "AKE" string means all the events except "m" and "n".





<!-- git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/KSP-75/POC_redis.git
git push -u origin main -->



Common Patterns and Their Use Cases
Pattern	Description
__keyspace@<db>__:*	Monitors all operations performed on keys in the specified database.
__keyspace@<db>__:myKey	Monitors operations on a specific key (myKey) in the specified database.
__keyevent@<db>__:*	Monitors all key events in the specified database (e.g., expired, evicted, set, del, etc.).
__keyevent@<db>__:expired	Monitors only expired events for all keys in the specified database.
__keyevent@<db>__:evicted	Monitors only evicted keys in the specified database.
__keyevent@<db>__:set	Monitors only set operations for all keys in the specified database.
__keyevent@<db>__:del	Monitors only del operations for all keys in the specified database.
__keyevent@<db>__:rename_from	Monitors when keys are renamed (original key) in the specified database.
__keyevent@<db>__:rename_to	Monitors when keys are renamed (new key) in the specified database.



Key Differences Between Keyspace and Key Event Patterns
Feature	Keyspace Notifications	Key Event Notifications
Pattern	__keyspace@<db>__:*	__keyevent@<db>__:*
Focus	Monitors all operations on keys	Monitors specific events for keys
Event Data	Reports operation type (set, del, etc.)	Reports result (expired, evicted)
Key Name	Provides the name of the key	Does not always include key name
Use Case	Broad monitoring of key operations	Targeted tracking of key outcomes












---timeseries se expired key ka data kaise laarhe=kt,
---edge case for key copy, when expire and insert same at the same time






RabbitMQ is an open-source message broker software that's used for: 
Processing reliable background jobs
High throughput
Intercommunication and integration within applications
Complex routing
Working with rapid request-response web servers
Sharing loads between workers that have high load
Long-running tasks such as PDF conversion or image scaling