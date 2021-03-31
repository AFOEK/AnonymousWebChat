const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4040).sockets;
const bodyParser = require('body-parser');

mongo.connect('mongodb://127.0.0.1/anonchat', function(err, db){
    if(err){
        throw err;
    }

    console.log('Databases is already created...');

    client.on('connection', function(socket){
        
    })
})