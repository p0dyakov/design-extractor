import React, { useState } from 'react';

interface ApiKeyInputProps {
    apiKey: string;
    setApiKey: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="api-key" className="text-sm font-medium text-gray-300">
                Your Gemini API Key
            </label>
            <div className="relative">
                <input
                    id="api-key"
                    type={isVisible ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key here..."
                    className="w-full pl-4 pr-12 py-2 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition-shadow duration-200 text-gray-300 placeholder-gray-500"
                />
                <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-300"
                    title={isVisible ? 'Hide API Key' : 'Show API Key'}
                >
                    {isVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><line x1="2" x2="22" y1="2" y2="22"/>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};