import axios from "axios"

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : "http://prod-url.com"

async function get(endpoint) {
  return await axios.get(`${BASE_URL}/${endpoint}`) // return error if server is down
}

export { get }
