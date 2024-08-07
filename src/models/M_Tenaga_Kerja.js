'use server'

import { api_delete, api_get, api_post, api_post_file, api_put } from "@/lib/services"

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

export const M_Tenaga_Kerja_upload_foto_profil = async (formData = new FormData()) => {
    try {
        const response = await api_post_file(formData, '/v1/data/foto_profil_tenaga_kerja')

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

export const M_Tenaga_Kerja_create = async (payload) => {
    try {
        const response = await api_post(payload, '/v1/data/tenaga_kerja')

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

export const M_Tenaga_Kerja_update = async (id_tenaga_kerja, payload) => {
    try {
        const response = await api_put({id_tenaga_kerja, payload}, '/v1/data/tenaga_kerja')

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

export const M_Tenaga_Kerja_delete = async (id_tenaga_kerja) => {
    try {
        const response = await api_delete({id_tenaga_kerja}, '/v1/data/tenaga_kerja')

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

export const M_Tenaga_Kerja_detail_getAll = async (id_pegawai) => {
    try {
        const response = await api_get(`/v1/data/detail_tenaga_kerja_all/${id_pegawai}`)

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