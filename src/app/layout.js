import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/utils/routing/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qimmah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col ${inter.className}`}>
        <Header>
          <div>sdssd</div>
        </Header>
        {children}
      </body>
    </html>
  );
}
