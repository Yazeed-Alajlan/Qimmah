import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/routing/Header";
import Header from "@/components/routing/Header2";
import { StocksDataProvider } from "@/context/StocksDataContext";
import { PytohnServerProvider } from "@/context/PythonServerContext";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import Footer from "@/components/utils/footer/Footer";
import { TechnicalAnalysisProvider } from "@/context/TechnicalAnalysisContext";
import SidebarLayout from "@/components/routing/sidebar2/SidebarLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qimmah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-light ${inter.className}`}>
        {/* <body
        dir="rtl"
        className={`flex flex-col flex-wrap justify-center items-center content-center  bg-light ${inter.className}`}
      > */}
        <ReactQueryProvider>
          <StocksDataProvider>
            <PytohnServerProvider>
              <TechnicalAnalysisProvider>
                <SidebarLayout>{children}</SidebarLayout>
                {/* <Header /> */}
                {/* <Footer /> */}
              </TechnicalAnalysisProvider>
            </PytohnServerProvider>
          </StocksDataProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
