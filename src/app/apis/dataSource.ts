import { DataSource } from 'src/app/models'
import axios from 'axios'
import { getCookie } from 'src/utils/cookies'

const controllerName = 'datasources'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const getAll = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: baseUrl,
      timeout: 15000,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const add = async (data: DataSource) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'TDAuthorization': getCookie('token'),
      },
      url: baseUrl,
      data,
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const getById = async (id: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/${id}`,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const update = async (id: string, data: DataSource) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
      data,
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const _delete = async(id: string) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${baseUrl}/${id}`,
      headers: {
        'Authorization': authorization,
        'TDAuthorization': getCookie('token'),
      },
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

export const dataSourceApi = {
  getAll,
  add,
  getById,
  update,
  delete: _delete,
}
