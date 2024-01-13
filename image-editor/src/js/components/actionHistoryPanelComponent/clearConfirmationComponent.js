import React from 'react';

const ClearConfirmationPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="confirmation-modal">
                <div className="confirmation-content">
                    <p>Are you sure you want to clear the history? <br /> This will also clear your working canvas!</p>
                    <div className="button-container">
                        <button className="confirm-button" onClick={onConfirm}>
                            Yes
                        </button>
                        <button className="cancel-button" onClick={onCancel}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClearConfirmationPopup;
