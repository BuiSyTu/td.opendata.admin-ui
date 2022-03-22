import { DataType } from '../models'
import axios from 'axios'

const ver = '1'
const controllerName = 'datatypes'
const baseUrl = `https://192.168.2.169:5001/api/v${ver}/${controllerName}`


const getAll = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: baseUrl,
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const add = async (data: DataType) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: baseUrl,
      data,
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const getById = async (id: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/${id}`,
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const update = async (id: string, data: DataType) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
      data,
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const _delete = async(id: string) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${baseUrl}/${id}`,
      timeout: 15000,
    })

    return res?.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const dataTypeApi = {
  getAll,
  add,
  getById,
  update,
  delete: _delete,
}
