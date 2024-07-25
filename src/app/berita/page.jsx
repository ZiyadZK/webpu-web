'use client'

import MainLayoutPage from "@/components/mainLayout"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function BeritaPage() {
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="max-w-screen-2xl w-full divide-y">

                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-5 lg:gap-10 py-6">
                            <div className="w-full rounded-xl aspect-video relative overflow-hidden">
                                <img className="w-full h-full object-cover object-center" src="https://i.pinimg.com/736x/b7/14/aa/b714aa20d889686414dc78c4da86bd33.jpg" alt="" />
                            </div>
                            <div className="flex items-center">
                                <div className="py-5">
                                    <p>
                                        Bandung, 30 Januari 2023
                                    </p>
                                    <hr className="my-1 opacity-0" />
                                    <h1 className="font-semibold text-xl lg:text-3xl">
                                        JUDUL BERITA DISINI
                                    </h1>
                                    <hr className="my-2 lg:my-4 opacity-0" />
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem illum error aspernatur nulla omnis! Non voluptatibus voluptate, neque, porro quas, et magnam alias ducimus repellendus reiciendis explicabo pariatur similique mollitia.
                                        <br /> <br />
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos itaque vitae consectetur laboriosam incidunt debitis voluptates commodi minus nihil ab. Eaque quasi perferendis quaerat animi commodi laborum numquam cumque neque?
                                    </p>
                                    <hr className="my-2 lg:my-4 opacity-0" />
                                    <a href={`/berita/${index}`} className="px-4 py-2 rounded-full border flex items-center justify-center w-fit gap-3 hover:gap-4 hover:bg-zinc-50 hover:shadow-xl ease-out duration-200">
                                        Lihat Berita
                                        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-inherit" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </MainLayoutPage>
    )
}