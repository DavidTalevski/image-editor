import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterTab = ({ onTabSelect }) => {
    return (
        <div className="tab">
            <button className="tab-button" onClick={onTabSelect}>
                <FontAwesomeIcon icon={faFilter} />
                Filters
            </button>
        </div>
    );
};

export default FilterTab;

