import Link from 'next/link';
import { Button } from './ui/Button';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            CurateBang
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/history" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            History
                        </Link>
                        <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            Pricing
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Button>

                        <Button variant="outline" size="sm">
                            Upgrade
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}