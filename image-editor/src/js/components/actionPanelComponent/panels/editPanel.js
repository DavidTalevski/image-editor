import React from 'react';
import FlipOrientation from '../../../enum/flipOrientation.enum';

const EditPanel = ({
    handleCrop,
    handleResize,
    handleRotate,
    handleFlip,
}) => {
    return (
        <div className="edit-panel">
            <h3>Edit Actions</h3>
            {/* <button onClick={() => handleRotate('left')}>Rotate Left</button>
            <button onClick={() => handleRotate('right')}>Rotate Right</button>
            <button onClick={() => handleCrop()}>Crop</button>
            <button onClick={() => handleResize()}>Resize</button> */}


            <button onClick={() => handleFlip(FlipOrientation.HORIZONTAL)}>Flip Horizontal</button>
            <button onClick={() => handleFlip(FlipOrientation.VERTICAL)}>Flip Vertical</button>
        </div>
    );
};

export default EditPanel;
