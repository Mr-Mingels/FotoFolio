import heroImg from '../assets/heroImg.jpg'
import '../styles/Home.css'
import {  } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import Masonry from 'react-masonry-css';

const Home = () => {
    const [searchInput, setSearchInput] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);

    const loader = useRef(null);

    const resetSearchInput = () => {
        setSearchInput('')
    }

    const handleLoad = () => {
        setIsLoading(false)
    }

    const fetchImages = async (page) => {
        try {
          const response = await fetch(`http://localhost:3001/api/search?page=${page}`);
          const data = await response.json();
      
          console.log(data);
          setImages((prevImages) => [...prevImages, ...data.hits]);
        } catch (error) {
          console.error("Error fetching popular images:", error);
        }
      };

    useEffect(() => {
        fetchImages(page);
      }, [page]);


    useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
        if (entries[0].isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
        },
        { threshold: 1 }
    );

    if (loader.current) {
        observer.observe(loader.current);
    }

    return () => {
        if (loader.current) {
        observer.unobserve(loader.current);
        }
    };
    }, [loader]);

      
      

    return (
        <div className="homeWrapper">
            {isLoading &&(
                <div className="loader-wrapper">
                    <span className="loader"><span className="loader-inner"></span></span>
                </div>
            )}
            <div className="heroImgWrapper">
                <img className="heroImg" alt="home hero image" src={heroImg} onLoad={handleLoad}/>
                <div className="heroImgTxtContentWrapper">
                    <h1 className="heroImgAppTitle">Foto-Folio</h1>
                    <div className="smallDescriptionWrapper">
                        <span>Unleash your creativity with Foto-Folio</span>
                        <span>Experience your memories in a whole new way</span>
                    </div>
                    <form className="heroImgSearchFormWrapper" onSubmit={(event) => event.preventDefault()}>
                        <div className="heroImgSearchIconWrapper">
                            <svg className="heroImgSearchIcon" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                            <desc lang="en-US">A magnifying glass</desc><path d="M16.5 15c.9-1.2 1.5-2.8 1.5-4.5C18 6.4 14.6 3 10.5 
                            3S3 6.4 3 10.5 6.4 18 10.5 18c1.7 0 3.2-.5 4.5-1.5l4.6 4.5 1.4-1.5-4.5-4.5zm-6 1c-3 0-5.5-2.5-5.5-5.5S7.5 
                            5 10.5 5 16 7.5 16 10.5 13.5 16 10.5 16z"></path></svg>
                        </div>
                        <input placeholder="Search high-resolution images" className="heroImgSearchInput" value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}></input>
                        <div className='heroImgResetSearchInputBtnWrapper'>
                            {searchInput && (
                                <button className='heroImgResetSearchInputBtn' onClick={resetSearchInput}>
                                    <svg className='heroImgClearBtn' viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">An X shape</desc>
                                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 
                                    13.41 12 19 6.41Z"></path></svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className='endOfHeroImgWrapper'>
                    <span>Photo by <a className='heroImgLink' href='https://unsplash.com/@pinewatt'>Pine Watt</a></span>
                </div>
            </div>
            <div className='homeImagesResultsWrapper'>
                <Masonry
                    breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                    className='masonry-grid'
                    columnClassName='masonry-grid_column'
                    >
                    {images.map((image, index) => (
                        <div className='homeImageBoxWrapper' key={index}>
                        <img className='homeImage' src={image.webformatURL} />
                        </div>
                    ))}
                    </Masonry>
                    <div ref={loader} style={{ height: "1px", marginTop: "-1px" }}></div>
            </div>
        </div>
    )
}

export default Home