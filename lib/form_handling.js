function socket_connect(){
    var socket = io.connect('localhost:4040');

    if (socket !== undefined){
        console.log("Socket connected all is fine");
        socket.on('output', function(data){
            if(data.length){
                for(var x = 0;x <data.length;x++){
                    //make a chat bubble
                }
            }
        });

        socket.on('status',function(data){
            setStatus((typeof data === 'object')? data.message : data);

            if(data.clear){
                //clear text area
            }
        });
    }else{
        console.log("Socket not connected check code ASAP !")
    }
}

module.exports = {socket_connect};