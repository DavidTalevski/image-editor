import React, { useState, useEffect } from 'react';

const FilterPanel = ({
    brightness,
    contrast,
    saturation,
    grayscale,
    hueRotation,
    sepia,
    blur,
    invert,
    onAdjustBrightness,
    onAdjustContrast,
    onAdjustSaturation,
    onAdjustGrayscale,
    onAdjustHueRotation,
    onAdjustSepia,
    onAdjustBlur,
    onAdjustInvert,
    resetFilters
}) => {

    const [brightnessValue, setBrightnessValue] = useState(brightness ?? 100);
    const [contrastValue, setContrastValue] = useState(contrast ?? 100);
    const [saturationValue, setSaturationValue] = useState(saturation ?? 100);
    const [grayscaleValue, setGrayscaleValue] = useState(grayscale || 0);
    const [hueRotationValue, setHueRotationValue] = useState(hueRotation || 0);
    const [sepiaValue, setSepiaValue] = useState(sepia || 0);
    const [blurValue, setBlurValue] = useState(blur || 0);
    const [invertValue, setInvertValue] = useState(invert || 0);

    useEffect(() => {
        // Check if the resetFilters prop has changed
        if (resetFilters) {
            // Reset values to their default numbers (you may need to adjust these)
            setBrightnessValue(100);
            setContrastValue(100);
            setSaturationValue(100);
            setGrayscaleValue(0);
            setHueRotationValue(0);
            setSepiaValue(0);
            setBlurValue(0);
            setInvertValue(0);
        }
    }, [resetFilters]);

    return (
        <div className="filter-panel">
            <div className="filter-slider">
                <label htmlFor="brightnessSlider">Brightness {brightnessValue}%</label>
                <input
                    id="brightnessSlider"
                    type="range"
                    min="0"
                    max="200"
                    className="custom-slider"
                    value={brightnessValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setBrightnessValue(val);
                        onAdjustBrightness(val);
                    }}
                />
            </div>

            <div className="filter-slider">
                <label htmlFor="contrastSlider">Contrast {contrastValue}%</label>
                <input
                    id="contrastSlider"
                    type="range"
                    min="0"
                    max="200"
                    className="custom-slider"
                    value={contrastValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setContrastValue(val);
                        onAdjustContrast(val);
                    }}
                />
            </div>

            <div className="filter-slider">
                <label htmlFor="saturationSlider">Saturation {saturationValue}%</label>
                <input
                    id="saturationSlider"
                    type="range"
                    min="0"
                    max="200"
                    className="custom-slider"
                    value={saturationValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setSaturationValue(val);
                        onAdjustSaturation(val);
                    }}
                />
            </div>

            <div className="filter-slider">
                <label htmlFor="grayscaleSlider">Grayscale {grayscaleValue}%</label>
                <input
                    id="grayscaleSlider"
                    type="range"
                    min="0"
                    max="100"
                    className="custom-slider"
                    value={grayscaleValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setGrayscaleValue(val);
                        onAdjustGrayscale(val);
                    }}
                />
            </div>

            <div className="filter-slider">
                <label htmlFor="hueSlider">Hue Rotation {hueRotationValue}°</label>
                <input
                    id="hueSlider"
                    type="range"
                    min="0"
                    max="360"
                    className="custom-slider"
                    value={hueRotationValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setHueRotationValue(val);
                        onAdjustHueRotation(val);
                    }}
                />
            </div>

            <div className="filter-slider">
                <label htmlFor="sepiaSlider">Sepia {sepiaValue}%</label>
                <input
                    id="sepiaSlider"
                    type="range"
                    min="0"
                    max="100"
                    className="custom-slider"
                    value={sepiaValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setSepiaValue(val);
                        onAdjustSepia(val);
                    }}
                />
            </div>

            <div className="filter-slider">
                <label htmlFor="blurSlider">Blur {blurValue}px</label>
                <input
                    id="blurSlider"
                    type="range"
                    min="0"
                    max="20"
                    className="custom-slider"
                    value={blurValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setBlurValue(val);
                        onAdjustBlur(val);
                    }}
                />
            </div>

            <div className="filter-slider">
                <label htmlFor="invertSlider">Invert {invertValue}%</label>
                <input
                    id="invertSlider"
                    type="range"
                    min="0"
                    max="100"
                    className="custom-slider"
                    value={invertValue}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setInvertValue(val);
                        onAdjustInvert(val);
                    }}
                />
            </div>
        </div>
    );
};

export default FilterPanel;
