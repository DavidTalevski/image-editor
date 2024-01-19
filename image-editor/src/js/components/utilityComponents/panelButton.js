import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PanelButton = ({ onClick, icon, text }) => (
    <button className="panel-button" onClick={onClick}>
        <FontAwesomeIcon icon={icon} className="panel-icon" />
        <span className="panel-text">{text}</span>
    </button>
);

export default PanelButton;