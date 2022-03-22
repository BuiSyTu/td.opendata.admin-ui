import axios from 'axios'

const ver = '1'
const controllerName = 'forward'
const baseUrl = `https://192.168.2.169:5001/api/v${ver}/${controllerName}`

export default class ForwardApi {
  async forward(axiosConfig: any) {
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
    } catch (error) {
      console.error(error)
      return null
    }
  }
}