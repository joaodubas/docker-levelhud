#!/usr/bin/env node
var net = require('net');
var multilevel = require('multilevel');
var levelHUD = require('levelhud');

var db = multilevel.client();
var conn = net.connect({
  port: parseInt(process.env.LVLDB_PORT),
  host: process.env.LVLDB_HOST
});

console.log('Connect to multilevel through ' + process.env.LVLDB_HOST + ':' + process.env.LVLDB_PORT);
conn.pipe(db.createRpcStream()).pipe(conn);

new levelHUD().use(db).listen(parseInt(process.env.NODE_PORT));
