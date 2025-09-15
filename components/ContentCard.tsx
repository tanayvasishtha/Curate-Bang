import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ContentCardProps {
    platform: string;
    content: string;
    onCopy: (content: string) => void;
}

const platformIcons: { [key: string]: string } = {
    'Twitter': '𝕏',
    'LinkedIn': '💼',
    'Facebook': '📘',
    'Instagram': '📸'
};

const platformColors: { [key: string]: string } = {
    'Twitter': 'from-gray-800 to-black',
    'LinkedIn': 'from-blue-600 to-blue-700',
    'Facebook': 'from-blue-500 to-blue-600',
    'Instagram': 'from-pink-500 to-purple-600'
};

export default function ContentCard({ platform, content, onCopy }: ContentCardProps) {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(editedContent);
            onCopy(editedContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedContent(content);
        setIsEditing(false);
    };

    const getCharacterCount = () => {
        switch (platform) {
            case 'Twitter':
                return { current: editedContent.length, max: 280 };
            case 'LinkedIn':
                return { current: editedContent.length, max: 3000 };
            case 'Facebook':
                return { current: editedContent.length, max: 63206 };
            case 'Instagram':
                return { current: editedContent.length, max: 2200 };
            default:
                return { current: editedContent.length, max: 1000 };
        }
    };

    const charCount = getCharacterCount();
    const isOverLimit = charCount.current > charCount.max;

    return (
        <Card className="overflow-hidden">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${platformColors[platform] || 'from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center text-white text-lg`}>
                            {platformIcons[platform] || '📱'}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{platform}</h3>
                            <p className="text-sm text-gray-600">Ready to post</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            className={copied ? 'bg-green-50 border-green-500 text-green-700' : ''}
                        >
                            {copied ? (
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Copied!
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy
                                </div>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {isEditing ? (
                        <div className="space-y-3">
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className={`w-full h-32 p-3 border-2 rounded-xl resize-none focus:outline-none transition-colors ${isOverLimit
                                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                    }`}
                            />

                            <div className="flex items-center justify-between">
                                <div className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                                    {charCount.current}/{charCount.max} characters
                                    {isOverLimit && ' (over limit)'}
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleSave}
                                        disabled={isOverLimit}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-4">
                            <pre className="whitespace-pre-wrap text-gray-900 font-normal leading-relaxed">
                                {editedContent}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!isEditing && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                                <span>{charCount.current} characters</span>
                                <span>•</span>
                                <span>Optimized for {platform}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-green-600 font-medium">Ready</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}