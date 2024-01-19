import React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import PanelButton from '../../utilityComponents/panelButton';

const CropPanel = ({ onSave, onCancel }) => {
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
            <div className="action-panel">
                <PanelButton onClick={handleSaveClick} icon={faCheck} text="Save" />
                <PanelButton onClick={handleCancelClick} icon={faTimes} text="Cancel" />
            </div>
        </div>
    );
};

export default CropPanel;