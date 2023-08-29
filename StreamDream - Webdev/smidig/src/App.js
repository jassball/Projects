import './Assets/Styles/App.css';
import './Assets/Styles/SideBar.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import MyPackages from './Components/MyPackages';
import Store from './Components/Store';
import StoreItemPage from './Components/StoreItemPage';
import Ailearning from './Components/Ailearning';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                 element={<Home />} />
        <Route path="/my_packages"      element={<MyPackages />} />
        <Route path="/store"            element={<Store />} />
        <Route path="/store/shopItems"  element={<StoreItemPage />} />
        <Route path="/ai_learning"      element={<Ailearning />} />
      </Routes>
    </>
  );
}

export default App;