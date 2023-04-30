import React, { useEffect, useState } from "react";
import '../styles/NavBar.css'
import hamburgerMenu from '../assets/more.png'
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {

    const [searchInput, setSearchInput] = useState('')
    const [sideBarOpen, setSideBarOpen] = useState(false)

    const extractSearchTerm = (location) => {
        const match = location.pathname.match(/\/search\/(.+)/);
        return match ? match[1] : "";
      };

    const location = useLocation()
    const searchTerm = extractSearchTerm(location);

    const navigate = useNavigate()
    
    const resetSearchInput = () => {
        setSearchInput('')
    }

    const handleOpenSideBar = () => {
        setSideBarOpen(true)
    }

    const handleCloseSideBar = () => {
        setSideBarOpen(false)
    }
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchInput}`);
        if (sideBarOpen) {
            setSideBarOpen(false)
        }
    };

    const safeDecodeURIComponent = (searchTerm) => {
        try {
          return decodeURIComponent(searchTerm);
        } catch (error) {
          console.warn('Error decoding search term:', error);
          return searchTerm;
        }
      };
      

      useEffect(() => {
        if (location.pathname === '/') {
          setSearchInput('');
        }
        if (!searchInput) {
          const decodedSearchTerm = safeDecodeURIComponent(searchTerm);
          const cleanedSearchTerm = decodedSearchTerm.replace(/(?<!\d)%\d*(?!\d+)/g, '');
          setSearchInput(cleanedSearchTerm);
        }
      }, [location]);
      


    return (
        <nav className="navBarWrapper">
            <div className="navBarContent">
                <div className="topNavSection">
                <Link className="navLinkTitleWrapper" to='/'><h1 className="navTitle">Foto-F</h1></Link>
                    <form className="searchInputWrapper" onSubmit={(e) => handleSearchSubmit(e)}>
                        <div className="searchIconWrapper" onClick={(e) => handleSearchSubmit(e)}>
                            <svg className="searchIcon" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                            <desc lang="en-US">A magnifying glass</desc><path d="M16.5 15c.9-1.2 1.5-2.8 1.5-4.5C18 6.4 14.6 3 10.5 
                            3S3 6.4 3 10.5 6.4 18 10.5 18c1.7 0 3.2-.5 4.5-1.5l4.6 4.5 1.4-1.5-4.5-4.5zm-6 1c-3 0-5.5-2.5-5.5-5.5S7.5 
                            5 10.5 5 16 7.5 16 10.5 13.5 16 10.5 16z"></path></svg>
                        </div>
                        <input placeholder="Search high-resolution images" className="searchInput" value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}></input>
                        <div className='heroImgResetSearchInputBtnWrapper'>
                            {searchInput && (
                                <button type="button" className='heroImgResetSearchInputBtn' onClick={resetSearchInput}>
                                    <svg className='heroImgClearBtn' viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">An X shape</desc>
                                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 
                                    13.41 12 19 6.41Z"></path></svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="bottomNavSectionBtnWrapper">
                        <div className="bottomNavSectionBtn">
                            <Link className="navLinkWrapper" to='/'><span>Home</span></Link>
                        </div>
                        <div className="bottomNavSectionBtn">
                            <Link className="navLinkWrapper" to='/collections'><span>Liked Images</span></Link>
                        </div>
                    </div>
                    <div className="navHamburgerMenuWrapper" onClick={() => handleOpenSideBar()}>
                        <div className="navHamburgerMenuContent">
                                <img className="navHamburgerMenu" src={hamburgerMenu} />
                        </div>
                    </div>
            </div>
            <div className={`fullPageWrapper ${sideBarOpen ? 'open' : ''}`}>
                <div className={`navSideBarWrapper ${sideBarOpen ? 'open' : ''}`}>
                    <div className="navSideBarContent">
                    <div className="bottomNavSectionBtnWrapper sidebar">
                        <div className="bottomNavSectionBtn sidebar">
                            <Link className="navLinkWrapper sidebar" to='/' onClick={() => handleCloseSideBar()}>
                                <span>Home</span></Link>
                        </div>
                        <div className="bottomNavSectionBtn sidebar">
                            <Link className="navLinkWrapper sidebar" to='/collections' onClick={() => handleCloseSideBar()}>
                                <span>Liked Images</span></Link>
                        </div>
                    </div>
                    <form className="searchInputWrapper sidebar" onSubmit={(e) => handleSearchSubmit(e)}>
                        <div className="searchIconWrapper" onClick={(e) => handleSearchSubmit(e)}>
                            <svg className="searchIcon" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                            <desc lang="en-US">A magnifying glass</desc><path d="M16.5 15c.9-1.2 1.5-2.8 1.5-4.5C18 6.4 14.6 3 10.5 
                            3S3 6.4 3 10.5 6.4 18 10.5 18c1.7 0 3.2-.5 4.5-1.5l4.6 4.5 1.4-1.5-4.5-4.5zm-6 1c-3 0-5.5-2.5-5.5-5.5S7.5 
                            5 10.5 5 16 7.5 16 10.5 13.5 16 10.5 16z"></path></svg>
                        </div>
                        <input placeholder="Search high-resolution images" className="searchInput" value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}></input>
                        <div className='searchImgResetSearchInputBtnWrapper'>
                            {searchInput && (
                                <button type="button" className='searchImgResetSearchInputBtn' onClick={resetSearchInput}>
                                    <svg className='searchImgClearBtn' viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                        <desc lang="en-US">An X shape</desc>
                                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 
                                    13.41 12 19 6.41Z"></path></svg>
                                </button>
                            )}
                        </div>
                    </form>
                    <div className="navSideBarCloseBtnWrapper">
                        <button className="navSideBarCloseBtn" onClick={() => handleCloseSideBar()}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar