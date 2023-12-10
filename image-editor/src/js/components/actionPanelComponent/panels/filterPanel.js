import React, { useState, useEffect } from 'react';

const FilterPanel = ({ brightness, contrast, saturation, onAdjustBrightness, onAdjustContrast, onAdjustSaturation, resetFilters }) => {
    const [brightnessValue, setBrightnessValue] = useState(brightness ?? 100);
    const [contrastValue, setContrastValue] = useState(contrast ?? 100);

    useEffect(() => {
        // Check if the resetFilters prop has changed
        if (resetFilters) {
            // Reset values to their default numbers (you may need to adjust these)
            setBrightnessValue(100);
            setContrastValue(100);

            // Call the provided callbacks to reset the values in the parent component
            // onAdjustBrightness(100);
            // onAdjustContrast(100);
            // onAdjustSaturation(100); // Assuming 100 is the default for saturation
        }
    }, [resetFilters]);


    return (
        <div className="filter-panel">
            <h3>Adjust Filters</h3>

            <div className="filter-slider">
                <label htmlFor="brightnessSlider">Brightness</label>
                <input
                    id="brightnessSlider"
                    type="range"
                    min="0"
                    max="200"
                    value={brightnessValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setBrightnessValue(val);
                        onAdjustBrightness(val);
                    }}
                />
                <span>{brightnessValue}%</span>
            </div>

            <div className="filter-slider">
                <label htmlFor="contrastSlider">Contrast</label>
                <input
                    id="contrastSlider"
                    type="range"
                    min="0"
                    max="200"
                    value={contrastValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setContrastValue(val);
                        onAdjustContrast(val);
                    }}
                />
                <span>{contrastValue}%</span>
            </div>

            <div className="filter-slider">
                <label htmlFor="saturationSlider">Saturation</label>
                <input
                    id="saturationSlider"
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => onAdjustSaturation(Number(e.target.value))}
                />
                <span>{saturation}%</span>
            </div>
        </div>
    );
};

export default FilterPanel;
