// App.js
import React, { useState, useRef, useEffect } from 'react';
import './css/App.css';
import './css/tabs.css';
import './css/canvas.css';

import CanvasComponent from './js/components/canvasComponent/canvasComponent';
import TabListComponent from './js/components/tabListComponent/tabListComponent';
import ActionPanel from './js/components/actionPanelComponent/actionPanelComponent';
import ActionHistoryPanelComponent from './js/components/actionHistoryPanelComponent/actionHistoryPanelComponent';

import UserPreferences from './js/core/storage/userPreferences';
import ImageDownloader from './js/core/downloader/imageDownloader';

import CanvasController from './js/core/canvas/canvasController';
import ActionManager from './js/core/action/actionManager';
import SnapshotManager from './js/core/snapshot/snapshotManager';

import FilterActionHandler from './js/handlers/filterActionHandler';
import ImageDownloadHandler from './js/handlers/downloadHandler';
import LoadActionHandler from './js/handlers/loadActionHandler';
import EditActionHandler from './js/handlers/editActionHandler';
import ActionHistoryHandler from './js/handlers/actionHistoryHandler';

const preferences = new UserPreferences();
const actionManager = new ActionManager();
const snapshotManager = new SnapshotManager();
const downloader = new ImageDownloader();
const canvasController = new CanvasController();

const filterActionHandler = new FilterActionHandler(actionManager, preferences);
const loadActionHandler = new LoadActionHandler(actionManager, preferences, canvasController)
const downloadHandler = new ImageDownloadHandler(downloader, preferences)
const editActionHandler = new EditActionHandler(actionManager, preferences)
const actionHistoryHandler = new ActionHistoryHandler(actionManager, canvasController);

window.ac = actionManager;

snapshotManager.loadSavedSnapshots(preferences.getPreference("snapshots"));

function App() {
  const canvasRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [history, setHistory] = useState([]);

  const [resetFilters, setResetFilters] = useState(false);

  // Reset the value back to false after the reset has been performed
  useEffect(() => {
    if (resetFilters) {
      preferences.setPreference("contrast", 100)
      preferences.setPreference("brightness", 100)
      preferences.setPreference("saturation", 100)
      preferences.setPreference("grayscale", 0)
      preferences.setPreference("sapia", 0)
      preferences.setPreference("blur", 0)
      preferences.setPreference("invert", 0)

      setResetFilters(false);
    }
  }, [resetFilters]);

  if (canvasRef.current) {
    canvasController.setCanvas(canvasRef.current);
    actionManager.setCanvas(canvasController);
    downloader.canvas = canvasController;
  }

  const updateActionHistory = () => {
    const updatedHistory = actionManager.actionQueue.map((action) => {
      return {
        title: action.title,
        description: action.description,
        isActive: action.isActive(),
        icon: "placeholder"
      };
    });

    setHistory(updatedHistory);
  };

  useEffect(() => {
    const onActionCreated = (action) => {
      updateActionHistory();
      setResetFilters(true);
    }

    actionManager.on(actionManager.events.ACTION_CREATED, onActionCreated);
    actionManager.on(actionManager.events.ACTION_UPDATED, updateActionHistory);
    actionManager.on(actionManager.events.MULTIPLE_ACTIONS_EXECUTED, updateActionHistory);

    // Clean up the listener when the component unmounts
    return () => {
      actionManager.off(actionManager.events.ACTION_CREATED, onActionCreated);
      actionManager.off(actionManager.events.ACTION_UPDATED, updateActionHistory);
      actionManager.off(actionManager.events.MULTIPLE_ACTIONS_EXECUTED, updateActionHistory);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const handleSetCompression = (compressionLevel) => {
    preferences.setPreference("imageQuality", compressionLevel / 100);
  };

  return (
    <div className="app">
      <TabListComponent onTabSelect={handleTabSelect} />

      <CanvasComponent ref={canvasRef} />

      <ActionPanel
        selectedTab={selectedTab}
        onSetCompression={handleSetCompression}
        defaultCompression={preferences.getPreference("imageQuality") * 100}
        resetFilters={resetFilters}

        contrast={preferences.getPreference("contrast")}
        brightness={preferences.getPreference("brightness")}
        saturation={preferences.getPreference("saturation")}
        grayscale={preferences.getPreference("grayscale")}
        hueRotation={preferences.getPreference("hueRotation")}
        sapia={preferences.getPreference("sapia")}
        blur={preferences.getPreference("blur")}
        invert={preferences.getPreference("invert")}

        onDownloadAsPNG={downloadHandler.handleDownloadAsPNG}
        onDownloadAsWebP={downloadHandler.handleDownloadAsWebP}
        onDownloadAsJPEG={downloadHandler.handleDownloadAsJPEG}

        onLoadImage={loadActionHandler.handleImageSelect}
        handleUpscale={loadActionHandler.handleUpscaleImage}

        handleBrightness={filterActionHandler.handleBrightness}
        handleSaturation={filterActionHandler.handleSaturation}
        handleContrast={filterActionHandler.handleContrast}
        handleGrayscale={filterActionHandler.handleGrayscale}
        handleHueRotation={filterActionHandler.handleHueRotation}
        handleInvert={filterActionHandler.handleInvert}
        handleBlur={filterActionHandler.handleBlur}
        handleSepia={filterActionHandler.handleSepia}

        handleCrop={editActionHandler.handleCrop}
        handleFlip={editActionHandler.handleFlip}
        handleResize={editActionHandler.handleResize}
        handleRotate={editActionHandler.handleRotate}
      />

      <ActionHistoryPanelComponent
        history={history}
        onCardClicked={actionHistoryHandler.handleHistoryCardClick}
      />

    </div>
  );
}

export default App;
