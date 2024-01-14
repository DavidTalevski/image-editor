// DownloadImagePanel.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faFileArchive } from '@fortawesome/free-solid-svg-icons';

const DownloadImagePanel = ({ onDownloadAsPNG, onDownloadAsWebP, onDownloadAsJPEG, onDownloadProject, onSetCompression, defaultCompression }) => {

    const [fileName, setFileName] = useState('');
    const [compressionLevel, setCompressionLevel] = useState(defaultCompression || 1);

    useEffect(() => {
        onSetCompression(compressionLevel);
    }, [compressionLevel, onSetCompression]);

    return (
        <div className="action-panel">
            <div className="compression-control">
                <label>Quality {compressionLevel}%</label>
                <input className="custom-slider" type="range" min="1" max="100" value={compressionLevel} onChange={(e) => setCompressionLevel(e.target.value)} />
            </div>

            <div className="file-name-input">
                <label>File Name:</label>
                <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
            </div>

            <button className="panel-button" onClick={() => onDownloadAsPNG(fileName)}>
                <FontAwesomeIcon icon={faFileImage} className="panel-icon" />
                <span className="panel-text">Download as PNG</span>
            </button>

            <button className="panel-button" onClick={() => onDownloadAsWebP(fileName)}>
                <FontAwesomeIcon icon={faFileImage} className="panel-icon" />
                <span className="panel-text">Download as WebP</span>
            </button>

            <button className="panel-button" onClick={() => onDownloadAsJPEG(fileName)}>
                <FontAwesomeIcon icon={faFileImage} className="panel-icon" />
                <span className="panel-text">Download as JPEG</span>
            </button>

            <button className="panel-button" onClick={() => onDownloadProject(fileName)}>
                <FontAwesomeIcon icon={faFileArchive} className="panel-icon" />
                <span className="panel-text">Download Project</span>
            </button>
        </div>
    );
};

export default DownloadImagePanel;
