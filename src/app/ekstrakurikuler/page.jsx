'use client'

import MainLayoutPage from "@/components/mainLayout"

export default function EkstrakurikulerPage() {
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="w-full max-w-screen-lg space-y-5">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="w-full p-5 border rounded-xl">
                            <img className="w-10 h-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="" />
                            <hr className="my-1 opacity-0" />
                            <h1 className="font-semibold text-xl lg:text-3xl">
                                Praja Muda Karana
                            </h1>
                            <hr className="my-1 opacity-0" />
                            <p>
                                Pramuka
                            </p>
                            <hr className="my-3 opacity-0" />
                            <p className="opacity-50">
                                Penganggung Jawab
                            </p>
                            <hr className="my-1 opacity-0" />
                            <a href={`/tenagakerja?id_pegawai=${index}`} className="underline">
                                Ziyad Jahizh Kartiwa
                            </a>
                            <hr className="my-3 opacity-0" />
                            <p className="opacity-50">
                                Deskripsi Ekstrakurikuler
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
                                PBB, Camping, dll
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