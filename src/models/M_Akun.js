'use server'

import { decryptKey } from "@/lib/crypto"
import { api_post } from "@/lib/services"
import { cookies } from "next/headers"

export const M_Akun_login = async ({email, password, rememberMe}) => {
    try {
        const response = await api_post({email, password}, '/v1/data/userdata')

        if(response.success) {
            cookies().set('userdata', response?.data, {
                httpOnly: true,
                secure: true,
                maxAge: rememberMe ? 1000 * 1 * 60 * 60 * 24 * 3 : 1000 * 1 * 60 * 60 * 24 * 1
            } )
        }

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
            message: error.message,
            debug: error
        }
    }
}

export const M_Akun_get_logged_akun = async () => {
    try {
        if(!cookies().has('userdata')) {
            return {
                success: false,
                message: 'Token Userdata tidak ditemukan!'
            }
        }

        let token = cookies().get('userdata').value
        const responseVerify = await api_post({token}, '/v1/verify/userdata')

        console.log(responseVerify.data)

        if(!responseVerify.success) {
            return {
                success: false,
                message: 'Terdapat kesalahan disaat memproses data, hubungi Administrator'
            }
        }

        if(responseVerify.data.data) {
            token = responseVerify.data.data
        }

        const response = await decryptKey(token)

        if(!response.success) {
            return {
                success: false,
                message: 'Token Userdata tidak valid!'
            }
        }

        return {
            success: true,
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

export const M_Akun_logout = async () => {
    try {
        if(cookies().has('userdata')) {
            cookies().delete('userdata')
        }

        return {
            success: true
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