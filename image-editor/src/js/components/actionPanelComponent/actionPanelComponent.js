// ActionPanel.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import DownloadImagePanel from "./panels/downloadImagePanel";
import LoadImagePanel from './panels/loadImagePanel';
import FilterPanel from './panels/filterPanel';

const ActionPanel = ({
    selectedTab,
    onDownloadAsPNG,
    onDownloadAsWebP,
    onDownloadAsJPEG,
    onSetCompression,
    defaultCompression,
    onLoadImage,
    handleAdjustBrightness,
    handleAdjustContrast,
    handleAdjustSaturation,
    brightness,
    contrast,
    saturation,
    resetFilters,
    handleAdjustGrayscale,
    grayscale,
}) => {
    // Conditional rendering based on the selected tab
    const renderPanelContent = () => {
        switch (selectedTab) {
            case 'downloadImage':
                return (
                    <DownloadImagePanel
                        onDownloadAsPNG={onDownloadAsPNG}
                        onDownloadAsWebP={onDownloadAsWebP}
                        onDownloadAsJPEG={onDownloadAsJPEG}
                        onSetCompression={onSetCompression}
                        defaultCompression={defaultCompression}
                    />
                );
            case 'loadImage':
                return <LoadImagePanel onLoadImage={onLoadImage} />;
            case 'filter':
                return (
                    <FilterPanel
                        brightness={brightness}
                        contrast={contrast}
                        saturation={saturation}
                        resetFilters={resetFilters}
                        onAdjustBrightness={handleAdjustBrightness}
                        onAdjustContrast={handleAdjustContrast}
                        onAdjustSaturation={handleAdjustSaturation}
                        onAdjustGrayscale={handleAdjustGrayscale}
                        grayscale={grayscale}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="right-panel">
            <div className="action-panel-header">
                <FontAwesomeIcon icon={faDownload} />
                <span>Actions</span>
            </div>
            {renderPanelContent()}
        </div>
    );
};

export default ActionPanel;
