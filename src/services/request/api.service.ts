/* import axios from "axios"
import Store from '../../store'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_PROD,
  timeout: 10000
})

async function Get(endpoint = null, headers = null) {
  const options = {
    ...headers,
    Authorization: `Bearer ${headers && headers.token ? headers.token : Store.credentials.token}`
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

async function Post(endpoint: string, data?: Object, headers) {
  const options = {
    url: `/${endpoint}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${headers && headers.token ? headers.token : Store.credentials.token}`
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
      Authorization: `Bearer ${headers && headers.token ? headers.token : Store.credentials.token}`
    },
    data
  }
  return await api(options)
}

async function Put(endpoint, data, headers = null) {
  const options = {
    url: `/${endpoint}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${headers && headers.token ? headers.token : Store.credentials.token}`
    },
    data
  }
  return await api(options)
}

async function Delete(endpoint, headers = null) {
  const options = {
    url: `/${endpoint}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${headers && headers.token ? headers.token : Store.credentials.token}`
    }
  }
  return await api(options)
}

export { Get, Post, Patch, Put, Delete }
*/
