import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface GenerationHistoryProps {
    onReuse: (prompt: string, platforms: string[]) => void;
}

// Mock history data - in real app this would come from Convex
const mockHistory = [
    {
        id: '1',
        prompt: 'Announcing our new AI-powered content creation tool that helps businesses scale their social media presence',
        platforms: ['Twitter', 'LinkedIn', 'Facebook'],
        createdAt: '2024-01-15T10:30:00Z',
        status: 'completed'
    },
    {
        id: '2',
        prompt: 'Tips for improving team productivity in remote work environments',
        platforms: ['LinkedIn', 'Twitter'],
        createdAt: '2024-01-14T15:45:00Z',
        status: 'completed'
    },
    {
        id: '3',
        prompt: 'Behind the scenes look at our product development process',
        platforms: ['Instagram', 'Facebook', 'LinkedIn'],
        createdAt: '2024-01-13T09:15:00Z',
        status: 'completed'
    }
];

export default function GenerationHistory({ onReuse }: GenerationHistoryProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPlatformIcon = (platform: string) => {
        const icons: { [key: string]: string } = {
            'Twitter': '𝕏',
            'LinkedIn': '💼',
            'Facebook': '📘',
            'Instagram': '📸'
        };
        return icons[platform] || '📱';
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Generation History</h2>
                    <p className="text-gray-600">Your recent content generations</p>
                </div>

                <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Clear History
                </Button>
            </div>

            <div className="space-y-4">
                {mockHistory.map((item) => (
                    <Card key={item.id} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-900">
                                                {formatDate(item.createdAt)}
                                            </span>
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            <span className="text-sm text-green-600 font-medium">Completed</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-900 mb-3 line-clamp-2">
                                    {item.prompt}
                                </p>

                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">Generated for:</span>
                                    <div className="flex items-center gap-2">
                                        {item.platforms.map((platform) => (
                                            <div
                                                key={platform}
                                                className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1"
                                            >
                                                <span className="text-sm">{getPlatformIcon(platform)}</span>
                                                <span className="text-xs font-medium text-gray-700">{platform}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onReuse(item.prompt, item.platforms)}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reuse
                                </Button>

                                <Button variant="ghost" size="sm">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {mockHistory.length === 0 && (
                <Card className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No history yet</h3>
                    <p className="text-gray-600">Your content generations will appear here</p>
                </Card>
            )}
        </div>
    );
}