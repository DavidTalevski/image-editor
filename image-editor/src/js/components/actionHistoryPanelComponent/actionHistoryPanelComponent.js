// ActionHistoryPanelComponent.js
import React, { useEffect, useRef } from 'react';
import ActionHistoryCard from './actionHistoryCard';

const ActionHistoryPanelComponent = ({ history, addAction, removeAction }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        // Scroll to the top of the panel when a new action is added
        if (panelRef.current) {
            panelRef.current.scrollTop = 0;
        }
    }, [history]);

    return (
        <div style={{ maxHeight: '200px', overflowY: 'auto' }} ref={panelRef}>
            <h2>Action History Panel</h2>
            {history.map((action, index) => (
                <ActionHistoryCard key={index} action={action} onDelete={() => removeAction(index)} />
            ))}
        </div>
    );
};

export default ActionHistoryPanelComponent;