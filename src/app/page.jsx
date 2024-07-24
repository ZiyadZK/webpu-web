'use client'

import MainLayoutPage from "@/components/mainLayout";
import { faFacebook, faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faArrowRight, faCheck, faComputer, faGlobe, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Aos from "aos";
import Image from "next/image";
import { useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";

export default function Home() {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <MainLayoutPage>
      <div className="lg:px-20 px-5 py-5 ">
        <div className="flex lg:flex-row flex-col items-center lg:justify-between gap-5">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Image src={'/home/foto-2-orang-prestasi.png'} width={720} height={720} alt="Foto 2 Orang Prestasi" />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-center lg:text-start text-xl lg:text-5xl font-bold ">
              SMK Pekerjaan Umum Negeri Bandung
            </h1>
            <hr className="lg:my-2 opacity-0" />
            <h2 className="text-center lg:text-start text-sm font-medium  lg:text-3xl">
              Sigap, Cepat, Tanggap, Kompetitif
            </h2>
            <hr className="my-3 lg:my-5 opacity-0" />
            <p className="text-center lg:text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores error voluptatibus dicta enim beatae expedita eaque doloremque voluptates laudantium, totam, non ad reprehenderit vero possimus minus iste cum reiciendis dignissimos.
            </p>
            <hr className="my-3 lg:my-5 opacity-0" />
            <div className="flex justify-center lg:justify-start w-full">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-5">
                <div className="w-full flex lg:block flex-col items-center">
                  <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-green-500 " />
                    <p className="font-medium text-xl">
                      10.000+
                    </p>
                  </div>
                  <hr className="my-1 opacity-0" />
                  <p className="text-justify opacity-50">
                    Lulusan Siswa
                  </p>
                </div>
                <div className="w-full  flex lg:block flex-col items-center">
                  <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-green-500 " />
                    <p className="font-medium text-xl">
                      10.000+
                    </p>
                  </div>
                  <hr className="my-1 opacity-0" />
                  <p className="text-justify opacity-50">
                    Lulusan Siswa Terbaik
                  </p>
                </div>
                <div className="w-full  flex lg:block flex-col items-center">
                  <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-green-500 " />
                    <p className="font-medium text-xl">
                      10.000+
                    </p>
                  </div>
                  <hr className="my-1 opacity-0" />
                  <p className="text-justify opacity-50">
                    Siswa Berprestasi Non-Akademik
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-50 lg:px-20 px-5 py-10">
        <ScrollAnimation animateIn="fadeInDown" duration={1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5">

            <div className="w-full p-5 lg:p-8 rounded-xl bg-white shadow-2xl h-fit">
              <div className="flex items-center gap-5 lg:justify-start justify-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-inherit" />
                </div>
                <h1 className="font-semibold text-xl lg:text-4xl ">
                  Visi Kita
                </h1>
              </div>
              <hr className="my-5 opacity-0" />
              <div className="space-y-3">
                <p className="lg:text-xl opacity-70 text-center lg:text-start">
                  Menjadi Sekolah Unggul dengan Tamatan yang Bertaqwa, Mandiri, Terampil, Berilmu dan Berbudaya
                </p>
              </div>
            </div>
            <div className="w-full p-5 lg:p-8 rounded-xl bg-white shadow-2xl">
              <div className="flex items-center gap-5 lg:justify-start justify-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-inherit" />
                </div>
                <h1 className="font-semibold text-xl lg:text-4xl ">
                  Misi Kita
                </h1>
              </div>
              <hr className="my-5 opacity-0" />
              <div className="space-y-3">
                <p className="lg:text-xl opacity-70 text-center lg:text-start">
                  Menyiapkan lulusan yang berbudi luhur, bermoral, beriman dan bertaqwa kepada Tuhan Yang Maha Esa;
                </p>
                <p className="lg:text-xl opacity-70 text-center lg:text-start">
                  Menyiapkan lulusan yang profesional, sigap, cerdas, tanggap dan kompetitif untuk menyongsong tantangan era globalisasi;
                </p>
                <p className="lg:text-xl opacity-70 text-center lg:text-start">
                  Membangun profesionalitas pendidik dan tenaga kependidikan secara berkesinambungan
                </p>
                <p className="lg:text-xl opacity-70 text-center lg:text-start">
                  Memberikan pelayanan prima melalui penerapan sistem penjaminan mutu pendidikan.
                </p>
              </div>
            </div>

          </div>
        </ScrollAnimation>
      </div>
      <div className="lg:px-20 px-5 lg:py-20 py-10">
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <div className="w-full lg:w-1/2 justify-center flex">
            <div className="w-40 h-40 lg:w-80 lg:h-80 rounded-full relative bg-zinc-100 overflow-hidden">
              <img className="w-full h-full object-cover object-center" src="https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg" alt="" />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-center lg:text-start lg:text-lg" data-aos="fade-up">
              Headmaster / Kepala Sekolah
            </p>
            <hr className="my-1 opacity-0" />
            <p className="text-center lg:text-start font-bold text-xl lg:text-5xl">
              Mark Zuckerberg
            </p>
            <hr className="my-1 opacity-0" />
            <p className="text-center lg:text-start lg:text-lg">
              Periode Tahun Ajaran 2024 - 2030
            </p>
            <hr className="my-3 opacity-0" />
            <p className="text-center lg:text-start lg:text-lg italic">
              &quot; Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, unde. Odit corrupti qui, alias eveniet voluptas officiis natus consequuntur aliquid architecto quibusdam unde delectus, ullam vel fugiat adipisci ipsa modi! &quot;
            </p>
          </div>
        </div>
      </div>
      <div className="lg:px-20 px-5 lg:py-20 py-10">
        <h1 className="text-center text-xl lg:text-3xl font-semibold">
          Partners
        </h1>
        <p className="text-center">
          Daftar Industri / Mitra kerja sama
        </p>
        <div className="flex justify-center my-4">
          <hr className="w-1/2" />
        </div>
        <div className="flex items-center gap-20 justify-center w-full py-5 relative overflow-auto *:flex-shrink-0 no-scroll">
          {Array.from({ length: 15 }).map((_, index) => (
            <img key={index} className="w-10 h-10 lg:w-20 lg:h-20 ease-out duration-200 grayscale hover:grayscale-0 hover:scale-110" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="" />
          ))}
        </div>
      </div>
      <div className="lg:px-20 px-5 lg:py-20 py-10">
        <h1 className="font-semibold text-xl lg:text-3xl text-center">
          Jurusan Tersedia
        </h1>
        <div className="flex justify-center my-4">
          <hr className="w-1/2" />
        </div>
        <p className="text-center">
          Berikut adalah daftar jurusan yang ada di sekolah
        </p>
        <hr className="my-5 opacity-0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {Array.from({ length: 6}).map((_, index) => (
            <div key={index} className="w-full p-5 rounded-xl border hover:border-zinc-100/0 hover:shadow-xl ease-out duration-200 group">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                <FontAwesomeIcon icon={faComputer} className="w-5 h-5 text-inherit" />
              </div>
              <hr className="my-2 opacity-0" />
              <p>
                TKJ
              </p>
              <h1 className="font-semibold text-xl lg:text-2xl">
                Teknik Komputer dan Jaringan
              </h1>
              <hr className="my-2 opacity-0" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, dolorem quam. Placeat facilis repellat, quibusdam natus debitis totam hic sapiente id minima nesciunt et eveniet nobis officiis magnam quas? Voluptates.
              </p>
              <hr className="my-2 opacity-0" />
              <div className="flex justify-end">
                <a href="" className="px-4 py-2 rounded-full flex items-center justify-center gap-3 w-fit border hover:bg-zinc-100 ease-out duration-200 hover:gap-4">
                  Detail
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 text-inherit opacity-50" />
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="lg:px-20 px-5 py-5 ">
        <h1 className="font-semibold text-xl lg:text-3xl text-center">
          Berita Terkini
        </h1>
        <div className="flex justify-center my-4">
          <hr className="w-1/2" />
        </div>
        <hr className="my-5 opacity-0" />
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-20">

          {Array.from({ length: 2}).map((_, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl group aspect-video">
              <img className="w-full h-full object-cover" src="https://i.pinimg.com/736x/b7/14/aa/b714aa20d889686414dc78c4da86bd33.jpg" alt="" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-zinc-950 p-5 flex flex-col justify-end">
                <div className="">
                  <p className="text-zinc-400">
                    Bandung, 16 November 2023
                  </p>
                  <hr className="my-0 lg:my-1 opacity-0" />
                  <h1 className="font-semibold text-zinc-100 text-sm lg:text-3xl">
                    JUDUL BERITA ADA DISINI
                  </h1>
                  <hr className="my-1 lg:my-3 opacity-0" />
                  <a href="" className="px-4 py-2 rounded-full border flex items-center gap-3 w-fit hover:bg-white ease-out duration-200 text-white hover:text-zinc-700 backdrop-blur-md hover:backdrop-blur-0">
                    Lihat Berita
                    <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4 text-inherit" />
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
        <hr className="my-5 opacity-0" />
        <div className="flex justify-center">
          <a href="" className="flex items-center justify-center gap-3 px-4 py-2 rounded-full hover:bg-zinc-100 ease-out duration-200">
            Lihat Berita lainnya
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-inherit" />
          </a>
        </div>
      </div>
      
    </MainLayoutPage>

  );
}
