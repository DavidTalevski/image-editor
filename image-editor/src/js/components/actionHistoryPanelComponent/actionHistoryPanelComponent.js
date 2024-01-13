import React, { useState } from 'react';
import ActionHistoryCard from './actionHistoryCard';
import ClearConfirmationPopup from './clearConfirmationComponent';

const ActionHistoryPanelComponent = ({ history, onCardClicked, onClearClicked }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClear = () => {
        setShowConfirmation(true);
    };

    const handleConfirmClear = () => {
        if (onClearClicked) onClearClicked();
        setShowConfirmation(false);
    };

    const handleCancelClear = () => {
        setShowConfirmation(false);
    };

    return (
        <div style={{ maxHeight: '768px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>Action History Panel</h2>
            </div>

            <button className="clear-button" onClick={handleClear}>
                <span className="panel-text">Clear</span>
            </button>

            {showConfirmation && (
                <ClearConfirmationPopup
                    onConfirm={handleConfirmClear}
                    onCancel={handleCancelClear}
                />
            )}

            {history.slice().reverse().map((action, index, array) => (
                <ActionHistoryCard
                    key={array.length - index - 1}
                    id={array.length - index - 1}
                    properties={action}
                    onClick={onCardClicked}
                />
            ))}
        </div>
    );
};

export default ActionHistoryPanelComponent;