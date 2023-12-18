import React from 'react';
import FlipOrientation from '../../../enum/flipOrientation.enum';

const EditPanel = ({
    handleCrop,
    handleResize,
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
        <div className="edit-panel">
            <h3>Edit Actions</h3>

            <button onClick={handleRotateLeft}>Rotate Left</button>
            <button onClick={handleRotateRight}>Rotate Right</button>

            <button onClick={() => handleFlip(FlipOrientation.HORIZONTAL)}>Flip Horizontal</button>
            <button onClick={() => handleFlip(FlipOrientation.VERTICAL)}>Flip Vertical</button>
        </div>
    );
};

export default EditPanel;
