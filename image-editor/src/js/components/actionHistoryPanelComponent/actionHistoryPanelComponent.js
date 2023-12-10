import React, { useEffect, useRef } from 'react';
import ActionHistoryCard from './actionHistoryCard';

const ActionHistoryPanelComponent = ({ history }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        // Scroll to the top of the panel when a new action is added
        if (panelRef.current) {
            panelRef.current.scrollTop = 0;
        }
    }, [history]);

    return (
        <div style={{ maxHeight: '1000px', overflowY: 'auto' }} ref={panelRef}>
            <h2>Action History Panel</h2>
            {history.map((action, index) => (
                <ActionHistoryCard
                    key={index}
                    id={index + 1}
                    title={`Action ${index + 1}`}
                    properties={action}
                    icon="your-icon-name"
                />
            ))}
        </div>
    );
};

export default ActionHistoryPanelComponent;