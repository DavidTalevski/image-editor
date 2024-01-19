import React from 'react';
import PanelButton from '../../utilityComponents/panelButton';
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
            <PanelButton onClick={handleSaveClick} icon={faCheck} text="Save" />
            <PanelButton onClick={handleCancelClick} icon={faTimes} text="Cancel" />
        </div>
    );
};

export default ResizePanel;