import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class CharacterNav extends Component {
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
                            <Link id="nav-item-main" className="nav-link" to="/CharactersCollection/ShowAllCharacters">Show all characters</Link>
                        </div>
                        <div className="col-sm-auto">
                            <Link id="nav-item-main" className="nav-link" to="/CharactersCollection/GetCharacterById">Search characters by ID</Link>
                        </div>
                        <div className="col-sm-auto">
                            <Link id="nav-item-main" className="nav-link" to="/CharactersCollection/GetCharacterByName">Search characters by name</Link>
                        </div>
                        <div className="col-sm-auto">
                            <Link id="nav-item-main" className="nav-link" to="/CharactersCollection/AddNewCharacter">Add new character</Link>
                        </div>
                        <div className="col-sm-auto">
                            <Link id="nav-item-main" className="nav-link" to="/CharactersCollection/UpdateCharacter">Update character</Link>
                        </div>
                        <div className="col-sm-auto">
                            <Link id="nav-item-main" className="nav-link" to="/CharactersCollection/DeleteCharacter">Delete character</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <h4 className="page-identifier">Character Collection</h4>
            </div>
            </>
        )
    }
}