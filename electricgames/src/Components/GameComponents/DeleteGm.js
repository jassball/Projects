import {useEffect, useState} from "react";
import axios from "axios";
import LHUrl from "../LHUrl";

//Delete game component
const DeleteGm = () => {

const [deleteId, setDeleteId] = useState("");
const [result, setResult] = useState("");
const [resultName, setResultName] = useState("");

//Gets the game by id and deletes it by id
useEffect(() => {
    axios.get(`${LHUrl}/games/Games/${deleteId}`)
    .then(response=>setResultName(response.data.title))
    .catch(error=>console.log(error));

    axios.delete(`${LHUrl}/games/Games/${deleteId}`)
    .catch(error => {console.log(error)});
});

//Prints the game title of the deleted game 
const handleSubmit = (event) => {
    event.preventDefault();
    setResult(
        <div className="display-deleted">
            <h4>{`${resultName}`} has been deleted</h4>
        </div>
    );
}

return(
    <>
    <div className="container">
        <h1 className="page-title">Delete game</h1>
        <form onSubmit={handleSubmit}>
            <div className="div-background">
                <input type="text" className="form-resize" id="delete-game" placeholder="Id" onChange={(e)=>setDeleteId(e.target.value)}></input>
                <input type="submit" className="btn btn-danger" id="delete-game-btn" value="Delete"></input>
            </div>
        </form>
        {result}
    </div>
    </>
);
}

export default DeleteGm;