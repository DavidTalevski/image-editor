import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons'; // Import the file image icon

const LoadImageTab = ({ onImageSelect }) => {
    const fileInputRef = useRef(null);

    const handleTabClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            // Do something with the selected file, e.g., pass it to a callback
            onImageSelect(selectedFile);
        }
    };

    return (
        <div className='tab'>
            <button className="tab-button" onClick={handleTabClick}>
                <FontAwesomeIcon icon={faFileImage} />
                Load Image
            </button>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default LoadImageTab;