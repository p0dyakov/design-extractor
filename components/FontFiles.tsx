import React from 'react';
import type { AssetFile } from '../types';
import { trackEvent, EventNames } from '../services/analytics';

interface AssetLibraryProps {
    files: AssetFile[];
    assetType: 'font' | 'icon';
}

export const AssetLibrary: React.FC<AssetLibraryProps> = ({ files, assetType }) => {
    const isSvg = (url: string) => /\.svg$/i.test(url);

    const handleDownloadClick = (file: AssetFile) => {
        trackEvent(EventNames.DOWNLOAD_ASSET, {
            asset_type: assetType,
            asset_name: file.name,
            asset_url: file.url,
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
                <div key={index} className="bg-neutral-800/50 p-3 rounded-lg flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        {isSvg(file.url) && (
                            <div className="w-10 h-10 flex-shrink-0 bg-neutral-700 rounded-md p-2 flex items-center justify-center">
                                <img src={file.url} alt={file.name} className="max-w-full max-h-full" />
                            </div>
                        )}
                        <span className="font-mono text-sm text-gray-300 truncate" title={file.name}>{file.name}</span>
                    </div>
                    <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        onClick={() => handleDownloadClick(file)}
                        className="flex-shrink-0 flex items-center justify-center h-8 w-8 bg-neutral-700 text-white rounded-md hover:bg-neutral-600 transition-colors"
                        title="Download"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    </a>
                </div>
            ))}
        </div>
    );
};