import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const workSans = localFont({
  src: "../fonts/Work sans/WorkSans-VariableFont_wght.ttf",
  variable: "--font-work-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Greensprings Admissions Portal",
  description: "Apply for admission to Greensprings School - A leading educational institution",
  icons: {
    icon: "/GSL-Logo.png",
    apple: "/GSL-Logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
