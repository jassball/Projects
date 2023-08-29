import React from 'react';
import '../Assets/Styles/StarRating.css';
const StarRating = ({ rating }) => {
    const MAX_STARS = 5;

    // Render the stars
    const renderStars = () => {
        const stars = parseInt(rating);
        const starIcons = [];

        for (let i = 0; i < MAX_STARS; i++) {
            if (i < stars) {
                starIcons.push(<span key={i} className="star-icon filled">&#9733;</span>);
            } else {
                starIcons.push(<span key={i} className="star-icon empty">&#9734;</span>);
            }
        }

        return starIcons;
    };

    return (
        <div className="star-rating">
            <span className="rating-label">Rating: </span>
            {renderStars()}
        </div>
    );
};

export default StarRating;



