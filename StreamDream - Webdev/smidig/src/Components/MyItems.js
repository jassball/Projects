import React from 'react';
import { Button } from 'react-bootstrap';

const MyItems = ({ id, image, title, description, removeItem }) => {
  
  return (
    <div>
      <img src={image} alt="Product" className="product-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <Button className='btn-danger' onClick={() => removeItem(id)}>Remove</Button>
    </div>
  );
}

export default MyItems;