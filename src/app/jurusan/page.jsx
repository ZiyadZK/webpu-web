'use client'

import MainLayoutPage from "@/components/mainLayout"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function JurusanPage() {
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="w-full max-w-screen-lg space-y-5">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="w-full p-5 border rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <h1 className="font-semibold text-xl lg:text-3xl">
                                        Teknik Komputer dan Jaringan
                                    </h1>
                                    <hr className="my-1 opacity-0" />
                                    <p>
                                        TKJ
                                    </p>
                                </div>
                                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-green-500"></div>
                            </div>
                            <hr className="my-3 opacity-0" />
                            <p className="opacity-50">
                                Deskripsi Jurusan
                            </p>
                            <hr className="my-1 opacity-0" />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, expedita eos suscipit omnis culpa vitae unde nobis, dolores voluptates quidem veniam adipisci, obcaecati ea quia vero corporis pariatur ut iusto.
                            </p>
                            <hr className="my-3 opacity-0" />
                            <p className="opacity-50">
                                Kegiatan relevan
                            </p>
                            <hr className="my-1 opacity-0" />
                            <p>
                                Computer, Networking, Programming, Algorithm
                            </p>
                            <hr className="my-3 opacity-0" />
                            <div className="flex items-center gap-5 relative overflow-auto">
                                {Array.from({ length: 3 }).map((_, indexImg) => (
                                    <div key={indexImg} className="w-full lg:w-1/2 flex-shrink-0 aspect-video relative overflow-hidden rounded-md">
                                        <img className="w-full h-full" src="https://i.pinimg.com/736x/b7/14/aa/b714aa20d889686414dc78c4da86bd33.jpg" alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayoutPage>
    )
}