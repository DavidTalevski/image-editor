import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const EditTab = ({ onTabSelect, isSelected }) => {
    return (
        <div className="tab">
            <button
                className={`tab-button ${isSelected ? 'selected' : ''}`}
                onClick={() => onTabSelect('edit')}
            >
                <FontAwesomeIcon icon={faEdit} className="tab-icon" />
                <span className="tab-text">Edit</span>
            </button>
        </div>
    );
};

export default EditTab;
