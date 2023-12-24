import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

/**
 * ActionHistoryCard component.
 * @param {object} props - The props for the component.
 * @param {import('./actionHistoryCardProperties').ActionHistoryCardProperties} props.properties - The properties of the card.
 * @param {function} props.onClick - The callback function to handle click events.
 * @returns {JSX.Element} - The ActionHistoryCard component.
 */
const ActionHistoryCard = ({ id, properties, onClick }) => {
    /**
     * Handles the click event for the card.
     */
    const handleClick = () => {
        // Assuming you have an id property in your properties object
        onClick(id);
    };

    return (
        <div
            className={`action-history-card ${properties.isActive ? 'active' : 'inactive'}`}
            onClick={handleClick}
        >
            <div className="card-header">
                <FontAwesomeIcon icon={faHistory} />
                <span>ID: {id}</span>
            </div>
            <div className="card-body">
                <h3>{properties.title}</h3>
                <p>{properties.description}</p>
            </div>
        </div>
    );
};

export default ActionHistoryCard;
