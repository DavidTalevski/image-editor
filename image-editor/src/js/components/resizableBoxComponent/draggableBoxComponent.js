import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import "../../../css/resizable.css";
import CanvasResolution from '../../settings/canvasResolution';

const DraggableBoxComponent = ({ initialWidth, initialHeight, onBoxChange }) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleDrag = (e, data) => {
        const { x, y } = data;
        setX(x);
        setY(y);
        // Call the external function with the updated values
        if (onBoxChange) {
            onBoxChange(x, y, width, height);
        }
    };

    const handleResize = (e, { size }) => {
        const { width, height } = size;
        setWidth(width);
        setHeight(height);
        // Call the external function with the updated values
        if (onBoxChange) {
            onBoxChange(x, y, width, height);
        }
    };

    const boxStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: '2px solid #3498db', // Nice blue border
        boxSizing: 'border-box',
    };

    return (
        <Draggable
            bounds="parent"
            cancel=".react-resizable-handle"
            onDrag={handleDrag}
        >
            <ResizableBox
                width={width}
                height={height}
                maxConstraints={[CanvasResolution.WIDTH, CanvasResolution.HEIGHT]}
                minConstraints={[100, 100]}
                onResize={handleResize}
            >
                <div style={boxStyle}>
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default DraggableBoxComponent;
