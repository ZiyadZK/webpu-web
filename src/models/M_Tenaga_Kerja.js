'use server'

import { api_get } from "@/lib/services"

export const M_Tenaga_Kerja_getAll = async () => {
    try {
        const response = await api_get('/v1/data/tenaga_kerja')

        return {
            success: response.success,
            data: response?.data,
            message: response?.message,
            debug: response?.debug
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}