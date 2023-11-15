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
    // TODO: get data dynamically for "healthcheck"
    const data = {
      name: 'string',
      uri: 'string',
      is_paused: true,
      num_retries: 5,
      uptime_sla: 100,
      response_time_sla: 100,
      use_ssl: true,
      response_status_code: 0,
      check_interval_in_seconds: 86400,
    }
    const result = await producer.send({
      topic,
      messages: [
        {
          // TODO: add logic for partitioning of messages
          partition: 1, // if not specified, msg will be sent based on key
          key: 'heartbeat', // if not specified, msg will be sent in round-robin fashion
          value: JSON.stringify(data),
        },
      ],
    })
    logger.info(`Message sent`, { msg: data, res: result })
    await producer.disconnect()
  } catch (error) {
    logger.error(`Kafka producer error`, { error })
  }
}

init()
