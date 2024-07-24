import MainLayoutPage from "@/components/mainLayout";
import "./globals.css";
import "animate.css/animate.compat.css"
import { jakarta } from "@/lib/fonts";

export const metadata = {
  title: "SMK Pekerjaan Umum Negeri Bandung",
  description: "Website Resmi SMK Pekerjaan Umum Negeri Bandung",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className + ` text-xs md:text-sm bg-white text-zinc-700`}>
        <MainLayoutPage>
          {children}
        </MainLayoutPage>
      </body>
    </html>
  );
}
