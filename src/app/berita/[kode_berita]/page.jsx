'use client'

import MainLayoutPage from "@/components/mainLayout"

export default function DetailBeritaPage({ params: { kode_berita }}) {
    return (
        <MainLayoutPage>
            {kode_berita}
        </MainLayoutPage>
    )
}