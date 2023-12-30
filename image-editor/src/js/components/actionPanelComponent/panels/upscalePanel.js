import React from 'react';

const UpscalePanel = ({ handleUpscale }) => {
    return (
        <div className="upscale-panel">
            <h3>Upscale Actions</h3>

            <button onClick={handleUpscale}>Upscale</button>
        </div>
    );
};

export default UpscalePanel;
