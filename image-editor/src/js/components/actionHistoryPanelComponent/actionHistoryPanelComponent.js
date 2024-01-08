import React from 'react';
import ActionHistoryCard from './actionHistoryCard';

const ActionHistoryPanelComponent = ({ history, onCardClicked }) => {
    return (
        <div style={{ maxHeight: '768px', overflowY: 'auto' }} >
            <h2>Action History Panel</h2>
            {history.slice().reverse().map((action, index, array) => (
                <ActionHistoryCard
                    key={index}
                    id={array.length - index - 1}
                    properties={action}
                    onClick={onCardClicked}
                />
            ))}
        </div>
    );
};

export default ActionHistoryPanelComponent;
