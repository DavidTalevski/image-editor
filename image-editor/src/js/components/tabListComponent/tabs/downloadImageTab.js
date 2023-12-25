import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const DownloadImageTab = ({ onTabSelect }) => {
    return (
        <div className="tab">
            <button className="tab-button" onClick={onTabSelect}>
                <FontAwesomeIcon icon={faDownload} className="tab-icon" />
                <span className="tab-text">Download</span>
            </button>
        </div>
    );
};

export default DownloadImageTab;
