import React from 'react';
import PanelType from '../../enum/panelType.enum';

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
                <LoadImageTab onTabSelect={() => onTabSelect(PanelType.LOAD)} />
                <DownloadImageTab onTabSelect={() => onTabSelect(PanelType.DOWNLOAD)} />
                <FilterTab onTabSelect={() => onTabSelect(PanelType.FILTER)} />
                <EditTab onTabSelect={() => onTabSelect(PanelType.EDIT)} />
                <ResizeTab onTabSelect={() => onTabSelect(PanelType.RESIZE)} />
                <CropTab onTabSelect={() => onTabSelect(PanelType.CROP)} />
                <UpscaleTab onTabSelect={() => onTabSelect(PanelType.UPSCALE)} />
            </div>
        </div>
    );
};

export default TabListComponent;
