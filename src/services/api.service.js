import axios from "axios"

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://underdico-playground.herokuapp.com/api"
    : "http://prod-url.com"

async function get(endpoint) {
  return await axios.get(`${BASE_URL}/${endpoint}`) // return error if server is down
}

async function post(endpoint, data = null) {
  return await axios.post(`${BASE_URL}/${endpoint}`, data)
}

export { get, post }

