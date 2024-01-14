import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrop } from '@fortawesome/free-solid-svg-icons';

const CropTab = ({ onTabSelect, isSelected }) => {
    return (
        <div className="tab">
            <button
                className={`tab-button ${isSelected ? 'selected' : ''}`}
                onClick={() => onTabSelect('crop')}
            >
                <FontAwesomeIcon icon={faCrop} className="tab-icon" />
                <span className="tab-text">Crop</span>
            </button>
        </div>
    );
};

export default CropTab;
