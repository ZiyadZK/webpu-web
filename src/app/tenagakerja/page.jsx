'use client'

import MainLayoutPage from "@/components/mainLayout"
import { lexand } from "@/lib/fonts"
import { M_Tenaga_Kerja_getAll } from "@/models/M_Tenaga_Kerja"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function TenagaKerjaPage() {

    const [dataTenagaKerja, setDataTenagaKerja] = useState({
        data: [], filteredData: [], loading: ''
    })

    const getDataTenagaKerja = async () => {
        setDataTenagaKerja(state => ({...state, loading: 'loading'}))
        const response = await M_Tenaga_Kerja_getAll()
        if(response.success) {
            setDataTenagaKerja(state => ({...state, data: response.data, filteredData: response.data}))
        }
        setDataTenagaKerja(state => ({...state, loading: 'fetched'}))
    }

    useEffect(() => {
        getDataTenagaKerja()
    }, [])

    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className={`max-w-screen-xl w-full ${lexand.className}`}>

                    <hr className="my-5 opacity-0" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dataTenagaKerja['filteredData'].map((value, index) => (
                            <div key={value['id_tenaga_kerja']} className="rounded-xl p-5 col-span-1">
                                <div className="flex justify-center">
                                    <div className="aspect-square w-40 sm:w-60 lg:w-80 relative">
                                        <img className="w-full h-full object-cover rounded-full object-center border" src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${value['foto_profil']['nama_file']}${value['foto_profil']['tipe']}`} alt="" />
                                        <div className="absolute bottom-0 left-0 w-full">
                                            <div className="flex justify-center w-full">
                                                <div className="px-3 py-2 rounded-full bg-white border shadow-xl">
                                                    <h1 className=" sm:text-lg lg:text-xl tracking-tighter opacity-70">
                                                        {value['role']}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-2 opacity-0" />
                                <h1 className="text-lg sm:text-xl lg:text-2xl text-center">
                                    {value['nama_pegawai']}
                                </h1>
                                <hr className="my-2 opacity-0" />
                                <p className="font-light text-center">
                                    {value['quotes']}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayoutPage>
    )
}