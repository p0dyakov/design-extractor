import React from 'react';

export const ProgressBar: React.FC = () => {
    return (
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
            <div className="absolute top-0 h-full w-1/2 bg-white rounded-full animate-progress-bar"></div>
        </div>
    );
};