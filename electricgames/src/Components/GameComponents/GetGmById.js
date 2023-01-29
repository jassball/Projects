import {useEffect, useState} from "react";
import axios from "axios";
import LHUrl from "../LHUrl";

//Get game by id component
const GetGmById = () => {
    const [searchId, setSearchId] = useState("");
    const [result, setResult] = useState("");
    
    //Gets the game with id
    useEffect(() => {
        axios.get(`${LHUrl}/games/Games/${searchId}`)
        .then(response=>setSearchId(response.data))
        .catch(error=>console.log(error))
    });

    //When submitted validated that the id exists in the database and prints it
    const handleSubmit = (event) => { 
        event.preventDefault();
        if(searchId.id == undefined) {
            setResult(
                <div></div>
            );
           alert("The id doesnt exist")   
        } else {
             setResult(  
                <div className="container">
                    <div id="object-box">
                    <article>
                        <h4 className="title">Title: {searchId.title}</h4>
                        <img src={`${LHUrl}/images/${encodeURIComponent(searchId.image)}`} className="img-fluid rounded mx-auto d-block" alt={searchId.image}></img>
                        <p className="id">Id: {searchId.id}</p>
                        <p className="platform">Platform: {searchId.platform}</p>
                        <p className="release-year">Release year: {searchId.releaseYear}</p>
                    </article>
                    </div>
                </div>
                );
        }
    };
    return (
        <>
            <div className="container">
                <h1 className="page-title">Search game by ID</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div-background">
                        <input type="text" id="search-game-by-id-input" className="form-resize" placeholder="Enter Id:" onChange={(e) => setSearchId(e.target.value)}></input>
                        <input className="btn btn-success" type="submit" id="search-game-by-id-btn" value="Submit"></input>
                    </div> 
                </form>
            </div>
            {result}
        </>
    )
}

export default GetGmById;