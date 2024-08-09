'use server'

import { api_delete, api_get, api_post, api_post_file, api_put } from "@/lib/services"

export const M_Jurusan_getAll = async () => {
    try {
        const response = await api_get('/v1/data/jurusan')

        return {
            success: true,
            data: response?.data,
            message: response?.message,
            debug: response?.debug
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

export const M_Jurusan_create = async (payload) => {
    try {
        const response = await api_post(payload, '/v1/data/jurusan')

        return {
            success: true,
            data: response?.data,
            message: response?.message,
            debug: response?.debug
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

export const M_Jurusan_update = async (id_jurusan, payload) => {
    try {
        const response = await api_put({id_jurusan, payload}, '/v1/data/jurusan')

        return {
            success: true,
            data: response?.data,
            message: response?.message,
            debug: response?.debug
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

export const M_Jurusan_delete = async (id_jurusan) => {
    try {
        const response = await api_delete({id_jurusan}, '/v1/data/jurusan')

        return {
            success: true,
            data: response?.data,
            message: response?.message,
            debug: response?.debug
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

export const M_Jurusan_assign_kegiatan = async (formData = new FormData()) => {
    try {

        const response = await api_post_file(formData, '/v1/data/kegiatan_jurusan')
        console.log(response)

        return {
            success: response?.success,
            data: response?.data,
            message: response?.message,
            debug: response?.debug
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

export const M_Jurusan_delete_kegiatan = async (id_foto, nama_foto, tipe) => {
    try {
        const response = await api_delete({id_foto, nama_foto, tipe}, '/v1/data/kegiatan_jurusan')
        

        return {
            success: response?.success,
            data: response?.data,
            message: response?.message,
            debug: response?.debug
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