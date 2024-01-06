// ActionPanel.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import DownloadImagePanel from "./panels/downloadImagePanel";
import LoadImagePanel from './panels/loadImagePanel';
import FilterPanel from './panels/filterPanel';
import EditPanel from './panels/editPanel';
import UpscalePanel from './panels/upscalePanel';
import ResizePanel from './panels/resizePanel';

const ActionPanel = ({
    selectedTab,
    onDownloadAsPNG,
    onDownloadAsWebP,
    onDownloadAsJPEG,
    onSetCompression,
    defaultCompression,
    onLoadImage,
    handleBrightness,
    handleContrast,
    handleSaturation,
    handleGrayscale,
    handleHueRotation,
    handleSepia,
    handleBlur,
    handleInvert,
    brightness,
    contrast,
    saturation,
    grayscale,
    sepia,
    blur,
    invert,
    hueRotation,
    resetFilters,
    handleRotate,
    handleFlip,
    handleUpscale,
    onSaveResize,
    onCancelResize
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
                        grayscale={grayscale}
                        hueRotation={hueRotation}
                        sepia={sepia}
                        blur={blur}
                        invert={invert}

                        onAdjustBrightness={handleBrightness}
                        onAdjustContrast={handleContrast}
                        onAdjustSaturation={handleSaturation}
                        onAdjustGrayscale={handleGrayscale}
                        onAdjustHueRotation={handleHueRotation}
                        onAdjustSepia={handleSepia}
                        onAdjustBlur={handleBlur}
                        onAdjustInvert={handleInvert}

                        resetFilters={resetFilters}
                    />
                );
            case 'edit': // Add the case for 'edit'
                return (
                    <EditPanel
                        handleRotate={handleRotate}
                        handleFlip={handleFlip}
                    />
                );
            case 'upscale': // Add the case for 'edit'
                return (
                    <UpscalePanel
                        handleUpscale={handleUpscale}
                    />
                );
            case 'resize': // Add the case for 'edit'
                return (
                    <ResizePanel
                        onSave={onSaveResize}
                        onCancel={onCancelResize}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="right-panel">
            <div className="action-panel-header">
                <span>Actions</span>
            </div>
            {renderPanelContent()}
        </div>
    );
};

export default ActionPanel;
