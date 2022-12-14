import axios from 'axios'
import { getCookie } from 'src/utils/cookies'

const controllerName = 'stats'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const getWidget = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/widget`,
            headers: {
                Authorization: authorization,
                TDAuthorization: getCookie('token'),
            },
            timeout: 15000,
        })

        return [res?.status, res?.data]
    } catch (error: any) {
        return [error.response?.status, null]
    }
}

const getOverview = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/overview`,
            headers: {
                Authorization: authorization,
                TDAuthorization: getCookie('token'),
            },
            timeout: 15000,
        })

        return [res?.status, res?.data]
    } catch (error: any) {
        return [error.response?.status, null]
    }
}

export const statsApi = {
    getWidget,
    getOverview,
}
