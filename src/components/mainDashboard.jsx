'use client'

import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation"

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


    return (
        <div className="flex flex-col lg:flex-row gap-3 relative">
            <div className="w-full lg:w-1/5 flex-shrink-0 flex lg:flex-col flex-row gap-10 lg:gap-5 relative overflow-auto *:flex-shrink-0 *:py-5 *:lg:py-0">
                {link.map((value, index) => (
                    <a key={index} href={value.link} className={`md:text-lg hover:underline ease-out duration-200 opacity-60 hover:opacity-100 lg:flex lg:items-center lg:justify-between ${pathname === value.link && 'border-b-4 lg:border-b-0 border-zinc-700'}`}>
                        {value.name}
                        <FontAwesomeIcon icon={faArrowRight} className={`w-3 h-3 text-inherit opacity-0 lg:block hidden ${pathname === value.link && 'lg:opacity-100'}`} />
                    </a>
                ))}
            </div>
            <div className="w-full lg:w-4/5 rounded-lg border p-5">
                {children}
            </div>
        </div>
    )
}