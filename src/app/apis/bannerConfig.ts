import axios from 'axios'

import { BannerConfig } from '../models'
import { getCookie } from 'src/utils/cookies'

const controllerName = 'bannerconfigs'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const get = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}`,
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

const update = async (data: BannerConfig) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${baseUrl}`,
            headers: {
                Authorization: authorization,
                TDAuthorization: getCookie('token'),
            },
            data,
            timeout: 15000,
        })

        return [res?.status, res?.data]
    } catch (error: any) {
        return [error.response?.status, null]
    }
}

export const bannerConfigApi = {
    get,
    update,
}
