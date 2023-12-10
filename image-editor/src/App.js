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

const preferences = new UserPreferences();
const actionManager = new ActionManager();
const snapshotManager = new SnapshotManager();

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


  // treba na 100 da se vrakjat slajderite posle zavrshena akcija

  const handleAdjustBrightness = async (brightness) => {
    preferences.setPreference("brightness", brightness);

    const data = {
      brightness: preferences.getPreference("brightness")
    }

    const action = actionManager.add.brightnessAction(data);

    await action.update(data);
  };


  const handleAdjustContrast = async (contrast) => {
    preferences.setPreference("contrast", contrast);

    const data = {
      contrast: preferences.getPreference("contrast")
    }

    const action = actionManager.add.contrastAction(data);

    await action.update(data);
  };

  const handleAdjustSaturation = async (saturation) => {
    preferences.setPreference("saturation", saturation);

    const data = {
      saturation: preferences.getPreference("saturation")
    }

    const action = actionManager.add.saturationAction(data);

    await action.update(data);
  };


  const addActionToHistory = (actionText) => {
    setHistory((prevHistory) => [...prevHistory, actionText]);
  };

  const removeActionFromHistory = (index) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.splice(index, 1);
      return newHistory;
    });
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
        handleAdjustBrightness={handleAdjustBrightness}
        handleAdjustSaturation={handleAdjustSaturation}
        handleAdjustContrast={handleAdjustContrast}
        resetFilters={resetFilters}
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
