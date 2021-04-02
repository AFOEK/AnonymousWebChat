const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4040).sockets;
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


mongo.connect('mongodb://127.0.0.1/anonchat', function(err, db){
    if(err){
        throw err;
    }

    console.log('Databases is already created...');

    client.on('connection', function(socket){
        let chat = db.collection('chats');
        sendStat = function(s){
            socket.emit('status',s);
        }

        chat.find().limit(250).sort({_id:1}).toArray(function(err,res){
            if(err){
                throw err;
            }

            socket.emit('ouput', res);
        });

        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;

            if(name== '' || message==''){
                sendStat('Please enter a name and message');
            }else{
                chat.insert({name: name, message: message}, function(){
                    client.emit('output', [data]);

                    sendStat({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });
        socket.on('clear', function(data){
            chat.remove({}, function(){
                socket.emit('Cleared');
            });
        });
    });
});