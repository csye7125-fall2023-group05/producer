import 'dotenv/config'

const { BROKER_0, BROKER_1, BROKER_2, CLIENT_ID, TOPIC, URL, NAME, RETRIES } =
  process.env
const producerConfig = {
  BROKER_0,
  BROKER_1,
  BROKER_2,
  CLIENT_ID,
  TOPIC,
  ID,
  URL,
  NAME,
  RETRIES,
}

export default producerConfig
