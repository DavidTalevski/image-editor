import React from 'react';
import LoadImageTab from './tabs/loadImageTab';
import DownloadImageTab from './tabs/downloadImageTab';
import FilterTab from './tabs/filterTab';

const TabListComponent = ({ canvasRef, onTabSelect }) => {
    return (
        // TODO ENUM
        <div className="tab-list">
            <LoadImageTab onTabSelect={() => onTabSelect('loadImage')} />
            <DownloadImageTab onTabSelect={() => onTabSelect('downloadImage')} canvasRef={canvasRef} />
            <FilterTab onTabSelect={() => onTabSelect('filter')} />
        </div>
    );
};

export default TabListComponent;