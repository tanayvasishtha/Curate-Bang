import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Platform configurations for content generation
const PLATFORM_CONFIGS = {
    twitter: {
        name: "Twitter",
        maxLength: 280,
        characteristics: ["concise", "engaging", "hashtags", "mentions"],
        promptTemplate: "Create a Twitter post (max 280 characters) that is concise and engaging. Include relevant hashtags."
    },
    linkedin: {
        name: "LinkedIn",
        maxLength: 3000,
        characteristics: ["professional", "insightful", "networking", "industry-focused"],
        promptTemplate: "Create a LinkedIn post that is professional and insightful, suitable for business networking."
    },
    facebook: {
        name: "Facebook",
        maxLength: 63206,
        characteristics: ["conversational", "community-focused", "storytelling"],
        promptTemplate: "Create a Facebook post that is conversational and community-focused, encouraging engagement."
    },
    instagram: {
        name: "Instagram",
        maxLength: 2200,
        characteristics: ["visual-focused", "lifestyle", "hashtags", "story-driven"],
        promptTemplate: "Create an Instagram caption that complements visual content, includes relevant hashtags."
    }
};

// Generate content for multiple platforms
export const generateContent = action({
    args: {
        prompt: v.string(),
        platforms: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const results = [];

        // Enhanced content generation with platform-specific optimization
        for (const platform of args.platforms) {
            const config = PLATFORM_CONFIGS[platform as keyof typeof PLATFORM_CONFIGS];
            if (!config) {
                continue;
            }

            let content = '';

            // Generate more realistic platform-specific content
            switch (platform) {
                case 'twitter':
                    content = generateTwitterContent(args.prompt);
                    break;
                case 'linkedin':
                    content = generateLinkedInContent(args.prompt);
                    break;
                case 'facebook':
                    content = generateFacebookContent(args.prompt);
                    break;
                case 'instagram':
                    content = generateInstagramContent(args.prompt);
                    break;
                default:
                    content = `${config.promptTemplate}\n\nBased on: "${args.prompt}"\n\n[Enhanced content generation ready for AI integration.]`;
            }

            results.push({
                platform: config.name,
                content: content.substring(0, config.maxLength),
            });
        }

        // Save the generation to the database
        await ctx.runMutation(api.generations.saveGeneration, {
            prompt: args.prompt,
            platforms: args.platforms,
            results,
        });

        return results;
    },
});
// Plat
form - specific content generators
function generateTwitterContent(prompt: string): string {
    const hooks = ['🚀', '💡', '🔥', '✨', '⚡'];
    const hashtags = ['#Innovation', '#Success', '#Growth', '#Productivity', '#Leadership'];

    const hook = hooks[Math.floor(Math.random() * hooks.length)];
    const selectedHashtags = hashtags.slice(0, 3).join(' ');

    return `${hook} ${prompt}

Transform your ideas into action! This insight can help entrepreneurs and creators make a real impact.

${selectedHashtags}`;
}

function generateLinkedInContent(prompt: string): string {
    return `${prompt}

In today's fast-paced business environment, this insight resonates deeply with professionals across industries. Here's why this matters:

• Drives meaningful engagement with your audience
• Creates lasting value for your community  
• Builds authentic professional connections
• Establishes thought leadership in your field

The key is to approach this strategically while maintaining authenticity in your professional relationships.

What are your thoughts on this approach? I'd love to hear your perspective in the comments.

#Leadership #BusinessStrategy #ProfessionalGrowth #Innovation`;
}

function generateFacebookContent(prompt: string): string {
    return `${prompt}

This got me thinking about how we can all make a positive difference in our communities. Whether you're just starting your journey or have years of experience, there's always room to grow and learn together.

I've found that the most meaningful connections come from sharing authentic experiences and supporting each other's growth. It's amazing what we can accomplish when we combine our unique perspectives and skills.

What's your experience with this? I'd love to hear your story in the comments and connect with like-minded people who are passionate about making an impact! 👇

Feel free to share this with someone who might find it valuable.`;
}

function generateInstagramContent(prompt: string): string {
    const emojis = ['✨', '🌟', '💫', '🔥', '💎', '🚀', '💪', '🎯'];
    const hashtags = [
        '#Inspiration', '#Journey', '#Creative', '#Mindset', '#Growth',
        '#Authentic', '#Community', '#Passion', '#Success', '#Motivation',
        '#Lifestyle', '#Goals', '#Vision', '#Impact', '#Transform'
    ];

    const selectedEmojis = emojis.slice(0, 2).join(' ');
    const selectedHashtags = hashtags.slice(0, 8).join(' ');

    return `${prompt} ${selectedEmojis}

Swipe to see the journey behind this idea! Sometimes the best inspiration comes from the most unexpected places, and I'm excited to share this perspective with you.

The process of growth isn't always linear, but every step teaches us something valuable. What started as a simple thought has evolved into something much more meaningful.

Tag someone who needs to see this! 👇

${selectedHashtags}`;
}