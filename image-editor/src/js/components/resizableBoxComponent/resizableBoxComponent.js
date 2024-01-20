import React, { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';

const ResizableBoxComponent = ({ initialWidth, initialHeight, handleResize, containerRef }) => {
    const [maxConstraints, setMaxConstraints] = useState([1000, 1000]);

    useEffect(() => {
        const updateMaxConstraints = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;
                setMaxConstraints([containerWidth, containerHeight]);
            }
        };
        updateMaxConstraints();

        window.addEventListener('resize', updateMaxConstraints);

        return () => {
            window.removeEventListener('resize', updateMaxConstraints);
        };
    }, [containerRef]);

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

    const resizableBoxStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
    };

    return (
        <div style={resizableBoxStyle}>
            <ResizableBox
                width={initialWidth}
                height={initialHeight}
                maxConstraints={maxConstraints}
                onResize={onResize}
            >
                <div style={boxStyle} />
            </ResizableBox>
        </div>
    );
};

export default ResizableBoxComponent;
