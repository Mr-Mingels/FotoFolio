import React, { useEffect, useState } from "react";
import '../styles/LikedImages.css'
import { Link } from 'react-router-dom';

const LikedImages = () => {

    const [likedImages, setLikedImages] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const resetSearchInput = () => {
        setSearchInput('')
    }

    const handleLikedImagesBtnHoverOn = (event) => {
        const likedImagesHeaderTxtWrapper = event.target.closest(".likedImagesHeaderTxtWrapper")
        likedImagesHeaderTxtWrapper.style.setProperty("--toggle-icon-color", "black")
    }
    
    const handleLikedImagesBtnHoverOff = (event) => {
        const likedImagesHeaderTxtWrapper = event.target.closest(".likedImagesHeaderTxtWrapper")
        likedImagesHeaderTxtWrapper.style.setProperty("--toggle-icon-color", "#c2c2c2")
    }

    return (
        <section className="likedImagesWrapper">
            <header className="likedImagesHeader">
                <div className="likedImagesContentWrapper">
                    <div className="likedImagesHeaderTxtWrapper"
                            onMouseEnter={(event) => handleLikedImagesBtnHoverOn(event)}
                            onMouseLeave={(event) => handleLikedImagesBtnHoverOff(event)}>
                        <svg className="likedHeartIconImg" 
                        viewBox="0 0 24 24" version="1.1" aria-hidden="false" style={{ fill: "var(--toggle-icon-color)" }}>
                        <desc lang="en-US">A heart</desc><path d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 
                        1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 
                        5.73 0 0 0 0-7.893Z"></path></svg>
                        <span>Likes</span>
                        <span className="numberOfLikedImages">{likedImages.length}</span>
                    </div>
                    <form className="likedImgSearchFormWrapper" onSubmit={(event) => event.preventDefault()}>
                        <div className="likedImgSearchIconWrapper">
                            <svg className="likedImgSearchIcon" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                            <desc lang="en-US">A magnifying glass</desc><path d="M16.5 15c.9-1.2 1.5-2.8 1.5-4.5C18 6.4 14.6 3 10.5 
                            3S3 6.4 3 10.5 6.4 18 10.5 18c1.7 0 3.2-.5 4.5-1.5l4.6 4.5 1.4-1.5-4.5-4.5zm-6 1c-3 0-5.5-2.5-5.5-5.5S7.5 
                            5 10.5 5 16 7.5 16 10.5 13.5 16 10.5 16z"></path></svg>
                        </div>
                        <input placeholder="Search liked images" className="likedImgSearchInput" value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}></input>
                        <div className='likedImgResetSearchInputBtnWrapper'>
                            {searchInput && (
                                <button className='likedImgResetSearchInputBtn' onClick={resetSearchInput}>
                                    <svg className='likedImgClearBtn' viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">An X shape</desc>
                                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 
                                    13.41 12 19 6.41Z"></path></svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </header>
            <div className="renderedLikedImagesWrapper">
                <div className="renderedLikedImagesContent">

                </div>
            </div>
        </section>
    )
}

export default LikedImages