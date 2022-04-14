import axios from 'axios'

const controllerName = 'forward'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`

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