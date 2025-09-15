import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function StatusPage() {
    const features = [
        {
            name: 'Landing Page',
            status: 'completed',
            description: 'Professional homepage with call-to-action'
        },
        {
            name: 'Authentication UI',
            status: 'completed',
            description: 'Login and signup pages with clean design'
        },
        {
            name: 'Dashboard Interface',
            status: 'completed',
            description: 'Complete content generation interface'
        },
        {
            name: 'Platform Selection',
            status: 'completed',
            description: 'Twitter, LinkedIn, Facebook, Instagram support'
        },
        {
            name: 'Content Generation UI',
            status: 'completed',
            description: 'Prompt input, generate button, results display'
        },
        {
            name: 'Content Cards',
            status: 'completed',
            description: 'Professional content display with copy functionality'
        },
        {
            name: 'Generation History',
            status: 'completed',
            description: 'View and reuse previous generations'
        },
        {
            name: 'Responsive Design',
            status: 'completed',
            description: 'Mobile-first, clean minimalist aesthetic'
        },
        {
            name: 'Convex Backend',
            status: 'completed',
            description: 'Database schema and functions deployed'
        },
        {
            name: 'Real Authentication',
            status: 'pending',
            description: 'Convex Auth integration with Google OAuth'
        },
        {
            name: 'AI Integration',
            status: 'pending',
            description: 'Perplexity API for content generation'
        },
        {
            name: 'Production Deployment',
            status: 'pending',
            description: 'Vercel deployment with environment variables'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'in-progress':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'pending':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'in-progress':
                return (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const completedCount = features.filter(f => f.status === 'completed').length;
    const totalCount = features.length;
    const progressPercentage = Math.round((completedCount / totalCount) * 100);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        CurateBang Development Status
                    </h1>
                    <p className="text-secondary">
                        Current progress and feature implementation status
                    </p>
                </div>

                {/* Progress Overview */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold text-primary">
                                {completedCount} of {totalCount} features completed
                            </span>
                            <span className="text-2xl font-bold text-accent">
                                {progressPercentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-accent h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    {features.filter(f => f.status === 'completed').length}
                                </div>
                                <div className="text-sm text-secondary">Completed</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {features.filter(f => f.status === 'in-progress').length}
                                </div>
                                <div className="text-sm text-secondary">In Progress</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">
                                    {features.filter(f => f.status === 'pending').length}
                                </div>
                                <div className="text-sm text-secondary">Pending</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Feature List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Feature Implementation Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-primary">{feature.name}</h3>
                                        <p className="text-sm text-secondary mt-1">{feature.description}</p>
                                    </div>
                                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feature.status)}`}>
                                        {getStatusIcon(feature.status)}
                                        <span className="capitalize">{feature.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-secondary">
                            <li>Implement Convex Auth for real user authentication</li>
                            <li>Integrate Perplexity API for AI content generation</li>
                            <li>Add real-time data synchronization with Convex</li>
                            <li>Deploy to Vercel with proper environment variables</li>
                            <li>Add comprehensive error handling and loading states</li>
                            <li>Implement user feedback and analytics</li>
                        </ol>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}