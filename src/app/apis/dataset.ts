import { Dataset } from '../models'
import axios from 'axios'
import { notification } from 'antd'

const controllerName = 'datasets'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`


const getAll = async () => {
  try {    
    const res = await axios({
      method: 'GET',
      url: baseUrl,
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

const add = async (data: Dataset) => {
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

const getData = async (id: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/${id}/data`,
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

const update = async (id: string, data: Dataset) => {
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
    const { status } = error.response

    if (status === 406) {
      notification.warning({
        message: 'Thất bại!',
        description: 'Không có thông tin nào thay đổi',
      })
    } else {
      notification.error({
        message: 'Thất bại!',
        description: 'Xảy ra lỗi trong quá trình thực hiện!',
      })
    }

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
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const approved = async(id: string) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${baseUrl}/approved/${id}`,
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const rejected = async(id: string) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${baseUrl}/rejected/${id}`,
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const syncData = async(id: string) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${baseUrl}/syncdata/${id}`,
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

export const datasetApi = {
  getAll,
  add,
  getById,
  update,
  delete: _delete,
  approved,
  rejected,
  syncData,
  getData,
}
