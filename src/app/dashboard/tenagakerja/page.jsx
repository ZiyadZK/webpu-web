'use client'

import AdvanceSelect from "@/components/advanceSelect"
import MainDashboardPage from "@/components/mainDashboard"
import MainLayoutPage from "@/components/mainLayout"
import { lexand } from "@/lib/fonts"
import { swalToast } from "@/lib/toast"
import { M_SIMAK_Data_Pegawai_getAll } from "@/models/M_SIMAK_Data_Pegawai"
import { M_Tenaga_Kerja_create, M_Tenaga_Kerja_delete, M_Tenaga_Kerja_getAll, M_Tenaga_Kerja_update, M_Tenaga_Kerja_upload_foto_profil } from "@/models/M_Tenaga_Kerja"
import { faAnglesLeft, faAnglesRight, faCheck, faDownload, faEdit, faFile, faPlus, faPowerOff, faRefresh, faSearch, faTrash, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { nanoid } from "nanoid"
import { useEffect, useId, useState } from "react"
import Swal from "sweetalert2"

const daftarRole = [
    { value: 'Guru / Karyawan', label: 'Guru / Karyawan' },
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Kurikulum', label: 'Kurikulum' },
    { value: 'Kesiswaan', label: 'Kesiswaan' },
    { value: 'Hubungan Inudstri dan Masyarakat', label: 'Hubungan Industri dan Masyarakat' },
    { value: 'Sarana Prasarana', label: 'Sarana Prasarana' },
    { value: 'Standar Penjaminan Mutu Internal', label: 'Standar Penjaminan Mutu Internal' },
    { value: 'Tata Usaha', label: 'Tata Usaha' },
]

export default function DashboardTenagaKerjaPage() {

    // STATE MANAGEMENT
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchData, setSearchData] = useState('')
    const [loadingFetch, setLoadingFetch] = useState('')
    const [dataPegawai, setDataPegawai] = useState([])
    const [loadingFetchPegawai, setLoadingFetchPegawai] = useState('')
    const [filterData, setFilterData] = useState({
        role: [], search_list: '', pagination: 1, totalList: 10, aktif: [], foto_profil: []
    })

    const [selectedData, setSelectedData] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    // FUNCTIONS BELOW
    const getDataPegawai = async () => {
        setLoadingFetchPegawai(state => 'loading')
        const response = await M_SIMAK_Data_Pegawai_getAll()
        if(response.success) {
            setDataPegawai(response.data)
        }
        setLoadingFetchPegawai(state => 'fetched')
    }

    const getData = async () => {
        setLoadingFetch(state => 'loading')
        const response = await M_Tenaga_Kerja_getAll()
        if(response.success) {
            setData(response.data)
            setFilteredData(response.data)
        }
        setLoadingFetch(state => 'fetched')
    }

    useEffect(() => {
        getDataPegawai()
        getData()
    }, [])

    const submitTambahTenagaKerja = async (e, modal) => {
        e.preventDefault()

        document.getElementById(modal).close()

        const payload = {
            id_pegawai: parseInt(e.target[1].value),
            quotes: e.target[2].value,
            password: e.target[3].value !== '' ? e.target[3].value : nanoid(16) ,
            role: e.target[5].value,
            aktif: 1
        }

        Swal.fire({
            title: "Sedang memproses data",
            timer: 60000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: async () => {
                const response = await M_Tenaga_Kerja_create(payload)

                if(response.success) {
                    await getData()
                    Swal.fire({
                        title: 'Sukses',
                        text: 'Berhasil menambahkan tenaga kerja ke web sekolah',
                        icon: 'success'
                    }).then(() => {
                        e.target[1].value = ''
                        e.target[2].value = ''
                        e.target[3].value = ''
                        e.target[5].value = ''
                    })   
                }else{
                    Swal.fire({
                        title: 'Gagal',
                        text: "Terdapat kesalahan disaat memproses data, hubungi Administrator",
                        icon: 'error'
                    }).then(() => {
                        document.getElementById(modal).showModal()
                    })
                }
            }
        })
    }

    const tenaga_kerja_delete = async (id_tenaga_kerja) => {
        Swal.fire({
            title: "Sedang memproses data",
            timer: 60000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: async () => {
                const response = await M_Tenaga_Kerja_delete(id_tenaga_kerja)

                if(response.success) {
                    await getData()
                    Swal.fire({
                        title: 'Sukses',
                        text: 'Berhasil menghapus tenaga kerja dari web sekolah',
                        icon: 'success'
                    })
                }else{
                    Swal.fire({
                        title: 'Gagal',
                        text: "Terdapat kesalahan disaat memproses data, hubungi Administrator",
                        icon: 'error'
                    })
                }
            }
        })
    }

    const tenaga_kerja_edit = async (e, modal, id_tenaga_kerja) => {
        e.preventDefault()

        document.getElementById(modal).close()

        const payload = {
            quotes: e.target[0].value,
            password: e.target[1].value !== '' ? e.target[1].value : nanoid(16),
            role: e.target[3].value,
            aktif: e.target[4].checked
        }

        Swal.fire({
            title: "Sedang memproses data",
            timer: 60000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: async () => {
                const response = await M_Tenaga_Kerja_update(id_tenaga_kerja, payload)

                if(response.success) {
                    await getData()
                    Swal.fire({
                        title: 'Sukses',
                        text: 'Berhasil mengubah tenaga kerja dari web sekolah',
                        icon: 'success'
                    })
                }else{
                    Swal.fire({
                        title: 'Gagal',
                        text: "Terdapat kesalahan disaat memproses data, hubungi Administrator",
                        icon: 'error'
                    }).then(() => {
                        document.getElementById(modal).showModal()
                    })
                }
            }
        })
    }

    const tenaga_kerja_upload_foto_profil = async (e, modal, id_tenaga_kerja) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', e.target[0].files[0])
        formData.append('fk_foto_id_tenaga_kerja', id_tenaga_kerja)
        formData.append('kategori', 'foto_profil')

        Swal.fire({
            title: 'Sedang memproses data',
            timer: 60000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: async () => {
                document.getElementById(modal).close()

                const response = await M_Tenaga_Kerja_upload_foto_profil(formData)

                if(response.success) {
                    await getData()
                    Swal.fire({
                        title: 'Sukses',
                        text: "Berhasil mengubah foto profil tenaga kerja tersebut",
                        icon: 'success'
                    }).then(() => {
                        document.getElementById(modal).showModal()
                    })
                }else{
                    Swal.fire({
                        title: 'Gagal',
                        text: "Terdapat kesalahan disaat memproses data, hubungi Administrator",
                        icon: 'error'
                    }).then(() => {
                        document.getElementById(modal).showModal()
                    })
                }
            }
        })
    }

    const handleFilterData = (key, value) => {
        setFilterData(state => {
            if(Array.isArray(state[key])){
                if(state[key].includes(value)) {
                    return {...state, [key]: state[key].filter(v => v !== value)}
                }else{
                    return {...state, [key]: [...state[key], value]}
                }
            }else{
                return {...state, [key]: value}
            }

            
        })
    }

    useEffect(() => {
        let updatedData = data

        if(filterData['search_list'] !== '') {
            updatedData = data.filter(value => 
                value['nama_pegawai'].toLowerCase().includes(filterData['search_list'].toLowerCase()) ||
                value['email_pegawai'].toLowerCase().includes(filterData['search_list'].toLowerCase())
            )
        }

        if(filterData['role'].length > 0) {
            updatedData = updatedData.filter(value => 
                filterData['role'].includes(value['role'])
            )
        }

        if(filterData['aktif'].length > 0) {
            updatedData = updatedData.filter(value => 
                filterData['aktif'].includes(value['aktif'])
            )
        }
 
        if(filterData['foto_profil'].length > 0) {
            updatedData = updatedData.filter(value => 
                filterData['foto_profil'].includes(value['foto_profil']['id_foto'] !== null)
            )
        }

        setFilteredData(updatedData)
    }, [filterData])

    useEffect(() => {
        if(selectAll) {
            setSelectedData(state => data.map(value => value['id_tenaga_kerja']))
        }else{
            setSelectedData([])
        }
    }, [selectAll])

    const handleSelectData = (id_tenaga_kerja) => {
        setSelectedData(state => {
            if(state.includes(id_tenaga_kerja)) {
                return state.filter(value => value !== id_tenaga_kerja)
            }else{
                return [...state, id_tenaga_kerja]
            }
        })
    }

    const submitActionSelectedData = {
        delete: async () => {
            if(selectedData.length < 1) {
                swalToast.fire({
                    title: 'Gagal',
                    text: "Anda harus memilih data terlebih dahulu",
                    icon: 'warning'
                })

                return
            }

            Swal.fire({
                title: "Sedang memproses data",
                timer: 60000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    const response = await M_Tenaga_Kerja_delete(selectedData)

                    Swal.close()

                    if(response.success) {
                        await getData()
                        setSelectedData([])
                    }

                    swalToast.fire({
                        title: response.success ? 'Sukses' : 'Gagal',
                        text: response.success ? 'Berhasil menghapus data yang dipilih' : response.message,
                        icon: response.success ? 'success' : 'error',
                        timer: 2000
                    })
                }
            })
        },
        activate: async () => {
            if(selectedData.length < 1) {
                swalToast.fire({
                    title: 'Gagal',
                    text: "Anda harus memilih data terlebih dahulu",
                    icon: 'warning'
                })

                return
            }

            Swal.fire({
                title: "Sedang memproses data",
                timer: 60000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    const response = await M_Tenaga_Kerja_update(selectedData, { aktif: true })

                    Swal.close()

                    if(response.success) {
                        await getData()
                        setSelectedData([])
                    }

                    swalToast.fire({
                        title: response.success ? 'Sukses' : 'Gagal',
                        text: response.success ? 'Berhasil mengaktifkan data yang dipilih' : response.message,
                        icon: response.success ? 'success' : 'error',
                        timer: 2000
                    })
                }
            })
        },
        deactivate: async () => {
            if(selectedData.length < 1) {
                swalToast.fire({
                    title: 'Gagal',
                    text: "Anda harus memilih data terlebih dahulu",
                    icon: 'warning'
                })

                return
            }

            Swal.fire({
                title: "Sedang memproses data",
                timer: 60000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    const response = await M_Tenaga_Kerja_update(selectedData, { aktif: false })

                    Swal.close()

                    if(response.success) {
                        await getData()
                        setSelectedData([])
                    }

                    swalToast.fire({
                        title: response.success ? 'Sukses' : 'Gagal',
                        text: response.success ? 'Berhasil menonaktifkan data yang dipilih' : response.message,
                        icon: response.success ? 'success' : 'error',
                        timer: 2000
                    })
                }
            })
        }
    }

    const tenaga_kerja_add_all = async (modal) => {
        document.getElementById(modal).close()

        const payload = []

        dataPegawai.map(value => {
            const isExist = Array.from(new Set(data.map(v => v['id_pegawai']))).find(v => value['id_pegawai'] === v)

            if(!isExist) {
                payload.push({
                    quotes: `Hi, saya ${value['nama_pegawai']}`,
                    id_pegawai: value['id_pegawai'],
                    password: value['email_pegawai'] === '' || value['email_pegawai'] === null ? null : nanoid(16),
                    role: 'Guru / Karyawan',
                    aktif: true
                })
            }
        })

        if(payload.length < 1) {
            swalToast.fire({
                title: 'Gagal',
                text: 'Anda sudah menambahkan semua pegawai ke dalam data tenaga kerja',
                icon: 'warning'
            })

            return
        }

        Swal.fire({
            title: "Sedang memproses data",
            timer: 60000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: async () => {
                const response = await M_Tenaga_Kerja_create(payload)

                Swal.close()

                if(response.success) {
                    await getData()
                }

                swalToast.fire({
                    title: response.success ? 'Sukses' : 'Gagal',
                    text: response.success ? 'Berhasil menambahkan semua data pegawai' : response.message,
                    icon: response.success ? 'success' : 'error',
                    timer: 2000
                })
            }
        })
    }

    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className={`max-w-screen-2xl w-full `}>
                    <MainDashboardPage>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={() => document.getElementById('tambah_data').showModal()} className="px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-white ease-out duration-200 hover:scale-95 active:scale-90 flex items-center gap-3 justify-center w-1/2 sm:w-fit">
                                <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-inherit" />
                                Tambah
                            </button>
                            <dialog id="tambah_data" className="modal">
                                <div className="modal-box rounded-md max-w-screen-md">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-inherit opacity-50" />
                                        <h1 className="font-bold text-lg">
                                            Tambah Tenaga Kerja Baru
                                        </h1>
                                    </div>
                                    <hr className="my-5" />
                                    <button type="button" onClick={() => tenaga_kerja_add_all('tambah_data')} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 hover:scale-95 active:scale-90 active:bg-blue-700 ease-out duration-200 text-white flex items-center gap-3">
                                        Tambah Semua Tenaga Kerja
                                    </button>
                                    <div className="flex items-center justify-center gap-3 my-5">
                                        <hr className="flex-grow" />
                                        <p>
                                            atau
                                        </p>
                                        <hr className="flex-grow" />
                                    </div>
                                    <form onSubmit={e => submitTambahTenagaKerja(e, 'tambah_data')} className="space-y-3">
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                            <div className="w-full lg:w-1/3">
                                                Pilih Pegawai
                                            </div>
                                            <div className="w-full lg:w-2/3">
                                                <AdvanceSelect 
                                                    menuPortalTargetById={"tambah_data"} 
                                                    placeholder="Cari dan pilih data pegawai disini" 
                                                    listData={dataPegawai
                                                        .filter(v => {
                                                            const isExist = data.find(value => value['id_pegawai'] === v['id_pegawai'])
                                                            if(isExist) {
                                                                return false
                                                            }else{
                                                                return true
                                                            }
                                                        })
                                                        .map(v => ({
                                                        value: v['id_pegawai'],
                                                        label: v['nama_pegawai']
                                                    }))}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-1">
                                            <div className="w-full lg:w-1/3 translate-y-2">
                                                Quotes
                                            </div>
                                            <div className="w-full lg:w-2/3">
                                                <textarea className="w-full px-3 py-2 border min-h-20 max-h-80">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                            <div className="w-full lg:w-1/3">
                                                Password
                                            </div>
                                            <div className="w-full lg:w-2/3">
                                                <input type="text" className="w-full px-3 py-2 border" placeholder="Password untuk akun"  />
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                            <div className="w-full lg:w-1/3">
                                                Pilih Role
                                            </div>
                                            <div className="w-full lg:w-2/3">
                                                <AdvanceSelect 
                                                    menuPortalTargetById={"tambah_data"} 
                                                    placeholder="Cari dan pilih role disini" 
                                                    listData={daftarRole}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="px-4 py-2 rounded-lg w-full lg:w-fit bg-green-600 hover:bg-green-500 active:bg-green-700 active:scale-95 ease-out duration-200 text-white">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </dialog>
                            <button type="button" onClick={() => document.getElementById('import_data').showModal()} className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white ease-out duration-200 hover:scale-95 active:scale-90 flex items-center gap-3 justify-center w-1/2 sm:w-fit">
                                <FontAwesomeIcon icon={faDownload} className="w-3 h-3 text-inherit" />
                                Import
                            </button>
                            <dialog id="import_data" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Import Data</h3>
                                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                                </div>
                            </dialog>
                        </div>
                        <hr className="my-5 " />
                        {loadingFetch === 'fetched' && data.length > 0 && (
                            <>
                                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                    <div className="w-full sm:w-1/3">
                                        <p className="font-medium">
                                            Role
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-2/3 flex items-center gap-2 overflow-auto *:flex-shrink-0">
                                        {Array.from(new Set(data.map(value => value['role']))).map((value, index) => (
                                            <button key={index} onClick={() => handleFilterData('role', value)} type="button" className={`px-4 py-2 rounded-md ${filterData['role'].includes(value) ? 'bg-zinc-100 hover:bg-zinc-200' : 'hover:bg-zinc-100'} active:scale-95 ease-out duration-200`}>
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <hr className="my-1 opacity-0" />
                                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                    <div className="w-full sm:w-1/3">
                                        <p className="font-medium">
                                            Status
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-2/3 flex items-center gap-2 overflow-auto *:flex-shrink-0">
                                        {Array.from(new Set(data.map(value => value['aktif']))).map((value, index) => (
                                            <button key={index} onClick={() => handleFilterData('aktif', value)} type="button" className={`px-4 py-2 rounded-md ${filterData['aktif'].includes(value) ? 'bg-zinc-100 hover:bg-zinc-200' : 'hover:bg-zinc-100'} active:scale-95 ease-out duration-200`}>
                                                {value ? 'Aktif' : 'Tidak Aktif'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <hr className="my-1 opacity-0" />
                                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                    <div className="w-full sm:w-1/3">
                                        <p className="font-medium">
                                            Sudah ada Foto Profil
                                        </p>
                                    </div>
                                    <div className="w-full sm:w-2/3 flex items-center gap-2 overflow-auto *:flex-shrink-0">
                                        {Array.from(new Set(data.map(value => value['foto_profil']['id_foto'] ? true : false))).map((value, index) => (
                                            <button key={index} onClick={() => handleFilterData('foto_profil', value)} type="button" className={`px-4 py-2 rounded-md ${filterData['foto_profil'].includes(value) ? 'bg-zinc-100 hover:bg-zinc-200' : 'hover:bg-zinc-100'} active:scale-95 ease-out duration-200`}>
                                                {value ? 'Ya' : 'Tidak'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <hr className="my-5 opacity-0" />
                            </>
                        )}
                        <div className={`grid grid-cols-12 gap-2 px-5 py-4 border rounded-t-2xl *:font-medium ${lexand.className}`}>
                            <div className="col-span-1 flex items-center gap-3">
                                <input type="checkbox" checked={selectAll} onChange={() => setSelectAll(state => !state)} />
                                Foto
                            </div>
                            <div className="col-span-2 flex items-center">
                                Role
                            </div>
                            <div className="col-span-3 flex items-center">
                                Pegawai
                            </div>
                            <div className="col-span-3 flex items-center">
                                Akun
                            </div>
                            <div className="col-span-1 flex items-center">
                                Status
                            </div>
                            <div className="col-span-2 flex items-center">
                                <input type="text" value={filterData['search_list']} onChange={e => handleFilterData('search_list', e.target.value)} placeholder="Cari data disini" className="w-full px-3 py-2 rounded-md border outline-none font-light bg-zinc-50" />
                            </div>
                        </div>
                        {loadingFetch !== 'fetched' && (
                            <div className="flex justify-center items-center py-5 border-x border-b rounded-b-xl">
                                <div className="loading loading-sm loading-spinner"></div>
                            </div>
                        )}
                        {loadingFetch === 'fetched' && data.length < 1 && (
                            <div className="flex justify-center items-center py-5 border-x border-b rounded-b-xl">
                                Data tidak ada
                            </div>
                        )}
                        {loadingFetch === 'fetched' && data.length > 0 && (
                            <div className="relative overflow-auto max-h-[800px] divide-y border-x border-b rounded-b-2xl px-5">
                                {filteredData.slice(filterData['pagination'] === 1 ? filterData['totalList'] - filterData['totalList'] : (filterData['totalList'] * filterData['pagination']) - filterData['totalList'], filterData['totalList'] * filterData['pagination']).map((value, index) => (
                                    <div key={value['id_tenaga_kerja']} className="grid grid-cols-12 gap-2 py-5">
                                        <div className="col-span-1 flex items-center gap-2">
                                            <input type="checkbox" checked={selectedData.includes(value['id_tenaga_kerja'])} onChange={() => handleSelectData(value['id_tenaga_kerja'])}  />
                                            <button type="button" onClick={() => document.getElementById(`upload_${value['id_tenaga_kerja']}`).showModal()} className="w-10 h-10 flex-shrink-0 rounded-full relative overflow-hidden group">
                                                <img className="w-full h-full flex-shrink-0 rounded-full object-cover object-center group-hover:blur-sm ease-out duration-200 group-hover:scale-110" src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${value['foto_profil']['nama_file']}${value['foto_profil']['tipe']}`} alt="" />
                                                <div className="absolute top-0 left-0 w-full h-full rounded-full opacity-0 group-hover:opacity-100 bg-black/50 text-white flex items-center justify-center ease-out duration-200">
                                                    <FontAwesomeIcon icon={faEdit} className="w-5 h-5 text-inherit" />
                                                </div>
                                            </button>
                                        </div>
                                        <dialog id={`upload_${value['id_tenaga_kerja']}`} className="modal">
                                            <div className="modal-box rounded-md max-w-screen-md">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                <div className="flex items-center gap-3">
                                                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-inherit opacity-50" />
                                                    <h1 className="font-bold text-lg">
                                                        Ubah Foto Profil Tenaga Kerja
                                                    </h1>
                                                </div>
                                                <div className="flex items-center justify-center gap-3 my-5">
                                                    <hr className="flex-grow" />
                                                    <p>
                                                        Foto Profil
                                                    </p>
                                                    <hr className="flex-grow" />
                                                </div>
                                                <form onSubmit={e => tenaga_kerja_upload_foto_profil(e, `upload_${value['id_tenaga_kerja']}`, value['id_tenaga_kerja'])} className="flex flex-col sm:flex-row items-center gap-5">
                                                    <div className="w-full sm:w-1/3  flex flex-col items-center gap-2">
                                                        <img className="w-20 sm:w-32 lg:w-40 aspect-square flex-shrink-0 rounded-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${value['foto_profil']['nama_file']}${value['foto_profil']['tipe']}`} alt="" />
                                                        <p className="opacity-60 italic text-center">
                                                            Foto profil saat ini.
                                                        </p>
                                                    </div>
                                                    <div className="w-full sm:w-2/3">
                                                        <p className="opacity-60">
                                                            Anda bisa mengganti foto profil dengan format .png atau .jpg, dengan ukuran maksimal 2 MB
                                                        </p>
                                                        <hr className="my-1 opacity-0" />
                                                        <input type="file" required name="" id="" />
                                                        <hr className="my-1 opacity-0" />
                                                        <button type="submit" className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 active:bg-green-700 active:scale-95 ease-out duration-200 text-white">
                                                            Simpan
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </dialog>
                                        <div className="col-span-2 flex  items-center">
                                            {value['role']}
                                        </div>
                                        <div className="col-span-3 flex items-center">
                                            {value['nama_pegawai']}
                                        </div>
                                        <div className="col-span-3 flex items-center">
                                            <article className="space-y-1">
                                                <p>
                                                    {value['email_pegawai']}
                                                </p>
                                                <div className="">
                                                    {value['password']}
                                                </div>
                                            </article>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            {value['aktif'] && (
                                                <div className="flex items-center gap-3 text-green-500">
                                                    <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-inherit" />
                                                    Aktif
                                                </div>
                                            )}
                                            {!value['aktif'] && (
                                                <div className="flex items-center gap-3 text-red-500">
                                                    <FontAwesomeIcon icon={faXmark} className="w-3 h-3 text-inherit" />
                                                    Tidak Aktif
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-span-2 flex justify-center items-center gap-2">
                                            <button type="button" onClick={() => document.getElementById(`info_${value['id_tenaga_kerja']}`).showModal()} className="w-6 h-6 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-600 hover:scale-95 active:scale-90 ease-out duration-200 lg:hidden flex items-center justify-center text-white">
                                                <FontAwesomeIcon icon={faFile} className="w-3 h-3 text-inherit" />
                                            </button>
                                            <dialog id={`info_${value['id_tenaga_kerja']}`} className="modal">
                                                <div className="modal-box rounded-md max-w-screen-md">
                                                    <form method="dialog">
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faFile} className="w-4 h-4 text-inherit opacity-50" />
                                                        <h1 className="font-bold text-lg">
                                                            Informasi Tenaga Kerja
                                                        </h1>
                                                    </div>
                                                    <div className="flex md:hidden items-center justify-center gap-3 my-5">
                                                        <hr className="flex-grow" />
                                                        <p>
                                                            Foto Profil
                                                        </p>
                                                        <hr className="flex-grow" />
                                                    </div>
                                                    <form onSubmit={e => tenaga_kerja_upload_foto_profil(e, `info_${value['id_tenaga_kerja']}`, value['id_tenaga_kerja'])} className="flex md:hidden flex-col sm:flex-row items-center gap-5">
                                                        <div className="w-full sm:w-1/3  flex flex-col items-center gap-2">
                                                            <img className="w-24 sm:w-40 aspect-square flex-shrink-0 rounded-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${value['foto_profil']['nama_file']}${value['foto_profil']['tipe']}`} alt="" />
                                                            <p className="opacity-60 italic text-center">
                                                                Foto profil saat ini.
                                                            </p>
                                                        </div>
                                                        <div className="w-full sm:w-2/3">
                                                            <p className="opacity-60">
                                                                Anda bisa mengganti foto profil dengan format .png atau .jpg, dengan ukuran maksimal 2 MB
                                                            </p>
                                                            <hr className="my-1 opacity-0" />
                                                            <input type="file" required name="" id="" />
                                                            <hr className="my-1 opacity-0" />
                                                            <button type="submit" className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 active:bg-green-700 active:scale-95 ease-out duration-200 text-white">
                                                                Simpan
                                                            </button>
                                                        </div>
                                                    </form>
                                                    <div className="flex  items-center justify-center gap-3 my-5">
                                                        <hr className="flex-grow" />
                                                        <p>
                                                            Informasi
                                                        </p>
                                                        <hr className="flex-grow" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3 opacity-60">
                                                                ID Pegawai
                                                            </div>
                                                            <div className="w-full lg:w-2/3 font-medium">
                                                                {value['id_pegawai']}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3 opacity-60">
                                                                Nama Pegawai
                                                            </div>
                                                            <div className="w-full lg:w-2/3 font-medium">
                                                                {value['nama_pegawai']}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3 opacity-60">
                                                                Email Pegawai
                                                            </div>
                                                            <div className="w-full lg:w-2/3 font-medium">
                                                                {value['email_pegawai']}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3 opacity-60">
                                                                Role Pegawai
                                                            </div>
                                                            <div className="w-full lg:w-2/3 font-medium">
                                                                {value['role']}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3 opacity-60">
                                                                Quotes
                                                            </div>
                                                            <div className="w-full lg:w-2/3 font-medium">
                                                                {value['quotes']}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3 opacity-60">
                                                                Aktif
                                                            </div>
                                                            <div className="w-full lg:w-2/3 font-medium">
                                                                {value['aktif'] ? 'Ya' : 'Tidak'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </dialog>
                                            <button type="button" onClick={() => document.getElementById(`ubah_${value['id_tenaga_kerja']}`).showModal()} className="w-6 h-6 rounded bg-amber-500 hover:bg-amber-400 active:bg-amber-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center justify-center text-white">
                                                <FontAwesomeIcon icon={faEdit} className="w-3 h-3 text-inherit" />
                                            </button>
                                            <dialog id={`ubah_${value['id_tenaga_kerja']}`} className="modal">
                                                <div className="modal-box rounded-md max-w-screen-md">
                                                    <form method="dialog">
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-inherit opacity-50" />
                                                        <h1 className="font-bold text-lg">
                                                            Ubah Tenaga Kerja
                                                        </h1>
                                                    </div>
                                                    <hr className="my-5" />
                                                    <form onSubmit={e => tenaga_kerja_edit(e, `ubah_${value['id_tenaga_kerja']}`, value['id_tenaga_kerja'])} className="space-y-3">
                                                        
                                                        <div className="flex flex-col lg:flex-row gap-1">
                                                            <div className="w-full lg:w-1/3 lg:translate-y-2">
                                                                Quotes
                                                            </div>
                                                            <div className="w-full lg:w-2/3">
                                                                <textarea rows={4} cols={50} className="w-full px-3 py-2 border min-h-20 max-h-80" defaultValue={`${value['quotes']}`}>

                                                                </textarea>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3">
                                                                Password
                                                            </div>
                                                            <div className="w-full lg:w-2/3">
                                                                <input type="text" defaultValue={value['password']} className="w-full px-3 py-2 border" placeholder="Password untuk akun"  />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3">
                                                                Pilih Role
                                                            </div>
                                                            <div className="w-full lg:w-2/3">
                                                                <AdvanceSelect 
                                                                    menuPortalTargetById={`ubah_${value['id_tenaga_kerja']}`} 
                                                                    placeholder="Cari dan pilih role disini" 
                                                                    listData={daftarRole}
                                                                    required={true}
                                                                    defaultValue={daftarRole[daftarRole.findIndex(v => v['value'] === value['role'])]}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-1">
                                                            <div className="w-full lg:w-1/3">
                                                                Aktif
                                                            </div>
                                                            <div className="w-full lg:w-2/3">
                                                                <div className="flex items-center gap-3">
                                                                    <input type="checkbox" className="cursor-pointer" defaultChecked={value['aktif']} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="px-4 py-2 rounded-lg w-full lg:w-fit bg-green-600 hover:bg-green-500 active:bg-green-700 active:scale-95 ease-out duration-200 text-white">
                                                            Simpan
                                                        </button>
                                                    </form>
                                                </div>
                                            </dialog>
                                            <button type="button" onClick={() => tenaga_kerja_delete(value['id_tenaga_kerja'])} className="w-6 h-6 rounded bg-red-500 hover:bg-red-400 active:bg-red-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center justify-center text-white">
                                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3 text-inherit" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <hr className="my-2 opacity-0" />
                        <div className="flex justify-between items-center">
                            <div className="">
                                <p>
                                    {selectedData.length} Dipilih
                                </p>
                                <hr className="my-2" />
                                <div className="flex items-center gap-3">
                                    <button type="button" onClick={() => submitActionSelectedData.delete()} className="w-6 h-6 rounded bg-red-500 hover:bg-red-400 active:bg-red-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faTrash} className="w-3 h-3 text-inherit" />
                                    </button>
                                    <button type="button" onClick={() => submitActionSelectedData.activate()} className="w-6 h-6 rounded bg-green-500 hover:bg-green-400 active:bg-green-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-inherit" />
                                    </button>
                                    <button type="button" onClick={() => submitActionSelectedData.deactivate()} className="w-6 h-6 rounded bg-red-500 hover:bg-red-400 active:bg-red-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faXmark} className="w-3 h-3 text-inherit" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div className="flex items-center gap-3">
                                    <button type="button" onClick={() => handleFilterData('pagination', filterData['pagination'] > 1 ? filterData['pagination'] - 1 : filterData['pagination'])}>
                                        <FontAwesomeIcon icon={faAnglesLeft} className="w-3 h-3 text-inherit" />
                                    </button>
                                    <p>
                                        {filterData['pagination']}
                                    </p>
                                    <button type="button" onClick={() => handleFilterData('pagination', filterData['pagination'] < Math.ceil(data.length / filterData['totalList']) ? filterData['pagination'] + 1 : filterData['pagination'])}>
                                        <FontAwesomeIcon icon={faAnglesRight} className="w-3 h-3 text-inherit" />
                                    </button>
                                </div>
                                <select value={filterData['totalList']} onChange={e => handleFilterData('totalList', e.target.value)} className="px-3 py-2 rounded border cursor-pointer">
                                    <option value="" disabled>-- Pilih --</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>

                    </MainDashboardPage>
                </div>
            </div>
        </MainLayoutPage>
    )
}