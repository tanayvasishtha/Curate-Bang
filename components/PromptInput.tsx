interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function PromptInput({ value, onChange, placeholder }: PromptInputProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Your Content Idea</h2>
                    <p className="text-sm text-gray-600">Describe what you want to share with your audience</p>
                </div>
            </div>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Enter your content idea here..."}
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500"
                maxLength={500}
            />

            <div className="flex justify-between items-center text-sm">
                <div className="text-gray-500">
                    💡 Be specific about your message, target audience, and desired tone
                </div>
                <div className="text-gray-400">
                    {value.length}/500
                </div>
            </div>
        </div>
    );
}