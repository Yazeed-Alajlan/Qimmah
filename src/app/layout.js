import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/routing/Header";
import { StocksDataProvider } from "@/context/StocksDataContext";
import { PytohnServerProvider } from "@/context/PythonServerContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import Footer from "@/components/utils/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qimmah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        dir="rtl"
        className={`flex flex-col justify-center items-center content-center   bg-light ${inter.className}`}
      >
        <ReactQueryProvider>
          <StocksDataProvider>
            <PytohnServerProvider>
              <Header />
              {children}
              <Footer />
            </PytohnServerProvider>
          </StocksDataProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
