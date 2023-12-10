import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const ActionHistoryCard = ({ id, title, properties, icon }) => {
    return (
        <div className="action-history-card">
            <div className="card-header">
                <FontAwesomeIcon icon={faHistory} />
                <span>ID: {id}</span>
            </div>
            <div className="card-body">
                <h3>{title}</h3>
                <p>{properties}</p>
            </div>
        </div>
    );
};

export default ActionHistoryCard;
