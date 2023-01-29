import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import GamesCollection from "./GamesCollection";
import QuizStart from "./Components/QuizComponents/Quiz";
import CharactersCollection from "./CharactersCollection";
import MainPageContent from "./Components/MainpageComponents/MainPageComponent";

//Landing page with navbar
const Menu = () => {
    return (
        <>
        <nav className="navbar-background">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-auto"><Link to ="/"><h1 className="nav-brand">Electric Games</h1></Link></div>
                    <div className="col-sm-auto"><Link id="nav-item-main" className="nav-link" to="/GamesCollection">Game Collection</Link></div>
                    <div className="col-sm-auto"><Link id="nav-item-main" className="nav-link" to="/CharactersCollection">Character Collection</Link></div>
                    <div className="col-sm-auto"><Link id="nav-item-main" className="nav-link"  to="/Quiz">Quiz</Link></div>
                </div>
            </div>
        </nav>
        <MainPageContent />
        </>
    );
};

export default function LandingPage(){

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Menu/>}></Route>
                <Route path="/GamesCollection/*" element={<GamesCollection/>}></Route>
                <Route path="/CharactersCollection/*" element={<CharactersCollection/>}></Route>
                <Route path="/Quiz/*" element={<QuizStart/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}