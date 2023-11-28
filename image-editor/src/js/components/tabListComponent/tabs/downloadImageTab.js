import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const DownloadImageTab = ({ canvasRef, onTabSelect }) => {
    const handleDownload = () => {
        onTabSelect();
    };

    return (
        <div className="tab">
            <button className="tab-button" onClick={handleDownload}>
                <FontAwesomeIcon icon={faDownload} />
                Download Image
            </button>
        </div>
    );
};

export default DownloadImageTab;
