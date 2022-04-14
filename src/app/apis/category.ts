import { Category } from '../models'
import axios from 'axios'

const controllerName = 'categories'
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
      }
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const add = async (data: Category) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
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
      },
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const update = async (id: string, data: Category) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
      headers: {
        'Authorization': authorization,
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
      },
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

export const categoryApi = {
  getAll,
  add,
  getById,
  update,
  delete: _delete,
}

