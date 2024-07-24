'use client'

import { faFacebook, faInstagramSquare } from "@fortawesome/free-brands-svg-icons"
import { faSun } from "@fortawesome/free-regular-svg-icons"
import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export default function MainLayoutPage({ children }) {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="flex justify-center border-b sticky top-0 z-10 bg-white">
                    <div className="flex items-center justify-between lg:py-5 py-3 w-full max-w-screen-2xl lg:px-10 px-5">
                        <a href="/" className="flex items-center gap-3 w-fit">
                            <Image src={'/logo-sekolah-2.png'} width={20} height={20} alt="Logo Sekolah" className="lg:block hidden" />
                            <article>
                                <h1 className="lg:text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-zinc-600">
                                    SMK PU Negeri Bandung
                                </h1>
                                <h2 className="text-xs opacity-50 tracking-tighter">
                                    Sigap, Cepat, Tanggap, dan Kompetitif
                                </h2>
                            </article>
                        </a>
                        <div className="flex items-center gap-10 ">
                            <a href="" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Profil
                            </a>
                            <a href="/jurusan" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Jurusan
                            </a>
                            <a href="" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Ekstrakurikuler
                            </a>
                            <a href="" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Mitra
                            </a>
                            <a href="" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Tenaga Kerja
                            </a>
                            <a href="/aplikasi" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Aplikasi
                            </a>
                            <a href="/berita" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Berita
                            </a>
                            <a href="" className="hidden lg:flex items-center gap-2 relative opacity-50 hover:opacity-100">
                                Prestasi
                            </a>
                            <label htmlFor="my-drawer" className="drawer-button opacity-50 hover:opacity-100 lg:hidden block">
                                <FontAwesomeIcon icon={faBars} className="w-4 h-4 text-inherit" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
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
                                            Sigap, Cepat, Tanggap, dan Kompetitif
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
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
            </div>
        
    )
}