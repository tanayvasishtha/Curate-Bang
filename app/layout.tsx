import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConvexProvider } from './ConvexProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'CurateBang',
    description: 'Minimalist AI-driven content amplification platform',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-background text-primary min-h-screen`}>
                <ConvexProvider>
                    {children}
                </ConvexProvider>
            </body>
        </html>
    )
}