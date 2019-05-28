import axios from "axios"


const BASE_URL = process.env.VUE_APP_API

async function get(endpoint = null, headers = null) {
  const options = {
    Authorization: headers ? `Bearer ${headers.token}` : null
  }
  if (!endpoint) {
    return await axios({
      method: 'GET',
      url: `${BASE_URL}`,
      headers: options
    }) // return error if server is down
  }
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/${endpoint}`,
    headers: options
  }) // return error if server is down
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

