import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import UpscalerType from '../../../enum/upscalerType.enum';
import RadioOption from '../../utilityComponents/radioOption';

const UpscalePanel = ({ handleUpscale }) => {
    const [options, setOptions] = useState({
        upscaler: UpscalerType.ESRGAN,
        scale: 2,
        mode: 'noise',
        noise: 0,
    });

    const handleUpscalerChange = (upscaler) => {
        setOptions((prevOptions) => ({ ...prevOptions, upscaler }));
    };

    const handleScaleChange = (factor) => {
        setOptions((prevOptions) => ({ ...prevOptions, scale: factor }));
    };

    const handleAnimeOptionsChange = (factor, mode, noise) => {
        setOptions((prevOptions) => ({ ...prevOptions, scale: factor, mode, noise }));
    };

    return (
        <div className="action-panel upscale-panel">
            <div className="upscaler-header">Upscalers</div>
            <div className="custom-radio scale-options">
                <RadioOption
                    key={"ESRGAN"}
                    label="ESRGAN"
                    value="ESRGAN"
                    checked={options.upscaler === UpscalerType.ESRGAN}
                    onChange={() => handleUpscalerChange(UpscalerType.ESRGAN)}
                />
                <RadioOption
                    key={"ANIME"}
                    label="ANIME"
                    value="ANIME"
                    checked={options.upscaler === UpscalerType.ANIME}
                    onChange={() => handleUpscalerChange(UpscalerType.ANIME)}
                />
            </div>

            <div className="upscaler-header">Upscale size</div>
            <div className="custom-radio scale-options">
                {[2, 3, 4].map((value) => (
                    <RadioOption
                        key={value}
                        label={`${value}x`}
                        value={value}
                        checked={options.scale === value}
                        onChange={() => handleScaleChange(value)}
                    />
                ))}
            </div>

            {options.upscaler === UpscalerType.ANIME && (
                <div>
                    <div className="upscaler-header">Upscale Mode</div>
                    <div className="custom-radio scale-options">
                        {["Noise", "Scale", "Both"].map((mode) => (
                            <RadioOption
                                key={mode}
                                label={mode}
                                value={mode == mode.toLowerCase()}
                                checked={options.mode === mode.toLowerCase()}
                                onChange={() => handleAnimeOptionsChange(options.scale, mode.toLowerCase(), options.noise)}
                            />
                        ))}
                    </div>

                    <div className="upscaler-header">Upscale Noise</div>
                    <div className="custom-radio scale-options">
                        {[0, 1, 2, 3].map((noise) => (
                            <RadioOption
                                key={noise}
                                label={String(noise)}
                                value={noise}
                                checked={options.noise === noise}
                                onChange={() => handleAnimeOptionsChange(options.scale, options.mode, noise)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <button className="panel-button upscale-button" onClick={() => handleUpscale(options)}>
                <FontAwesomeIcon icon={faArrowUp} className="panel-icon" />
                <span className="panel-text">Upscale</span>
            </button>
        </div>
    );
};

export default UpscalePanel;