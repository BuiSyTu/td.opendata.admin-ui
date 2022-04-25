import axios from 'axios'

const baseUrl = `https://api.hanhchinhcong.net/opendatanew_sp`
const bearerToken = 'Bearer 1a2d5c3d-8e81-332a-85ee-fb0966045122'

const getUserTokenKey = async(user: string, pass: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/usertokenkey?user=${user}&pass=${pass}`,
      timeout: 15000,
      headers: {
        Authorization: bearerToken,
      },
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

const getUserInfo = async(token: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/userinfo`,
      timeout: 15000,
      headers: {
        Authorization: bearerToken,
        userTokenKey: token,
      },
    })

    return res?.data
  } catch (error: any) {
    console.error(error.response)
    return null
  }
}

export const sharepointApi = {
  getUserInfo,
  getUserTokenKey,
}

