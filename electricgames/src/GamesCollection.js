import {Routes, Route} from "react-router-dom";
import React from "react";
import GamesNav from "./Components/GameComponents/GamesNav";
import ShowAllGm from "./Components/GameComponents/ShowAllGm";
import GetGmById from "./Components/GameComponents/GetGmById";
import GetGmByTitle from "./Components/GameComponents/GetGmByTitle";
import AddNewGm from  "./Components/GameComponents/AddNewGm";
import UpdateGm from "./Components/GameComponents/UpdateGm";
import DeleteGm from "./Components/GameComponents/DeleteGm";
import SharedMenu from "./Components/MainpageComponents/SharedMenu";

//Declares routes, and builds the website with its components

const GamesMenu = () => {
    return (
    <>
        <GamesNav />
       <SharedMenu /> 
    </>
    )
}

const ShowAllGames = () => {
   return(
    <>
        <GamesNav />
        <ShowAllGm/>
    </>
    );
}

const GetGameById = () => {
    return (
    <>
        <GamesNav />
        <GetGmById />
    </>
    );
}

const GetGameByTitle = () => {
  return (
    <>
        <GamesNav />
        <GetGmByTitle />
    </>
  );
}

const AddNewGame = () => {
    return (
    <>
        <GamesNav />
        <AddNewGm />
    </>
    );
}

 const UpdateGame = () => {
   return (
    <>
        <GamesNav />
        <UpdateGm />
    </>
   );
}

 const DeleteGame = () => {
    return (
    <>
        <GamesNav />
        <DeleteGm />
    </>
    );
}

export default function GamesCollection () {

    return (
        <Routes>
            <Route exact path="/" element={<GamesMenu/>}></Route>
            <Route path="/ShowAllGames" element={<ShowAllGames/>}></Route>
            <Route path="/SearchGameById" element={<GetGameById/>}></Route>
            <Route path="/SearchGameByTitle" element={<GetGameByTitle/>}></Route>
            <Route path="/AddNewGame" element={<AddNewGame/>}></Route>
            <Route path="/UpdateGame" element={<UpdateGame/>}></Route>
            <Route path="/DeleteGame" element={<DeleteGame/>}></Route>
        </Routes>
    );
}








