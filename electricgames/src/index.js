import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LandingPage/>
    </React.StrictMode>
);

//reportWebVitals(console.log); for å see user preformance
