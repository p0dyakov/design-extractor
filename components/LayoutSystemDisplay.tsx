import React from 'react';
import type { LayoutToken } from '../types';

interface LayoutSystemDisplayProps {
    tokens: LayoutToken[];
}

export const LayoutSystemDisplay: React.FC<LayoutSystemDisplayProps> = ({ tokens }) => {
    return (
        <div className="bg-neutral-800/50 p-4 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-400">
                        <th className="p-2 font-semibold">Name</th>
                        <th className="p-2 font-semibold">Value</th>
                        <th className="p-2 font-semibold">Variable</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map((token) => (
                        <tr key={token.variable} className="border-t border-neutral-700">
                            <td className="p-2 text-white">{token.name}</td>
                            <td className="p-2 font-mono text-gray-300">{token.value}</td>
                            <td className="p-2 font-mono text-gray-500 truncate" title={token.variable}>{token.variable}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
