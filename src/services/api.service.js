import axios from "axios"


const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://underdico-playground.herokuapp.com/api"
    : "https://underdico-playground.herokuapp.com/api"

async function get(endpoint) {
  return await axios.get(`${BASE_URL}/${endpoint}`) // return error if server is down
}

async function post(endpoint, data = null, headers = null) {
  const options = {
    url: `${BASE_URL}/${endpoint}`,
    method: 'POST',
    headers: {
      Authorization: headers && headers.token ? `Bearer ${headers.token}` : undefined
    },
    data
  }
  return await axios( options)
}

async function patch(endpoint, data = null) {
  return await axios.patch(`${BASE_URL}/${endpoint}`, data)
}

export { get, post, patch }

