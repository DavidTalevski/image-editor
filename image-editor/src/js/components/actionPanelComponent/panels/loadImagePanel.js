// LoadImagePanel.js
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import LoadImageActionType from '../../../core/enum/loadImageActionType.enum';

const LoadImagePanel = ({ onLoadImage }) => {
    const fileInputRef = useRef(null);

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

    return (
        <div className="load-image-panel">
            <div className="file-upload">
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>

            <button className="panel-button" onClick={() => handleLoadImage(LoadImageActionType.UPLOAD)}>
                <FontAwesomeIcon icon={faUpload} /> Upload Image
            </button>

            <button className="panel-button" onClick={() => handleLoadImage(LoadImageActionType.URL)}>
                <FontAwesomeIcon icon={faUpload} /> Load From URL
            </button>

            <button className="panel-button" onClick={() => handleLoadImage(LoadImageActionType.CLIPBOARD)}>
                <FontAwesomeIcon icon={faUpload} /> Paste Image
            </button>

        </div>
    );
};

export default LoadImagePanel;