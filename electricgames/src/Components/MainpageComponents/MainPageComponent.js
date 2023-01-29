import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class MainPageComponent extends Component {
    render () {
        return (
            <div className="container">
                <div className="header">
                    <h1 className="header-title">Electric Games</h1>
                    <p>Ahead of the curve with 200+ active projects.<br/>
                    Currently employed by Kristiania, Bergen.</p>
                    <div id="main-buttons" className="row justify-content-center gy-2">
                        <div className="col-md-auto">
                            <Link to="/GamesCollection"><button id="main-btn" className="btn">Game Collection</button></Link>    
                        </div>
                        <div className="col-md-auto">            
                            <Link to="/CharactersCollection"><button id="main-btn" className="btn">Character Collection</button></Link>    
                        </div>
                        <div className="col-md-auto">             
                            <Link to="/Quiz"><button id="main-btn" className="btn">Quiz Gamepage</button></Link>  
                        </div>
                    </div>  
                </div>
            </div> 
        );
    }
}

