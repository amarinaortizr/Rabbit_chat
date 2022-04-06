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

      let queueBA="mensajesBA"
      let queueAB="mensajesAB";
      let message = "Hola de Melissa";

      console.log("Esperando mensajes de A");

      channel.assertQueue(queueAB, {
        durable: false
      });

      channel.consume(queueAB, (message)=>{
        console.log("-> "+ message.content.toString());
      }, {noAck: true});

      channel.assertQueue(queueBA, {
        durable: false
      });

      channel.sendToQueue(queueBA, Buffer.from(message));
      console.log("Mensaje enviado de B");







    });

});
