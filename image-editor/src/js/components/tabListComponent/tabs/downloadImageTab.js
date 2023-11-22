import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const DownloadImageTab = ({ canvasRef }) => {
    const handleDownload = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'canvas_image.png';
        link.click();
    };

    return (
        <div className="tab">
            <button className="tab-button" onClick={handleDownload}>
                <FontAwesomeIcon icon={faDownload} />
                Download Image
            </button>
        </div>
    );
};

export default DownloadImageTab;