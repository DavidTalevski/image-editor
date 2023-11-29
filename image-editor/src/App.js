// App.js
import React, { useState, useRef } from 'react';
import './css/App.css';
import { ImageLoader } from './js/core/loader/imageLoader';
import CanvasComponent from './js/components/canvasComponent/canvasComponent';
import TabListComponent from './js/components/tabListComponent/tabListComponent';
import ActionPanel from './js/components/actionPanelComponent/actionPanelComponent';
import { UserPreferences } from './js/core/storage/userPreferences';
import { ImageDownloader } from './js/core/downloader/imageDownloader';

import LoadImageActionType from './js/enum/loadImageActionType.enum';

const loader = new ImageLoader();
const preferences = new UserPreferences();
const downloader = new ImageDownloader();


function App() {
  const canvasRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  downloader.canvas = canvasRef?.current;


  /**
   * @param {LoadImageActionType} actionType 
   * @param {any} data 
   */
  const handleImageSelect = async (actionType, data) => {

    try {
      let image;

      if (actionType == LoadImageActionType.UPLOAD) {
        image = await loader.loadFromBlob(data);
      } else if (actionType == LoadImageActionType.URL) {
        image = await loader.loadFromUrl(data);
      } else if (actionType == LoadImageActionType.CLIPBOARD) {
        image = await loader.loadFromClipboard();
      }

      setSelectedImage(image);
    } catch (e) {
      console.log(e);
      return;
    }
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
      <CanvasComponent image={selectedImage} ref={canvasRef} />
      <ActionPanel
        selectedTab={selectedTab}
        onDownloadAsPNG={handleDownloadAsPNG}
        onDownloadAsWebP={handleDownloadAsWebP}
        onDownloadAsJPEG={handleDownloadAsJPEG}
        onSetCompression={handleSetCompression}
        defaultCompression={preferences.getPreference("imageQuality") * 100}
        onLoadImage={handleImageSelect}
      />
    </div>
  );
}

export default App;
