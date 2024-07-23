import MainLayoutPage from "@/components/mainLayout";
import "./globals.css";
import { jakarta } from "@/lib/fonts";

export const metadata = {
  title: "SMK Pekerjaan Umum Negeri Bandung",
  description: "Website Resmi SMK Pekerjaan Umum Negeri Bandung",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className + ` text-xs md:text-sm dark:text-zinc-200 dark:bg-zinc-900`}>
        <MainLayoutPage>
          {children}
        </MainLayoutPage>
      </body>
    </html>
  );
}
