// LoadImagePanel.js
import React, { useRef } from 'react';
import { faUpload, faPaste, faExternalLink, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import PanelButton from '../../utilityComponents/panelButton';
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

            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onClick={event => event.target.value = null}
                onChange={handleFileChange}
            />
            <input
                type="file"
                accept=".iep"
                style={{ display: 'none' }}
                ref={jsonFileInputRef}
                onClick={event => event.target.value = null}
                onChange={handleJsonFileChange}
            />

            <PanelButton onClick={() => handleLoadImage(LoadImageActionType.UPLOAD)} icon={faUpload} text="Upload Image" />
            <PanelButton onClick={() => handleLoadImage(LoadImageActionType.URL)} icon={faExternalLink} text="Load from URL" />
            <PanelButton onClick={() => handleLoadImage(LoadImageActionType.CLIPBOARD)} icon={faPaste} text="Paste Image" />
            <PanelButton onClick={handleProjectLoad} icon={faFileUpload} text="Load Project" />

        </div>
    );
};

export default LoadImagePanel;