'use client'

import dynamic from 'next/dynamic';
import MainDashboardPage from "@/components/mainDashboard";
import MainLayoutPage from "@/components/mainLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const CkEditor = dynamic(() => import('@/components/ckEditor'), { ssr: false });

export default function DashboardPage() {
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="max-w-screen-2xl w-full ">
                    <MainDashboardPage>
                        <form className="space-y-3">
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <p className="w-full md:w-1/3">
                                    Slogan
                                </p>
                                <div className="w-full md:w-2/3">
                                    <input type="text" required className="w-full px-3 py-2 rounded-md border focus:outline-2 outline-blue-300 outline-offset-4" placeholder="Masukkan slogan disini" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <p className="w-full md:w-1/3">
                                    Deskripsi Singkat
                                </p>
                                <div className="w-full md:w-2/3">
                                    <input type="text" className="w-full px-3 py-2 rounded-md border focus:outline-2 outline-blue-300 outline-offset-4" placeholder="Masukkan deskripsi singkat disini" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <p className="w-full md:w-1/3">
                                    Deskripsi Panjang
                                </p>
                                <div className="w-full md:w-2/3">
                                    <input type="text" className="w-full px-3 py-2 rounded-md border focus:outline-2 outline-blue-300 outline-offset-4" placeholder="Masukkan deskripsi panjang disini" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <p className="w-full md:w-1/3">
                                    Alamat
                                </p>
                                <div className="w-full md:w-2/3">
                                    <input type="text" className="w-full px-3 py-2 rounded-md border focus:outline-2 outline-blue-300 outline-offset-4" placeholder="Masukkan alamat disini" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="w-full">
                                    Sejarah
                                </p>
                                <div className="w-full">
                                    <CkEditor defaultValue={'<b>a</b>'} />
                                </div>
                            </div>
                            <button type="submit" className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600 hover:scale-95 active:scale-90 ease-out duration-200 flex items-center gap-3 justify-center w-fit text-white">
                                <FontAwesomeIcon icon={faSave} className="w-4 h-4 text-inherit" />
                                Simpan Perubahan
                            </button>
                        </form>
                    </MainDashboardPage>
                </div>
            </div>
        </MainLayoutPage>
    );
}
