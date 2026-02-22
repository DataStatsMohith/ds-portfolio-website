import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mohit Sai Sekharamahanthi | Data Scientist & ML Engineer",
  description: "Data Scientist with 2+ years at Capgemini, MSc Data Science. Building production ML systems.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} font-sans bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] antialiased`}>
        <Nav />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}