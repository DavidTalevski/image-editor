import React, { useState, useEffect } from 'react';

const FilterPanel = ({
    brightness,
    contrast,
    saturation,
    grayscale,
    hueRotation,
    onAdjustBrightness,
    onAdjustContrast,
    onAdjustSaturation,
    onAdjustGrayscale,
    onAdjustHueRotation,
    resetFilters
}) => {

    const [brightnessValue, setBrightnessValue] = useState(brightness ?? 100);
    const [contrastValue, setContrastValue] = useState(contrast ?? 100);
    const [saturationValue, setSaturationValue] = useState(saturation ?? 100);
    const [grayscaleValue, setGrayscaleValue] = useState(grayscale || 0);
    const [hueRotationValue, setHueRotationValue] = useState(hueRotation || 0);

    useEffect(() => {
        // Check if the resetFilters prop has changed
        if (resetFilters) {
            // Reset values to their default numbers (you may need to adjust these)
            setBrightnessValue(100);
            setContrastValue(100);
            setSaturationValue(100);
            setGrayscaleValue(0);
            setHueRotationValue(0);
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
                    value={saturationValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setSaturationValue(val);
                        onAdjustSaturation(val);
                    }}
                />
                <span>{saturationValue}%</span>
            </div>

            <div className="filter-slider">
                <label htmlFor="grayscaleSlider">Grayscale</label>
                <input
                    id="grayscaleSlider"
                    type="range"
                    min="0"
                    max="100"
                    value={grayscaleValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setGrayscaleValue(val);
                        onAdjustGrayscale(val);
                    }}
                />
                <span>{grayscaleValue}%</span>
            </div>

            <div className="filter-slider">
                <label htmlFor="hueSlider">Hue Rotation</label>
                <input
                    id="hueSlider"
                    type="range"
                    min="0"
                    max="360"
                    value={hueRotationValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setHueRotationValue(val);
                        onAdjustHueRotation(val);
                    }}
                />
                <span>{hueRotationValue}°</span>
            </div>
        </div>
    );
};

export default FilterPanel;
