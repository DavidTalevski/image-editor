import React from 'react';
import { ResizableBox } from 'react-resizable';
import "../../../css/resizable.css"; // Make sure to adjust the path if necessary

const ResizableBoxComponent = ({ width, height, handleResize }) => {
    const onResize = (e, { size }) => {
        if (handleResize) handleResize(size.width, size.height);
    };

    const boxStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 128, 0, 0)', // Fully transparent background
        border: '2px solid #3498db', // Nice blue border
        boxSizing: 'border-box', // Include border in width and height
    };

    return (
        <div>
            <ResizableBox width={width} height={height} maxConstraints={[1024, 768]} onResize={onResize}>
                <div style={boxStyle}>
                </div>
            </ResizableBox>
        </div>
    );
};

export default ResizableBoxComponent;