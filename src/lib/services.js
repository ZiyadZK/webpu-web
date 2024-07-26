'use server'

const { default: axios } = require("axios")

export const api_get = async (url = '/', base_url = process.env.API_URL) => {
    try {
        const response = await axios.get(`${base_url}${url}`, {
            headers: {
                'X-API-KEY': process.env.API_KEY
            }
        })

        return {
            success: true,
            data: response?.data?.data,
            message: response?.data?.message
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.response?.data?.message,
            debug: error.response?.data?.debug
        }
    }
}

export const api_post = async (payload = {} || [], url = '/', base_url = process.env.API_URL) => {
    try {
        const response = await axios.post(`${base_url}${url}`, payload, {
            headers: {
                'X-API-KEY': process.env.API_KEY
            }
        })

        return {
            success: true,
            data: response?.data?.data,
            message: response?.data?.message
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.response?.data?.message,
            debug: error.response?.data?.debug
        }
    }
}

export const api_put = async (payload = {} || [], url = '/', base_url = process.env.API_URL) => {
    try {
        const response = await axios.put(`${base_url}${url}`, payload, {
            headers: {
                'X-API-KEY': process.env.API_KEY
            }
        })

        return {
            success: true,
            data: response?.data?.data,
            message: response?.data?.message
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.response?.data?.message,
            debug: error.response?.data?.debug
        }
    }
}

export const api_delete = async (payload = {} || [], url = '/', base_url = process.env.API_URL) => {
    try {
        const response = await axios.delete(`${base_url}${url}`, payload, {
            headers: {
                'X-API-KEY': process.env.API_KEY
            }
        })

        return {
            success: true,
            data: response?.data?.data,
            message: response?.data?.message
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.response?.data?.message,
            debug: error.response?.data?.debug
        }
    }
}
