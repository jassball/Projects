import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faVolumeHigh, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import '../Assets/Styles/SideBar.css';

const SidebarMyPackages = ({ setSelectedType }) => {
    const [activeButton, setActiveButton] = useState('Overlay');

    const handleTypeClick = (type) => {
        setSelectedType(type);
        setActiveButton(type);
    };

    return (
        <div className='sidebar'>
            <div
                className={`sidebar-item ${activeButton === 'Overlay' ? 'active' : ''}`}
                onClick={() => handleTypeClick('Overlay')}>
                <div className="icon-container">
                    <FontAwesomeIcon icon={faLayerGroup} />
                </div>
                Overlays
            </div>

            <div
                className={`sidebar-item ${activeButton === 'Sound' ? 'active' : ''}`}
                onClick={() => handleTypeClick('Sound')}>
                <div className="icon-container">
                    <FontAwesomeIcon icon={faVolumeHigh} />
                </div>
                Sounds
            </div>

            <div
                className={`sidebar-item ${activeButton === 'Effect' ? 'active' : ''}`}
                onClick={() => handleTypeClick('Effect')}>
                <div className="icon-container">
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                </div>
                Effects
            </div>
        </div>
    );
};

export default SidebarMyPackages;