'use client'

import MainLayoutPage from "@/components/mainLayout";
import Image from "next/image";

export default function Home() {
  return (
    <div className="md:px-20">
      <div className="flex md:flex-row flex-col-reverse items-center md:justify-between gap-5">
        <div className="space-y-2">
          <h1 className="text-center md:text-start text-xl md:text-4xl font-medium">
            SMK Pekerjaan Umum Negeri Bandung
          </h1>
        </div>
        <Image src={'/home/foto-2-orang-prestasi.png'} width={720} height={720} alt="Foto 2 Orang Prestasi" />
      </div>
    </div>
  );
}
