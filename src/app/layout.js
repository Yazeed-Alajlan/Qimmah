import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/utils/routing/Header";
import { PytohnServerProvider } from "@/context/pytohnServerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qimmah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col ${inter.className}`}>
        <PytohnServerProvider>
          <Header>
            <div>sdssd</div>
          </Header>
          {children}
        </PytohnServerProvider>
      </body>
    </html>
  );
}
