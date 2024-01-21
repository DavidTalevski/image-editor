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
    resetFilters,
}) => {
    const [lastUsedSlider, setLastUsedSlider] = useState(null);

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
            setBrightnessValue(lastUsedSlider === 'brightness' ? brightness : 100);
            setContrastValue(lastUsedSlider === 'contrast' ? contrast : 100);
            setSaturationValue(lastUsedSlider === 'saturation' ? saturation : 100);
            setGrayscaleValue(lastUsedSlider === 'grayscale' ? grayscale : 0);
            setHueRotationValue(lastUsedSlider === 'hueRotation' ? hueRotation : 0);
            setSepiaValue(lastUsedSlider === 'sepia' ? sepia : 0);
            setBlurValue(lastUsedSlider === 'blur' ? blur : 0);
            setInvertValue(lastUsedSlider === 'invert' ? invert : 0);
        }
    }, [resetFilters, brightness, contrast, saturation, grayscale, hueRotation, sepia, blur, invert, lastUsedSlider]);

    const handleSliderChange = (sliderName, value, setValueFunction, onAdjustFunction) => {
        setValueFunction(value);
        onAdjustFunction(value);
        setLastUsedSlider(sliderName);
    };

    return (
        <div className="action-panel">
            <div className="filter-slider">
                <label htmlFor="brightnessSlider">Brightness {brightnessValue}%</label>
                <input
                    id="brightnessSlider"
                    type="range"
                    min="0"
                    max="200"
                    className="custom-slider"
                    value={brightnessValue}
                    onChange={(e) =>
                        handleSliderChange('brightness', Number(e.target.value), setBrightnessValue, onAdjustBrightness)
                    }
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
                    onChange={(e) =>
                        handleSliderChange('contrast', Number(e.target.value), setContrastValue, onAdjustContrast)
                    }
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
                    onChange={(e) =>
                        handleSliderChange('saturation', Number(e.target.value), setSaturationValue, onAdjustSaturation)
                    }
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
                    onChange={(e) =>
                        handleSliderChange('grayscale', Number(e.target.value), setGrayscaleValue, onAdjustGrayscale)
                    }
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
                    onChange={(e) =>
                        handleSliderChange('hueRotation', Number(e.target.value), setHueRotationValue, onAdjustHueRotation)
                    }
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
                    onChange={(e) => handleSliderChange('sepia', Number(e.target.value), setSepiaValue, onAdjustSepia)}
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
                    onChange={(e) => handleSliderChange('blur', Number(e.target.value), setBlurValue, onAdjustBlur)}
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
                    onChange={(e) => handleSliderChange('invert', Number(e.target.value), setInvertValue, onAdjustInvert)}
                />
            </div>
        </div>
    );
};

export default FilterPanel;
