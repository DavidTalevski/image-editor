import React from 'react';
import LoadImageTab from './tabs/loadImageTab';
import DownloadImageTab from './tabs/downloadImageTab';
import FilterTab from './tabs/filterTab';
import EditTab from './tabs/editTab'; // Import the EditTab component

const TabListComponent = ({ canvasRef, onTabSelect }) => {
    return (
        <div className="tab-list">
            <LoadImageTab onTabSelect={() => onTabSelect('loadImage')} />
            <DownloadImageTab onTabSelect={() => onTabSelect('downloadImage')} canvasRef={canvasRef} />
            <FilterTab onTabSelect={() => onTabSelect('filter')} />
            <EditTab onTabSelect={() => onTabSelect('edit')} /> {/* Add the EditTab component */}
        </div>
    );
};

export default TabListComponent;
