'use client'

import MainLayoutPage from "@/components/mainLayout"
import { faAngleLeft, faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function LulusanTerbaikPage() {
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="max-w-screen-2xl w-full ">
                    <div className="flex justify-center w-full">
                        <div className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-amber-500" />
                            <h1 className="font-medium text-xl lg:text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-red-500 to-zinc-700">
                                Lulusan Terbaik Tahun Ini
                            </h1>
                            <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-red-500" />
                        </div>
                    </div>
                    <hr className="my-3 " />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {Array.from({ length : 6 }).map((_, index) => (
                            <div key={index} className="">
                                <div className="flex justify-center">
                                    <div className="flex-shrink-0 w-40 h-40 lg:w-80 lg:h-80 border-4 border-transparent rounded-full bg-clip-border bg-gradient-to-tr from-red-500 to-amber-500">
                                        <img className="w-full h-full object-cover object-center rounded-full" src="https://img.okezone.com/content/2019/01/25/205/2009314/ditelantarkan-agensi-shannon-williams-siap-angkat-kaki-dari-korea-E5N6eFmDFX.jpg" alt="" />
                                    </div>
                                </div>
                                <hr className="my-2 opacity-0" />
                                <h1 className="text-center text-xl lg:text-3xl">
                                    Ziyad Jahizh Kartiwa
                                </h1>
                                <hr className="my-1 opacity-0" />
                                <p className="text-center opacity-60">
                                    TKJ - Angkatan 2021
                                </p>
                                <hr className="my-2 opacity-0" />
                                <p className="text-center font-light border-y py-5">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quam porro obcaecati, quidem totam saepe quis suscipit adipisci doloribus praesentium numquam dolor, repudiandae doloremque, placeat officia soluta dicta vero ab!
                                </p>
                                <hr className="my-1 opacity-0" />
                                <p className="text-center">
                                    Lulusan Tahun 2024
                                </p>
                                <hr className="my-1 opacity-0" />
                                <p className="text-center">
                                    Keterangan lain disini seperti Nilai Rata rata dia
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayoutPage>
    )
}