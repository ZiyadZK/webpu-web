'use client'

import MainLayoutPage from "@/components/mainLayout"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"

export default function DetailBeritaPage({ params: { kode_berita }}) {
    const router = useRouter()
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="max-w-screen-lg w-full relative">
                    <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-full border-2 border-zinc-500 flex items-center justify-center gap-3 active:scale-95 ease-out duration-200 sticky top-20 lg:top-24 z-[20] bg-white hover:bg-zinc-500 hover:text-white shadow-lg">
                        <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3 text-inherit" />
                        Kembali
                    </button>
                    <hr className="my-4 opacity-0" />
                    <h1 className="text-xl sm:text-3xl lg:text-5xl font-semibold">
                        JUDUL BERITA ADA DISINI
                    </h1>
                    <hr className="my-1 opacity-0" />
                    <p className="opacity-50">
                        Bandung, 15 Februari 2023
                    </p>
                    <hr className="my-4 opacity-0" />
                    <div className="w-full relative overflow-hidden aspect-video border rounded-2xl">
                        <img className="w-full h-full object-cover object-center" src="https://i.pinimg.com/736x/b7/14/aa/b714aa20d889686414dc78c4da86bd33.jpg" alt="" />
                    </div>
                    <hr className="my-4 opacity-0" />
                    <div className="text-justify">
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni fugiat omnis recusandae eius explicabo a blanditiis doloremque impedit autem culpa repudiandae, ipsa dolorem harum asperiores doloribus numquam reprehenderit provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, alias quo libero neque cupiditate sequi quasi! Nobis corporis accusamus sed tempora sapiente voluptatum ullam expedita. Dolores id pariatur odit impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quasi quisquam quo necessitatibus ad voluptatem repellat pariatur dicta quis ipsam eligendi dolorem corrupti optio non earum, ex consequuntur similique magnam?
                        </p>
                        <br />
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni fugiat omnis recusandae eius explicabo a blanditiis doloremque impedit autem culpa repudiandae, ipsa dolorem harum asperiores doloribus numquam reprehenderit provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, alias quo libero neque cupiditate sequi quasi! Nobis corporis accusamus sed tempora sapiente voluptatum ullam expedita. Dolores id pariatur odit impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quasi quisquam quo necessitatibus ad voluptatem repellat pariatur dicta quis ipsam eligendi dolorem corrupti optio non earum, ex consequuntur similique magnam?
                        </p>
                        <br />
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni fugiat omnis recusandae eius explicabo a blanditiis doloremque impedit autem culpa repudiandae, ipsa dolorem harum asperiores doloribus numquam reprehenderit provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, alias quo libero neque cupiditate sequi quasi! Nobis corporis accusamus sed tempora sapiente voluptatum ullam expedita. Dolores id pariatur odit impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quasi quisquam quo necessitatibus ad voluptatem repellat pariatur dicta quis ipsam eligendi dolorem corrupti optio non earum, ex consequuntur similique magnam?
                        </p>
                        <br />
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni fugiat omnis recusandae eius explicabo a blanditiis doloremque impedit autem culpa repudiandae, ipsa dolorem harum asperiores doloribus numquam reprehenderit provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, alias quo libero neque cupiditate sequi quasi! Nobis corporis accusamus sed tempora sapiente voluptatum ullam expedita. Dolores id pariatur odit impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quasi quisquam quo necessitatibus ad voluptatem repellat pariatur dicta quis ipsam eligendi dolorem corrupti optio non earum, ex consequuntur similique magnam?
                        </p>
                        <br />
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni fugiat omnis recusandae eius explicabo a blanditiis doloremque impedit autem culpa repudiandae, ipsa dolorem harum asperiores doloribus numquam reprehenderit provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, alias quo libero neque cupiditate sequi quasi! Nobis corporis accusamus sed tempora sapiente voluptatum ullam expedita. Dolores id pariatur odit impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quasi quisquam quo necessitatibus ad voluptatem repellat pariatur dicta quis ipsam eligendi dolorem corrupti optio non earum, ex consequuntur similique magnam?
                        </p>
                        <br />
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni fugiat omnis recusandae eius explicabo a blanditiis doloremque impedit autem culpa repudiandae, ipsa dolorem harum asperiores doloribus numquam reprehenderit provident. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, alias quo libero neque cupiditate sequi quasi! Nobis corporis accusamus sed tempora sapiente voluptatum ullam expedita. Dolores id pariatur odit impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quasi quisquam quo necessitatibus ad voluptatem repellat pariatur dicta quis ipsam eligendi dolorem corrupti optio non earum, ex consequuntur similique magnam?
                        </p>
                    </div>
                </div>
            </div>
        </MainLayoutPage>
    )
}