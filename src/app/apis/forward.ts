import axios from 'axios'

const ver = '1'
const controllerName = 'forward'
const baseUrl = `https://192.168.2.169:5001/api/v${ver}/${controllerName}`

const forward = async(axiosConfig: any) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: baseUrl,
      data: axiosConfig,
      timeout: 15000,
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

export const forwardApi = {
  forward,
}