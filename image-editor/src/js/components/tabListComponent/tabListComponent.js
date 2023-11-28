import React from 'react';
import LoadImageTab from './tabs/loadImageTab';
import DownloadImageTab from './tabs/downloadImageTab';

const TabListComponent = ({ onImageSelect, canvasRef, onTabSelect }) => {
    return (
        <div className="tab-list">
            <LoadImageTab onTabSelect={() => onTabSelect('loadImage')} />
            <DownloadImageTab onTabSelect={() => onTabSelect('downloadImage')} canvasRef={canvasRef} />
            {/* Add other tabs as needed */}
        </div>
    );
};

export default TabListComponent;