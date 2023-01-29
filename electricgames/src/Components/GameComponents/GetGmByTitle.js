import {useEffect, useState} from "react";
import axios from "axios";
import LHUrl from "../LHUrl";

//Get game by title
const GetGmByTitle = () => {

    const [searchTitle, setSearchTitle] = useState("");
    const [result, setResult] = useState("")

    //Gets the game with title
    useEffect(() => {
        axios.get(`${LHUrl}/games/Games/title/${searchTitle}`)
        .then(response=>setSearchTitle(response.data))
        .catch(error=>console.log(error))
    });

    //Checks if the title is in the database and prints it
    const handleSubmit = (event) => { 
        event.preventDefault();
        if(searchTitle.title == undefined){
            setResult(
                <div></div>
            );
            alert("The title does not exist")
            
        }else{
          setResult( 
            <div className="container">
                <div id="object-box">
                <article>
                        <h4 className="title">Title: {searchTitle.title}</h4>
                        <img src={`${LHUrl}/images/${encodeURIComponent(searchTitle.image)}`} className="img-fluid rounded mx-auto d-block" alt={searchTitle.image}></img>
                        <p className="id">Id: {searchTitle.id}</p>
                        <p className="platform">Platform: {searchTitle.platform}</p>
                        <p className="release-year">Release year: {searchTitle.releaseYear}</p>
                </article>
                </div>
            </div>
        );   
        }
    };
    return (
        <>
            <div className="container">
                <h1 className="page-title">Search game by Title</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div-background">
                        <p>Title is case sensitive!</p>
                        <input type="text" id="search-game-by-title-input" className="form-resize" placeholder="Enter Title:" onChange={(e) => setSearchTitle(e.target.value)}></input>
                        <input className="btn btn-success" type="submit" id="search-game-by-title-btn" value="Submit"></input>
                    </div>
                </form> 
            </div>
            {result}
        </>
    )
};

export default GetGmByTitle;