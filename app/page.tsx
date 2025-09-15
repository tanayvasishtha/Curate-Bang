"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface Message {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    platforms?: string[];
    results?: Array<{ platform: string; content: string }>;
    timestamp: Date;
}

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter', 'linkedin']);
    const [isGenerating, setIsGenerating] = useState(false);

    const platforms = [
        { id: 'twitter', name: 'Twitter' },
        { id: 'linkedin', name: 'LinkedIn' },
        { id: 'facebook', name: 'Facebook' },
        { id: 'instagram', name: 'Instagram' },
        { id: 'blog', name: 'Blog' },
        { id: 'youtube', name: 'YouTube Description' },
        { id: 'video-script', name: 'Video Script' },
    ];

    const togglePlatform = (platformId: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platformId)
                ? prev.filter(id => id !== platformId)
                : [...prev, platformId]
        );
    };

    const generateContent = async (prompt: string) => {
        if (!prompt.trim() || selectedPlatforms.length === 0) return;

        setIsGenerating(true);

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: prompt,
            platforms: selectedPlatforms,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            // Call the real API
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    platforms: selectedPlatforms
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate content');
            }

            const data = await response.json();
            const results = data.results;

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `I've generated optimized content for ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''}:`,
                results,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Generation failed:', error);
            // Fallback to mock content only if API fails
            const fallbackResults = selectedPlatforms.map(platform => ({
                platform,
                content: generateMockContent(prompt, platform)
            }));

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: `Generated content for ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''} (using fallback):`,
                results: fallbackResults,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } finally {
            setIsGenerating(false);
        }
    };

    const generateMockContent = (prompt: string, platform: string): string => {
        switch (platform) {
            case 'twitter':
                return `Just had some thoughts about ${prompt}. The implications for our industry are significant and worth discussing. What&apos;s your take on this development?`;

            case 'linkedin':
                return `I've been reflecting on ${prompt} and its impact on our industry.\n\nAfter working in this space for several years, I've observed how these developments shape our approach to business strategy. Here are three key insights I've gathered:\n\nFirst, the market dynamics are shifting in ways that require us to rethink traditional approaches. Companies that adapt quickly tend to see better outcomes.\n\nSecond, collaboration between teams becomes even more critical. The most successful implementations I've seen involve cross-functional partnerships.\n\nThird, investing in the right tools and processes early makes a substantial difference in long-term results.\n\nWhat patterns have you noticed in your experience? I'd be interested to hear different perspectives.\n\n#Innovation #Strategy #Business #Growth #Leadership`;

            case 'facebook':
                return `I wanted to share something I've been thinking about lately regarding ${prompt}.\n\nIt's fascinating how these developments continue to evolve and create new opportunities. I've been following this space for a while now, and the progress has been remarkable.\n\nWhat I find most interesting is how it affects different aspects of our daily work and personal projects. The potential applications seem endless.\n\nHas anyone else been exploring this area? I'd love to hear about your experiences and what you've discovered.\n\n#Innovation #Technology #Community #Learning #Discussion`;

            case 'instagram':
                return `Spent some time today exploring ${prompt} and the possibilities it opens up.\n\nThere's something powerful about diving deep into new concepts and seeing how they connect to bigger picture thinking. The learning process itself has been incredibly rewarding.\n\nEvery project teaches us something new about approaching challenges differently. This one has been particularly insightful.\n\nWhat new areas have you been exploring lately?\n\n#Learning #Growth #Innovation #Exploration #Mindset`;

            case 'blog':
                return `# Understanding ${prompt}: A Practical Perspective\n\n## Getting Started\n\nWhen I first encountered ${prompt}, I wasn't sure what to expect. Like many professionals in our field, I approached it with a mix of curiosity and healthy skepticism. What I discovered through hands-on experience was both surprising and valuable.\n\nThe landscape around this topic has evolved significantly over the past few years. What started as a niche concept has grown into something that affects how we approach fundamental business challenges.\n\n## Key Insights from Real-World Application\n\nThrough working with various teams and projects, several patterns have emerged:\n\n**Practical Implementation Matters More Than Theory**\nWhile the conceptual framework is important, the real value comes from thoughtful application. Teams that focus on practical steps rather than perfect planning tend to see better results.\n\n**Context Drives Success**\nEvery organization has unique constraints and opportunities. The most effective approaches are those that acknowledge these realities rather than following generic best practices.\n\n**Iterative Improvement Beats Perfect Planning**\nStarting with a solid foundation and improving over time consistently outperforms waiting for the perfect solution.\n\n## Moving Forward\n\nThe key to success with ${prompt} lies in balancing ambition with pragmatism. Start with clear objectives, measure progress regularly, and remain flexible enough to adjust course when needed.\n\nWhat matters most is taking that first step and learning from the experience. The insights gained from real-world application are far more valuable than theoretical knowledge alone.\n\nWhat has your experience been with similar challenges? I'd be interested to hear different perspectives on this topic.`;

            case 'youtube':
                return `In this video, we explore ${prompt} and its practical applications for modern professionals.\n\nWe'll cover the essential concepts you need to understand, walk through real-world examples, and discuss implementation strategies that actually work in practice.\n\nWhether you're just getting started or looking to refine your approach, this video provides actionable insights you can apply immediately.\n\nKey topics covered:\n- Fundamental principles and core concepts\n- Common challenges and how to overcome them\n- Step-by-step implementation guide\n- Real-world case studies and examples\n- Best practices from industry professionals\n\nTimestamps:\n0:00 Introduction\n2:15 Core concepts explained\n5:30 Common challenges\n8:45 Implementation strategies\n12:20 Case studies\n15:10 Best practices\n18:30 Key takeaways\n\nResources mentioned in this video:\n- Implementation checklist (link in description)\n- Case study examples\n- Recommended tools and frameworks\n\nLet me know in the comments what topics you'd like to see covered next. Don't forget to subscribe for more practical content like this.`;

            case 'video-script':
                return `# Video Script: ${prompt}\n\n**[0:00 - 0:30] Introduction**\n\nHello everyone, and welcome back to the channel. Today we're diving into ${prompt}, a topic that's been generating a lot of discussion lately.\n\nIf you're new here, I'm [Your Name], and on this channel we explore practical approaches to complex business challenges. Make sure to subscribe if you find this content helpful.\n\n**[0:30 - 2:00] Setting the Context**\n\nBefore we jump into the details, let's establish why this matters. Over the past few months, I've been working with several teams who were grappling with this exact challenge.\n\nWhat I noticed was a pattern. The teams that succeeded had a few things in common, while those that struggled often made similar mistakes.\n\n**[2:00 - 5:00] Core Concepts**\n\nLet's start with the fundamentals. When we talk about ${prompt}, we're really discussing three key components:\n\nFirst, there's the strategic element. This involves understanding the broader context and how different pieces fit together.\n\nSecond, we have the tactical implementation. This is where theory meets practice, and where most challenges arise.\n\nThird, there's the measurement and optimization phase. Without proper feedback loops, even good strategies can fail.\n\n**[5:00 - 8:00] Common Pitfalls**\n\nNow, let's talk about what typically goes wrong. In my experience, there are three major pitfalls that teams encounter:\n\nThe first is jumping to solutions too quickly. I see this all the time. Teams get excited about a new approach and skip the foundational work.\n\nThe second pitfall is perfectionism. Waiting for the perfect plan or perfect conditions often means missing opportunities.\n\nThe third is lack of clear success metrics. Without knowing what good looks like, it's impossible to course-correct effectively.\n\n**[8:00 - 12:00] Practical Framework**\n\nSo how do we avoid these pitfalls? Here's a framework that's worked well for the teams I've worked with:\n\nStep one: Define clear objectives. What are you trying to achieve, and how will you know when you've succeeded?\n\nStep two: Start with a pilot. Test your approach on a smaller scale before full implementation.\n\nStep three: Measure and iterate. Collect data, analyze results, and adjust your approach based on what you learn.\n\nStep four: Scale gradually. Once you've proven the concept, expand systematically.\n\n**[12:00 - 15:00] Real-World Example**\n\nLet me share a specific example from a project I worked on recently. The team was facing exactly this challenge with ${prompt}.\n\nInitially, they tried to implement everything at once. As you might expect, this led to confusion and mixed results.\n\nWe stepped back and applied the framework I just outlined. Within six weeks, they had a clear path forward and were seeing measurable improvements.\n\nThe key was breaking down the challenge into manageable pieces and focusing on one element at a time.\n\n**[15:00 - 17:00] Key Takeaways**\n\nSo what are the main points to remember?\n\nFirst, start with clear objectives. Know what success looks like before you begin.\n\nSecond, embrace iteration. Your first approach probably won't be perfect, and that's okay.\n\nThird, measure what matters. Data should drive your decisions, not assumptions.\n\nFinally, be patient with the process. Sustainable change takes time.\n\n**[17:00 - 18:00] Closing**\n\nThat's a wrap on today's discussion of ${prompt}. I hope you found these insights helpful.\n\nIf you have questions or want to share your own experiences, drop them in the comments below. I read every comment and often use them as inspiration for future videos.\n\nDon't forget to like this video if it was helpful, and subscribe for more content like this. I'll see you in the next one.`;

            default:
                return `Professional content about ${prompt} optimized for ${platform}.`;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        generateContent(input);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-20 pb-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl font-bold text-slate-900 mb-6">
                        Curate<span className="text-blue-600">Bang</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Transform a single idea into high-quality, tailored content for multiple social media platforms with AI-powered precision.
                    </p>
                </div>
            </section>

            {/* Chat Interface */}
            <section className="pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-lg border-slate-200">
                        <CardContent className="p-0">
                            {/* Platform Selector */}
                            <div className="p-6 border-b border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Platforms</h3>
                                <div className="flex flex-wrap gap-3">
                                    {platforms.map(platform => (
                                        <button
                                            key={platform.id}
                                            onClick={() => togglePlatform(platform.id)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all border ${selectedPlatforms.includes(platform.id)
                                                ? 'bg-slate-900 text-white border-slate-900'
                                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                                                }`}
                                        >
                                            {platform.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="h-96 overflow-y-auto p-6 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="text-center text-slate-500 py-12">
                                        <div className="text-4xl mb-4">💬</div>
                                        <p className="text-lg">Start a conversation to generate content</p>
                                        <p className="text-sm mt-2">Type your content idea below and I'll create platform-optimized posts</p>
                                    </div>
                                ) : (
                                    messages.map(message => (
                                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-3xl rounded-lg p-4 ${message.type === 'user'
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-slate-100 text-slate-900'
                                                }`}>
                                                <p className="mb-2">{message.content}</p>

                                                {message.type === 'user' && message.platforms && (
                                                    <div className="flex gap-2 mt-2">
                                                        {message.platforms.map(platform => (
                                                            <span key={platform} className="text-xs bg-slate-700 px-2 py-1 rounded">
                                                                {platform}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {message.results && (
                                                    <div className="mt-4 space-y-3">
                                                        {message.results.map(result => (
                                                            <div key={result.platform} className="bg-white rounded-lg p-4 border border-slate-200">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <h4 className="font-semibold text-slate-900 capitalize">
                                                                        {result.platform}
                                                                    </h4>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => copyToClipboard(result.content)}
                                                                        className="text-xs"
                                                                    >
                                                                        Copy
                                                                    </Button>
                                                                </div>
                                                                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                                                                    {result.content}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="text-xs opacity-70 mt-2">
                                                    {message.timestamp.toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {isGenerating && (
                                    <div className="flex justify-start">
                                        <div className="bg-slate-100 rounded-lg p-4 max-w-xs">
                                            <div className="flex items-center space-x-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900"></div>
                                                <span className="text-slate-600">Generating content...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Form */}
                            <div className="p-6 border-t border-slate-200">
                                <form onSubmit={handleSubmit} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Describe your content idea..."
                                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                        disabled={isGenerating}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={!input.trim() || selectedPlatforms.length === 0 || isGenerating}
                                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold border border-slate-900"
                                    >
                                        {isGenerating ? 'Generating...' : 'Generate'}
                                    </Button>
                                </form>
                                <p className="text-xs text-slate-500 mt-2">
                                    Select platforms above and describe your content idea to get started
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
}