import { useEffect, useState } from 'react';
import '../Assets/Styles/StoreItemPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import PaymentForm from './PaymentForm';

const StoreItemPage = () => {
    const [storeItem, setStoreItem] = useState(null);
    const [isOwned, setIsOwned] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Checks if the user has bought the item
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const sessionID = searchParams.get('session_id');

        if (sessionID) {
            const currentItemId = localStorage.getItem('currentItemId');
            const ownedItems = JSON.parse(localStorage.getItem('ownedItems')) || [];

            if (!ownedItems.includes(currentItemId)) {
                ownedItems.push(currentItemId);
                localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
                setIsOwned(true);
            }
        }
    }, [location.search]);

    // Fetches the item from the database
    useEffect(() => {
        const currentItemId = localStorage.getItem('currentItemId');
        const ownedItems = JSON.parse(localStorage.getItem('ownedItems')) || [];

        setIsOwned(ownedItems.includes(currentItemId));

        axios.get(`http://localhost:5233/StoreItem/${currentItemId}`)
            .then(res => {
                setStoreItem(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const backButton = () => {
        navigate('/store/');
    };

    // Adds the item to the owned items list
    const handleFreeItem = () => {
        const currentItemId = localStorage.getItem('currentItemId');
        let ownedItems = JSON.parse(localStorage.getItem('ownedItems')) || [];
        if (!ownedItems.includes(currentItemId)) {
            ownedItems.push(currentItemId);
            localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
            setIsOwned(true);
        }
    };

    return (
        <div className="container-fluid storeItemContainer">
            <div className='row'>
                <div className="col-md-5 infobox">
                    <button className="back-button" onClick={backButton}>Back</button>
                    {storeItem && <h1 className='single-title'>{storeItem.title}</h1>}
                    {storeItem && <p id="long-desc">{storeItem.longDesc}</p>}
                    {storeItem && <StarRating rating={storeItem.rating} />}
                </div>
                <div className='col-md-7 image-box'>
                    {storeItem && <img src={`http://localhost:5233/images/${storeItem.image}`} alt="Product" className="single-image" />}
                    <p></p>
                    <div className='background-buy'>
                        {!isOwned && storeItem && storeItem.price === 0 && (
                            <button onClick={handleFreeItem}>Free</button>
                        )}
                        {!isOwned && storeItem && storeItem.price !== 0 && (
                            <>
                                <p id="price-label">{storeItem.price}</p>
                                <PaymentForm />
                            </>
                        )}
                        {isOwned && (
                            <div className='owned'>Owned</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreItemPage;