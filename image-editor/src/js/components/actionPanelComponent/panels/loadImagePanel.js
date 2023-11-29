// LoadImagePanel.js
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const LoadImagePanel = ({ onLoadImage }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onLoadImage(file, 'Upload');
    };

    const handleLoadImage = (source) => {
        if (source === 'URL') {
            const url = prompt('Enter the URL:');
            if (url) {
                onLoadImage(url, 'URL');
            }
        } else if (source === 'Clipboard') {
            onLoadImage(null, 'Clipboard');
        } else {
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

            <button className="panel-button" onClick={() => handleLoadImage('Upload')}>
                <FontAwesomeIcon icon={faUpload} /> Upload Image
            </button>

            <button className="panel-button" onClick={() => handleLoadImage('URL')}>
                <FontAwesomeIcon icon={faUpload} /> Load From URL
            </button>

            <button className="panel-button" onClick={() => handleLoadImage('Clipboard')}>
                <FontAwesomeIcon icon={faUpload} /> Paste Image
            </button>

        </div>
    );
};

export default LoadImagePanel;