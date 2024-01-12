import React from 'react';
import { ResizableBox } from 'react-resizable';
import CanvasResolution from '../../settings/canvasResolution';

const ResizableBoxComponent = ({ width, height, handleResize }) => {
    const onResize = (e, { size }) => {
        if (handleResize) handleResize(size.width, size.height);
    };

    const boxStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 128, 0, 0)',
        border: '2px solid #3498db',
        boxSizing: 'border-box',
    };

    return (
        <div>
            <ResizableBox
                width={width}
                height={height}
                maxConstraints={[CanvasResolution.WIDTH, CanvasResolution.HEIGHT]}
                onResize={onResize}>
                <div style={boxStyle} />
            </ResizableBox>
        </div>
    );
};

export default ResizableBoxComponent;