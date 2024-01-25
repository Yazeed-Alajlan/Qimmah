import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/utils/routing/Header";
import { StocksDataProvider } from "@/context/StocksDataContext";
import { PytohnServerProvider } from "@/context/PytohnServerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qimmah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body dir="rtl" className={`flex flex-col bg-light ${inter.className}`}>
        <StocksDataProvider>
          <PytohnServerProvider>
            <Header>
              <div>sdssd</div>
            </Header>
            {children}
          </PytohnServerProvider>
        </StocksDataProvider>
      </body>
    </html>
  );
}
