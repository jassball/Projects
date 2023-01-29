import {useEffect, useState} from "react";
import axios from "axios";
import LHUrl from "../LHUrl"

//Add a new character component
const AddnewChr = () => {

const [id, setId] = useState("");
const [name, setCharacterName] = useState("");
const [game, setGame] = useState("");
const [selectedImage, setSelectedImage] = useState("");
const [image, setImage] = useState("");
const [newCharacter, setNewCharacter] = useState([]);
const [result, setResult] = useState("");

//Adds the info to a character object
useEffect(() =>{
    setNewCharacter({id, name, game, image})
},[id, name, game, image])

//Validates that the id is 24 or 0 and posts the character
async function handleSubmit (event) {
    event.preventDefault()
    if(id.length == 24 || id.length == 0) {
    await postNewCharacter(newCharacter, selectedImage);
    } else {
        alert("ID has to be 24 characters or numbers long");
    }
}

//Gets the image-file and the image name
const handleFiles = (event) => {
    setSelectedImage(event.target.files[0]);
    setImage(event.target.files[0].name);
}

//Posts the character and checks if user has added a picture and posts it
const postNewCharacter = async(newCharacter, selectedImage) => {
    await axios.post(`${LHUrl}/gamecharacters/GameCharacters`, JSON.stringify(newCharacter),
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response)=>{console.log(response)})
    .catch(error => {console.log(error)});

    if(selectedImage.length == 0) {} else { 
        const fd = new FormData();
        fd.append("file", selectedImage);
        try {
            await axios({
                method: "post",
                url: `${LHUrl}/gamecharacters/GameCharacters/image`,
                data: fd,
                headers: {"Content-Type": "multipart/form-data"}
            });
        } catch (error) {
            console.log(error);
        }}
        setResult(
            <div className="page-title">
                <p>{`${newCharacter.name}`} has been added!</p>
            </div>
        )
}

return(
    <>
    <div className="container">
        <form onSubmit={handleSubmit}>
            <h1 className="page-title">Add new Character</h1>
            <div id="add-new" className="row">
                <article className="col-md-11 col-sm-6">
                    <p>Character ID can be auto-generated if you leave it empty</p>
                    <input type="text" className="form-resize" id="add-character-id" placeholder="Enter character id" onChange={(e)=>setId(e.target.value)}></input>
                    <input type="text" className="form-resize" id="add-character-name" placeholder="Enter character name" onChange={(e)=>setCharacterName(e.target.value)}></input>
                    <input type="text" className="form-resize" id="add-character-game" placeholder="Enter character game" onChange={(e)=>setGame(e.target.value)}></input>         
                    <input type="file" id="add-character-image"  onChange={handleFiles}></input>
                    <input type="submit" className="btn btn-success" id="add-character-btn" value="Submit"></input> 
                </article>
            </div>              
        </form>
        {result}
    </div>
        
    </>
);
}

export default AddnewChr;