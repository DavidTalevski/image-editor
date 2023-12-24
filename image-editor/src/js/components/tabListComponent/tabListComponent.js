import React from 'react';
import LoadImageTab from './tabs/loadImageTab';
import DownloadImageTab from './tabs/downloadImageTab';
import FilterTab from './tabs/filterTab';
import EditTab from './tabs/editTab';
import UpscaleTab from './tabs/upscaleTab';

const TabListComponent = ({ onTabSelect }) => {
    return (
        <div className="tab-list">
            <LoadImageTab onTabSelect={() => onTabSelect('loadImage')} />
            <DownloadImageTab onTabSelect={() => onTabSelect('downloadImage')} />
            <FilterTab onTabSelect={() => onTabSelect('filter')} />
            <EditTab onTabSelect={() => onTabSelect('edit')} />
            <UpscaleTab onTabSelect={() => onTabSelect("upscale")} />
        </div>
    );
};

export default TabListComponent;
