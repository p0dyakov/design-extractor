
import React from 'react';
import type { TypoToken } from '../types';

interface TypographyScaleProps {
    typos: TypoToken[];
}

export const TypographyScale: React.FC<TypographyScaleProps> = ({ typos }) => {
    return (
        <div className="space-y-6">
            {typos.map((typo) => (
                <div key={typo.variable} className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="w-full md:w-1/3">
                        <p className="font-bold text-white">{typo.name}</p>
                        <p className="text-sm text-gray-400">{typo.fontFamily}</p>
                        <p className="text-sm text-gray-400">{typo.fontSize} / {typo.fontWeight}</p>
                        <p className="text-xs text-gray-500 font-mono truncate">{typo.variable}</p>
                    </div>
                    <div className="w-full md:w-2/3">
                        <p style={{
                            fontFamily: typo.fontFamily,
                            fontSize: typo.fontSize,
                            fontWeight: typo.fontWeight,
                        }}>
                            The quick brown fox jumps over the lazy dog.
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
