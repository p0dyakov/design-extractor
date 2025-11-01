import React from 'react';
import type { ComponentToken, DesignSystem } from '../types';
import { ComponentPreview } from './ComponentPreview';

interface ComponentGalleryProps {
    components: ComponentToken[];
    system: DesignSystem;
}

export const ComponentGallery: React.FC<ComponentGalleryProps> = ({ components, system }) => {
    return (
        <div className="space-y-8">
            {components.map((component, index) => (
                <div key={index}>
                    <h4 className="text-lg font-semibold text-white">{component.name}</h4>
                    <p className="text-sm text-gray-400 mb-4">{component.description}</p>
                    <ComponentPreview
                        html={component.html}
                        css={component.css}
                        name={component.name}
                        system={system}
                    />
                </div>
            ))}
        </div>
    );
};