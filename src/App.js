import './App.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { lazy, Suspense  } from "react";
import NavBar from './components/NavBar';

const Home = lazy(() => import('./components/Home'));
const LikedImages = lazy(() => import('./components/LikedImages'));

const App = () => {  

  return (
    <Suspense fallback={<div className="loader-wrapper">
      <span className="loader"><span className="loader-inner"></span></span>
      </div>}
      >
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/collections' element={<LikedImages />} />
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
