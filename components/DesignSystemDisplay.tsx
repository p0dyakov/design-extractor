import React from 'react';
import type { DesignSystem } from '../types';
import { ColorPalette } from './ColorPalette';
import { TypographyScale } from './TypographyScale';
import { CodeBlock } from './CodeBlock';
import { AssetLibrary } from './FontFiles';
import { LayoutSystemDisplay } from './LayoutSystemDisplay';
import { ComponentGallery } from './ComponentGallery';

interface DesignSystemDisplayProps {
    system: DesignSystem;
}

export const DesignSystemDisplay: React.FC<DesignSystemDisplayProps> = ({ system }) => {
    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 md:p-6 animate-fade-in">
            <div className="space-y-10">
                {system.colorPalette?.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Color Palette</h3>
                        <ColorPalette colors={system.colorPalette} />
                    </div>
                )}
                {system.typographyScale?.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Typography Scale</h3>
                        <TypographyScale typos={system.typographyScale} />
                    </div>
                )}
                {system.layoutSystem?.length > 0 && (
                     <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Layout & Spacing</h3>
                        <LayoutSystemDisplay tokens={system.layoutSystem} />
                    </div>
                )}
                {system.uiComponents?.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">UI Components</h3>
                        <ComponentGallery components={system.uiComponents} system={system} />
                    </div>
                )}
                {system.fontFiles?.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Downloadable Font Files</h3>
                        <AssetLibrary files={system.fontFiles} />
                    </div>
                )}
                 {system.iconFiles?.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Downloadable Icon Files</h3>
                        <AssetLibrary files={system.iconFiles} />
                    </div>
                )}
                {system.markdownContent && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Export Design System</h3>
                        <p className="text-gray-400 mb-4">Copy the Markdown content below to save your design system tokens and usage guidelines.</p>
                        <CodeBlock content={system.markdownContent} />
                    </div>
                )}
            </div>
        </div>
    );
};