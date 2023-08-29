import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLayerGroup, faVolumeHigh, faWandMagicSparkles, faTag } from '@fortawesome/free-solid-svg-icons';
import '../Assets/Styles/SideBar.css';

const Sidebar = ({ setSelectedType, setDiscoverFilter, setFreeFilter, setSearchInput }) => {
    const [activeButton, setActiveButton] = useState('Discover');
    const [searchActive, setSearchActive] = useState(false);

    // Handles the click of the type-select buttons
    const handleTypeClick = (type) => {
        setSelectedType(type);
        setDiscoverFilter(false);
        setFreeFilter(false);
        setActiveButton(type);
    };

    // Handles the click of the Search button
    const handleSearchClick = () => {
        setSearchActive(true);
        setDiscoverFilter(false);
        setFreeFilter(false);
        setSelectedType(null);
        setActiveButton('');
    };

    return (
        <div className='sidebar'>
            <div onClick={handleSearchClick} >
                <input
                    className={`sidebar-item-search-input ${searchActive ? 'search-active' : ''}`}
                    placeholder="Search"
                    type="search"
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>
            <div className={`sidebar-item ${activeButton === 'Discover' ? 'active' : ''}`} onClick={() => { setDiscoverFilter(true); setSelectedType(null); setFreeFilter(false); setActiveButton('Discover'); setSearchActive(false); }} >
                <div className="icon-container">
                    <FontAwesomeIcon icon={faStar} />
                </div>
                Discover
            </div>
            <div className={`sidebar-item ${activeButton === 'Overlay' ? 'active' : ''}`} onClick={() => {handleTypeClick('Overlay'); setSearchActive(false); }} >
                <div className="icon-container">
                    <FontAwesomeIcon icon={faLayerGroup} />
                </div>
                Overlays
            </div>
            <div className={`sidebar-item ${activeButton === 'Sound' ? 'active' : ''}`} onClick={() => {handleTypeClick('Sound'); setSearchActive(false); }} >
                <div className="icon-container">
                    <FontAwesomeIcon icon={faVolumeHigh} />
                </div>
                Sounds
            </div>
            <div className={`sidebar-item ${activeButton === 'Effect' ? 'active' : ''}`} onClick={() => {handleTypeClick('Effect'); setSearchActive(false); }} >
                <div className="icon-container">
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                </div>
                Effects
            </div>
            <div className={`sidebar-item ${activeButton === 'Free' ? 'active' : ''}`} onClick={() => { setFreeFilter(true); setSelectedType(null); setDiscoverFilter(false); setActiveButton('Free'); setSearchActive(false); }} >
                <div className="icon-container">
                    <FontAwesomeIcon icon={faTag} rotation={90} />
                </div>
                Free
            </div>
        </div>
    );
}

export default Sidebar;