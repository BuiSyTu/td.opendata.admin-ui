import axios from 'axios'
import { getCookie } from 'src/utils/cookies'

const controllerName = 'forward'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const forward = async (axiosConfig: any) => {
    try {
        const res = await axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization,
                TDAuthorization: getCookie('token'),
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
