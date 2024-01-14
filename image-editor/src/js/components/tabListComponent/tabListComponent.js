import React from 'react';
import PanelType from '../../enum/panelType.enum';

import LoadImageTab from './tabs/loadImageTab';
import DownloadImageTab from './tabs/downloadImageTab';
import FilterTab from './tabs/filterTab';
import EditTab from './tabs/editTab';
import UpscaleTab from './tabs/upscaleTab';
import ResizeTab from './tabs/resizeTab';
import CropTab from './tabs/cropTab';

const TabListComponent = ({ onTabSelect, selectedTab }) => {
    const handleTabClick = (tab) => {
        onTabSelect(tab);
    };

    const isTabSelected = (tab) => tab === selectedTab;

    return (
        <div className="tab-container">
            <h1 className="tab-title">Image Editor App</h1>
            <div className="tab-list">
                <LoadImageTab
                    onTabSelect={() => handleTabClick(PanelType.LOAD)}
                    isSelected={isTabSelected(PanelType.LOAD)}
                />
                <DownloadImageTab
                    onTabSelect={() => handleTabClick(PanelType.DOWNLOAD)}
                    isSelected={isTabSelected(PanelType.DOWNLOAD)}
                />
                <FilterTab
                    onTabSelect={() => handleTabClick(PanelType.FILTER)}
                    isSelected={isTabSelected(PanelType.FILTER)}
                />
                <EditTab
                    onTabSelect={() => handleTabClick(PanelType.EDIT)}
                    isSelected={isTabSelected(PanelType.EDIT)}
                />
                <ResizeTab
                    onTabSelect={() => handleTabClick(PanelType.RESIZE)}
                    isSelected={isTabSelected(PanelType.RESIZE)}
                />
                <CropTab
                    onTabSelect={() => handleTabClick(PanelType.CROP)}
                    isSelected={isTabSelected(PanelType.CROP)}
                />
                <UpscaleTab
                    onTabSelect={() => handleTabClick(PanelType.UPSCALE)}
                    isSelected={isTabSelected(PanelType.UPSCALE)}
                />
            </div>
        </div>
    );
};

export default TabListComponent;
