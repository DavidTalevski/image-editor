import React from 'react';

const ActionHistoryCard = ({ action, onDelete }) => {
    return (
        <div>
            <p>{action}</p>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ActionHistoryCard;