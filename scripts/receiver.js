const { ServiceBusClient } = require("@azure/service-bus");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.SB_CONNECTION_STRING;
const queueOrTopicName = process.env.QUEUEORTOPIC;
const subscriptionName = process.env.SUBSCRIPTION_NAME; // need when is a topic

async function receiver() {
  const sbClient = new ServiceBusClient(connectionString);
  const receiver = sbClient.createReceiver(queueOrTopicName, subscriptionName);

  const messageHandler = async (messageReceived) => {
    console.log(`Received message: ${JSON.stringify(messageReceived.body)}`);
  };

  const errorHandler = async (error) => {
    console.log(error);
  };

  receiver.subscribe({
    processMessage: messageHandler,
    processError: errorHandler,
  });
}

receiver().catch((err) => {
  console.log("ERROR: ", err);
  process.exit(1);
});
