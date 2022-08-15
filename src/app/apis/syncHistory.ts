import { SyncHistoryListFilter } from 'src/app/models/SyncHistory'

import axios from 'axios'
import { getCookie } from 'src/utils/cookies'
import { toQueryString } from 'src/utils/common'

const controllerName = 'synchistories'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`


const getAll = async (listFilter?: SyncHistoryListFilter) => {
    try {
        const params = toQueryString(listFilter)
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}?${params}`,
            headers: {
                'Authorization': authorization,
                'TDAuthorization': getCookie('token'),
            },
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

const getById = async (id: string) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/${id}`,
            headers: {
                'Authorization': authorization,
                'TDAuthorization': getCookie('token'),
            },
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

const _delete = async (id: string) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${baseUrl}/${id}`,
            headers: {
                'Authorization': authorization,
                'TDAuthorization': getCookie('token'),
            },
            timeout: 15000,
        })

        return res?.data
    } catch (error: any) {
        console.error(error.response)
        return null
    }
}

export const syncHistoryApi = {
    getAll,
    getById,
    delete: _delete,
}
