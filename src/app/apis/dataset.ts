import { Dataset, DatasetListFilter } from 'src/app/models'

import axios from 'axios'
import { getCookie } from 'src/utils/cookies'
import { toQueryString } from 'src/utils/common'

const controllerName = 'datasets'
const baseUrl = `${process.env.REACT_APP_API_URL}/${controllerName}`
const authorization = `Bearer ${process.env.REACT_APP_BEAR_TOKEN}`

const getAll = async (listFilter?: DatasetListFilter) => {
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

const add = async (data: Dataset) => {
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

const getData = async (id: string) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/${id}/data`,
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

const update = async (id: string, data: Dataset) => {
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

const approved = async (id: string) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `${baseUrl}/approved/${id}`,
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

const rejected = async (id: string) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `${baseUrl}/rejected/${id}`,
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

const syncData = async (id: string) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `${baseUrl}/syncdata/${id}`,
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

const statsByCategory = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/stats-by-category`,
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

const statsByOrganization = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/stats-by-organization`,
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

export const datasetApi = {
    getAll,
    add,
    getById,
    update,
    delete: _delete,
    approved,
    rejected,
    syncData,
    getData,
    statsByCategory,
    statsByOrganization,
}
