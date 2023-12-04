// App.js
import React, { useState, useRef } from 'react';
import './css/App.css';

import CanvasComponent from './js/components/canvasComponent/canvasComponent';
import TabListComponent from './js/components/tabListComponent/tabListComponent';
import ActionPanel from './js/components/actionPanelComponent/actionPanelComponent';
import ActionHistoryPanelComponent from './js/components/actionHistoryPanelComponent/actionHistoryPanelComponent';

import { UserPreferences } from './js/core/storage/userPreferences';
import { ImageDownloader } from './js/core/downloader/imageDownloader';

import LoadImageActionType from './js/core/enum/loadImageActionType.enum';

import CanvasController from './js/core/canvas/canvasController';
import ActionManager from './js/core/actions/actionManager';
import ActionType from './js/core/enum/actionType.enum';


const preferences = new UserPreferences();
const actionManager = new ActionManager();

function App() {
  const canvasRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [history, setHistory] = useState([]);

  let downloader, canvasController;

  if (canvasRef.current) {
    canvasController = new CanvasController(canvasRef?.current);
    actionManager.setCanvas(canvasController);
    downloader = new ImageDownloader(canvasController);
  }

  /**
   * @param {LoadImageActionType} loadImageActionType 
   * @param {any} imageData 
   */
  const handleImageSelect = async (loadImageActionType, imageData) => {

    /**
     * @type {import("./js/core/actions/loadAction/loadActionData").LoadActionData}
     */
    const data = {
      loadImageActionType: loadImageActionType,
      imageData: imageData,
      canvasData: canvasController.getSaveData()
    }

    const loadAction = actionManager.createAction(ActionType.LOAD, data);

    loadAction.execute();
  };

  const addActionToHistory = (actionText) => {
    setHistory([...history, actionText]);
  };

  const removeActionFromHistory = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const handleDownloadAsPNG = (fileName) => {
    downloader.download(fileName, "png", preferences.getPreference("imageQuality"));
  };

  const handleDownloadAsWebP = (fileName) => {
    downloader.download(fileName, "webp", preferences.getPreference("imageQuality"));
  };

  const handleDownloadAsJPEG = (fileName) => {
    downloader.download(fileName, "jpeg", preferences.getPreference("imageQuality"));
  };

  const handleSetCompression = (compressionLevel) => {
    preferences.setPreference("imageQuality", compressionLevel / 100);
  };

  return (
    <div className="app">
      <TabListComponent
        canvasRef={canvasRef}
        onTabSelect={handleTabSelect}
      />
      <CanvasComponent ref={canvasRef} />
      <ActionPanel
        selectedTab={selectedTab}
        onDownloadAsPNG={handleDownloadAsPNG}
        onDownloadAsWebP={handleDownloadAsWebP}
        onDownloadAsJPEG={handleDownloadAsJPEG}
        onSetCompression={handleSetCompression}
        defaultCompression={preferences.getPreference("imageQuality") * 100}
        onLoadImage={handleImageSelect}
      />
      <ActionHistoryPanelComponent
        history={history}
        addAction={addActionToHistory}
        removeAction={removeActionFromHistory}
      />
      <button onClick={() => addActionToHistory(`Action ${history.length + 1}`)}>Add New Action</button>
    </div>
  );
}

export default App;
