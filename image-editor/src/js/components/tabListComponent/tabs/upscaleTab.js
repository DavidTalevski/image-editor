import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

const UpscaleTab = ({ onTabSelect }) => {
    return (
        <div className="tab">
            <button className="tab-button" onClick={() => onTabSelect('upscale')}>
                <FontAwesomeIcon icon={faArrowUpLong} className="tab-icon" />
                <span className="tab-text">Upscale</span>
            </button>
        </div>
    );
};

export default UpscaleTab;
