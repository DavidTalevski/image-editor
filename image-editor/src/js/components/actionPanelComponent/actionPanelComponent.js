// ActionPanel.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileImage } from '@fortawesome/free-solid-svg-icons';

import DownloadImagePanel from "./panels/downloadImagePanel"

const ActionPanel = ({ selectedTab, onDownloadImage, onDownloadAsPNG, onDownloadAsWebP, onDownloadAsJPEG, onSetCompression, defaultCompression }) => {
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
            // Add more cases for other tabs as needed
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
