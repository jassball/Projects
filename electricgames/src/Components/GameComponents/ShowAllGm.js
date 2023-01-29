import {useEffect, useState} from "react";
import axios from "axios";
import LHUrl from "../LHUrl";

//Shows all games 
const ShowAllGm = () => {
    const [games, setGames] = useState([]);

    //Gets all the games in an array
    useEffect(() => {
        axios.get(`${LHUrl}/games/Games`)
        .then(response=>setGames(response.data))
        .catch(error=>console.log(error))
    }, []);

    return (
    <>
        <div className="container">
            <h1 className="page-title">Showing all games</h1>
            <div className="row">
                {games.map(game=>{
                    return(
                        <div key={game.id} id="object-boxes" className="col-lg-5 col-sm-12">
                            <article>
                                <h4 className="title">Title: {game.title}</h4>
                                <img src={`${LHUrl}/images/${encodeURIComponent(game.image)}`} className="img-fluid rounded mx-auto d-block" alt={game.image}></img>
                                <p className="id">Id: {game.id}</p>
                                <p className="platform">Platform: {game.platform}</p>
                                <p className="release-year">Release year: {game.releaseYear}</p>
                            </article>
                        </div>
                    );
                })}
            </div>
        </div> 
    </>
    );
};

export default ShowAllGm;