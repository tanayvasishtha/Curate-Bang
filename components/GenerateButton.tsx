import { Button } from './ui/Button';

interface GenerateButtonProps {
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
    selectedCount: number;
}

export default function GenerateButton({ onClick, disabled, isLoading, selectedCount }: GenerateButtonProps) {
    return (
        <div className="text-center space-y-4">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                size="lg"
                className="w-full max-w-md mx-auto relative overflow-hidden"
            >
                {isLoading ? (
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Generating Content...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Generate Content for {selectedCount} Platform{selectedCount !== 1 ? 's' : ''}</span>
                    </div>
                )}
            </Button>

            {disabled && !isLoading && (
                <p className="text-sm text-gray-500">
                    Please enter your content idea and select at least one platform
                </p>
            )}

            {isLoading && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-blue-900">AI is crafting your content...</p>
                            <p className="text-sm text-blue-700">This usually takes 10-30 seconds</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}