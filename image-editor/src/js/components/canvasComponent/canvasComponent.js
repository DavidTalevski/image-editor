import React, { useRef } from 'react';
import CanvasResolution from '../../settings/canvasResolution';

const CanvasComponent = React.forwardRef((props, ref) => {
    const canvasRef = useRef(null);

    return (
        <canvas
            ref={(canvas) => {
                canvasRef.current = canvas;
                if (ref) {
                    ref.current = canvas;
                }
            }}
            width={CanvasResolution.WIDTH} // Set your desired width
            height={CanvasResolution.HEIGHT} // Set your desired height
            className="canvas-container" // Apply the CSS class
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                maxWidth: CanvasResolution.WIDTH,
                maxHeight: CanvasResolution.HEIGHT
            }}
        ></canvas>
    );
});

export default CanvasComponent;
