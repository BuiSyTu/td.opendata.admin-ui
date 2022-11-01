import { DataType, DataTypeListFilter } from 'src/app/models'

import axios from 'axios'
import { getCookie } from 'src/utils/cookies'
import { toQueryString } from 'src/utils/common'

const controllerName = 'datatypes'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const getAll = async (listFilter?: DataTypeListFilter) => {
    try {
        const params = toQueryString(listFilter)
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}?${params}`,
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

const add = async (data: DataType) => {
    try {
        const res = await axios({
            method: 'POST',
            headers: {
                Authorization: authorization,
                'Content-Type': 'application/json',
                TDAuthorization: getCookie('token'),
            },
            url: baseUrl,
            data,
            timeout: 15000,
        })

        return [res?.status, res?.data]
    } catch (error: any) {
        return [error.response?.status, null]
    }
}

const getById = async (id: string) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/${id}`,
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

const update = async (id: string, data: DataType) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${baseUrl}/${id}`,
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

const _delete = async (id: string) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${baseUrl}/${id}`,
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

export const dataTypeApi = {
    getAll,
    add,
    getById,
    update,
    delete: _delete,
}
