import axios from 'axios'

const ver = '1'

const controllerName = 'providertypes'
const baseUrl = `https://192.168.2.169:5001/api/v${ver}/${controllerName}`
const bearerToken = 'Bearer 1a2d5c3d-8e81-332a-85ee-fb0966045122'

export default class SharepointApi1 {
  async getUserTokenKey(user, pass) {
    try {
      const res = await axios({
        method: 'GET',
        url: baseUrl,
        timeout: 15000,
        headers: {
          Authorization: bearerToken,
        },
        data: {
          user,
          pass,
        }
      })
  
      return res?.data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
