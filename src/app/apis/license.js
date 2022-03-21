import axios from 'axios'

const ver = '1'
const controllerName = 'licenses'
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

const add = async (data) => {
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

const getById = async (id) => {
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

const update = async (id, data) => {
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

const _delete = async(id) => {
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

export const licenseApi = {
  getAll,
  add,
  getById,
  update,
  delete: _delete,
}
