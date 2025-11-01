
import React from 'react';
import type { ColorToken } from '../types';

interface ColorPaletteProps {
    colors: ColorToken[];
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {colors.map((color) => (
                <div key={color.variable} className="flex flex-col gap-2">
                    <div 
                        className="h-20 w-full rounded-md border border-neutral-700" 
                        style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="text-sm">
                        <p className="font-bold text-white">{color.name}</p>
                        <p className="text-gray-400 font-mono">{color.hex}</p>
                        <p className="text-gray-500 font-mono truncate">{color.variable}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
