const amqp = require("amqplib");

const connectionString = "amqp://localhost:5672";
class RabbitMQ {
  constructor() {
    this.channel = null;
    this.connect();
  }

  async connect() {
    const connection = await amqp
      .connect("amqp://localhost:5672")
      .then(async (_) => {
        this.channel = await _.createChannel();
        console.log("rabbit connected");
      })
      .catch((err) => console.log(err));
  }
  async consumerMessage(queueName) {
    await this.channel.assertQueue(queueName, {
      durable: true,
    });
    this.channel.consume(queueName, (msg) => {
      const message = msg.content.toString();
      setTimeout(() => {
        console.log("processed:", message);
        this.channel.ack(msg);
      }, Math.random() * 1000);
    });
  }
  async producerMessage(queueName, data) {
    await this.channel.assertQueue(queueName, {
      durable: true,
    });
    const message = `ordered-queued-message: ehehehehhe`;

    console.log(`message: ${message}`);
    this.channel.sendToQueue(queueName, Buffer.from(message), {
      persistent: true,
    });
  }
  static getInstance() {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
    }
    return RabbitMQ.instance;
  }
}
const instanceRabbitMQ = RabbitMQ.getInstance();
module.exports = instanceRabbitMQ;
