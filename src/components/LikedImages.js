import React, { useEffect, useState, useCallback } from "react";
import '../styles/LikedImages.css'
import { Link, useNavigate } from 'react-router-dom';
import like from '../assets/like.png'
import download from '../assets/download.png'

const LikedImages = ({ likedImagesArray, getLikedImages }) => {

    const [likedImages, setLikedImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('')
    const [column1Images, setColumn1Images] = useState([]);
    const [column2Images, setColumn2Images] = useState([]);
    const [column3Images, setColumn3Images] = useState([]);
    const [downloadDisabled, setDownloadDisabled] = useState(false);
    
    const navigate = useNavigate()

    useEffect(() => {
        console.log(likedImages)
    },[likedImages])
    

    const resetSearchInput = () => {
        setSearchInput('')
    }

    const handlePhotoPageNavigation = (imageId) => {
        navigate(`/photos/${imageId}`);
    }

    const handleLoad = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }

    const handleHoverOn = (event) => {
        const likedImageBoxWrapper = event.target.closest(".likedImageBoxWrapper")
        likedImageBoxWrapper.style.setProperty("--toggle-opacity", "1")
    }

    const handleHoverOff = (event) => {
        const likedImageBoxWrapper = event.target.closest(".likedImageBoxWrapper")
        likedImageBoxWrapper.style.setProperty("--toggle-opacity", "0")
    }

    const handleLikedImagesBtnHoverOn = (event) => {
        const likedImagesHeaderTxtWrapper = event.target.closest(".likedImagesHeaderTxtWrapper")
        likedImagesHeaderTxtWrapper.style.setProperty("--toggle-icon-color", "black")
    }
    
    const handleLikedImagesBtnHoverOff = (event) => {
        const likedImagesHeaderTxtWrapper = event.target.closest(".likedImagesHeaderTxtWrapper")
        likedImagesHeaderTxtWrapper.style.setProperty("--toggle-icon-color", "#c2c2c2")
    }

    const filterImages = (images) => {
        if (searchInput.trim() === '') {
            return images;
        }
    
        const searchTerm = searchInput.trim().toLowerCase();
        return images.filter((image) =>
            image.tags.toLowerCase().includes(searchTerm)
        );
    };

    useEffect(() => {
        const storedLikedImages = localStorage.getItem("likedImages");
        const likedImagesData = storedLikedImages ? JSON.parse(storedLikedImages) : [];

        setLikedImages(likedImagesData);
        
        const filteredLikedImages = filterImages(likedImagesData);
    
        const col1 = [];
        const col2 = [];
        const col3 = [];
    
        filteredLikedImages.forEach((image, index) => {
            if (index % 3 === 0) {
                col1.push(image);
            } else if (index % 3 === 1) {
                col2.push(image);
            } else {
                col3.push(image);
            }
        });
    
        setColumn1Images(col1);
        setColumn2Images(col2);
        setColumn3Images(col3);
        if (filteredLikedImages.length === 0) {
            setIsLoading(false)
        }
    }, [likedImagesArray, searchInput]);

    

    const downLoadImage = async (url) => {
        if (downloadDisabled) return;
      
        setDownloadDisabled(true);
        setTimeout(() => setDownloadDisabled(false), 3000); // Disable the button for 3 seconds
      
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const fileName = url.split('/').pop().split('.')[0] + '.jpg';
      
          const link = document.createElement("a");
          link.download = fileName;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      };

      const unLikeImage = (image) => {
        const updatedLikedImages = likedImages.filter(
            (likedImage) => likedImage.id !== image.id
        );
        setLikedImages(updatedLikedImages);
        localStorage.setItem("likedImages", JSON.stringify(updatedLikedImages));
        getLikedImages(updatedLikedImages)
    };

    return (
        <section className="likedImagesWrapper">
            {isLoading &&(
                <div className="loader-wrapper">
                    <span className="loader"><span className="loader-inner"></span></span>
                </div>
            )}
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
                                <button type="button" className='likedImgResetSearchInputBtn' onClick={resetSearchInput}>
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
                    <div className="likedImagesResultsColumnContent">
                            {column1Images.map((image, index) => (
                                <div className="likedImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <img className="likedImage" loading='lazy' src={image.webformatURL}  
                                    onClick={() => handlePhotoPageNavigation(image.id)}/>
                                    <div className='likedImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='likedDownLoadBtn'disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}
                                        ><img className='likedDownLoadImg' src={download} /></button>
                                            <button className='likedLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='likedLikeImg liked' src={like} />
                                            </button>
                                    </div>
                                    <div className='likedImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='likedImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="likedImagesResultsColumnContent">
                            {column2Images.map((image, index) => (
                                <div className="likedImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <img className="likedImage" loading='lazy' src={image.webformatURL}  
                                    onClick={() => handlePhotoPageNavigation(image.id)}/>
                                    <div className='likedImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='likedDownLoadBtn' disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}
                                        ><img className='likedDownLoadImg' src={download} /></button>
                                            <button className='likedLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='likedLikeImg liked' src={like} />
                                            </button>
                                    </div>
                                    <div className='likedImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='likedImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="likedImagesResultsColumnContent">
                            {column3Images.map((image, index) => (
                                <div className="likedImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <img className="likedImage" loading='lazy' src={image.webformatURL} onLoad={handleLoad}  
                                    onClick={() => handlePhotoPageNavigation(image.id)}/>
                                    <div className='likedImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='likedDownLoadBtn' disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}>
                                            <img className='likedDownLoadImg' src={download} /></button>
                                            <button className='likedLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='likedLikeImg liked' src={like} />
                                            </button>
                                    </div>
                                    <div className='likedImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='likedImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>                                    
                        </div>
                    </div>
            </section>
    )
}

export default LikedImages