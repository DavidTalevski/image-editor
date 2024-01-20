import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

const DraggableBoxComponent = ({ initialWidth, initialHeight, onBoxChange, containerRef }) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [maxConstraints, setMaxConstraints] = useState([1000, 1000]);

    useEffect(() => {
        const updateMaxConstraints = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;
                setMaxConstraints([containerWidth, containerHeight]);
            }
        };

        // Initial update
        updateMaxConstraints();

        // Update on window resize
        window.addEventListener('resize', updateMaxConstraints);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', updateMaxConstraints);
        };
    }, [containerRef]);

    const handleDrag = (e, data) => {
        const { x, y } = data;
        setX(x);
        setY(y);

        if (onBoxChange) {
            onBoxChange(x, y, width, height);
        }
    };

    const handleResize = (e, { size }) => {
        const { width, height } = size;
        setWidth(width);
        setHeight(height);

        if (onBoxChange) {
            onBoxChange(x, y, width, height);
        }
    };

    const boxStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: '2px solid #3498db',
        boxSizing: 'border-box',
        position: 'relative',
    };

    const resizableBoxStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
    };

    return (
        <Draggable bounds="parent" cancel=".react-resizable-handle" onDrag={handleDrag}>
            <div style={resizableBoxStyle}>
                <ResizableBox
                    width={width}
                    height={height}
                    maxConstraints={maxConstraints}
                    minConstraints={[100, 100]}
                    onResize={handleResize}
                >
                    <div style={boxStyle} />
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default DraggableBoxComponent;
