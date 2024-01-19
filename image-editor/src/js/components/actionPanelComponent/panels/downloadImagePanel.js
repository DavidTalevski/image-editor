// DownloadImagePanel.js
import React, { useState, useEffect } from 'react';
import { faFileImage, faFileArchive } from '@fortawesome/free-solid-svg-icons';
import CompressionControl from '../../utilityComponents/compressionControl';
import FileNameInput from '../../utilityComponents/fileNameInput';
import PanelButton from '../../utilityComponents/panelButton';

const DownloadImagePanel = ({
    onDownloadAsPNG,
    onDownloadAsWebP,
    onDownloadAsJPEG,
    onDownloadProject,
    onSetCompression,
    defaultCompression = 1,
}) => {
    const [fileName, setFileName] = useState('');
    const [compressionLevel, setCompressionLevel] = useState(defaultCompression);

    useEffect(() => {
        onSetCompression(compressionLevel);
    }, [compressionLevel, onSetCompression]);

    return (
        <div className="action-panel">
            <CompressionControl compressionLevel={compressionLevel} setCompressionLevel={setCompressionLevel} />
            <FileNameInput fileName={fileName} setFileName={setFileName} />

            <PanelButton onClick={() => onDownloadAsPNG(fileName)} icon={faFileImage} text="Download as PNG" />
            <PanelButton onClick={() => onDownloadAsWebP(fileName)} icon={faFileImage} text="Download as WebP" />
            <PanelButton onClick={() => onDownloadAsJPEG(fileName)} icon={faFileImage} text="Download as JPEG" />
            <PanelButton onClick={() => onDownloadProject(fileName)} icon={faFileArchive} text="Download Project" />
        </div>
    );
};

export default DownloadImagePanel;
