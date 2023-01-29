import React, {Component} from 'react';
import {Link} from "react-router-dom";

//Navbar 
export default class GamesNav extends Component {
    render() {
        return (
            <>
                <nav className="navbar-background">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-auto">
                                <Link to="/"><h1 className="nav-brand">Electric Games</h1></Link>
                            </div>
                            <div className="col-sm-auto">
                                <Link id="nav-item-main" className="nav-link" to="/GamesCollection/ShowAllGames">Show all games</Link>
                            </div>
                            <div className="col-sm-auto">
                                <Link id="nav-item-main" className="nav-link" to="/GamesCollection/SearchGameById">Search game by ID</Link>
                            </div>
                            <div className="col-sm-auto">
                                <Link id="nav-item-main" className="nav-link" to="/GamesCollection/SearchGameByTitle">Search game by title</Link>
                            </div>
                            <div className="col-sm-auto">
                                <Link id="nav-item-main" className="nav-link" to="/GamesCollection/AddNewGame">Add new game</Link>
                            </div>
                            <div className="col-sm-auto">
                                <Link id="nav-item-main" className="nav-link" to="/GamesCollection/UpdateGame">Update game</Link>
                            </div>
                            <div className="col-sm-auto"><Link id="nav-item-main" className="nav-link" to="/GamesCollection/DeleteGame">Delete game</Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <div>
                    <h4 className="page-identifier">Game Collecton</h4>
                </div>
            </>
        )
    }
}