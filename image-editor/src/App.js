import React, { useState, useRef, useEffect } from 'react';
import './css/app.css';
import './css/tabs.css';
import './css/canvas.css';
import './css/panels.css';
import "./css/resizable.css";
import "./css/history.css";

import CanvasResolution from './js/settings/canvasResolution';
import PanelType from './js/enum/panelType.enum';

import CanvasComponent from './js/components/canvasComponent/canvasComponent';
import TabListComponent from './js/components/tabListComponent/tabListComponent';
import ActionPanel from './js/components/actionPanelComponent/actionPanelComponent';
import ActionHistoryPanelComponent from './js/components/actionHistoryPanelComponent/actionHistoryPanelComponent';
import ResizableBoxComponent from './js/components/resizableBoxComponent/resizableBoxComponent';

import UserPreferences from './js/core/storage/userPreferences';

import CanvasController from './js/core/canvas/canvasController';
import ActionManager from './js/core/action/actionManager';

import FilterActionHandler from './js/handlers/filterActionHandler';
import ImageDownloadHandler from './js/handlers/downloadHandler';
import LoadActionHandler from './js/handlers/loadActionHandler';
import EditActionHandler from './js/handlers/editActionHandler';
import ActionHistoryHandler from './js/handlers/actionHistoryHandler';
import ResizeActionHandler from './js/handlers/resizeActionHandler';
import CropActionHandler from './js/handlers/cropActionHandler';
import DraggableBoxComponent from './js/components/resizableBoxComponent/draggableBoxComponent';
import LoadingComponent from './js/components/loadingComponent/loadingComponent';

const preferences = new UserPreferences();
const actionManager = new ActionManager();
const canvasController = new CanvasController();

const filterActionHandler = new FilterActionHandler(actionManager, preferences);
const loadActionHandler = new LoadActionHandler(actionManager, preferences)
const downloadHandler = new ImageDownloadHandler(actionManager, preferences)
const editActionHandler = new EditActionHandler(actionManager, preferences)
const actionHistoryHandler = new ActionHistoryHandler(actionManager, canvasController);
const resizeActionHandler = new ResizeActionHandler(actionManager, canvasController);
const cropActionHandler = new CropActionHandler(actionManager, canvasController);

function App() {
  const canvasRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [history, setHistory] = useState([]);

  const [inResizeMode, setResizeMode] = useState(false);
  const [inCropMode, setCropMode] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
  }

  const updateActionHistory = () => {
    const updatedHistory = actionManager.actionQueue.map((action) => {
      return {
        title: action.title,
        description: action.description,
        isActive: action.isActive()
      };
    });

    setHistory(updatedHistory);
  };

  useEffect(() => {
    const onActionCreated = () => {
      updateActionHistory();
      setResetFilters(true);
    }

    const actionsStarted = () => {
      setIsLoading(true);
    }

    const actionExecuted = () => {
      updateActionHistory();
      setIsLoading(false);
    }

    actionManager.on(actionManager.events.ACTION_CREATED, onActionCreated);
    actionManager.on(actionManager.events.ACTION_UPDATED, updateActionHistory);
    actionManager.on(actionManager.events.ACTION_REMOVED, updateActionHistory);
    actionManager.on(actionManager.events.ACTION_UPDATE_EXECUTED, actionsStarted);
    actionManager.on(actionManager.events.ACTION_UPDATED, actionExecuted);
    actionManager.on(actionManager.events.MULTIPLE_ACTIONS_STARTED, actionsStarted);
    actionManager.on(actionManager.events.MULTIPLE_ACTIONS_EXECUTED, actionExecuted);

    // Clean up the listener when the component unmounts
    return () => {
      actionManager.off(actionManager.events.ACTION_CREATED, onActionCreated);
      actionManager.off(actionManager.events.ACTION_UPDATED, updateActionHistory);
      actionManager.off(actionManager.events.ACTION_REMOVED, updateActionHistory);
      actionManager.off(actionManager.events.ACTION_UPDATE_EXECUTED, actionsStarted);
      actionManager.off(actionManager.events.ACTION_UPDATED, actionExecuted);
      actionManager.off(actionManager.events.MULTIPLE_ACTIONS_STARTED, actionsStarted);
      actionManager.off(actionManager.events.MULTIPLE_ACTIONS_EXECUTED, actionExecuted);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleTabSelect = (tab) => {
    if (tab == PanelType.RESIZE) {
      resizeActionHandler.enterResizeMode();
      setResizeMode(true);
    } else {
      resizeActionHandler.cancelResizeMode();
      setResizeMode(false);
    }

    if (tab == PanelType.CROP) {
      setCropMode(true);
    } else {
      setCropMode(false);
    }

    setSelectedTab(tab);
  };

  const onSaveCrop = () => {
    cropActionHandler.saveCrop();
    setCropMode(false);
    setSelectedTab(null);
  }

  const onSaveResize = () => {
    resizeActionHandler.saveResize();
    setResizeMode(false);
    setSelectedTab(null);
  }

  const handleResize = (width, height) => {
    if (!inResizeMode) return;
    resizeActionHandler.handleResize(width, height)
  }

  return (
    <div className="app">
      <TabListComponent
        onTabSelect={handleTabSelect}
        selectedTab={selectedTab}
      />

      <div style={{
        position: 'relative',
        width: CanvasResolution.WIDTH,
        height: CanvasResolution.HEIGHT,
        minWidth: 300,
        minHeight: 300,
      }}>

        {isLoading && (<LoadingComponent />)}

        <CanvasComponent ref={canvasRef} />

        {inResizeMode && (
          <ResizableBoxComponent
            width={canvasController.getClientWidth()}
            height={canvasController.getClientHeight()}
            handleResize={handleResize}
          />
        )}

        {inCropMode && (
          <DraggableBoxComponent
            initialWidth={canvasController.getClientWidth()}
            initialHeight={canvasController.getClientHeight()}
            onBoxChange={cropActionHandler.updateBox}
          />
        )}
      </div>

      <ActionPanel
        selectedTab={selectedTab}
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

        onSetCompression={downloadHandler.handleSetCompression}
        onDownloadAsPNG={downloadHandler.handleDownloadAsPNG}
        onDownloadAsWebP={downloadHandler.handleDownloadAsWebP}
        onDownloadAsJPEG={downloadHandler.handleDownloadAsJPEG}
        onDownloadProject={downloadHandler.handleDownloadProject}

        onLoadImage={loadActionHandler.handleImageSelect}
        onProjectLoad={loadActionHandler.handleProjectLoad}
        handleUpscale={loadActionHandler.handleUpscaleImage}

        handleBrightness={filterActionHandler.handleBrightness}
        handleSaturation={filterActionHandler.handleSaturation}
        handleContrast={filterActionHandler.handleContrast}
        handleGrayscale={filterActionHandler.handleGrayscale}
        handleHueRotation={filterActionHandler.handleHueRotation}
        handleInvert={filterActionHandler.handleInvert}
        handleBlur={filterActionHandler.handleBlur}
        handleSepia={filterActionHandler.handleSepia}

        handleFlip={editActionHandler.handleFlip}
        handleRotate={editActionHandler.handleRotate}

        onSaveResize={onSaveResize}
        onCancelResize={handleTabSelect}

        onSaveCrop={onSaveCrop}
        onCancelCrop={handleTabSelect}
      />

      <ActionHistoryPanelComponent
        history={history}
        onCardClicked={actionHistoryHandler.handleHistoryCardClick}
        onClearClicked={actionHistoryHandler.handleClearHistory}
      />

    </div >
  );
}

export default App;
