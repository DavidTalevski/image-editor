// App.js
import React, { useState, useRef, useEffect } from 'react';
import './css/App.css';

import CanvasComponent from './js/components/canvasComponent/canvasComponent';
import TabListComponent from './js/components/tabListComponent/tabListComponent';
import ActionPanel from './js/components/actionPanelComponent/actionPanelComponent';
import ActionHistoryPanelComponent from './js/components/actionHistoryPanelComponent/actionHistoryPanelComponent';

import { UserPreferences } from './js/core/storage/userPreferences';
import { ImageDownloader } from './js/core/downloader/imageDownloader';

import LoadImageActionType from './js/core/enum/loadImageActionType.enum';

import CanvasController from './js/core/canvas/canvasController';
import ActionManager from './js/core/action/actionManager';
import SnapshotManager from './js/core/snapshot/snapshotManager';
import ActionHandler from './js/core/action/actionHandler';

const preferences = new UserPreferences();
const actionManager = new ActionManager();
const snapshotManager = new SnapshotManager();
const actionHandler = new ActionHandler(actionManager, preferences);

window.ac = actionManager;

snapshotManager.loadSavedSnapshots(preferences.getPreference("snapshots"));

function App() {
  const canvasRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [history, setHistory] = useState([]);

  const [resetFilters, setResetFilters] = useState(false);

  useEffect(() => {
    const onActionCreated = (action) => {
      addActionToHistory(action.type);
      setResetFilters(true);
    }

    actionManager.on(actionManager.events.ACTION_CREATED, onActionCreated);

    // Clean up the listener when the component unmounts
    return () => {
      actionManager.off(actionManager.events.ACTION_CREATED, onActionCreated);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Reset the value back to false after the reset has been performed
  useEffect(() => {
    if (resetFilters) {
      preferences.setPreference("contrast", 100)
      preferences.setPreference("brightness", 100)
      preferences.setPreference("saturation", 100)
      preferences.setPreference("grayscale", 0)

      setResetFilters(false);
    }
  }, [resetFilters]);

  /** @type {CanvasController} */
  let canvasController

  /** @type {ImageDownloader} */
  let downloader;

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

    const data = {
      loadImageActionType: loadImageActionType,
      imageData: imageData
    }

    const action = actionManager.add.loadAction(data);

    await action.execute(data);
  };

  const addActionToHistory = (actionText) => {
    setHistory((prevHistory) => [...prevHistory, actionText]);
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

        contrast={preferences.getPreference("contrast")}
        brightness={preferences.getPreference("brightness")}
        saturation={preferences.getPreference("saturation")}
        grayscale={preferences.getPreference("grayscale")}

        handleAdjustBrightness={actionHandler.handleAdjustBrightness}
        handleAdjustSaturation={actionHandler.handleAdjustSaturation}
        handleAdjustContrast={actionHandler.handleAdjustContrast}
        handleAdjustGrayscale={actionHandler.handleAdjustGrayscale}

        resetFilters={resetFilters}
      />
      <ActionHistoryPanelComponent
        history={history}
      />
    </div>
  );
}

export default App;
