'use client'

import MainDashboardPage from "@/components/mainDashboard"
import MainLayoutPage from "@/components/mainLayout"

export default function DashboardEkskulPage() {
    return (
        <MainLayoutPage>
            <div className="lg:px-20 px-5 py-5 min-h-screen flex justify-center">
                <div className="max-w-screen-2xl w-full ">
                    <MainDashboardPage>
                        This is Dashboard Ekstrakurikuler Page
                    </MainDashboardPage>
                </div>
            </div>
        </MainLayoutPage>
    )
}