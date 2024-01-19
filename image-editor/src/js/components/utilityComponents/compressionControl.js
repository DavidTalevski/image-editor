import React from 'react';

const CompressionControl = ({ compressionLevel, setCompressionLevel }) => (
    <div className="compression-control">
        <label>Quality {compressionLevel}%</label>
        <input
            className="custom-slider"
            type="range"
            min="1"
            max="100"
            value={compressionLevel}
            onChange={(e) => setCompressionLevel(e.target.value)}
        />
    </div>
);

export default CompressionControl;