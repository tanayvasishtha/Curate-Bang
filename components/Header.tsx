"use client";

import Link from 'next/link';
import { Button } from './ui/Button';

export default function Header() {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-slate-900">
                        Curate<span className="text-blue-600">Bang</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                        Pricing
                    </Link>
                    <Link href="#docs" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                        Docs
                    </Link>
                    <Link href="#support" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                        Support
                    </Link>
                </nav>

                <div className="flex items-center space-x-3">
                    <Link href="/login">
                        <Button variant="ghost" className="text-slate-600 hover:text-slate-900 font-medium">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2 rounded-lg border border-slate-900">
                            Start Free Trial
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}