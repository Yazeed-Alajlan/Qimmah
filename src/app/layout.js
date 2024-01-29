import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/routing/Header";
import { StocksDataProvider } from "@/context/StocksDataContext";
import { PytohnServerProvider } from "@/context/PytohnServerContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qimmah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body dir="rtl" className={`flex flex-col bg-light ${inter.className}`}>
        <ReactQueryProvider>
          <StocksDataProvider>
            <PytohnServerProvider>
              <Header />
              {children}
            </PytohnServerProvider>
          </StocksDataProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
