import { Kafka } from 'kafkajs'
import logger from './config/logger.config.js'
import producerConfig from './config/app.config.js'

const { BROKER_0, BROKER_1, BROKER_2, CLIENT_ID, TOPIC } = producerConfig
const topic = TOPIC
const brokers = [BROKER_0, BROKER_1, BROKER_2]

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers,
})

const init = async () => {
  try {
    const producer = kafka.producer()
    await producer.connect()
    const result = await producer.send({
      topic,
      messages: [
        {
          partition: 1,
          key: 'heartbeat',
          value: `message from producer`,
        },
      ],
    })

    // console.log(`Sent msg: ${JSON.stringify(result)}`)
    logger.info(`Message sent`, { msg: result })
    await producer.disconnect()
  } catch (error) {
    logger.error(`Kafka producer error`, { error })
  }
}

init()
