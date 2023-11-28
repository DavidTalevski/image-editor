import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

const LoadImageTab = ({ onTabSelect }) => {
    const handleLoad = () => {
        onTabSelect();
    };

    return (
        <div className="tab">
            <button className="tab-button" onClick={handleLoad}>
                <FontAwesomeIcon icon={faFileImage} />
                Open image
            </button>
        </div>
    );
};

export default LoadImageTab;

