const amqp = require('amqplib/callback_api');

// amqp://<user>?:?<password>?@?<host:port>
amqp.connect("amqp://marina:abcd1234@localhost:49158",(err,con)=>{

    if(err){
      throw err;
    }

    con.createChannel((err1, channel)=>{
      if(err1){
        throw err1;
      }

      let queueAB="mensajesAB";
      let queueBA="mensajesBA"
      let stdin = process.openStdin();

      channel.assertQueue(queueBA, {
        durable: false
      });

      channel.consume(queueBA, (message)=>{
        console.log("-> "+ message.content.toString());
      }, {noAck: true});

      stdin.addListener("data", function(message) {

        channel.assertQueue(queueAB, {
          durable: false
        });

        console.log("");
        channel.sendToQueue(queueAB, Buffer.from(message));


      });

    });

});
