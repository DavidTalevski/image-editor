import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Assuming you have an icon for edit

const EditTab = ({ onTabSelect }) => {
    return (
        <div className="tab">
            <button className="tab-button" onClick={() => onTabSelect('edit')}>
                <FontAwesomeIcon icon={faEdit} />
                Edit
            </button>
        </div>
    );
};

export default EditTab;
