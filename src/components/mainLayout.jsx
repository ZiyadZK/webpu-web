'use client'

import { faSun } from "@fortawesome/free-regular-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export default function MainLayoutPage({ children }) {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="flex justify-center border-b dark:border-zinc-800 sticky top-0 backdrop-blur-md">
                    <div className="flex items-center justify-between md:py-5 py-3 w-full max-w-screen-2xl md:px-10 px-5">
                        <div className="flex items-center gap-3">
                            <Image src={'/logo-sekolah-2.png'} width={20} height={20} alt="Logo Sekolah" className="md:block hidden" />
                            <article>
                                <h1 className="md:text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-zinc-600">
                                    SMK PU Negeri Bandung
                                </h1>
                                <h2 className="text-xs opacity-50 tracking-tighter">
                                    Sigap, Cepat, Tanggap, dan Kompetitif
                                </h2>
                            </article>
                        </div>
                        <div className="flex items-center gap-10 ">
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Profil
                            </a>
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Jurusan
                            </a>
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Ekstrakurikuler
                            </a>
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Mitra
                            </a>
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Tenaga Kerja
                            </a>
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Aplikasi
                            </a>
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Artikel
                            </a>
                            <a href="" className="hidden md:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Prestasi
                            </a>
                            <div className="hidden md:flex items-center gap-3">
                                <button type="button" className="border dark:border-zinc-800 rounded-md w-8 h-8 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                    <FontAwesomeIcon icon={faSun} className="w-3 h-3 text-inherit" />
                                </button>
                            </div>
                            <label htmlFor="my-drawer" className="drawer-button opacity-50 hover:opacity-100 md:hidden block">
                                <FontAwesomeIcon icon={faBars} className="w-4 h-4 text-inherit" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
            </div>
        
    )
}