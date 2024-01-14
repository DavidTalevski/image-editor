// ActionPanel.js
import React from 'react';
import PanelType from '../../enum/panelType.enum';

import DownloadImagePanel from "./panels/downloadImagePanel";
import LoadImagePanel from './panels/loadImagePanel';
import FilterPanel from './panels/filterPanel';
import EditPanel from './panels/editPanel';
import UpscalePanel from './panels/upscalePanel';
import ResizePanel from './panels/resizePanel';
import CropPanel from './panels/cropPanel';

const ActionPanel = ({
    selectedTab,
    onDownloadAsPNG,
    onDownloadAsWebP,
    onDownloadAsJPEG,
    onDownloadProject,
    onSetCompression,
    defaultCompression,
    onLoadImage,
    onProjectLoad,
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
    onCancelResize,
    onSaveCrop,
    onCancelCrop
}) => {
    // Conditional rendering based on the selected tab
    const renderPanelContent = () => {
        switch (selectedTab) {
            case PanelType.DOWNLOAD:
                return (
                    <DownloadImagePanel
                        onDownloadAsPNG={onDownloadAsPNG}
                        onDownloadAsWebP={onDownloadAsWebP}
                        onDownloadAsJPEG={onDownloadAsJPEG}
                        onDownloadProject={onDownloadProject}
                        onSetCompression={onSetCompression}
                        defaultCompression={defaultCompression}
                    />
                );
            case PanelType.LOAD:
                return <LoadImagePanel
                    onLoadImage={onLoadImage}
                    onProjectLoad={onProjectLoad}
                />;
            case PanelType.FILTER:
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
            case PanelType.EDIT: // Add the case for 'edit'
                return (
                    <EditPanel
                        handleRotate={handleRotate}
                        handleFlip={handleFlip}
                    />
                );
            case PanelType.UPSCALE: // Add the case for 'edit'
                return (
                    <UpscalePanel
                        handleUpscale={handleUpscale}
                    />
                );
            case PanelType.RESIZE: // Add the case for 'edit'
                return (
                    <ResizePanel
                        onSave={onSaveResize}
                        onCancel={onCancelResize}
                    />
                );
            case PanelType.CROP: // Add the case for 'edit'
                return (
                    <CropPanel
                        onSave={onSaveCrop}
                        onCancel={onCancelCrop}
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
