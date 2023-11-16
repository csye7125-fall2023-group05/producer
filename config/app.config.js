import 'dotenv/config'

const { BROKER_0, BROKER_1, BROKER_2, CLIENT_ID, TOPIC, URL } = process.env
const producerConfig = {
  BROKER_0,
  BROKER_1,
  BROKER_2,
  CLIENT_ID,
  TOPIC,
  URL,
}

export default producerConfig
