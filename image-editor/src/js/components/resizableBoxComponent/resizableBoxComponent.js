import React from 'react';
import { ResizableBox } from 'react-resizable';
import "../../../css/resizable.css"


const ResizableBoxComponent = ({ width, height, handleResize }) => {

    const onResize = (e, { size }) => {
        if (handleResize) handleResize(size.width, size.height)
    };

    return (
        <div>
            <ResizableBox width={width} height={height} maxConstraints={[1024, 768]} onResize={onResize}>
                <div style={{ backgroundColor: 'rgba(0, 128, 0, 0.3)', width: '100%', height: '100%' }}>
                    Resize Box
                </div>
            </ResizableBox>
        </div>
    );
};

export default ResizableBoxComponent;

