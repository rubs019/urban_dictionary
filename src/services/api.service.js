import axios from "axios"

const api = axios.create({
  baseURL: process.env.VUE_APP_API_PROD,
  timeout: 10000
})

async function Get(endpoint = null, headers = null) {
  const options = {
    Authorization: headers ? `Bearer ${headers.token}` : null
  }
  if (!endpoint) {
    return await api({
      method: 'GET',
      headers: options
    }) // return error if server is down
  }
  return await api({
    method: 'GET',
    url: `/${endpoint}`,
    headers: options
  }) // return error if server is down
}

async function Post(endpoint, data = null, headers = null) {
  const options = {
    url: `/${endpoint}`,
    method: 'POST',
    headers: {
      Authorization: headers && headers.token ? `Bearer ${headers.token}` : undefined
    },
    data
  }
  return await api(options)
}

async function Patch(endpoint, data = null, headers = null) {
  const options = {
    url: `/${endpoint}`,
    method: 'PATCH',
    headers: {
      Authorization: headers && headers.token ? `Bearer ${headers.token}` : undefined
    },
    data
  }
  return await api(options)
}

async function Put(endpoint, data, headers = null) {
  const options = {
    url: `/${endpoint}`,
    method: 'PUT',
    headers: headers,
    data
  }
  return await api(options)
}

export { Get, Post, Patch, Put }

