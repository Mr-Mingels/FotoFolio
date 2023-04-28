import './App.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { lazy, Suspense, useState  } from "react";
import NavBar from './components/NavBar';

const Home = lazy(() => import('./components/Home'));
const LikedImages = lazy(() => import('./components/LikedImages'));
const Search = lazy(() => import('./components/Search'));
const PhotoPage = lazy(() => import('./components/PhotoPage'));

const App = () => {  
  const [likedImagesArray, setLikedImagesArray] = useState([])
  

  const getLikedImages = (data) => {
    setLikedImagesArray(data)
    console.log(data)
  }

  return (
    <Suspense fallback={<div className="loader-wrapper">
      <span className="loader"><span className="loader-inner"></span></span>
      </div>}
      >
      <Routes>
          <Route path="/" element={<Home getLikedImages={getLikedImages} likedImagesArray={likedImagesArray}/>} />
          <Route path='/collections' element={<LikedImages getLikedImages={getLikedImages} likedImagesArray={likedImagesArray} />} />
          <Route path='/search/:id?' element={<Search getLikedImages={getLikedImages} likedImagesArray={likedImagesArray} />} />
          <Route path='/photos/:id' element={<PhotoPage getLikedImages={getLikedImages} likedImagesArray={likedImagesArray} />} />
      </Routes>
    </Suspense>
  );
}

const Root = () => {

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <App />
      </BrowserRouter>
    </div>
  );
}

export default Root;
