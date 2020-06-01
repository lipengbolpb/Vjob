'use strict';
const redis = require('redis'),
      EventEmitter = require('events').EventEmitter;

const options={
    host:'127.0.0.1',
    port:6379,
    path:null, // The UNIX socket string of the Redis server
    password:null,
    db:null
}, client = redis.createClient(options);

client.on('error', function (err) {
    console.log('RedisError ', err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});

// client.hmset(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
// // Works the same as
// client.hmset("key", ["test keys 1", "test val 1", "test keys 2", "test val 2"], function (err, res) {});
// // Or
// client.hmset("key", "test keys 1", "test val 1", "test keys 2", "test val 2", function (err, res) {});

client.get("missingkey", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});

client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");
client.hgetall("hosts", function (err, obj) {
    console.dir(obj);
});
client.hmset(key2, {
    "0123456789": "abcdefghij", // NOTE: key and value will be coerced to strings
    "some manner of key": "a type of value"
});
client.hgetall("key2", function (err, obj) {
    console.dir(obj);
});
