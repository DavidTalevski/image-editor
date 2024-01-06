import React, { useRef } from 'react';

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
            width={400} // Set your desired width
            height={400} // Set your desired height
            className="canvas-container" // Apply the CSS class
            style={{ position: "absolute", top: 0, left: 0, maxWidth: 1024, maxHeight: 768 }}
        ></canvas>
    );
});

export default CanvasComponent;
