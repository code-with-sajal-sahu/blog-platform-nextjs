import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "next-themes";
import { Manrope, Inter, JetBrains_Mono, Caveat } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
    ${manrope.variable}
    ${inter.variable}
    ${jetbrainsMono.variable} 
    ${caveat.variable}
  `}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
            >
              <div className="root-container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>

          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
