import '../../Assets/Styles/Homepage/EditWindow.css';
import { useState, useEffect, useRef } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';

const EditWindow = ({ packageItems, setPackageItems }) => {
    const [textColor, setTextColor] = useState("#aabbcc");
    const [backgroundColor, setBackgroundColor] = useState("#aabbcc");
    const [backgroundColorBtnSelected, setBackgroundColorBtnSelected] = useState(false);
    const [textColorBtnSelected, setTextColorBtnSelected] = useState(false);
    const editWindowRef = useRef(null);
    const [isClickValid, setIsClickValid] = useState(true);
    const [inputTextColor, setInputTextColor] = useState(textColor);
    const [inputBackgroundColor, setInputBackgroundColor] = useState(backgroundColor);

    // Updates buttons when clicking on them
    useEffect(() => {
        const editWindow = editWindowRef.current;
        const handleEditWindowClick = (event) => {
            if (event.target.classList.contains('background-color-btn')) {
                setBackgroundColorBtnSelected(prev => !prev);
                setTextColorBtnSelected(false);
            } else if (event.target.classList.contains('text-color-btn')) {
                setTextColorBtnSelected(prev => !prev);
                setBackgroundColorBtnSelected(false);
            }
        };
        editWindow.addEventListener('click', handleEditWindowClick);
        return () => {
            editWindow.removeEventListener('click', handleEditWindowClick);
        };
    }, []);

    // Remove button component
    const RemoveButton = ({ index }) => {
        const handleRemove = () => {
            let newPackageItems = [...packageItems];
            newPackageItems[index].active = false;
            setPackageItems(newPackageItems);
        };

        return (
            <div className='btn-toggle-component remove' onClick={handleRemove}>
                Remove
            </div>
        )
    }

    // Add button component
    const AddButton = ({ index }) => {
        const handleAdd = () => {
            let newPackageItems = [...packageItems];
            newPackageItems[index].active = true;
            setPackageItems(newPackageItems);
        };

        return (
            <div className='btn-toggle-component' onClick={handleAdd}>
                Add
            </div>
        );
    };

    // Add all button component
    const AddAllButton = () => {
        const handleAddAll = () => {
            let newPackageItems = [...packageItems];
            newPackageItems.forEach(item => item.active = true);
            setPackageItems(newPackageItems);
        };

        return (
            <div className='btn-toggle-component' onClick={handleAddAll}>
                Add all
            </div>
        );
    };

    // Remove all button component
    const RemoveAllButton = () => {
        const handleRemoveAll = () => {
            let newPackageItems = [...packageItems];
            newPackageItems.forEach(item => item.active = false);
            setPackageItems(newPackageItems);
        };

        return (
            <div className='btn-toggle-component remove' onClick={handleRemoveAll}>
                Remove all
            </div>
        );
    };

    // Update the html element's background color when the color picker changes
    useEffect(() => {
        const newPackageItems = [...packageItems];
        newPackageItems.forEach(item => {
            if (item.selected && item.type === 'html') {
                item.style.backgroundColor = backgroundColor;
            }
        });
        setPackageItems(newPackageItems);
    }, [backgroundColor]);

    // Update the html element's text color when the color picker changes
    useEffect(() => {
        const newPackageItems = [...packageItems];
        newPackageItems.forEach(item => {
            if (item.selected && item.type === 'html') {
                item.style.color = textColor;
            }
        });
        setPackageItems(newPackageItems);
    }, [textColor]);

    // Update the color picker when the selected element changes
    useEffect(() => {
        const newPackageItems = [...packageItems];
        newPackageItems.forEach(item => {
            if (item.selected && item.type === 'html') {
                setTextColor(item.style.color);
                setBackgroundColor(item.style.backgroundColor);
            }
        });
    }, [packageItems]);

    // Toggles the selected state of the clicked element when clicking on it
    const handleClick = (index, event) => {
        if (!isClickValid) return;
        setIsClickValid(false);
        setTimeout(() => {
            setIsClickValid(true);
        }, 100);

        // dont fire if clicking an element with btn-toggle-component class
        if (event.target.classList.contains('btn-toggle-component')) return;

        if (index === -1) {
            setPackageItems((prevPackageItems) => {
                const activeItems = prevPackageItems.filter((item) => item.active);
                const allActiveSelected = activeItems.every((item) => item.selected);
                const newPackageItems = prevPackageItems.map((item) => ({
                    ...item,
                    selected: activeItems.length > 0 ? !allActiveSelected : item.selected,
                }));
                return newPackageItems;
            });
        }

        else if (!event.ctrlKey) {
            setPackageItems((prevPackageItems) => {
                const newPackageItems = prevPackageItems.map((item, i) => ({
                    ...item,
                    selected: i === index ? !item.selected : false,
                }));
                return newPackageItems;
            });
        } else {
            setPackageItems((prevPackageItems) => {
                const newPackageItems = [...prevPackageItems];
                newPackageItems[index].selected = !newPackageItems[index].selected;
                return newPackageItems;
            });
        }
    };

    // Makes sure the inputed value is a valid hex color before setting the state
    const handleTextColor = (e) => {
        // Check if value is a valid hex color
        setInputTextColor(e.target.value);
        if (!/^#[0-9A-F]{6}$/i.test(e.target.value)) return;
        setTextColor(e.target.value);
    };

    // Makes sure the inputed value is a valid hex color before setting the state
    const handleBackgroundColor = (e) => {
        // Check if value is a valid hex color
        setInputBackgroundColor(e.target.value);
        if (!/^#[0-9A-F]{6}$/i.test(e.target.value)) return;
        setBackgroundColor(e.target.value);
    };

    return (
        <div className='home-tools-edit-container' ref={editWindowRef}>
            <div className='package-components-container'>
                <div className={`package-component-title package-component ${packageItems.some(item => item.active) && packageItems.every(item => item.selected) ? 'package-component-selected' : ''}`}
                    onClick={(event) => handleClick(-1, event)}>
                    Package component
                    {packageItems.every(item => item.active) ? <RemoveAllButton /> : <AddAllButton />}
                </div>
                {packageItems.map((item, index) => (
                    <div
                        key={index}
                        className={`package-component ${item.selected && item.active ? 'package-component-selected' : ''}`}
                        onClick={(event) => handleClick(index, event)}
                    >
                        {item.name}
                        {item.active ? <RemoveButton index={index} /> : <AddButton index={index} />}
                    </div>
                ))}
            </div>

            <div className='edit-element-container'>
                <div className="edit-container-title">Edit elements</div>
                <div style={packageItems.some(item => item.selected && item.active && item.type === 'html') ? { display: "block" } : { display: "none" }}>
                    <div className="background-color-component-container edit-element-item">
                        <div className='background-color-component'>
                            Background color
                            <div className={`background-color-btn ${backgroundColorBtnSelected ? 'button-selected' : ''}`} style={{ backgroundColor: backgroundColor }}></div>
                        </div>
                        <div style={backgroundColorBtnSelected ? { display: "block" } : { display: "none" }}>
                            <HexAlphaColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                            <input type='text' className='background-color-input' value={inputBackgroundColor} onChange={(e) => handleBackgroundColor(e)} />
                        </div>
                    </div>
                    <div className="text-color-component-container edit-element-item">
                        <div className='text-color-component'>
                            Text color
                            <div className={`text-color-btn ${textColorBtnSelected ? 'button-selected' : ''}`} style={{ backgroundColor: textColor }}></div>
                        </div>
                        <div style={textColorBtnSelected ? { display: "block" } : { display: "none" }}>
                            <HexAlphaColorPicker color={textColor} onChange={setTextColor} />
                            <input type='text' className='text-color-input' value={inputTextColor} onChange={(e) => handleTextColor(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditWindow;