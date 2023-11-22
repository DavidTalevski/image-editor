// App.js
import React, { useState, useRef } from 'react';
import './css/App.css';
import { ImageLoader } from './js/loader/imageLoader';
import CanvasComponent from './js/components/canvasComponent/canvasComponent';
import TabListComponent from './js/components/tabListComponent/tabListComponent';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const loader = new ImageLoader();
  const canvasRef = useRef(null);

  const handleImageSelect = async (selectedFile) => {
    try {
      const image = await loader.load(selectedFile);
      setSelectedImage(image);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return (
    <div className="app">
      <TabListComponent onImageSelect={handleImageSelect} canvasRef={canvasRef} />
      <CanvasComponent image={selectedImage} ref={canvasRef} />
    </div>
  );
}

export default App;