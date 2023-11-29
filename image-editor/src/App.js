// App.js
import React, { useState, useRef } from 'react';
import './css/App.css';
import { ImageLoader } from './js/core/loader/imageLoader';
import CanvasComponent from './js/components/canvasComponent/canvasComponent';
import TabListComponent from './js/components/tabListComponent/tabListComponent';
import ActionPanel from './js/components/actionPanelComponent/actionPanelComponent';
import { UserPreferences } from './js/core/storage/userPreferences';
import { ImageDownloader } from './js/core/downloader/imageDownloader';


const loader = new ImageLoader();
const preferences = new UserPreferences();
const downloader = new ImageDownloader();


function App() {
  const canvasRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  downloader.canvas = canvasRef?.current;


  // todo enum
  const handleImageSelect = async (selectedFile, actionType) => {

    try {
      let image;

      if (actionType == "Upload") {
        image = await loader.loadFromBlob(selectedFile);
      } else if (actionType == "URL") {
        image = await loader.loadFromUrl(selectedFile);
      } else if (actionType == "Clipboard") {
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
