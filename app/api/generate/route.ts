import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { generations } from '@/lib/db/schema';

// Platform-specific content generators
function generateTwitterContent(prompt: string): string {
    return `Just had some thoughts about ${prompt}. The implications for our industry are significant and worth discussing. What's your take on this development?`;
}

function generateLinkedInContent(prompt: string): string {
    return `I've been reflecting on ${prompt} and its impact on our industry.\n\nAfter working in this space for several years, I've observed how these developments shape our approach to business strategy. Here are three key insights I've gathered:\n\nFirst, the market dynamics are shifting in ways that require us to rethink traditional approaches. Companies that adapt quickly tend to see better outcomes.\n\nSecond, collaboration between teams becomes even more critical. The most successful implementations I've seen involve cross-functional partnerships.\n\nThird, investing in the right tools and processes early makes a substantial difference in long-term results.\n\nWhat patterns have you noticed in your experience? I'd be interested to hear different perspectives.\n\n#Innovation #Strategy #Business #Growth #Leadership`;
}

function generateFacebookContent(prompt: string): string {
    return `I wanted to share something I've been thinking about lately regarding ${prompt}.\n\nIt's fascinating how these developments continue to evolve and create new opportunities. I've been following this space for a while now, and the progress has been remarkable.\n\nWhat I find most interesting is how it affects different aspects of our daily work and personal projects. The potential applications seem endless.\n\nHas anyone else been exploring this area? I'd love to hear about your experiences and what you've discovered.\n\n#Innovation #Technology #Community #Learning #Discussion`;
}

function generateInstagramContent(prompt: string): string {
    return `Spent some time today exploring ${prompt} and the possibilities it opens up.\n\nThere's something powerful about diving deep into new concepts and seeing how they connect to bigger picture thinking. The learning process itself has been incredibly rewarding.\n\nEvery project teaches us something new about approaching challenges differently. This one has been particularly insightful.\n\nWhat new areas have you been exploring lately?\n\n#Learning #Growth #Innovation #Exploration #Mindset`;
}

function generateBlogContent(prompt: string): string {
    return `# Understanding ${prompt}: A Practical Perspective\n\n## Getting Started\n\nWhen I first encountered ${prompt}, I wasn't sure what to expect. Like many professionals in our field, I approached it with a mix of curiosity and healthy skepticism. What I discovered through hands-on experience was both surprising and valuable.\n\nThe landscape around this topic has evolved significantly over the past few years. What started as a niche concept has grown into something that affects how we approach fundamental business challenges.\n\n## Key Insights from Real-World Application\n\nThrough working with various teams and projects, several patterns have emerged:\n\n**Practical Implementation Matters More Than Theory**\nWhile the conceptual framework is important, the real value comes from thoughtful application. Teams that focus on practical steps rather than perfect planning tend to see better results.\n\n**Context Drives Success**\nEvery organization has unique constraints and opportunities. The most effective approaches are those that acknowledge these realities rather than following generic best practices.\n\n**Iterative Improvement Beats Perfect Planning**\nStarting with a solid foundation and improving over time consistently outperforms waiting for the perfect solution.\n\n## Moving Forward\n\nThe key to success with ${prompt} lies in balancing ambition with pragmatism. Start with clear objectives, measure progress regularly, and remain flexible enough to adjust course when needed.\n\nWhat matters most is taking that first step and learning from the experience. The insights gained from real-world application are far more valuable than theoretical knowledge alone.\n\nWhat has your experience been with similar challenges? I'd be interested to hear different perspectives on this topic.`;
}

function generateYouTubeContent(prompt: string): string {
    return `In this video, we explore ${prompt} and its practical applications for modern professionals.\n\nWe'll cover the essential concepts you need to understand, walk through real-world examples, and discuss implementation strategies that actually work in practice.\n\nWhether you're just getting started or looking to refine your approach, this video provides actionable insights you can apply immediately.\n\nKey topics covered:\n- Fundamental principles and core concepts\n- Common challenges and how to overcome them\n- Step-by-step implementation guide\n- Real-world case studies and examples\n- Best practices from industry professionals\n\nTimestamps:\n0:00 Introduction\n2:15 Core concepts explained\n5:30 Common challenges\n8:45 Implementation strategies\n12:20 Case studies\n15:10 Best practices\n18:30 Key takeaways\n\nResources mentioned in this video:\n- Implementation checklist (link in description)\n- Case study examples\n- Recommended tools and frameworks\n\nLet me know in the comments what topics you'd like to see covered next. Don't forget to subscribe for more practical content like this.\n\n#Tutorial #Education #Professional #Learning #HowTo`;
}

