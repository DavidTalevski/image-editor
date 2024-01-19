import React from 'react';
import FlipOrientation from '../../../enum/flipOrientation.enum';
import { faRotateLeft, faRotateRight, faGripHorizontal, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import PanelButton from '../../utilityComponents/panelButton';

const EditPanel = ({ handleRotate, handleFlip }) => {
    const handleRotateBy = (degrees) => {
        handleRotate(degrees);
    };

    const handleFlipDirection = (orientation) => {
        handleFlip(orientation);
    };

    return (
        <div className="action-panel">
            <PanelButton onClick={() => handleRotateBy(-90)} icon={faRotateLeft} text="Rotate Left" />
            <PanelButton onClick={() => handleRotateBy(90)} icon={faRotateRight} text="Rotate Right" />
            <PanelButton onClick={() => handleFlipDirection(FlipOrientation.HORIZONTAL)} icon={faGripHorizontal} text="Flip Horizontal" />
            <PanelButton onClick={() => handleFlipDirection(FlipOrientation.VERTICAL)} icon={faGripVertical} text="Flip Vertical" />
        </div>
    );
};

export default EditPanel;