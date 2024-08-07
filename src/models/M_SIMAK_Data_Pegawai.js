'use server'

import { api_get, api_put } from "@/lib/services"

export const M_SIMAK_Data_Pegawai_getAll = async () => {
    try {
        const response = await api_get('/v1/data/pegawai', process.env.SIMAK_API)

        return {
            success: response?.success,
            message: response?.message,
            debug: response?.message,
            data: response?.data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }
    }
}

export const M_SIMAK_Data_Pegawai_detail_update = async (id_pegawai, payload) => {
    try {
        const response = await api_put({arrayId_pegawai: [String(id_pegawai)], payload}, '/v1/data/pegawai', process.env.SIMAK_API)

        return {
            success: response?.success,
            message: response?.message,
            debug: response?.message,
            data: response?.data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message,
            debug: error
        }
    }
}