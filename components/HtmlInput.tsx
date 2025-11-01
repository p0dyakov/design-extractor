import React from 'react';

interface AnalysisInputProps {
    inputValue: string;
    setInputValue: (content: string) => void;
    onAnalyze: () => void;
    isLoading: boolean;
}

export const AnalysisInput: React.FC<AnalysisInputProps> = ({ inputValue, setInputValue, onAnalyze, isLoading }) => {
    return (
        <div className="relative">
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Paste full HTML source code here..."
                className="w-full h-48 pl-6 pr-48 py-4 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-white transition-shadow duration-200 text-gray-300 placeholder-gray-500 custom-scrollbar caret-white resize-handle-hidden"
                disabled={isLoading}
            />
            <button
                onClick={onAnalyze}
                disabled={isLoading || !inputValue}
                className="absolute top-1/2 right-6 -translate-y-1/2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white transition-all duration-200 disabled:bg-neutral-800 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                    </>
                ) : "Analyze"}
            </button>
        </div>
    );
};