import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterTab = ({ onTabSelect }) => {
    return (
        <div className="tab">
            <button className="tab-button" onClick={onTabSelect}>
                <FontAwesomeIcon icon={faFilter} className="tab-icon" />
                <span className="tab-text">Filters</span>
            </button>
        </div>
    );
};

export default FilterTab;

