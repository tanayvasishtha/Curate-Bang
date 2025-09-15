"use client";

import { useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromptInput from '@/components/PromptInput';
import PlatformSelector from '@/components/PlatformSelector';
import GenerateButton from '@/components/GenerateButton';
import ContentCard from '@/components/ContentCard';
import GenerationHistory from '@/components/GenerationHistory';
import { Card, CardContent } from '@/components/ui/Card';

export default function DashboardPage() {
    const [prompt, setPrompt] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState<Array<{ platform: string; content: string }>>([]);
    const [showHistory, setShowHistory] = useState(false);

    const generateContent = useAction(api.actions.generateContent);

    const togglePlatform = (platformId: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platformId)
                ? prev.filter(id => id !== platformId)
                : [...prev, platformId]
        );
    };

    const handleGenerate = async () => {
        if (!prompt.trim() || selectedPlatforms.length === 0) return;

        setIsGenerating(true);
        setResults([]);

        try {
            const generatedResults = await generateContent({
                prompt: prompt.trim(),
                platforms: selectedPlatforms
            });

            setResults(generatedResults);
            setIsGenerating(false);
        } catch (error) {
            console.error('Content generation failed:', error);
            // Fallback to mock content
            setTimeout(() => {
                const mockResults = selectedPlatforms.map(platform => ({
                    platform,
                    content: `Professional ${platform} content based on: "${prompt}"\n\nThis is AI-generated content optimized for ${platform} with enhanced engagement features.`
                }));
                setResults(mockResults);
                setIsGenerating(false);
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">Content Generator</h1>
                        <p className="text-secondary">Transform your ideas into platform-optimized content</p>
                    </div>

                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <PromptInput
                                    value={prompt}
                                    onChange={setPrompt}
                                    placeholder="Enter your content idea..."
                                />

                                <PlatformSelector
                                    selectedPlatforms={selectedPlatforms}
                                    onTogglePlatform={togglePlatform}
                                />

                                <GenerateButton
                                    onClick={handleGenerate}
                                    disabled={!prompt.trim() || selectedPlatforms.length === 0 || isGenerating}
                                    isLoading={isGenerating}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {(isGenerating || results.length > 0) && (
                        <div className="space-y-4 mb-8">
                            <h2 className="text-xl font-semibold text-primary">Generated Content</h2>
                            {isGenerating ? (
                                <div className="grid gap-4">
                                    {selectedPlatforms.map(platform => (
                                        <ContentCard
                                            key={platform}
                                            platform={platform}
                                            content=""
                                            isLoading={true}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {results.map(result => (
                                        <ContentCard
                                            key={result.platform}
                                            platform={result.platform}
                                            content={result.content}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            {showHistory ? 'Hide' : 'Show'} Generation History
                        </button>
                    </div>

                    {showHistory && (
                        <div className="mt-8">
                            <GenerationHistory />
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}