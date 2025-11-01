import React, { useState, useEffect } from 'react';
import { CodeBlock } from './CodeBlock';
import type { DesignSystem } from '../types';

interface ComponentPreviewProps {
    html: string;
    css: string;
    name: string;
    system: DesignSystem;
}

// Generates CSS variables for colors and layout
const generateCssVariables = (system: DesignSystem): string => {
    let variables = ':root {\n';
    system.colorPalette.forEach(color => {
        variables += `  ${color.variable}: ${color.hex};\n`;
    });
    system.layoutSystem.forEach(layout => {
        variables += `  ${layout.variable}: ${layout.value};\n`;
    });
    variables += '}';
    return variables;
}

// Generates a single block of CSS for all UI components
const generateAllComponentCss = (system: DesignSystem): string => {
    return system.uiComponents.map(c => c.css).join('\n\n');
}


export const ComponentPreview: React.FC<ComponentPreviewProps> = ({ html, css, name, system }) => {
    const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css'>('preview');
    const [iframeHeight, setIframeHeight] = useState('192px'); // Default height

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.frameName === name && event.data.frameHeight) {
                setIframeHeight(`${event.data.frameHeight}px`);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [name]);


    const cssVariables = generateCssVariables(system);
    const allComponentCss = generateAllComponentCss(system);

    // This script, injected into the iframe, reports the content's height back to the parent window.
    const reportHeightScript = `
        <script>
            const observer = new ResizeObserver(entries => {
                // We only need the first entry, as we are observing the body
                const height = entries[0].target.scrollHeight;
                window.parent.postMessage({ frameHeight: height, frameName: "${name}" }, '*');
            });
            // Disconnect observer before observing new element
            observer.disconnect();
            observer.observe(document.body);
        </script>
    `;

    const srcDoc = `
        <html>
            <head>
                <style>
                    /* Basic CSS Reset */
                    *, *::before, *::after { box-sizing: border-box; }
                    body, h1, h2, h3, h4, p, figure, blockquote, dl, dd { margin: 0; }
                    
                    ${cssVariables}

                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100%;
                        margin: 0;
                        background-color: transparent;
                        font-family: sans-serif; /* A sensible default */
                        padding: 1rem;
                        height: fit-content;
                    }

                    /* Inject all component styles to handle nested components */
                    ${allComponentCss}
                </style>
            </head>
            <body>
                ${html}
                ${reportHeightScript}
            </body>
        </html>
    `;

    const TabButton: React.FC<{ tabName: 'preview' | 'html' | 'css'; children: React.ReactNode }> = ({ tabName, children }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeTab === tabName
                    ? 'bg-neutral-800 text-white'
                    : 'bg-transparent text-gray-400 hover:bg-neutral-800/50'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-neutral-800 rounded-lg overflow-hidden">
            <div className="bg-neutral-900 border-b border-neutral-800 flex items-center px-2">
                <TabButton tabName="preview">Preview</TabButton>
                <TabButton tabName="html">HTML</TabButton>
                <TabButton tabName="css">CSS</TabButton>
            </div>
            <div className="p-4 bg-neutral-900/50">
                {activeTab === 'preview' && (
                    <iframe
                        srcDoc={srcDoc}
                        title={`Preview of ${name}`}
                        className="w-full border-0 transition-all duration-300 ease-in-out"
                        style={{ height: iframeHeight }}
                        loading="lazy"
                        sandbox="allow-scripts"
                    />
                )}
                {activeTab === 'html' && <CodeBlock content={html} />}
                {activeTab === 'css' && <CodeBlock content={css} />}
            </div>
        </div>
    );
};