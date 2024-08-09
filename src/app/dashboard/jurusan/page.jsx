'use client'

import CustomModal from "@/components/custom_modal"
import MainDashboardPage from "@/components/mainDashboard"
import MainLayoutPage from "@/components/mainLayout"
import { lexand } from "@/lib/fonts"
import { swalToast } from "@/lib/toast"
import { M_Jurusan_assign_kegiatan, M_Jurusan_create, M_Jurusan_delete, M_Jurusan_delete_kegiatan, M_Jurusan_getAll, M_Jurusan_update } from "@/models/M_Jurusan"
import { faEdit, faEllipsisH, faFile, faImage, faPaperclip, faPlug, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function DashboardJurusanPage() {

    const [dataJurusan, setDataJurusan] = useState({
        data: [],  loadingFetch: ''
    })

    const getData = async () => {
        setDataJurusan(state => ({...state, loadingFetch: 'loading'}))
        const response = await M_Jurusan_getAll()
        console.log(response)
        if(response.success) {
            setDataJurusan(state => ({...state, data: response.data}))
        }
        setDataJurusan(state => ({...state, loadingFetch: 'fetched'}))
    }

    useEffect(() => {
        getData()
    }, [])

    const jurusan = {
        create: async (e, modal) => {
            e.preventDefault()
    
            document.getElementById(modal).close()
    
            const payload = {
                warna: e.target[0].value,
                nama: e.target[1].value,
                singkatan: e.target[2].value,
                deskripsi: e.target[3].value,
                kegiatan: e.target[4].value,
                aktif: e.target[5].checked,
            }
    
            Swal.fire({
                title: 'Sedang memproses data',
                timer: 60000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    const response = await M_Jurusan_create(payload)
    
                    if(response.success) {
                        await getData()
                        Swal.close()
                        e.target[0].value = ''
                        e.target[1].value = ''
                        e.target[2].value = ''
                        e.target[3].value = ''
                        e.target[4].value = ''
                        e.target[5].checked = true
                        return swalToast.fire({
                            icon: 'success',
                            text: 'Berhasil menambahkan jurusan baru',
                            title: 'Sukses',
                            timer: 2000
                        })
                    }else{
                        Swal.fire({
                            title: 'Gagal',
                            text: response.message,
                            icon: 'error'
                        }).then(() => {
                            document.getElementById(modal).showModal()
                        })
                    }
                }
            })
        },
        update: async (e, modal, id_jurusan) => {
            e.preventDefault()
    
            document.getElementById(modal).close()
    
            const payload = {
                warna: e.target[0].value,
                nama: e.target[1].value,
                singkatan: e.target[2].value,
                deskripsi: e.target[3].value,
                kegiatan: e.target[4].value,
                aktif: e.target[5].checked,
            }
    
            Swal.fire({
                title: 'Sedang memproses data',
                timer: 60000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    const response = await M_Jurusan_update(id_jurusan, payload)
    
                    if(response.success) {
                        await getData()
                        Swal.close()
                        return swalToast.fire({
                            icon: 'success',
                            text: 'Berhasil mengubah jurusan tersebut',
                            title: 'Sukses',
                            timer: 2000
                        })
                    }else{
                        Swal.fire({
                            title: 'Gagal',
                            text: response.message,
                            icon: 'error'
                        }).then(() => {
                            document.getElementById(modal).showModal()
                        })
                    }
                }
            })
        },
        delete: async (id_jurusan) => {
            Swal.fire({
                title: 'Sedang memproses data',
                timer: 60000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    const response = await M_Jurusan_delete(id_jurusan)
    
                    if(response.success) {
                        await getData()
                        Swal.close()
                        return swalToast.fire({
                            icon: 'success',
                            text: 'Berhasil menghapus jurusan tersebut',
                            title: 'Sukses',
                            timer: 2000
                        })
                    }else{
                        Swal.fire({
                            title: 'Gagal',
                            text: response.message,
                            icon: 'error'
                        }).then(() => {
                            document.getElementById(modal).showModal()
                        })
                    }
                }
            })
        },
        kegiatan: {
            assign: async (e, modal, fk_jurusan_id_jurusan) => {
                e.preventDefault()

                document.getElementById(modal).close()
                const formData = new FormData()

                const payload = {
                    image: e.target[0].files[0],
                    kategori: 'kegiatan',
                    fk_jurusan_id_jurusan
                }

                Object.keys(payload).map(key => {
                    formData.append(key, payload[key])
                })

                Swal.fire({
                    title: 'Sedang memproses data',
                    timer: 60000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: async () => {
                        const response = await M_Jurusan_assign_kegiatan(formData)
        
                        if(response.success) {
                            await getData()
                            Swal.close()
                            return swalToast.fire({
                                icon: 'success',
                                text: 'Berhasil menambahkan kegiatan jurusan tersebut',
                                title: 'Sukses',
                                timer: 2000
                            })
                        }else{
                            Swal.fire({
                                title: 'Gagal',
                                text: response.message,
                                icon: 'error'
                            }).then(() => {
                                document.getElementById(modal).showModal()
                            })
                        }
                    }
                })
                
            },
            delete: async (modal, foto) => {
                Swal.fire({
                    title: 'Sedang memproses data',
                    timer: 60000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: async () => {
                        const response = await M_Jurusan_delete_kegiatan(foto['id_foto'], foto['nama_file'], foto['tipe'])
        
                        if(response.success) {
                            await getData()
                            Swal.close()
                            return swalToast.fire({
                                icon: 'success',
                                text: 'Berhasil menghapus kegiatan jurusan tersebut',
                                title: 'Sukses',
                                timer: 2000
                            })
                        }else{
                            Swal.fire({
                                title: 'Gagal',
                                text: response.message,
                                icon: 'error'
                            }).then(() => {
                                document.getElementById(modal).showModal()
                            })
                        }
                    }
                })
            }
        }
    }

    

    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className={`max-w-screen-2xl w-full`}>
                    <MainDashboardPage>
                        <div className={`${lexand.className}`}>
                            <div className="grid grid-cols-12 px-5 py-4 rounded-t-xl border-x border-t gap-5">
                                <div className="col-span-1 flex items-center">
                                    Warna Jurusan
                                </div>
                                <div className="col-span-4 flex items-center">
                                    Nama
                                </div>
                                <div className="col-span-1 flex items-center">
                                    Singkatan
                                </div>
                                <div className="col-span-2 flex items-center">
                                    Deskripsi
                                </div>
                                <div className="col-span-2 flex items-center">
                                    Kegiatan Relevan
                                </div>
                                <div className="col-span-2 flex items-center justify-center">
                                    <button type="button" onClick={() => document.getElementById('tambah_data').showModal()} className="rounded-md bg-green-500/5 flex items-center justify-center gap-3 w-full px-3 py-2 text-green-500 hover:bg-green-500/10 hover:text-green-400 ease-out duration-150 active:scale-95 active:bg-green-700/10">
                                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-inherit" />
                                        Tambah Jurusan
                                    </button>
                                    <CustomModal modalBoxClass="max-w-3xl" modalId="tambah_data" title="Tambah Jurusan" closeButton={true}>
                                        <form onSubmit={e => jurusan.create(e, 'tambah_data')} className="space-y-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <p className="w-full sm:w-1/3">
                                                    Pilih Warna
                                                </p>
                                                <div className="w-full sm:w-2/3">
                                                    <input type="color" required className="w-full" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <p className="w-full sm:w-1/3">
                                                    Nama
                                                </p>
                                                <div className="w-full sm:w-2/3">
                                                    <input type="text" required className="px-3 py-2 rounded border font-light w-full" placeholder="Masukkan nama jurusan" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <p className="w-full sm:w-1/3">
                                                    Singkatan
                                                </p>
                                                <div className="w-full sm:w-2/3">
                                                    <input type="text" required className="px-3 py-2 rounded border font-light w-full" placeholder="Masukkan singkatan jurusan" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row  gap-2">
                                                <p className="w-full sm:w-1/3 sm:translate-y-2">
                                                    Deskripsi
                                                </p>
                                                <div className="w-full sm:w-2/3">
                                                    <textarea required className="px-3 py-2 rounded border font-light w-full min-h-9 max-h-80"></textarea>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row  gap-2">
                                                <p className="w-full sm:w-1/3 sm:translate-y-2">
                                                    Kegiatan Relevan
                                                </p>
                                                <div className="w-full sm:w-2/3">
                                                    <textarea required className="px-3 py-2 rounded border font-light w-full min-h-9 max-h-80"></textarea>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <p className="w-full sm:w-1/3">
                                                    Aktif
                                                </p>
                                                <div className="w-full sm:w-2/3">
                                                    <input type="checkbox" defaultChecked  />
                                                </div>
                                            </div>
                                            <button type="submit" className="px-3 py-2 rounded-md flex justify-center items-center gap-3 w-full sm:w-fit bg-green-500 hover:bg-green-400 active:bg-green-700 active:scale-95 ease-out duration-150 text-white">
                                                <FontAwesomeIcon icon={faSave} className="w-3 h-3 text-inherit" />
                                                Simpan
                                            </button>
                                        </form>
                                    </CustomModal>
                                </div>
                            </div>
                            {dataJurusan['loadingFetch'] !== 'fetched' && (
                                <div className="border w-full flex justify-center items-center py-5">
                                    <div className="loading loading-md loading-spinner opacity-50"></div>
                                </div>
                            )}
                            {dataJurusan['loadingFetch'] === 'fetched' && dataJurusan['data'].length < 1 && (
                                <div className="border w-full flex justify-center items-center py-5">
                                    <p className="font-light">
                                        Data tidak ditemukan
                                    </p>
                                </div>
                            )}
                            {dataJurusan['loadingFetch'] === 'fetched' && dataJurusan['data'].length > 0 && (
                                <div className="border divide-y">
                                    {dataJurusan['data'].map((value, index) => (
                                        <div key={value['id_jurusan'] + '_' + index} className="grid grid-cols-12 p-5 font-light gap-5">
                                            <div className="col-span-1 flex items-center">
                                                <div className="w-7 h-7 rounded-full" style={{
                                                    backgroundColor: `${value['warna']}`
                                                }}></div>
                                            </div>
                                            <div className="col-span-4 flex items-center">
                                                {value['nama']}
                                            </div>
                                            <div className="col-span-1 flex items-center">
                                                {value['singkatan']}
                                            </div>
                                            <div className="col-span-2 flex items-center text-justify">
                                                {(value['deskripsi'] !== null || value['deskripsi'] !== '') && (
                                                    <button type="button" onClick={() => document.getElementById(`info_${value['id_jurusan']}`).showModal()} className="underline hover:decoration-2 text-blue-500">
                                                        Detail
                                                    </button>
                                                )}
                                                <CustomModal modalBoxClass="max-w-2xl" modalId={`info_${value['id_jurusan']}`} title="Deskripsi Jurusan">
                                                    <p className="text-justify font-light">
                                                        {value['deskripsi']}
                                                    </p>
                                                </CustomModal>
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                {value['kegiatan']}
                                            </div>
                                            <div className="col-span-2 flex items-center justify-center gap-2">
                                                <button type="button" className="rounded border border-blue-500 flex lg:hidden items-center justify-center bg-blue-400 p-1.5 text-white hover:bg-blue-300 active:bg-blue-600 active:scale-95 ease-out duration-200">
                                                    <FontAwesomeIcon icon={faFile} className="w-3 h-3 text-inherit" />
                                                </button>
                                                <button type="button" onClick={() => document.getElementById(`gambar_${value['id_jurusan']}`).showModal()} className="rounded border border-green-500 flex items-center justify-center bg-green-400 p-1.5 text-white hover:bg-green-300 active:bg-green-600 active:scale-95 ease-out duration-200">
                                                    <FontAwesomeIcon icon={faImage} className="w-3 h-3 text-inherit" />
                                                </button>
                                                <CustomModal modalBoxClass="max-w-2xl" modalId={`gambar_${value['id_jurusan']}`} title="Gambar - gambar kegiatan">
                                                    <form onSubmit={e => jurusan.kegiatan.assign(e, `gambar_${value['id_jurusan']}`, value['id_jurusan'])}>
                                                        <p className="mb-1 font-light opacity-50">
                                                            Anda hanya bisa menambahkan foto dengan <span className="italic">Landscape</span>.
                                                        </p>
                                                        <input type="file" required />
                                                        <hr className="my-1 opacity-0" />
                                                        <button type="submit" className="px-3 py-2 rounded-md bg-green-500/5 hover:bg-green-500/10 text-green-500 hover:text-green-400 active:scale-95 ease-out duration-150 flex items-center justify-center gap-3 w-full sm:w-fit">
                                                            <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-inherit" />
                                                            Tambah Foto
                                                        </button>   
                                                    </form>
                                                    <hr className="my-5 opacity-0" />
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faImage} className="w-3 h-3 text-inherit opacity-50" />
                                                        Daftar Gambar Kegiatan
                                                    </div>
                                                    <hr className="my-5 " />
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                        {value['foto_kegiatan'].map((v, index2) => (
                                                            <div key={v['id_foto']} className="relative overflow-hidden border rounded-2xl aspect-video">
                                                                <img className="w-full h-full object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${v['nama_file']}${v['tipe']}`} alt="" />
                                                                <div className="absolute top-0 right-0 w-full h-full p-2">
                                                                    <div className="flex justify-end items-end">
                                                                        <div className="bg-white p-1 rounded-lg flex items-center gap-3">
                                                                            <button type="button" onClick={() => jurusan.kegiatan.delete(`gambar_${value['id_jurusan']}`, v)} className="p-1 rounded flex items-center justify-center border text-red-500 border-red-500 bg-red-500/10">
                                                                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3 text-inherit" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CustomModal>
                                                <button type="button" onClick={() => document.getElementById(`edit_${value['id_jurusan']}`).showModal()} className="rounded border border-amber-500 flex items-center justify-center bg-amber-400 p-1.5 text-white hover:bg-amber-300 active:bg-amber-600 active:scale-95 ease-out duration-200">
                                                    <FontAwesomeIcon icon={faEdit} className="w-3 h-3 text-inherit" />
                                                </button>
                                                <CustomModal modalBoxClass="max-w-3xl" modalId={`edit_${value['id_jurusan']}`} title="Ubah Jurusan" closeButton={true}>
                                                    <form onSubmit={e => jurusan.update(e, `edit_${value['id_jurusan']}`, value['id_jurusan'])} className="space-y-4">
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                            <p className="w-full sm:w-1/3">
                                                                Pilih Warna
                                                            </p>
                                                            <div className="w-full sm:w-2/3">
                                                                <input type="color" required defaultValue={value['warna']} className="w-full" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                            <p className="w-full sm:w-1/3">
                                                                Nama
                                                            </p>
                                                            <div className="w-full sm:w-2/3">
                                                                <input type="text" defaultValue={value['nama']} required className="px-3 py-2 rounded border font-light w-full" placeholder="Masukkan nama jurusan" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                            <p className="w-full sm:w-1/3">
                                                                Singkatan
                                                            </p>
                                                            <div className="w-full sm:w-2/3">
                                                                <input type="text" defaultValue={value['singkatan']} required className="px-3 py-2 rounded border font-light w-full" placeholder="Masukkan singkatan jurusan" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row  gap-2">
                                                            <p className="w-full sm:w-1/3 sm:translate-y-2">
                                                                Deskripsi
                                                            </p>
                                                            <div className="w-full sm:w-2/3">
                                                                <textarea required defaultValue={value['deskripsi']} className="px-3 py-2 rounded border font-light w-full min-h-9 max-h-80"></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row  gap-2">
                                                            <p className="w-full sm:w-1/3 sm:translate-y-2">
                                                                Kegiatan Relevan
                                                            </p>
                                                            <div className="w-full sm:w-2/3">
                                                                <textarea required defaultValue={value['kegiatan']} className="px-3 py-2 rounded border font-light w-full min-h-9 max-h-80"></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                            <p className="w-full sm:w-1/3">
                                                                Aktif
                                                            </p>
                                                            <div className="w-full sm:w-2/3">
                                                                <input type="checkbox" defaultChecked={value['aktif']}  />
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="px-3 py-2 rounded-md flex justify-center items-center gap-3 w-full sm:w-fit bg-green-500 hover:bg-green-400 active:bg-green-700 active:scale-95 ease-out duration-150 text-white">
                                                            <FontAwesomeIcon icon={faSave} className="w-3 h-3 text-inherit" />
                                                            Simpan
                                                        </button>
                                                    </form>
                                                </CustomModal>
                                                <button type="button" onClick={() => jurusan.delete(value['id_jurusan'])} className="rounded border border-red-500 flex items-center justify-center bg-red-400 p-1.5 text-white hover:bg-red-300 active:bg-red-600 active:scale-95 ease-out duration-200">
                                                    <FontAwesomeIcon icon={faTrash} className="w-3 h-3 text-inherit" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="px-5 py-4 border-x border-b rounded-b-xl">
                                <p>
                                    Total {dataJurusan.data.length} Jurusan
                                </p>
                            </div>
                        </div>
                    </MainDashboardPage>
                </div>
            </div>
        </MainLayoutPage>
    )
}