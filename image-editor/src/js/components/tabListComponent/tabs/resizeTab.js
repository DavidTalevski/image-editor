import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

const ResizeTab = ({ onTabSelect, isSelected }) => {
    return (
        <div className="tab">
            <button
                className={`tab-button ${isSelected ? 'selected' : ''}`}
                onClick={() => onTabSelect('resize')}
            >
                <FontAwesomeIcon icon={faExpand} className="tab-icon" />
                <span className="tab-text">Resize</span>
            </button>
        </div>
    );
};

export default ResizeTab;
