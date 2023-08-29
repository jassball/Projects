import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Assets/Styles/ShopItem.css';

const ShopItem = (props) => {
    const navigate = useNavigate();

    // Sets the current item id and navigates to the store item page
    const handleClick = () => {
        localStorage.setItem('currentItemId', props.id)
        navigate('/store/shopItems');
    };

    return (
        <div onClick={handleClick} className="col-xl-3 col-lg-5 col-md-5 col-sm-10 custom-col shop-item">
            <div id="product-details" className='flex-grow-1'>
                <img src={props.image} alt="Product" className="product-image" />
                <h3 className='packtitle'>{props.title}</h3>
                <p className='desccard'>{props.shortDesc}</p>
            </div>
            {props.price !== '$0' ? (

                <Button>{props.price}</Button>
            ) : (
                <Button>Free</Button>
            )}
        </div>
    );
}

export default ShopItem;