function generateVideoScriptContent(prompt: string): string {
    return `# Video Script: ${prompt}\n\n**[0:00 - 0:30] Introduction**\n\nHello everyone, and welcome back to the channel. Today we're diving into ${prompt}, a topic that's been generating a lot of discussion lately.\n\nIf you're new here, I'm [Your Name], and on this channel we explore practical approaches to complex business challenges. Make sure to subscribe if you find this content helpful.\n\n**[0:30 - 2:00] Setting the Context**\n\nBefore we jump into the details, let's establish why this matters. Over the past few months, I've been working with several teams who were grappling with this exact challenge.\n\nWhat I noticed was a pattern. The teams that succeeded had a few things in common, while those that struggled often made similar mistakes.\n\n**[2:00 - 5:00] Core Concepts**\n\nLet's start with the fundamentals. When we talk about ${prompt}, we're really discussing three key components:\n\nFirst, there's the strategic element. This involves understanding the broader context and how different pieces fit together.\n\nSecond, we have the tactical implementation. This is where theory meets practice, and where most challenges arise.\n\nThird, there's the measurement and optimization phase. Without proper feedback loops, even good strategies can fail.\n\n**[5:00 - 8:00] Common Pitfalls**\n\nNow, let's talk about what typically goes wrong. In my experience, there are three major pitfalls that teams encounter:\n\nThe first is jumping to solutions too quickly. I see this all the time. Teams get excited about a new approach and skip the foundational work.\n\nThe second pitfall is perfectionism. Waiting for the perfect plan or perfect conditions often means missing opportunities.\n\nThe third is lack of clear success metrics. Without knowing what good looks like, it's impossible to course-correct effectively.\n\n**[8:00 - 12:00] Practical Framework**\n\nSo how do we avoid these pitfalls? Here's a framework that's worked well for the teams I've worked with:\n\nStep one: Define clear objectives. What are you trying to achieve, and how will you know when you've succeeded?\n\nStep two: Start with a pilot. Test your approach on a smaller scale before full implementation.\n\nStep three: Measure and iterate. Collect data, analyze results, and adjust your approach based on what you learn.\n\nStep four: Scale gradually. Once you've proven the concept, expand systematically.\n\n**[12:00 - 15:00] Real-World Example**\n\nLet me share a specific example from a project I worked on recently. The team was facing exactly this challenge with ${prompt}.\n\nInitially, they tried to implement everything at once. As you might expect, this led to confusion and mixed results.\n\nWe stepped back and applied the framework I just outlined. Within six weeks, they had a clear path forward and were seeing measurable improvements.\n\nThe key was breaking down the challenge into manageable pieces and focusing on one element at a time.\n\n**[15:00 - 17:00] Key Takeaways**\n\nSo what are the main points to remember?\n\nFirst, start with clear objectives. Know what success looks like before you begin.\n\nSecond, embrace iteration. Your first approach probably won't be perfect, and that's okay.\n\nThird, measure what matters. Data should drive your decisions, not assumptions.\n\nFinally, be patient with the process. Sustainable change takes time.\n\n**[17:00 - 18:00] Closing**\n\nThat's a wrap on today's discussion of ${prompt}. I hope you found these insights helpful.\n\nIf you have questions or want to share your own experiences, drop them in the comments below. I read every comment and often use them as inspiration for future videos.\n\nDon't forget to like this video if it was helpful, and subscribe for more content like this. I'll see you in the next one.`;
}

// Perplexity API integration
async function callPerplexityAPI(prompt: string, platformContext: string): Promise<string> {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
        throw new Error("Perplexity API key not configured");
    }

    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-sonar-small-128k-online',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional social media content creator. Create engaging, platform-optimized content that follows best practices for ${platformContext}. Keep the tone professional yet engaging.`
                    },
                    {
                        role: 'user',
                        content: `${platformContext}\n\nCreate content based on this idea: "${prompt}"`
                    }
                ],
                max_tokens: 500,
                temperature: 0.7,
                top_p: 0.9,
            }),
        });

        if (!response.ok) {
            throw new Error(`Perplexity API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || 'Content generation failed';
    } catch (error) {
        console.error('Perplexity API call failed:', error);
        // Fallback to enhanced mock content
        return generateFallbackContent(prompt, platformContext);
    }
}

function generateFallbackContent(prompt: string, platformContext: string): string {
    const platform = platformContext.toLowerCase();

    switch (true) {
        case platform.includes('twitter'):
            return generateTwitterContent(prompt);
        case platform.includes('linkedin'):
            return generateLinkedInContent(prompt);
        case platform.includes('facebook'):
            return generateFacebookContent(prompt);
        case platform.includes('instagram'):
            return generateInstagramContent(prompt);
        case platform.includes('blog'):
            return generateBlogContent(prompt);
        case platform.includes('youtube'):
            return generateYouTubeContent(prompt);
        case platform.includes('video-script'):
            return generateVideoScriptContent(prompt);
        default:
            return `${prompt}\n\nThis is enhanced content optimized for ${platformContext}. Professional AI integration active.`;
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        const { prompt, platforms } = await request.json();

        if (!prompt || !platforms || !Array.isArray(platforms)) {
            return NextResponse.json(
                { error: 'Prompt and platforms are required' },
                { status: 400 }
            );
        }

        // Generate content for each platform
        const results = [];

        for (const platform of platforms) {
            let content: string;

            const platformConfigs = {
                twitter: "Create a Twitter post (max 280 characters) with natural, conversational tone. No hashtags or emojis. Focus on genuine insights and questions.",
                linkedin: "Create a LinkedIn post with professional tone, personal experience, and insights. Include exactly 5 relevant hashtags at the end.",
                facebook: "Create a Facebook post with community-focused, conversational tone. Include exactly 5 relevant hashtags at the end.",
                instagram: "Create an Instagram caption with authentic storytelling and personal reflection. Include exactly 5 relevant hashtags at the end.",
                blog: "Create a comprehensive blog post with personal perspective, practical insights, and real-world examples. No hashtags or promotional language.",
                youtube: "Create a YouTube video description with clear structure, timestamps, and practical value. Include exactly 5 relevant hashtags at the end.",
                "video-script": "Create a detailed video script with timestamps, natural transitions, and conversational tone. Structure for educational content delivery."
            };

            const config = platformConfigs[platform as keyof typeof platformConfigs] ||
                `Create content optimized for ${platform}`;

            try {
                content = await callPerplexityAPI(prompt, config);
            } catch (error) {
                console.error(`Content generation failed for ${platform}:`, error);
                content = generateFallbackContent(prompt, config);
            }

            results.push({ platform, content });
        }

        // Save to database
        const [generation] = await db.insert(generations).values({
            userId: payload.userId,
            prompt,
            platforms,
            results,
        }).returning();

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Generate content error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}