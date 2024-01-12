import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import UpscalerType from '../../../enum/upscalerType.enum';

const UpscalePanel = ({ handleUpscale }) => {
    const [options, setOptions] = useState({
        upscaler: UpscalerType.ESRGAN,
        scale: 2,
        mode: 'noise',
        noise: 0,
    });

    const handleUpscalerChange = (upscaler) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            upscaler: upscaler,
        }));
    };

    const handlescaleChange = (factor) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            scale: factor,
        }));
    };

    const handleAnimeOptionsChange = (factor, mode, noise) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            scale: factor,
            mode,
            noise,
        }));
    };

    return (
        <div className="action-panel upscale-panel">
            <div className="upscaler-options">
                <label>
                    <input
                        type="radio"
                        value="ESRGAN"
                        checked={options.upscaler === UpscalerType.ESRGAN}
                        onChange={() => handleUpscalerChange(UpscalerType.ESRGAN)}
                    />
                    ESRGAN
                </label>
                <label>
                    <input
                        type="radio"
                        value="ANIME"
                        checked={options.upscaler === UpscalerType.ANIME}
                        onChange={() => handleUpscalerChange(UpscalerType.ANIME)}
                    />
                    ANIME
                </label>
            </div>
            {options.upscaler === UpscalerType.ESRGAN && (
                <div className="scale-numbers">
                    <label>
                        <input
                            type="radio"
                            value={2}
                            checked={options.scale === 2}
                            onChange={() => handlescaleChange(2)}
                        />
                        2x
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={3}
                            checked={options.scale === 3}
                            onChange={() => handlescaleChange(3)}
                        />
                        3x
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={4}
                            checked={options.scale === 4}
                            onChange={() => handlescaleChange(4)}
                        />
                        4x
                    </label>
                </div>
            )}
            {options.upscaler === UpscalerType.ANIME && (

                <div>
                    <div className="scale-numbers">
                        <label>
                            <input
                                type="radio"
                                value={2}
                                checked={options.scale === 2}
                                onChange={() => handleAnimeOptionsChange(2, options.mode, options.noise)}
                            />
                            2x
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={3}
                                checked={options.scale === 3}
                                onChange={() => handleAnimeOptionsChange(3, options.mode, options.noise)}
                            />
                            3x
                        </label>
                        <label>
                            <input
                                type="radio"
                                value={4}
                                checked={options.scale === 4}
                                onChange={() => handleAnimeOptionsChange(4, options.mode, options.noise)}
                            />
                            4x
                        </label>
                    </div>

                    <div className="scale-options">
                        <label>
                            Mode:
                            <select
                                value={options.mode}
                                onChange={(e) => handleAnimeOptionsChange(options.scale, e.target.value, options.noise)}
                            >
                                <option value="noise">Noise</option>
                                <option value="scale">Scale</option>
                                <option value="noise-scale">Noise-Scale</option>
                            </select>
                        </label>
                        <label>
                            Noise:
                            <select
                                value={options.noise}
                                onChange={(e) => handleAnimeOptionsChange(options.scale, options.mode, e.target.value)}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                        </label>
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
