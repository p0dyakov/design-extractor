import React from 'react';
import type { TypoToken, AssetFile } from '../types';

interface TypographyScaleProps {
    typos: TypoToken[];
    fontFiles: AssetFile[];
}

export const TypographyScale: React.FC<TypographyScaleProps> = ({ typos, fontFiles }) => {
    const fontFaceStyles = React.useMemo(() => {
        if (!fontFiles || fontFiles.length === 0) return '';
        
        const generatedRules = new Set<string>();

        typos.forEach(typo => {
            const familyName = typo.fontFamily;
            const familyNameKebab = familyName.toLowerCase().replace(/\s/g, '-');
            
            // Find a font file that seems to match this family name
            const matchingFile = fontFiles.find(file => 
                file.name.toLowerCase().includes(familyNameKebab)
            );

            if (matchingFile) {
                const rule = `
                    @font-face {
                        font-family: "${familyName}";
                        src: url("${matchingFile.url}");
                        font-display: swap;
                    }
                `;
                generatedRules.add(rule);
            }
        });

        return Array.from(generatedRules).join('\n');
    }, [typos, fontFiles]);

    return (
        <>
            {fontFaceStyles && <style>{fontFaceStyles}</style>}
            <div className="space-y-6">
                {typos.map((typo) => (
                    <div key={typo.variable} className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="w-full md:w-1/3">
                            <p className="font-bold text-white">{typo.name}</p>
                            <p className="text-sm text-gray-400" style={{fontFamily: typo.fontFamily}}>{typo.fontFamily}</p>
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
        </>
    );
};