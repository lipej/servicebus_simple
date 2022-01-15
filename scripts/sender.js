const { ServiceBusClient } = require("@azure/service-bus");
const dotenv = require("dotenv");

const mail = require("../utils/email");

dotenv.config();

const connectionString = process.env.SB_CONNECTION_STRING;
const queueOrTopicName = process.env.QUEUEORTOPIC;

const mailMessage = mail("from", "to", "subject");

async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  const sender = sbClient.createSender(queueOrTopicName);

  try {
    await sender.sendMessages({
      contentType: "application/json",
      body: mailMessage,
    });

    console.log(`Sent a messages to the queue: ${queueOrTopicName}`);

    await sender.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
