import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ResizePanel = ({ onSave, onCancel }) => {
    const handleSaveClick = () => {
        if (onSave) {
            onSave();
        }
    };

    const handleCancelClick = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className="action-panel">
            <button className="panel-button" onClick={handleSaveClick}>
                <FontAwesomeIcon icon={faCheck} className="panel-icon" />
                <span className="panel-text">Save</span>
            </button>

            <button className="panel-button" onClick={handleCancelClick}>
                <FontAwesomeIcon icon={faTimes} className="panel-icon" />
                <span className="panel-text">Cancel</span>
            </button>
        </div>
    );
};

export default ResizePanel;