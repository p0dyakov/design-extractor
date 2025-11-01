
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="p-4 border-b border-neutral-800">
            <div className="container mx-auto flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M14 10a2 2 0 0 1-2-2"/>
                    <path d="M14 6a2 2 0 0 1-2-2"/>
                    <path d="M14 14a2 2 0 0 1-2-2"/>
                    <path d="M14 18a2 2 0 0 1-2-2"/>
                    <path d="M6 18a2 2 0 0 1-2-2"/>
                    <path d="M6 14a2 2 0 0 1-2-2"/>
                    <path d="M6 10a2 2 0 0 1-2-2"/>
                    <path d="M6 6a2 2 0 0 1-2-2"/>
                    <path d="M10 18a2 2 0 0 1-2-2"/>
                    <path d="M10 14a2 2 0 0 1-2-2"/>
                    <path d="M18 10a2 2 0 0 1-2-2"/>
                    <path d="M18 6a2 2 0 0 1-2-2"/>
                    <path d="M10 10a2 2 0 0 1-2-2"/>
                </svg>
                <h1 className="text-xl font-bold text-white tracking-wider">Style Sieve</h1>
            </div>
        </header>
    );
};
