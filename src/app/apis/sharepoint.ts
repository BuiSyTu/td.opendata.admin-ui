import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const getUserTokenKey = async(user: string, pass: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/usertokenkey?user=${user}&pass=${pass}`,
      timeout: 15000,
      headers: {
        Authorization: authorization,
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
        Authorization: authorization,
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

