import React, { useEffect, useRef } from 'react';
import ActionHistoryCard from './actionHistoryCard';

const ActionHistoryPanelComponent = ({ history, onCardClicked }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the panel when a new action is added
        // if (panelRef.current) {
        //     panelRef.current.scrollTop = panelRef.current.scrollHeight;
        // }
    }, [history]);

    return (
        <div style={{ maxHeight: '1000px', overflowY: 'auto' }} ref={panelRef}>
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
