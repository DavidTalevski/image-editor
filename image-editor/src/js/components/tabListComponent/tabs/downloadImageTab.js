import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const DownloadImageTab = ({ onTabSelect, isSelected }) => {
    return (
        <div className="tab">
            <button
                className={`tab-button ${isSelected ? 'selected' : ''}`}
                onClick={onTabSelect}
            >
                <FontAwesomeIcon icon={faDownload} className="tab-icon" />
                <span className="tab-text">Download</span>
            </button>
        </div>
    );
};

export default DownloadImageTab;
