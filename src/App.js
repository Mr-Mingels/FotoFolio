import './App.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { lazy, Suspense  } from "react";
import NavBar from './components/NavBar';

const Home = lazy(() => import('./components/Home'));

const App = () => {  

  return (
    <Suspense fallback={<div className="loader-wrapper">
    <span className="loader"><span className="loader-inner"></span></span>
</div>}>
      <Home />
    </Suspense>
  );
}

const Root = () => {

  return (
    <div>
        <NavBar />
        <App />
    </div>
  );
}

export default Root;
