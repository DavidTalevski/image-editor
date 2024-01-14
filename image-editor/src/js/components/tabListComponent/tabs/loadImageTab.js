import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

const LoadImageTab = ({ onTabSelect, isSelected }) => {
    return (
        <div className="tab">
            <button
                className={`tab-button ${isSelected ? 'selected' : ''}`}
                onClick={onTabSelect}
            >
                <FontAwesomeIcon icon={faFileImage} className="tab-icon" />
                <span className="tab-text">Open</span>
            </button>
        </div>
    );
};

export default LoadImageTab;
