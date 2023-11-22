import React, { useRef, useEffect } from 'react';

const CanvasComponent = React.forwardRef(({ image }, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!image) return;
        if (!(image instanceof HTMLImageElement)) return;

        /** @type {HTMLCanvasElement} */
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

    }, [image]);

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