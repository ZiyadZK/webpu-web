'use client'

import AdvancedDatePicker from "@/components/datePicker"
import MainLayoutPage from "@/components/mainLayout"
import { lexand } from "@/lib/fonts"
import { swalToast } from "@/lib/toast"
import { M_Akun_get_logged_akun, M_Akun_logout } from "@/models/M_Akun"
import { M_SIMAK_Data_Pegawai_detail_update } from "@/models/M_SIMAK_Data_Pegawai"
import { M_Tenaga_Kerja_detail_getAll, M_Tenaga_Kerja_upload_foto_profil } from "@/models/M_Tenaga_Kerja"
import { faArrowRight, faCertificate, faEllipsisH, faExclamationTriangle, faImage, faSave, faUser, faUserCog, faUserGraduate, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const allowedMimeType = [
    'image/jpeg',
    'image/png'
]

export default function MePage() {

    const router = useRouter()

    const [tab, setTab] = useState('pribadi')
    const [detail, setDetail] = useState(null)
    const [loadingFetch, setLoadingFetch] = useState('')
    const [loggedAkun, setLoggedAkun] = useState({
        status: '', data: null
    })
    const [inputImage, setInputImage] = useState(null)

    const handleChangeFile = async (file) => {
        if(typeof(file) !== 'undefined') {
            if(!allowedMimeType.includes(file.type)) {
                setInputImage(null)
                swalToast.fire({
                    title: 'Gagal',
                    text: 'Upload foto profil hanya boleh menggunakan file berupa gambar dengan ekstensi .jpg atau .png',
                    icon: 'error'
                })

                return
            }

            if(file.size >= 2 * 1024 * 1024) {
                setInputImage(null)
                swalToast.fire({
                    title: 'Gagal',
                    text: 'File tidak boleh melebihi ukuran 2 MB',
                    icon: 'error'
                })
                return
            }

            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = () => {
                const base64string = reader.result
                setInputImage(base64string)
            }

            reader.onerror = (error) => {
                console.log(error)
                swalToast.fire({
                    title: 'Gagal',
                    text: 'Terdapat kesalahan disaat memproses data, hubungi Administrator',
                    icon: 'error'
                })
            }


        }
    }

    const getDetail = async (id_pegawai) => {
        setLoadingFetch('loading')
        setInputImage(null)
        const response = await M_Tenaga_Kerja_detail_getAll(id_pegawai)
        if(response.success) {
            setDetail(response.data)
        }
        setLoadingFetch('fetched')
    }

    const getLoggedAkun = async () => {
        setLoggedAkun(state => ({...state, status: 'loading'}))
        const response = await M_Akun_get_logged_akun()
        if(response.success) {
            setLoggedAkun(state => ({...state, data: response.data, status: 'fetched' }))
            await getDetail(response.data.id_pegawai)
        }else{
            setLoggedAkun(state => ({...state, status: 'fetched', data: null}))
        }
        
    }

    useEffect(() => {
        getLoggedAkun()
    }, [])

    const submitUbahProfile = async (e) => {
        e.preventDefault()

        const payload = {
            nama_pegawai: e.target[0].value,
            email_pegawai: e.target[1].value,
            jabatan: e.target[2].value,
            status_kepegawaian: e.target[3].value,
            tmt: e.target[4].value,
            keterangan: e.target[5].value,
            nik: e.target[6].value,
            nip: e.target[7].value,
            nuptk: e.target[8].value,
            tmpt_lahir: e.target[9].value,
            tanggal_lahir: e.target[10].value,
        }

        if(loggedAkun['data']['email_pegawai'] !== payload['email_pegawai']) {
            Swal.fire({
                title: 'Apakah anda yakin?',
                text: 'Anda akan merubah email anda, anda diharuskan untuk Masuk ulang untuk menyimpan data',
                icon: 'question',
                showCancelButton: true
            }).then((answer) => {
                if(answer.isConfirmed) {
                    Swal.fire({
                        title: 'Sedang memproses data',
                        timer: 60000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: async () => {
                            const response = await M_SIMAK_Data_Pegawai_detail_update(loggedAkun['data']['id_pegawai'])

                            if(response.success) {
                                if(loggedAkun['data']['email_pegawai'] !== payload['email_pegawai']) {
                                    const responseLogout = await M_Akun_logout()

                                    if(responseLogout.success) {
                                        router.push('/')
                                    }
                                }else{
                                    Swal.close()
                                    await getDetail(loggedAkun['data']['id_pegawai'])
                                }
                            }else{
                                Swal.fire({
                                    title: 'Gagal',
                                    text: response.message,
                                    icon: 'error'
                                })
                            }
                        }
                    })
                }
            })
        }else{
            Swal.fire({
                title: 'Sedang memproses data',
                timer: 60000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    const response = await M_SIMAK_Data_Pegawai_detail_update(loggedAkun['data']['id_pegawai'], payload)

                    if(response.success) {
                        if(loggedAkun['data']['email_pegawai'] !== payload['email_pegawai']) {
                            const responseLogout = await M_Akun_logout()

                            if(responseLogout.success) {
                                router.push('/')
                            }
                        }else{
                            Swal.close()
                            await getDetail(loggedAkun['data']['id_pegawai'])
                        }
                    }else{
                        Swal.fire({
                            title: 'Gagal',
                            text: response.message,
                            icon: 'error'
                        })
                    }
                }
            })
        }
        
    }

    const submitFotoProfil = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', e.target[0].files[0])
        formData.append('fk_foto_id_tenaga_kerja', loggedAkun['data']['id_tenaga_kerja'])
        formData.append('kategori', 'foto_profil')

        Swal.fire({
            title: 'Sedang memproses data',
            timer: 60000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: async () => {

                const response = await M_Tenaga_Kerja_upload_foto_profil(formData)

                if(response.success) {
                    await getDetail(loggedAkun['data']['id_pegawai'])
                    Swal.close()
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

    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className={`max-w-screen-xl w-full ${lexand.className}`}>
                    {loadingFetch !== 'fetched' && (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="loading loading-spinner loading-lg opacity-50"></div>
                        </div>
                    )}
                    {loadingFetch === 'fetched' && detail === null && (
                        <div className="w-full h-full flex items-center justify-center gap-3">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="w-10 h-10 text-inherit" />
                            Data tidak ditemukan!
                        </div>
                    )}
                    {loadingFetch === 'fetched' && detail !== null && (
                        <>
                            <div className="flex items-center overflow-auto *:flex-shrink-0 p-3 rounded-lg border">
                                <button type="button" disabled={tab === 'pribadi'} onClick={() => setTab('pribadi')} className={`px-4 py-2 rounded-md font-light ${tab !== 'pribadi' ? 'hover:bg-zinc-100' : 'bg-zinc-100'} ease-out duration-200`}>
                                    Data Pribadi
                                </button>
                                <button type="button" disabled={tab === 'pendidikan'} onClick={() => setTab('pendidikan')} className={`px-4 py-2 rounded-md font-light ${tab !== 'pendidikan' ? 'hover:bg-zinc-100' : 'bg-zinc-100'} ease-out duration-200`}>
                                    Data Pendidikan
                                </button>
                                <button type="button" disabled={tab === 'sertifikat'} onClick={() => setTab('sertifikat')} className={`px-4 py-2 rounded-md font-light ${tab !== 'sertifikat' ? 'hover:bg-zinc-100' : 'bg-zinc-100'} ease-out duration-200`}>
                                    Data Sertifikat
                                </button>
                                <button type="button" disabled={tab === 'kelas'} onClick={() => setTab('kelas')} className={`px-4 py-2 rounded-md font-light ${tab !== 'kelas' ? 'hover:bg-zinc-100' : 'bg-zinc-100'} ease-out duration-200`}>
                                    Data Kelas
                                </button>
                                
                            </div>
                            <hr className="my-5 opacity-0" />
                            {tab === 'pribadi' && (
                                <>
                                    <div className="flex items-center gap-3 text-xl">
                                        <FontAwesomeIcon icon={faImage} className="w-3 h-3 text-inherit opacity-50" />
                                        Foto Profil
                                    </div>
                                    <hr className="my-5" />
                                    <form onSubmit={e => submitFotoProfil(e)}>
                                        <div className="lg:px-5">
                                            <div className="flex flex-col-reverse lg:flex-row gap-2">
                                                <div className="w-full lg:w-1/3">
                                                    <p className="text-xs font-light opacity-50 italic">
                                                        Gunakan format .png atau .jpeg dengan ukuran maksimal 2MB
                                                    </p>
                                                    <hr className="my-1 opacity-0" />
                                                    <input type="file" required onChange={e => handleChangeFile(e.target.files[0])} />
                                                    <hr className="my-2 opacity-0" />
                                                    <button type="submit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-400 active:bg-green-800 active:scale-95 ease-out duration-200 flex items-center justify-center gap-3 w-full sm:w-fit text-white">
                                                        <FontAwesomeIcon icon={faSave} className="w-3 h-3 text-inherit opacity-50" />
                                                        Simpan 
                                                    </button>
                                                </div>
                                                <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <p className="text-center">
                                                            Preview
                                                        </p>
                                                        <div className="w-40 h-40 border rounded-full relative overflow-hidden">
                                                            <img className="w-full h-full aspect-square object-cover object-center" src={inputImage} />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-2">
                                                        <p className="text-center">
                                                            Foto anda sekarang
                                                        </p>
                                                        <div className="w-40 h-40 border rounded-full relative overflow-hidden">
                                                            <img className="w-full h-full aspect-square object-cover object-center" src={`${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/v1/data/foto/${detail['foto_profil']['nama_file']}${detail['foto_profil']['tipe']}`} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <hr className="my-5 opacity-0" />
                                    <div className="flex items-center gap-3 text-xl">
                                        <FontAwesomeIcon icon={faUser} className="w-3 h-3 text-inherit opacity-50" />
                                        Data Pribadi
                                    </div>
                                    <hr className="my-5" />
                                    <form onSubmit={e => submitUbahProfile(e)}>

                                        <div className="space-y-4 lg:px-5">
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Nama Panjang
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['nama_pegawai']} required className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" placeholder="Nama Kepanjangan anda" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Email
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['email_pegawai']} required className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" placeholder="Email yang sedang aktif" />
                                                    <hr className="my-0.5 opacity-0" />
                                                    <p className="opacity-50 italic">
                                                        Jika anda mengganti email anda, anda diharuskan untuk <b>Masuk</b> ulang.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Jabatan
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" required defaultValue={detail['jabatan']} className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" disabled />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Status Kepegawaian
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['status_kepegawaian']} className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" disabled />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Tamat Kepegawaian
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['tmt']} className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" disabled />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Keterangan
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" required defaultValue={detail['keterangan']} className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" placeholder="Keterangan anda" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    No Induk Kependudukan
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['nik']} required className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" placeholder="No Induk Kependudukan anda" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    No Induk Pegawai
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['nip']} required className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" placeholder="No Induk Pegawai anda" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    No Unik Pendidik dan Tenaga Kependidikan
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['nuptk']} required className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full lg:w-1/2 placeholder:font-light" placeholder="No Unik Pendidik dan Tenaga Kependidikan anda" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Tempat Lahir
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="text" defaultValue={detail['tmpt_lahir']} required className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-full placeholder:font-light" placeholder="Tempat Lahir anda" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <p className="w-full lg:w-1/3 lg:translate-y-2">
                                                    Tanggal Lahir
                                                </p>
                                                <div className="w-full lg:w-2/3">
                                                    <input type="date" defaultValue={detail['tanggal_lahir']} required className="px-4 py-2 rounded-md border outline-none hover:border-zinc-400 focus:border-zinc-700 ease-out duration-200 w-40 placeholder:font-light" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="flex justify-end">
                                            <button type="submit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-400 active:bg-green-800 active:scale-95 ease-out duration-200 flex items-center justify-center gap-3 w-full sm:w-fit text-white">
                                                <FontAwesomeIcon icon={faSave} className="w-3 h-3 text-inherit opacity-50" />
                                                Simpan Perubahan Profil anda
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                            {tab === 'pendidikan' && (
                                <>
                                    <div className="flex items-center gap-3 text-xl">
                                        <FontAwesomeIcon icon={faUserGraduate} className="w-3 h-3 text-inherit opacity-50" />
                                        Data Pendidikan
                                    </div>
                                    <hr className="my-5" />
                                    <div className="grid grid-cols-12 px-4 py-3 border rounded-t-xl">
                                        <div className="col-span-7 sm:col-span-3 lg:col-span-2">
                                            Tingkat Pendidikan
                                        </div>
                                        <div className="col-span-2 sm:col-span-3 hidden lg:col-span-2 sm:block">
                                            Sekolah
                                        </div>
                                        <div className="col-span-2 sm:col-span-3 hidden lg:col-span-2 sm:block">
                                            Universitas
                                        </div>
                                        <div className="col-span-2 hidden lg:block">
                                            Fakultas
                                        </div>
                                        <div className="col-span-2 hidden lg:block">
                                            Program Studi
                                        </div>
                                        <div className="col-span-5 sm:col-span-3 lg:col-span-2 lg:opacity-0 opacity-100 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faEllipsisH} className="w-3 h-3 text-inherit" />
                                        </div>
                                    </div>
                                    <div className="divide-y border-l border-r border-b rounded-b-xl px-4 ">
                                        {detail['data_pendidikan'].map((value, index) => (
                                            <div key={index} className="grid grid-cols-12 py-5 font-light">
                                                <div className="col-span-7 sm:col-span-3 lg:col-span-2">
                                                    {value['tingkat_pendidikan']}
                                                </div>
                                                <div className="col-span-2 sm:col-span-3 hidden lg:col-span-2 sm:block">
                                                    {value['sekolah']}
                                                </div>
                                                <div className="col-span-2 sm:col-span-3 hidden lg:col-span-2 sm:block">
                                                    {value['universitas']}
                                                </div>
                                                <div className="col-span-2 hidden lg:block">
                                                    {value['fakultas']}
                                                </div>
                                                <div className="col-span-2 hidden lg:block">
                                                    {value['program_studi']}
                                                </div>
                                                <div className="col-span-5 sm:col-span-3 lg:col-span-2 lg:opacity-0 opacity-100 flex items-center justify-center">
                                                    <button type="button" className="text-blue-500 underline">
                                                        Detail
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="my-5 opacity-0" />
                                    <p className="italic font-light opacity-50">
                                        Mohon untuk segera hubungi Administrator jika terdapat kesalahan data atau data yang tidak relevan!
                                    </p>
                                </>
                            )}
                            {tab === 'sertifikat' && (
                                <>
                                    <div className="flex items-center gap-3 text-xl">
                                        <FontAwesomeIcon icon={faCertificate} className="w-3 h-3 text-inherit opacity-50" />
                                        Data Sertifikat
                                    </div>
                                    <hr className="my-5" />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {detail['data_sertifikat'].map((value, index) => (
                                            <div key={index} className="p-5 rounded-md border">
                                                <p className="font-light">
                                                    Sertifikat {value['jenis_sertifikat']}
                                                </p>
                                                <hr className="my-1 opacity-0" />
                                                <h1 className="text-lg">
                                                    {value['nama_sertifikat']}
                                                </h1>
                                                <hr className="my-2 opacity-0" />
                                                {value['fileUrl'] !== (
                                                    <a href={value['fileUrl']} className="flex items-center px-3 py-2 rounded-full border w-fit gap-3 font-light hover:bg-zinc-50 ">
                                                        Link Sertifikat
                                                        <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-inherit" />
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="my-5 opacity-0" />
                                    <p className="italic font-light opacity-50">
                                        Mohon untuk segera hubungi Administrator jika terdapat kesalahan data atau data yang tidak relevan!
                                    </p>
                                </>
                            )}
                            {tab === 'kelas' && (
                                <>
                                    <div className="flex items-center gap-3 text-xl">
                                        <FontAwesomeIcon icon={faUsersBetweenLines} className="w-3 h-3 text-inherit opacity-50" />
                                        Data Kelas
                                    </div>
                                    <hr className="my-5" />
                                    <div className="flex items-center gap-3">
                                        <p>
                                            Wali Kelas : 
                                        </p>
                                        <div className="px-3 py-2 rounded-full bg-zinc-100">
                                            {detail['data_kelas'] !== null ? `${detail['data_kelas']['kelas']} ${detail['data_kelas']['jurusan']} ${detail['data_kelas']['rombel']}` : 'Tidak Ada'}
                                        </div>
                                    </div>
                                    <hr className="my-2 opacity-0" />
                                    {detail['data_kelas'] !== null && (
                                        <>
                                            <div className="grid grid-cols-12 border px-5 py-4 rounded-t-xl">
                                                <div className="col-span-4 lg:col-span-3">
                                                    Nama Siswa
                                                </div>
                                                <div className="col-span-4 lg:col-span-3">
                                                    NIS
                                                </div>
                                                <div className="lg:col-span-3 hidden lg:block">
                                                    NISN
                                                </div>
                                                <div className="col-span-4 lg:col-span-3 lg:opacity-0 opacity-100 flex items-center justify-center">
                                                    <FontAwesomeIcon icon={faEllipsisH} className="w-3 h-3 text-inherit" />
                                                </div>
                                            </div>
                                            <div className="divide-y border-x border-b rounded-b-xl px-5">
                                                {detail['data_kelas']['daftar_siswa'].map((value, index) => (
                                                    <div key={index} className="grid grid-cols-12 py-5 font-light">
                                                        <div className="col-span-4 lg:col-span-3">
                                                            {value['nama_siswa']}
                                                        </div>
                                                        <div className="col-span-4 lg:col-span-3">
                                                            {value['nis']}
                                                        </div>
                                                        <div className="col-span-4 lg:col-span-3 hidden lg:block">
                                                            {value['nisn']}
                                                        </div>
                                                        <div className="col-span-4 lg:col-span-3 flex items-center justify-center lg:opacity-0 opacity-100">
                                                            <button type="button" className="underline text-blue-500">
                                                                Detail
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    
                </div>
            </div>
        </MainLayoutPage>
    )
}