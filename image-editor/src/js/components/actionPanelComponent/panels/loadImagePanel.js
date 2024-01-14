// LoadImagePanel.js
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPaste, faExternalLink, faFileUpload } from '@fortawesome/free-solid-svg-icons';

import LoadImageActionType from '../../../core/enum/loadImageActionType.enum';

const LoadImagePanel = ({ onLoadImage, onProjectLoad }) => {
    const fileInputRef = useRef(null);
    const jsonFileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onLoadImage(LoadImageActionType.UPLOAD, file);
    };

    const handleLoadImage = (source) => {
        if (source === LoadImageActionType.URL) {
            const url = prompt('Enter the URL:');

            if (!url) return;

            onLoadImage(LoadImageActionType.URL, url);
        } else if (source === LoadImageActionType.CLIPBOARD) {
            onLoadImage(LoadImageActionType.CLIPBOARD);
        } else if (source === LoadImageActionType.UPLOAD) {
            fileInputRef.current.click();
        }
    };

    const handleJsonFileChange = (e) => {
        const jsonFile = e.target.files[0];
        onProjectLoad(jsonFile);
    };

    const handleProjectLoad = () => {
        jsonFileInputRef.current.click();
    }

    return (
        <div className="action-panel">
            <div className="file-upload">
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <input
                    type="file"
                    accept=".json"
                    style={{ display: 'none' }}
                    ref={jsonFileInputRef}
                    onChange={handleJsonFileChange}
                />
            </div>

            <button className="panel-button" onClick={() => handleLoadImage(LoadImageActionType.UPLOAD)}>
                <FontAwesomeIcon icon={faUpload} className="panel-icon" />
                <span className="panel-text">Upload Image</span>
            </button>

            <button className="panel-button" onClick={() => handleLoadImage(LoadImageActionType.URL)}>
                <FontAwesomeIcon icon={faExternalLink} className="panel-icon" />
                <span className="panel-text">Load from URL</span>
            </button>

            <button className="panel-button" onClick={() => handleLoadImage(LoadImageActionType.CLIPBOARD)}>
                <FontAwesomeIcon icon={faPaste} className="panel-icon" />
                <span className="panel-text">Paste Image</span>
            </button>

            <button className="panel-button" onClick={() => handleProjectLoad()}>
                <FontAwesomeIcon icon={faFileUpload} className="panel-icon" />
                <span className="panel-text">Load Project</span>
            </button>

        </div>
    );
};

export default LoadImagePanel;