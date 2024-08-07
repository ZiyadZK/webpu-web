'use client'

import { swalToast } from "@/lib/toast"
import { M_Akun_get_logged_akun, M_Akun_login, M_Akun_logout } from "@/models/M_Akun"
import { faFacebook, faInstagramSquare } from "@fortawesome/free-brands-svg-icons"
import { faSun } from "@fortawesome/free-regular-svg-icons"
import { faArrowRight, faBars, faCogs, faEnvelope, faExclamationTriangle, faGlobe, faKey, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"



export default function MainLayoutPage({ children, classNames }) {

    const router = useRouter()

    const [loggedAkun, setLoggedAkun] = useState({
        status: '', data: null
    })
    const [loadingLogin, setLoadingLogin] = useState('')
    const [loginAlert, setLoginAlert] = useState({
        success: '', message: ''
    })
    
    const submitLogin = async (e, modal) => {
        e.preventDefault()
        setLoadingLogin(state => 'loading')
        setLoginAlert({
            success: '', message: ''
        })

        const payload = {
            email: e.target[0].value,
            password: e.target[1].value,
            rememberMe: e.target[2].checked
        }

        const response = await M_Akun_login(payload)

        if(!response.success) {
            setLoginAlert(response)
        }else{
            document.getElementById(modal).close()
            swalToast.fire({
                title: 'Sukses',
                text: 'Anda berhasil masuk',
                icon: 'success'
            })

            const responseLoggedAkun = await M_Akun_get_logged_akun()

            setLoggedAkun(state => ({...state, status: 'looading'}))
            if(responseLoggedAkun.success) {
                setLoggedAkun(state => ({...state, status: 'fetched', data: responseLoggedAkun.data}))
            }else{
                setLoggedAkun(state => ({...state, status: 'looading', data: null }))
            }

        }
        setLoadingLogin(state => 'fetched')
    }

    const submitLogout = async () => {
        const response = await M_Akun_logout()
        
        if(response.success) {
            router.push('/')
            setLoggedAkun(state => ({...state, status: 'fetched', data: null}))
            swalToast.fire({
                title: 'Sukses',
                text: 'Berhasil log out dari akun anda',
                icon: 'success'
            })
        }else{
            swalToast.fire({
                title: 'Gagal',
                text: response.message,
                icon: 'error'
            })
        }
    }

    const getLoggedAkun = async () => {
        const responseLoggedAkun = await M_Akun_get_logged_akun()

        setLoggedAkun(state => ({...state, status: 'loading'}))
        if(responseLoggedAkun.success) {
            setLoggedAkun(state => ({...state, status: 'fetched', data: responseLoggedAkun.data}))
            return
        }

        setLoggedAkun(state => ({...state, status: 'fetched', data: null }))
    }

    useEffect(() => {
        getLoggedAkun()
    }, [])

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="flex justify-center border-b sticky top-0 z-10 bg-zinc-800">
                    <div className="flex items-center justify-between lg:py-5 py-3 w-full max-w-screen-2xl lg:px-10 px-5">
                        <a href="/" className="flex items-center gap-3 w-fit">
                            <Image src={'/logo-sekolah-2.png'} width={20} height={20} alt="Logo Sekolah" className="lg:block hidden" />
                            <article>
                                <h1 className="lg:text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-white">
                                    SMK PU Negeri Bandung
                                </h1>
                                <h2 className="text-xs opacity-50 text-white tracking-tighter">
                                    Smart, Responsive, Competitive
                                </h2>
                            </article>
                        </a>
                        <div className="flex items-center gap-10 ">
                            <a href="/profil" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Profil
                            </a>
                            <a href="/jurusan" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Jurusan
                            </a>
                            <a href="/ekstrakurikuler" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Ekstrakurikuler
                            </a>
                            <a href="/tenagakerja" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Tenaga Kerja
                            </a>
                            <a href="/aplikasi" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Aplikasi
                            </a>
                            <a href="/berita" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Berita
                            </a>
                            <a href="/lulusanterbaik" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Lulusan Terbaik
                            </a>
                            {loggedAkun['status'] !== 'fetched' && (
                                <div className="loading loading-md opacity-50 loading-spinner"></div>
                            )}
                            {loggedAkun['status'] === 'fetched' && !loggedAkun['data'] && (
                                <button type="button" onClick={() => document.getElementById('login_modal').showModal()} className="px-4 py-2 hidden sm:block rounded-full border-2 border-zinc-600 hover:bg-zinc-600 hover:text-white ease-out duration-200 active:scale-95">
                                    Masuk
                                </button>
                            )}
                            {loggedAkun['status'] === 'fetched' && loggedAkun['data'] && (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="relative w-10 h-10 rounded-full overflow-hidden border ease-out duration-200 hover:scale-105 active:scale-95">
                                        <img src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${loggedAkun['data']['foto_profil']['nama_file']}${loggedAkun['data']['foto_profil']['tipe']}`} alt="" />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                                        <div className="p-3">
                                            <p className="text-xs">
                                                {loggedAkun['data']['nama_pegawai']}
                                            </p>
                                            <p className="text-xs opacity-50">
                                                {loggedAkun['data']['email_pegawai']}
                                            </p>
                                            <hr className="my-2 opacity-0" />
                                            <p className="text-xs px-2 py-1 rounded-full bg-zinc-100 w-fit tracking-tighter font-medium">
                                                {loggedAkun['data']['role']}
                                            </p>
                                        </div>
                                        <li>
                                            <button type="button" onClick={() => router.push('/me')} className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faUser} className="w-3 h-3 text-inherit" />
                                                Profil Saya
                                            </button>
                                        </li>
                                        {loggedAkun['data']['role'] !== 'Guru / Karyawan' && (
                                            <li>
                                                <button type="button" onClick={() => router.push('/dashboard')} className="flex items-center gap-3">
                                                    <FontAwesomeIcon icon={faCogs} className="w-3 h-3 text-inherit" />
                                                    Dashboard
                                                </button>
                                            </li>
                                        )}
                                        <li>
                                            <button type="button" onClick={() => submitLogout()} className="flex items-center gap-3 text-red-500">
                                                <FontAwesomeIcon icon={faSignOut} className="w-3 h-3 text-inherit" />
                                                Keluar
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <label htmlFor="my-drawer" className="drawer-button opacity-50 hover:opacity-100 lg:hidden block">
                                <FontAwesomeIcon icon={faBars} className="w-4 h-4 text-inherit" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <dialog id="login_modal" className="modal backdrop-blur-md">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h1 className="text-lg font-medium">
                                Selamat Datang
                            </h1>
                            <hr className="my-3 opacity-0" />
                            <p>
                                Silahkan masuk menggunakan <span className="underline">Akun anda</span>.
                            </p>
                            <hr className="my-3 opacity-0" />
                            {loginAlert['success'] === false && (
                                <div className="p-3 rounded-md border-2 border-red-500 bg-red-100 flex gap-3 text-red-500">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5 text-inherit flex-shrink-0" /> 
                                    <p>
                                        {loginAlert['message']}
                                    </p>
                                </div>
                            )}
                            <hr className="my-2 opacity-0" />
                            <form onSubmit={(e) => submitLogin(e, 'login_modal')}>
                                <div className="relative h-10 flex items-center rounded-md border">
                                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-inherit opacity-50" />
                                    </div>
                                    <input type="text" required className=" flex-grow outline-none" placeholder="Email akun anda" />
                                </div>
                                <hr className="my-1 opacity-0" />
                                <div className="relative h-10 flex items-center rounded-md border">
                                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faKey} className="w-4 h-4 text-inherit opacity-50" />
                                    </div>
                                    <input type="password" required className=" flex-grow outline-none" placeholder="Password akun anda" />
                                </div>
                                <hr className="my-1 opacity-0" />
                                <div className="flex items-center gap-3 w-full">
                                    <input type="checkbox" className="cursor-pointer" />
                                    Ingat saya
                                </div>
                                <hr className="my-2 opacity-0" />
                                {loadingLogin !== 'loading' && (
                                    <div className="flex justify-center">
                                        <button type="submit" className="flex justify-center items-center gap-3 px-4 py-2 rounded-md bg-gradient-to-r from-rose-500 to-amber-500 text-white active:scale-90 hover:scale-95 ease-out duration-200">
                                            Masuk
                                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-inherit " />
                                        </button>
                                    </div>
                                )}
                                {loadingLogin === 'loading' && (
                                    <div className="flex justify-center">
                                        <button type="button" disabled className="flex justify-center items-center gap-3 px-10 py-2 rounded-md bg-gradient-to-r from-rose-500 to-amber-500 text-white ">
                                            <div className="loading loading-spinner loading-sm opacity-50 text-white"></div>
                                        </button>
                                    </div>
                                )}
                            </form>
                            <hr className="my-2" />
                            <div className="flex justify-center">
                                <a href="" className="text-center underline hover:text-blue-500">
                                    Lupa password?
                                </a>
                            </div>
                        </div>
                    </dialog>
                    {children}
                    <div className="lg:px-20 px-5 py-10 bg-zinc-800 flex justify-center">
                        <div className="max-w-screen-2xl w-full">
                            <div className="flex flex-col md:flex-row items-center md:justify-between gap-5">
                                <div className="flex items-center gap-3">
                                    <Image src={'/logo-sekolah-2.png'} width={20} height={20} alt="Logo Sekolah" className="block" />
                                    <article>
                                        <h1 className="lg:text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-zinc-200">
                                            SMK PU Negeri Bandung
                                        </h1>
                                        <h2 className="text-xs opacity-50 tracking-tighter text-zinc-200">
                                            Smart, Responsive, Competitive
                                        </h2>
                                    </article>
                                </div>
                                <div className="flex items-center gap-5">
                                    <a href="https://instagram.com/smkpu.official" className="text-zinc-200 opacity-50 hover:opacity-100 hover:scale-110 ease-out duration-200">
                                        <FontAwesomeIcon icon={faInstagramSquare} className="w-5 h-5 text-inherit" />
                                    </a>
                                    <a href="" className="text-zinc-200 opacity-50 hover:opacity-100 hover:scale-110 ease-out duration-200">
                                        <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 text-inherit" />
                                    </a>
                                    <a href="https://home.smkpunegerijabar.sch.id" target="_blank" className="text-zinc-200 opacity-50 hover:opacity-100 hover:scale-110 ease-out duration-200">
                                        <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 text-inherit" />
                                    </a>
                                </div>
                            </div>
                            <hr className="my-5 opacity-20" />
                            <div className="flex flex-col md:flex-row items-center md:justify-between gap-5">
                                <p className="text-zinc-400 italic text-center md:text-start">
                                    Jl. Garut No.10, Kacapiring, Kec. Batununggal, Kota Bandung, Jawa Barat 40271
                                </p>
                                <p className="text-zinc-400 italic text-center md:text-start">
                                    Copyright @ 2024 - SMK Pekerjaan Umum Negeri Bandung
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full bg-white backdrop-blur-md w-80">
                    <hr className="my-9 sm:my-10" />
                    <div className="px-5">
                        <button type="button" onClick={() => document.getElementById('login_modal').showModal()} className="px-4 py-2 block sm:hidden rounded-full border-2 border-zinc-600 hover:bg-zinc-600 hover:text-white ease-out duration-200 active:scale-95">
                            Masuk
                        </button>
                        <hr className="my-5" />
                        <div className="space-y-5 sm:space-y-3 text-sm">
                            <a href="/profil" className="flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Profil
                            </a>
                            <a href="/jurusan" className="flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Jurusan
                            </a>
                            <a href="/ekstrakurikuler" className="flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Ekstrakurikuler
                            </a>
                            <a href="/tenagakerja" className="flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Tenaga Kerja
                            </a>
                            <a href="/aplikasi" className="flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Aplikasi
                            </a>
                            <a href="/berita" className="flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Berita
                            </a>
                            <a href="/lulusanterbaik" className="flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Lulusan Terbaik
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        
    )
}