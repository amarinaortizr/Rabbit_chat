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
      let message = "Hola de Ana";

      channel.assertQueue(queueAB, {
        durable: false
      });

      channel.sendToQueue(queueAB, Buffer.from(message));
      console.log("Mensaje enviado de A");

      console.log("Esperando mensajes de B");

      channel.assertQueue(queueBA, {
        durable: false
      });

      channel.consume(queueBA, (message)=>{
        console.log("-> "+ message.content.toString());
      }, {noAck: true});



    });

});
