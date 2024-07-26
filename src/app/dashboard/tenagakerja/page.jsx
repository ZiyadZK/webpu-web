'use client'

import MainDashboardPage from "@/components/mainDashboard"
import MainLayoutPage from "@/components/mainLayout"
import { M_Tenaga_Kerja_getAll } from "@/models/M_Tenaga_Kerja"
import { faDownload, faEdit, faFile, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function DashboardTenagaKerjaPage() {

    // STATE MANAGEMENT
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchData, setSearchData] = useState('')
    const [loadingFetch, setLoadingFetch] = useState('')

    // FUNCTIONS BELOW
    const getData = async () => {
        setLoadingFetch(state => 'loading')
        const response = await M_Tenaga_Kerja_getAll()
        console.log(response)
        if(response.success) {
            setData(response.data)
            setFilteredData(response.data)
        }
        setLoadingFetch(state => 'fetched')
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="max-w-screen-2xl w-full ">
                    <MainDashboardPage>
                        <div className="flex items-center gap-2">
                            <button type="button" className="px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-white ease-out duration-200 hover:scale-95 active:scale-90 flex items-center gap-3 justify-center w-1/2 sm:w-fit">
                                <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-inherit" />
                                Tambah
                            </button>
                            <button type="button" className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white ease-out duration-200 hover:scale-95 active:scale-90 flex items-center gap-3 justify-center w-1/2 sm:w-fit">
                                <FontAwesomeIcon icon={faDownload} className="w-3 h-3 text-inherit" />
                                Import
                            </button>

                        </div>
                        <hr className="my-2 opacity-0" />
                        <div className="grid grid-cols-12 gap-2">
                            <div className="sm:col-span-2 col-span-3 hidden sm:flex items-center font-medium">
                                Foto
                            </div>
                            <div className="col-span-1 lg:flex hidden items-center font-medium">
                                Role
                            </div>
                            <div className="col-span-6 sm:col-span-3 flex items-center font-medium">
                                <p>
                                    Nama <br />
                                    Status
                                </p>
                            </div>
                            <div className="col-span-4 sm:col-span-3 hidden sm:flex items-center font-medium">
                                <p>
                                    Email <br />
                                    Password
                                </p>
                            </div>
                            <div className="col-span-6 sm:col-span-4 lg:col-span-3 flex justify-center items-center">
                                <input type="text" placeholder="Cari data disini" className="w-full px-3 py-2 rounded-md border outline-none" />
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="relative overflow-auto max-h-[800px] divide-y">
                            {filteredData.slice(0, 10).map((value, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 py-5">
                                    <div className="sm:col-span-2 col-span-3 hidden sm:flex items-center gap-5">
                                        <button type="button" className="md:w-24 md:h-24 w-10 h-10 flex-shrink-0 rounded-full relative overflow-hidden group">
                                        <img className="w-full h-full flex-shrink-0 rounded-full object-cover object-center group-hover:blur-sm ease-out duration-200 group-hover:scale-110" src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${value['foto_profil']['nama_file']}${value['foto_profil']['tipe']}`} alt="" />
                                            <div className="absolute top-0 left-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 bg-black/50 text-white flex items-center justify-center ease-out duration-200">
                                                <FontAwesomeIcon icon={faEdit} className="w-5 h-5 text-inherit" />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="col-span-1 lg:flex hidden items-center">
                                        {value['role'] === 'Admin' && (
                                            <div className="text-red-500 font-bold">
                                                Admin
                                            </div>
                                        )}
                                        {value['role'] === 'Operator' && (
                                            <div className="text-amber-500 font-bold">
                                                Operator
                                            </div>
                                        )}
                                        {value['role'] === 'Karyawan' && (
                                            <div className="text-blue-500 font-bold">
                                                Karyawan
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 flex items-center">
                                        <article className="space-y-1">
                                            <p>
                                                {value['nama_pegawai']}
                                            </p>
                                            <div className="">
                                            {value['aktif'] ? (
                                                <div className="text-green-500">
                                                    Aktif
                                                </div>
                                            ):(
                                                <div className="text-red-500">
                                                    Tidak Aktif
                                                </div>
                                            )}
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-span-4 sm:col-span-3 hidden sm:flex items-center">
                                        <article className="space-y-1">
                                            <p>
                                                {value['email_pegawai']}
                                            </p>
                                            <div className="">
                                                {value['password']}
                                            </div>
                                        </article>
                                    </div>
                                    <div className="col-span-6 sm:col-span-4 lg:col-span-3 flex justify-center items-center gap-2">
                                        <button type="button" className="w-6 h-6 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-600 hover:scale-95 active:scale-90 ease-out duration-200 lg:hidden flex items-center justify-center text-white">
                                            <FontAwesomeIcon icon={faFile} className="w-3 h-3 text-inherit" />
                                        </button>
                                        <button type="button" className="w-6 h-6 rounded bg-amber-500 hover:bg-amber-400 active:bg-amber-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center justify-center text-white">
                                            <FontAwesomeIcon icon={faEdit} className="w-3 h-3 text-inherit" />
                                        </button>
                                        <button type="button" className="w-6 h-6 rounded bg-red-500 hover:bg-red-400 active:bg-red-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center justify-center text-white">
                                            <FontAwesomeIcon icon={faTrash} className="w-3 h-3 text-inherit" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </MainDashboardPage>
                </div>
            </div>
        </MainLayoutPage>
    )
}