import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

const LoadImageTab = ({ onImageSelect, onTabSelect }) => {
    const fileInputRef = useRef(null);

    const handleTabClick = () => {
        fileInputRef.current.click();

        // Notify the parent component about the selected tab
        onTabSelect();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            // Do something with the selected file, e.g., pass it to a callback
            onImageSelect(selectedFile);

            // Notify the parent component about the selected tab
            onTabSelect();
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
