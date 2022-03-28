import { Dataset } from '../models'
import axios from 'axios'
import { notification } from 'antd'

const ver = '1'
const controllerName = 'datasets'
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

const add = async (data: Dataset) => {
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

const update = async (id: string, data: Dataset) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
      data,
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    const { status } = error.response

    if (status === 406) {
      notification.error({
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
  } catch (error) {
    console.error(error)
    return null
  }
}

export const datasetApi = {
  getAll,
  add,
  getById,
  update,
  delete: _delete,
}
