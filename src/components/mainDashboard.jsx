'use client'

import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname, useRouter } from "next/navigation"

const link = [
    { name: 'Dashboard', link: '/dashboard', role: ['Admin', 'Operator']},
    { name: 'Jurusan', link: '/dashboard/jurusan', role: ['Admin', 'Operator']},
    { name: 'Ekstrakurikuler', link: '/dashboard/ekstrakurikuler', role: ['Admin', 'Operator']},
    { name: 'Tenaga Kerja', link: '/dashboard/tenagakerja', role: ['Admin']},
    { name: 'Aplikasi', link: '/dashboard/aplikasi', role: ['Admin']},
    { name: 'Berita', link: '/dashboard/berita', role: ['Admin', 'Operator']},
    { name: 'Lulusan Terbaik', link: '/dashboard/lulusanterbaik', role: ['Admin', 'Operator']},
]

export default function MainDashboardPage({ children }) {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="flex justify-center gap-3 relative">
            <div className="max-w-screen-xl w-full">
                <div className="p-3 rounded-xl border flex items-center relative overflow-auto *:flex-shrink-0">
                    {link.map((value, index) => (
                        <button key={index} onClick={() => router.push(value['link'])} type="button" className={`px-3 py-2 rounded-md font-medium ${pathname === value.link ? 'bg-zinc-100 hover:bg-zinc-200' : 'hover:bg-zinc-100'} ease-out duration-200`}>
                            {value['name']}
                        </button>
                    ))}
                </div>
                <hr className="my-5" />
                {children}
            </div>
        </div>
    )
}