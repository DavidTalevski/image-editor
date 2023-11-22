import React from 'react';
import LoadImageTab from './tabs/loadImageTab';
import DownloadImageTab from './tabs/downloadImageTab';

const TabListComponent = ({ onImageSelect, canvasRef }) => {
    return (
        <div>
            <LoadImageTab onImageSelect={onImageSelect} />
            <DownloadImageTab canvasRef={canvasRef} />
            {/* Add other tabs as needed */}
        </div>
    );
};

export default TabListComponent;