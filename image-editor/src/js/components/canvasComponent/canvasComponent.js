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
            width={"100%"}
            height={"100%"}
            className="canvas-container"
            style={{
                position: "relative",
                top: 0,
                left: 0,
                maxWidth: "100%",
                maxHeight: "100%"
            }}
        ></canvas >
    );
});

export default CanvasComponent;