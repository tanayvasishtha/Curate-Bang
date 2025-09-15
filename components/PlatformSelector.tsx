interface PlatformSelectorProps {
    selectedPlatforms: string[];
    onTogglePlatform: (platformId: string) => void;
}

const platforms = [
    {
        id: 'twitter',
        name: 'Twitter',
        icon: '𝕏',
        color: 'from-gray-800 to-black',
        description: 'Short, engaging tweets with hashtags'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: '💼',
        color: 'from-blue-600 to-blue-700',
        description: 'Professional content for business network'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: '📘',
        color: 'from-blue-500 to-blue-600',
        description: 'Community-focused posts with engagement'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: '📸',
        color: 'from-pink-500 to-purple-600',
        description: 'Visual storytelling with hashtags'
    }
];

export default function PlatformSelector({ selectedPlatforms, onTogglePlatform }: PlatformSelectorProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Select Platforms</h2>
                    <p className="text-sm text-gray-600">Choose where you want to share your content</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => {
                    const isSelected = selectedPlatforms.includes(platform.id);
                    return (
                        <button
                            key={platform.id}
                            type="button"
                            onClick={() => onTogglePlatform(platform.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${isSelected
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
                                    {platform.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                                        {isSelected && (
                                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {selectedPlatforms.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-800 font-medium">
                            {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}