import { useState, useEffect } from 'react';
import SceneNavbar from './Homepage/SceneNavbar';
import '../Assets/Styles/Homepage/Home.css';
import PackagesWindow from './Homepage/PackagesWindow';
import SceneWindow from './Homepage/SceneWindow';
import EditWindow from './Homepage/EditWindow';

const Home = () => {
    const [myItems, setMyItems] = useState([]);
    const [packageItems, setPackageItems] = useState([
        {
            id: 0,
            type: 'image',
            name: 'Background preview',
            active: false,
            selected: false,
            position: { x: 0, y: 0 },
            src: 'https://i.ytimg.com/vi/hbkSUl4gX5E/maxresdefault.jpg',
            imgStyle: {
                width: '1918px',
                height: '1078px',
                objectFit: 'cover',
            },
        },
        {
            id: 1,
            type: 'html',
            name: 'Header',
            active: false,
            selected: false,
            position: { x: 0, y: 0 },
            text: 'User123 - 1000 followers',
            style: {
                height: '50px',
                width: '100%',
                backgroundColor: '#7a043f',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
        {
            id: 2,
            type: 'html',
            name: 'Icon frame',
            active: false,
            selected: false,
            position: { x: 20, y: 746 },
            style: {
                width: '300px',
                height: '300px',
                backgroundColor: '#7a043f',
                color: '#ffffff',
                borderRadius: '16px',
                padding: '16px',
            }

        },
        {
            id: 3,
            type: 'html',
            name: 'Sub counter',
            active: false,
            selected: false,
            position: { x: 20, y: 60 },
            text: 'SubCount: 69/420',
            style: {
                height: '60px',
                backgroundColor: '#7a043f',
                color: '#ffffff',
                padding: '0 16px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
            }
        },
        {
            id: 4,
            type: 'html',
            name: 'Social media',
            active: false,
            selected: false,
            position: { x: 1600, y: 990 },
            text: 'youtube.com/User123',
            style: {
                fontSize: '24px',
                height: '60px',
                backgroundColor: '#7a043f',
                color: '#ffffff',
                padding: '0 16px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
            }
        },
        {
            id: 5,
            type: 'svg',
            name: 'User preview',
            active: false,
            selected: false,
            position: { x: 36, y: 762 },
            svg: '<svg width="268" height="268" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">            <g clip-path="url(#clip0_1_2)">            <rect width="200" height="200" fill="#628CA4"/>            <path d="M150.984 154.579C151.661 135.042 131.096 123 120.941 123C112.055 123 93.0134 128.474 96.3985 152.053C99.1066 170.916 117.556 177.877 126.442 179C134.34 179 150.307 174.116 150.984 154.579Z" fill="#200F3C"/>            <path d="M142.987 153.376C143.529 137.677 127.077 128 118.953 128C111.844 128 96.6107 132.398 99.3188 151.346C101.485 166.504 116.244 172.098 123.353 173C129.672 173 142.445 169.075 142.987 153.376Z" fill="#17111F"/>            <path d="M49.5 152.5C44.3333 103.167 23.7 7.4 -17.5 19C-58.7 30.6 10 112.833 49.5 152.5Z" fill="#90271D"/>            <path d="M46.7174 176.466C41.5507 127.132 20.9174 31.3657 -20.2826 42.9657C-61.4827 54.5657 7.21735 136.799 46.7174 176.466Z" fill="#70211A"/>            <path d="M122.41 161.066L132.91 207.566L122.41 219.566L-12.5896 223.066L-19.5896 110.066C-23.7563 97.0658 -25.4896 74.1658 0.910378 86.5658C33.9104 102.066 43.9104 113.566 46.4104 115.066C48.4104 116.266 97.9104 146.232 122.41 161.066Z" fill="#FEA806"/>            <path d="M80 184.5C80 191.3 76.6667 199.333 75 202.5H73.5L5.5 217.5C-55.8333 159.167 -152.7 50.6 -49.5 83C79.5 123.5 80 176 80 184.5Z" fill="#CD9120"/>            <path d="M64.5 187.5C64.1 185.1 62.6667 182.167 62 181C55.6667 175.167 43 165.7 43 174.5C43 183.3 40.3333 190.5 39 193L48 200C50.6667 201.333 56.8 203.2 60 200C64 196 65 190.5 64.5 187.5Z" fill="#DDB3A1"/>            <path d="M45.3359 66.1666L43.3359 99.1666L47.8359 108.667L130.336 101.167C136.503 100.5 150.536 99.1666 157.336 99.1666C165.836 99.1666 173.836 89.6666 173.836 82.6666C173.836 77.0666 166.503 72.6666 162.836 71.1666C169.669 68.4999 184.236 60.1666 187.836 48.1666C192.336 33.1666 178.836 23.1666 170.336 20.1666C163.536 17.7666 154.836 22.4999 151.336 25.1666C153.836 17.1666 150.336 10.6666 148.836 5.66656C147.336 0.666558 135.336 -4.83344 118.836 -0.333442C105.636 3.26656 90.3359 19.4999 84.3359 27.1666C81.3359 23.1666 59.3359 20.6666 47.8359 33.1666C38.6359 43.1666 42.3359 59.3332 45.3359 66.1666Z" fill="url(#paint0_radial_1_2)"/>            <path d="M143.127 125C143.127 161.878 123.127 169.667 111.627 169L86.048 163.615C85.8033 163.933 85.5909 163.818 85.5 163.5L86.048 163.615C86.7003 162.768 87.5818 158.845 87 147.5C86 128 68.5 123 60 120C53.2 117.6 46.6269 116 43.6269 117C43.6269 115.667 43.0269 111.7 40.6269 106.5C38.2269 101.3 43.2936 95.6667 46.1269 93.5C49.4602 92 56.7269 90.4 59.1269 96C61.274 101.01 60.3798 104.526 59.4515 106.046C62.9169 101.212 69.9145 91.7124 72.6269 89C76.1269 85.5 68.6269 69.5 72.6269 65C76.6269 60.5 79.1269 60 101.627 60C119.627 60 130.794 63.3333 134.127 65C136.127 69.6667 143.127 70 143.127 125Z" fill="url(#paint1_radial_1_2)"/>            <path d="M88.9709 152.5C89.7709 129.3 65.4709 115 53.4709 115C42.9709 115 20.4709 121.5 24.4709 149.5C27.6709 171.9 49.4709 180.167 59.9709 181.5C69.3042 181.5 88.1709 175.7 88.9709 152.5Z" fill="#200F3C"/>            <path d="M82.9828 151.271C83.6967 130.687 62.0104 118 51.3011 118C41.9304 118 21.8505 123.767 25.4203 148.609C28.2761 168.483 47.7313 175.817 57.102 177C65.4314 177 82.2688 171.854 82.9828 151.271Z" fill="#6553C2"/>            <path d="M71.9872 148.812C72.5166 133.462 56.4387 124 48.4991 124C41.5519 124 26.665 128.301 29.3116 146.827C31.4288 161.648 45.8525 167.118 52.7997 168C58.975 168 71.4579 164.162 71.9872 148.812Z" fill="#886FFF"/>            <path d="M34 99C36.5 94.5 39.35 90.5 43.85 91L44.1 86.5L39.5 87C34.6667 93.6667 29.5279 107.05 34 99Z" fill="#200F3C"/>            <path d="M36.5 99C36.5 112.6 43.5 122.667 47 126L36.5 142C32 136.667 23 122.2 23 107C23 91.8 34.3333 85.6667 40 84.5H44.2205L44.1 86.5C43 87 36.5 85.4 36.5 99Z" fill="#886FFF"/>            <path d="M36.5 145C35.7 142.6 10.8333 126 -1.5 118L-7 207.5H34C34.1667 209.167 36.2 207.6 43 188C51.5 163.5 37.5 148 36.5 145Z" fill="#FEA806"/>            <path d="M97.4974 91.0881L96.4974 108.088" stroke="#1E1E1E" stroke-width="3" stroke-linecap="round"/>            <path d="M135 95L134 110" stroke="#1E1E1E" stroke-width="3" stroke-linecap="round"/>            <path d="M84 74C87.3333 71 96.1 67 104.5 75" stroke="#4D3227" stroke-width="5" stroke-linecap="round"/>            <path d="M143 77.8514C139.911 80.4057 131.785 83.8114 124 77" stroke="#4D3227" stroke-width="5" stroke-linecap="round"/>            <path d="M122 105C125.167 107.667 131.4 115 131 123C130.5 133 126 134.5 123 134.5" stroke="#1E1E1E" stroke-width="3"/>            <path d="M109 147.5C104.5 145.167 93.9 138 87.5 128" stroke="#1E1E1E" stroke-width="3"/>            <path d="M55.5 109.5C55.1667 106 53.1 99.1 47.5 99.5" stroke="#4D3227" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round"/>            </g>            <defs>            <radialGradient id="paint0_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(121 41.5) rotate(128.454) scale(65.1249 86.348)">            <stop stop-color="#734D3E"/>            <stop offset="1" stop-color="#4D3227"/>            </radialGradient>            <radialGradient id="paint1_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(105.5 107) rotate(104.29) scale(54.6923 51.7273)">            <stop stop-color="#FFCEB9"/>            <stop offset="1" stop-color="#DDB3A1"/>            </radialGradient>            <clipPath id="clip0_1_2">            <rect width="200" height="200" fill="white"/>            </clipPath>            </defs>            </svg>            '  
        },
    ]);
    // const [packageItems, setPackageItems] = useState([]);

    const fetchItemData = async (id) => {
        const res = await fetch(`http://localhost:5233/StoreItem/${id}`);
        const itemData = await res.json();
        return itemData;
    };

    // UNCOMMENT WHEN DATABASE IS WORKING
    useEffect(() => {
        const ownedItems = JSON.parse(localStorage.getItem('ownedItems')) || [];

        const fetchMyItems = async () => {
            const items = [];
            for (let id of ownedItems) {
                const itemData = await fetchItemData(id);
                items.push(itemData);
            }
            setMyItems(items);
        };
        fetchMyItems();
    }, []);

    return (
        <>
            {/* Render the SceneNavbar component */}
            <SceneNavbar />

            <div className='home-container'>
                {/* Container for the "Tools" and "Scene" sections */}
                <div className='home-tools-container'>
                    <p className='element-description'>Tools</p>
                    <PackagesWindow myItems={myItems} />
                    {/* <LayersWindow /> */}
                    <EditWindow packageItems={packageItems} setPackageItems={setPackageItems} />
                </div>
                {/* Container for the "Scene" section */}
                <SceneWindow packageItems={packageItems} setPackageItems={setPackageItems} />
            </div>
        </>
    );
}

export default Home;