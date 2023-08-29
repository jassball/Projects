import React, { useState, useRef } from 'react';
import { LayeredRectangleIcon, RectangleIcon, AddRectangleIcon } from '../Icons';

// Component for individual scene item
const SceneItem = (props) => {
    const [isEditing, setIsEditing] = useState(false); // State to track editing mode
    const [editableText, setEditableText] = useState(props.text); // State for editable text
    const clickCountRef = useRef(0); // Ref to track click count

    // Handle deletion of a scene item
    const handleDelete = (id) => {
        props.deleteScene(id);
    };

    // Handle click on a scene item
    const handleClick = () => {
        clickCountRef.current++;
        if (clickCountRef.current === 1) {
            setTimeout(() => {
                if (clickCountRef.current === 2) {
                    setIsEditing(true); // Enable editing mode on double click
                }
                clickCountRef.current = 0;
            }, 300);
        }
        props.setActive(editableText);
    };

    // Handle input change in the editable text field
    const handleInputChange = (e) => {
        setEditableText(e.target.value);
    };

    // Handle key down event in the editable text field
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission (if wrapped in a form element)
            handleInputBlur();
        }
    };

    // Handle blur event in the editable text field
    const handleInputBlur = () => {
        setIsEditing(false);
        const updatedScenes = props.scenes.map((scene) => {
            if (scene.name === props.text) {
                return {
                    ...scene,
                    name: editableText,
                };
            }
            return scene;
        });

        props.setScenes(updatedScenes);
        props.setActive(editableText);
    };

    // Handle click event in the editable text field
    const handleInputClick = (e) => {
        e.preventDefault(); // Prevent input from being deselected when clicked
        e.stopPropagation(); // Prevent the click event from propagating to the parent div
    };

    return (
        <div id={`item${props.id}`} className={`overlay-item ${props.additionalClass} position-relative`} onClick={handleClick}>
            <div className={`overlay-item-icon `}>{props.icon}</div>
            <div className={`overlay-item-text ${props.isActive ? 'vizrt-color-primary' : ''}`}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editableText}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        autoFocus
                        className="scene-item-input"
                        onClick={handleInputClick}
                        onKeyDown={handleInputKeyDown}
                    />
                ) : (
                    <span className={`overlay-item-text ${props.isActive ? 'vizrt-color-primary' : ''}`}>{editableText}</span>
                )}
            </div>
            <button className='scene-item-delete-btn' onClick={() => handleDelete(props.id)}>X</button>
        </div>
    );
}

// Component for the "New Scene" item
const NewSceneItem = (props) => {
    const handleClick = () => {
        // checks if New Scene already exists in the scenes array if it does add 1 to the end of the name. If there is New Scene 1 then add 2 to the end of the name and so on.
        const newSceneName = props.scenes.some((scene) => scene.name === 'New Scene')
            ? `New Scene ${props.scenes.filter((scene) => scene.name.includes('New Scene')).length + 1}`
            : 'New Scene';

        // adds the new scene and sets the id to be 1 more than the last scene in the array
        const updatedScenes = [...props.scenes, { name: newSceneName, id: props.scenes[props.scenes.length - 1].id + 1 }];
        props.setScenes(updatedScenes);
        props.setActive(newSceneName);
    };

    return (
        <div className={`overlay-item overlay-item-new ${props.additionalClass} position-relative`} onClick={handleClick}>
            <div className='overlay-item-icon-new'>{props.icon}</div>
            <div className='overlay-item-text-new'>{props.text}</div>
        </div>
    );
}

// Component for the "All Scenes" item
const AllScenesItem = (props) => {
    return (
        <div className='overlay-item overlay-item-all position-relative'>
            <div className='overlay-item-icon-all'>{props.icon}</div>
            <div className='overlay-item-text-all'>{props.text}</div>
        </div>
    );
}

// Makes a scene item for each scene in the scenes array
const SceneRenderer = (props) => {
    return (
        <div className='scene-renderer-container'>
            <div>
                {props.scenes.map((scene, index) => {
                    const isActive = (props.selected === scene.name);
                    return (
                        <SceneItem
                            key={index}
                            id={scene.id}
                            scenes={props.scenes}
                            deleteScene={props.deleteScene}
                            setScenes={props.setScenes}
                            setActive={props.setActive}
                            isActive={isActive}
                            textOverflowFade={'overflow-fade'}
                            icon={<RectangleIcon isActive={isActive} />}
                            text={scene.name} />
                    );
                })}
            </div>
            <div className='scene-renderer-container-fade'></div>
        </div>
    );
}

// Component for the scene navbar
const SceneNavbar = () => {
    const [scenes, setScenes] = useState([
        {
            id: 0,
            name: 'Scene 1',
        },
        {
            id: 1,
            name: 'Scene 2',
        },
        {
            id: 2,
            name: 'Scene 3',
        },
    ]);

    const deleteScene = (id) => {
        const newScenes = scenes.filter((item) => item.id !== id);
        setScenes(newScenes);
    };

    const [selected, setActive] = useState(scenes[0].name);
    const handleSelect = (selection) => {
        setActive(selection);
    };

    return (
        <>
            <div className="scene-navbar">
                <div className='overlay-item-container'>
                    <AllScenesItem setActive={handleSelect} icon={<LayeredRectangleIcon />} text={'All Scenes'} selected={selected} />
                    <div className="vertical-separator"></div>
                    <SceneRenderer setActive={handleSelect} deleteScene={deleteScene} scenes={scenes} setScenes={setScenes} selected={selected} />
                    <NewSceneItem setActive={handleSelect} scenes={scenes} setScenes={setScenes} additionalClass="color-inactive" icon={<AddRectangleIcon />} text={'New'} />
                </div>
            </div>
        </>
    );
}

export default SceneNavbar;