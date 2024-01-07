import React from 'react';
import LoadImageTab from './tabs/loadImageTab';
import DownloadImageTab from './tabs/downloadImageTab';
import FilterTab from './tabs/filterTab';
import EditTab from './tabs/editTab';
import UpscaleTab from './tabs/upscaleTab';
import ResizeTab from './tabs/resizeTab';
import CropTab from './tabs/cropTab';

const TabListComponent = ({ onTabSelect }) => {
    return (
        <div className="tab-container">
            <h1 className="tab-title">Image Editor App</h1>
            <div className="tab-list">
                <LoadImageTab onTabSelect={() => onTabSelect('loadImage')} />
                <DownloadImageTab onTabSelect={() => onTabSelect('downloadImage')} />
                <FilterTab onTabSelect={() => onTabSelect('filter')} />
                <EditTab onTabSelect={() => onTabSelect('edit')} />
                <ResizeTab onTabSelect={() => onTabSelect("resize")} />
                <CropTab onTabSelect={() => onTabSelect("crop")} />
                <UpscaleTab onTabSelect={() => onTabSelect("upscale")} />
            </div>
        </div>
    );
};

export default TabListComponent;
