import React, { useState, useCallback, useEffect } from 'react';
import { AnalysisInput } from './components/HtmlInput';
import { DesignSystemDisplay } from './components/DesignSystemDisplay';
import { extractDesignTokens } from './services/designExtractor';
import { generateDesignSystem } from './services/geminiService';
import type { DesignSystem, ExtractedTokens } from './types';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ApiKeyInput } from './components/ApiKeyInput';

const App: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [designSystem, setDesignSystem] = useState<DesignSystem | null>(null);
    const [apiKey, setApiKey] = useState<string>('');

    useEffect(() => {
        const storedApiKey = localStorage.getItem('gemini-api-key');
        if (storedApiKey) {
            setApiKey(storedApiKey);
        }
    }, []);

    const handleApiKeyChange = (key: string) => {
        setApiKey(key);
        localStorage.setItem('gemini-api-key', key);
    };

    const handleAnalyze = useCallback(async () => {
        if (!inputValue.trim()) {
            setError("Please paste HTML content to analyze.");
            return;
        }
        if (!apiKey.trim()) {
            setError("Please enter your Gemini API key to begin analysis.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setDesignSystem(null);

        try {
            const htmlContent = inputValue;

            const tokens: ExtractedTokens = extractDesignTokens(htmlContent);
            if (tokens.colors.length === 0 && tokens.fontFamilies.length === 0) {
                setError("No actionable design tokens (colors, fonts) found in the provided HTML. Please ensure the HTML contains CSS styles.");
                setIsLoading(false);
                return;
            }

            const generatedSystem = await generateDesignSystem(tokens, apiKey);
            setDesignSystem(generatedSystem);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Failed to generate design system. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, apiKey]);

    return (
        <div className="min-h-screen bg-neutral-950 font-sans flex flex-col">
            <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col gap-8">
                <div className="text-center pt-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Extract a Design System from any Website</h1>
                    <p className="text-gray-400 mt-2 max-w-3xl mx-auto">
                        Paste the full HTML source code from a website. Our AI will analyze it, structure the design tokens, replicate UI components, and provide downloadable assets. Analysis can take up to a minute.
                    </p>
                </div>
                
                <div className="max-w-4xl w-full mx-auto flex flex-col gap-6">
                    <ApiKeyInput apiKey={apiKey} setApiKey={handleApiKeyChange} />
                    <AnalysisInput 
                        inputValue={inputValue} 
                        setInputValue={setInputValue} 
                        onAnalyze={handleAnalyze}
                        isLoading={isLoading}
                    />
                </div>

                {error && <div className="max-w-4xl w-full mx-auto"><ErrorDisplay message={error} /></div>}
                
                {designSystem && !isLoading && <DesignSystemDisplay system={designSystem} />}

            </main>
            <footer className="text-center p-4 text-gray-500 text-sm">
                <p>Powered by Gemini API</p>
            </footer>
        </div>
    );
};

export default App;