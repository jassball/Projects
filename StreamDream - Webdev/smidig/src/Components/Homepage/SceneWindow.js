import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import '../../Assets/Styles/Homepage/SceneWindow.css';

const SceneWindow = (props) => {
    const [zoom, setZoom] = useState(0.6);
    const zoomableWindowRef = useRef(null);
    const zoomableWindowContainerRef = useRef(null);
    const [isClickValid, setIsClickValid] = useState(false);
    const { setPackageItems } = props;
    

    // Stops the click event from triggering when dragging
    const handleMouseDown = () => {
        setIsClickValid(true);

        setTimeout(() => {
            setIsClickValid(false);
        }, 200);
    };

    // Zoom in and out with ctrl + scroll
    useEffect(() => {
        const handleScroll = (event) => {
            if (event.ctrlKey) {
                event.preventDefault();
                if (event.deltaY > 0) {
                    setZoom((prev) => prev - 0.1);
                } else if (event.deltaY < 0) {
                    setZoom((prev) => prev + 0.1);
                }
            }
        };

        document.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []);

    // Updates the handleDrag function so the positions of the draggable elements adjusts accordingly when the zoom changes
    const handleDrag = (index, event, ui) => {
        const { deltaX, deltaY } = ui;
        const zoomFactor = 1 / zoom;
        const scaledDeltaX = deltaX * zoomFactor;
        const scaledDeltaY = deltaY * zoomFactor;

        props.setPackageItems((prevPackageItems) => {
            return prevPackageItems.map((item, i) => {
                if (i === index || item.selected) {
                    return {
                        ...item,
                        position: {
                            x: item.position.x + scaledDeltaX,
                            y: item.position.y + scaledDeltaY,
                        },
                    };
                }
                return item;
            });
        });

    };

    // Toggles the selected state of the clicked element when clicking on it
    const handleClick = (index, event) => {
        if (!isClickValid) {
            return;
        }
        if (!event.ctrlKey) {
            props.setPackageItems((prevPackageItems) => {
                const newPackageItems = prevPackageItems.map((item, i) => ({
                    ...item,
                    selected: i === index ? !item.selected : false,
                }));
                return newPackageItems;
            });
        } else {
            props.setPackageItems((prevPackageItems) => {
                const newPackageItems = [...prevPackageItems];
                newPackageItems[index].selected = !newPackageItems[index].selected;
                return newPackageItems;
            });
        }
    };

    // Deselect all elements when clicking outside of the zoomable window
    useEffect(() => {
        const zoomableWindowContainer = zoomableWindowContainerRef.current;
    
        const handleContainerClick = (event) => {
            const isDraggableElement = event.target.classList.contains('example-item');
    
            if (!isDraggableElement) {
                setPackageItems((prevPackageItems) =>
                    prevPackageItems.map((item) => ({
                        ...item,
                        selected: false,
                    }))
                );
            }
        };
    
        zoomableWindowContainer.addEventListener('click', handleContainerClick);
    
        return () => {
            zoomableWindowContainer.removeEventListener('click', handleContainerClick);
        };
    }, [setPackageItems]);

    return (
        <>
            <div className="home-scene-container position-relative">
                <div className="zoomable-window-container" ref={zoomableWindowContainerRef}>
                    <div className="zoomable-window" style={{ zoom }} ref={zoomableWindowRef} >
                        {props.packageItems.map((item, index) => (
                            item.active && (
                                <Draggable
                                    position={item.position}
                                    onDrag={(event, ui) => handleDrag(index, event, ui)}
                                    bounds='parent'
                                    key={index}
                                    onMouseDown={handleMouseDown}
                                >
                                    <div
                                        className={`example-item ${item.selected ? 'selected' : ''}`}
                                        style={item.style}
                                        onClick={(event) => handleClick(index, event)}>
                                        {item.type === 'html' ? item.text : <div dangerouslySetInnerHTML={{ __html: item.text }}></div>}
                                        {item.type === 'svg' ? <div className='non-clickable' dangerouslySetInnerHTML={{ __html: item.svg }}></div> : ''}
                                        {item.type === 'image' ? <img style={item.imgStyle} className='non-clickable' src={item.src} alt={item.text} /> : ''}
                                    </div>
                                </Draggable>
                            )
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default SceneWindow;
