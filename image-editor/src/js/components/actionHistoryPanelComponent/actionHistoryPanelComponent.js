import React, { useState } from 'react';
import ActionHistoryCard from './actionHistoryCard';
import ClearConfirmationPopup from './clearConfirmationComponent';

const ActionHistoryPanelComponent = ({ history, onCardClicked, onClearAllClicked, onClearInactiveClicked }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClearInactive = () => {
        if (onClearInactiveClicked) onClearInactiveClicked();
    };

    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    }

    const handleConfirmClear = () => {
        if (onClearAllClicked) onClearAllClicked();
        setShowConfirmation(false);
    };

    const handleCancelClear = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="action-history-panel">
            <div className="panel-header">
                <h2 className="history-panel-title">Action History Panel</h2>
            </div>

            <button className="clear-button" onClick={handleClearInactive}>
                <span className="panel-text">Clear Inactive</span>
            </button>

            <button className="clear-button" onClick={handleShowConfirmation}>
                <span className="panel-text">Clear All</span>
            </button>

            <div className="action-history-panel-slider">
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
        </div>
    );
};

export default ActionHistoryPanelComponent;
