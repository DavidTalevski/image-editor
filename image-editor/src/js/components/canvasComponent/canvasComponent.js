import React, { useRef } from 'react';

const CanvasComponent = React.forwardRef(ref => {
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
            style={{ border: '1px solid black' }}
        ></canvas>
    );
});

export default CanvasComponent;