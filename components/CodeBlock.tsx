import React, { useState } from 'react';

interface CodeBlockProps {
    content: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-neutral-950 rounded-lg border border-neutral-800 relative">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-neutral-800 text-gray-300 rounded-md hover:bg-neutral-700 text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
                {copied ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Copied!
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy
                    </>
                )}
            </button>
            <pre className="p-4 overflow-x-auto text-sm text-gray-300 custom-scrollbar">
                <code>{content}</code>
            </pre>
        </div>
    );
};