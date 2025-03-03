import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FairplayXI - Privacy-First Fantasy Cricket",
  description: "Privacy-preserving fantasy cricket platform powered by Aleo blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <nav className="bg-gray-900 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              <span className="text-blue-500">Fair</span>play<span className="text-blue-500">XI</span>
            </Link>
            <div>
              <Link href="/" className="mr-4 hover:text-blue-400">
                Home
              </Link>
              <Link href="/contests" className="mr-4 hover:text-blue-400">
                Contests
              </Link>
              <Link href="/build-team/1" className="hover:text-blue-400">
                Build Team
              </Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">{children}</div>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">FairplayXI</h3>
                <p>Privacy-preserving fantasy cricket platform powered by Aleo blockchain technology.</p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Quick Links</h3>
                <ul>
                  <li>
                    <Link href="/" className="hover:text-blue-400">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/contests" className="hover:text-blue-400">
                      Contests
                    </Link>
                  </li>
                  <li>
                    <Link href="/build-team/1" className="hover:text-blue-400">
                      Build Team
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold mb-2">Connect With Us</h3>
                <p>Stay updated on our latest features and contests!</p>
                {/* Add social media links or contact information here */}
              </div>
            </div>
            <div className="mt-8 text-center">
              <p>&copy; {new Date().getFullYear()} FairplayXI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'