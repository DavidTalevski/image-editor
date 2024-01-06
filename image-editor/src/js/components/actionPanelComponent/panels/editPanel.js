import React from 'react';
import FlipOrientation from '../../../enum/flipOrientation.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight, faGripHorizontal, faGripVertical, faCrop, faExpand } from '@fortawesome/free-solid-svg-icons';

const EditPanel = ({
    handleRotate,
    handleFlip,
}) => {
    const handleRotateRight = () => {
        handleRotate(90);
    };

    const handleRotateLeft = () => {
        handleRotate(-90);
    };

    return (
        <div className="action-panel">
            <button className="panel-button" onClick={handleRotateLeft}>
                <FontAwesomeIcon icon={faRotateLeft} className="panel-icon" />
                <span className="panel-text">Rotate Left</span>
            </button>

            <button className="panel-button" onClick={handleRotateRight}>
                <FontAwesomeIcon icon={faRotateRight} className="panel-icon" />
                <span className="panel-text">Rotate Right</span>
            </button>

            <button className="panel-button" onClick={() => handleFlip(FlipOrientation.HORIZONTAL)}>
                <FontAwesomeIcon icon={faGripHorizontal} className="panel-icon" />
                <span className="panel-text">Flip Horizontal</span>
            </button>

            <button className="panel-button" onClick={() => handleFlip(FlipOrientation.VERTICAL)}>
                <FontAwesomeIcon icon={faGripVertical} className="panel-icon" />
                <span className="panel-text">Flip Vertical</span>
            </button>
        </div>
    );
};

export default EditPanel;
