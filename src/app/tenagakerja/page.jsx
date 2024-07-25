'use client'

import MainLayoutPage from "@/components/mainLayout"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function TenagaKerjaPage() {
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="max-w-screen-2xl w-full ">
                    <div className="flex justify-center items-center w-full gap-5">
                        <button type="button">
                            <FontAwesomeIcon icon={faAngleLeft} className="w-4 h-4 text-inherit" />
                        </button>
                        <p>
                            Page 1
                        </p>
                        <button type="button">
                            <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4 text-inherit" />
                        </button>
                    </div>
                    <hr className="my-5 opacity-0" />
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {Array.from({ length: 30}).slice(0, 9).map((_, index) => (
                            <div key={index} className="">
                                <div className="flex justify-center">
                                    <div className="flex-shrink-0 w-40 h-40 lg:w-80 lg:h-80 ">
                                        <img className="w-full h-full object-cover object-center rounded-full" src="https://img.okezone.com/content/2019/01/25/205/2009314/ditelantarkan-agensi-shannon-williams-siap-angkat-kaki-dari-korea-E5N6eFmDFX.jpg" alt="" />
                                    </div>
                                </div>
                                <hr className="my-2 opacity-0" />
                                <h1 className="text-center text-xl lg:text-3xl">
                                    Ziyad Jahizh Kartiwa
                                </h1>
                                <hr className="my-1 opacity-0" />
                                <p className="text-center opacity-60">
                                    Kepala Sekolah
                                </p>
                                <hr className="my-2 opacity-0" />
                                <p className="text-center font-light border-y py-5">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quam porro obcaecati, quidem totam saepe quis suscipit adipisci doloribus praesentium numquam dolor, repudiandae doloremque, placeat officia soluta dicta vero ab!
                                </p>
                            </div>
                        ))}
                   </div>
                   <hr className="my-5 opacity-0" />
                   <div className="flex justify-center items-center w-full gap-5">
                        <button type="button">
                            <FontAwesomeIcon icon={faAngleLeft} className="w-4 h-4 text-inherit" />
                        </button>
                        <p>
                            Page 1
                        </p>
                        <button type="button">
                            <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4 text-inherit" />
                        </button>
                    </div>
                </div>
            </div>
        </MainLayoutPage>
    )
}