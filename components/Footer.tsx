import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-bold text-primary mb-3">CurateBang</h3>
                        <p className="text-secondary mb-4 max-w-md">
                            Transform a single idea into high-quality, tailored content for multiple social media platforms with AI-powered precision.
                        </p>
                        <Link
                            href="https://github.com/tanayvasishtha/Curate-Bang.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-accent hover:text-highlight transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            View on GitHub
                        </Link>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-3">Product</h4>
                        <ul className="space-y-2 text-secondary">
                            <li><Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">API</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-3">Support</h4>
                        <ul className="space-y-2 text-secondary">
                            <li><Link href="#" className="hover:text-accent transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-secondary text-sm">
                        © 2024 CurateBang. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <span className="text-sm text-secondary">Powered by</span>
                        <div className="flex items-center space-x-2 text-xs text-secondary">
                            <span>Next.js</span>
                            <span>•</span>
                            <span>Convex</span>
                            <span>•</span>
                            <span>Perplexity AI</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}