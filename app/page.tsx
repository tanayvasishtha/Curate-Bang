import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl font-bold text-primary mb-6">
                    CurateBang
                </h1>
                <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                    Transform a single idea into high-quality, tailored content for multiple social media platforms with AI-powered precision.
                </p>

                <div className="space-x-4">
                    <Link href="/signup">
                        <Button size="lg">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="lg">
                            Sign In
                        </Button>
                    </Link>
                </div>

                <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <div className="w-6 h-6 bg-primary rounded"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-primary mb-2">Lightning Fast</h3>
                        <p className="text-secondary">Generate content for multiple platforms in seconds</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <div className="w-6 h-6 bg-primary rounded-full"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-primary mb-2">Platform Optimized</h3>
                        <p className="text-secondary">Content tailored for each platform's unique requirements</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <div className="w-6 h-6 bg-primary rounded-sm"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-primary mb-2">AI Powered</h3>
                        <p className="text-secondary">Advanced AI ensures high-quality, engaging content</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}