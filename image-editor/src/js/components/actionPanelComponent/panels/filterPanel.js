// FilterPanel.js
import React from 'react';

const FilterPanel = ({ brightness, contrast, saturation, onAdjustBrightness, onAdjustContrast, onAdjustSaturation }) => {

    const [brightnessValue, setBrightnessValue] = React.useState(brightness ?? 100);


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
                    value={contrast}
                    onChange={(e) => onAdjustContrast(Number(e.target.value))}
                />
                <span>{contrast}%</span>
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
