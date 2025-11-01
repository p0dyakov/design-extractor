import React from 'react';
import type { BorderRadiusToken } from '../types';

interface BorderRadiusDisplayProps {
    tokens: BorderRadiusToken[];
}

export const BorderRadiusDisplay: React.FC<BorderRadiusDisplayProps> = ({ tokens }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {tokens.map((token) => (
                <div key={token.variable} className="flex flex-col gap-2">
                    <div className="flex items-center justify-center h-20 w-full bg-neutral-800/50 border border-neutral-700" style={{ borderRadius: token.value }}>
                         <span className="text-xs text-gray-400 font-mono">{token.value}</span>
                    </div>
                    <div className="text-sm">
                        <p className="font-bold text-white">{token.name}</p>
                        <p className="text-gray-500 font-mono truncate" title={token.variable}>{token.variable}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};