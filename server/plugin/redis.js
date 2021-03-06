const assert = require('http-assert');
const redis = require('redis');
const client = redis.createClient(process.env.REDISPASS ? { password: process.env.REDISPASS } : {});

client.connect();

client.on('error', err => {
  console.log(err);
  assert(false, 500, err);
});
client.on('connect', function () {
  console.info('redis连接成功...');
});
module.exports = client;
