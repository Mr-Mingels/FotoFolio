import heroImg from '../assets/heroImg.jpg'
import like from '../assets/like.png'
import download from '../assets/download.png'
import '../styles/Home.css'
import {  } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home = ({ getLikedImages }) => {
    const [searchInput, setSearchInput] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [loadingMoreImages, setLoadingMoreImages] = useState(false);
    const [page, setPage] = useState(0);
    const [allImages, setAllImages] = useState([[], [], []]);
    const [downloadDisabled, setDownloadDisabled] = useState(false);
    const [loadedImageIds, setLoadedImageIds] = useState([]);
    const [likedImages, setLikedImages] = useState(() => {
        const savedLikedImages = localStorage.getItem("likedImages");
        return savedLikedImages ? JSON.parse(savedLikedImages) : [];
    });

    const navigate = useNavigate()
    const location = useLocation()

    const handlePhotoPageNavigation = (imageId) => {
        navigate(`/photos/${imageId}`);
    }
    
    useEffect(() => {
        getLikedImages(likedImages)
    },[likedImages])

    const handleHoverOn = (event) => {
        const homeImageBoxWrapper = event.target.closest(".homeImageBoxWrapper")
        homeImageBoxWrapper.style.setProperty("--toggle-opacity", "1")
    }

    const handleHoverOff = (event) => {
        const homeImageBoxWrapper = event.target.closest(".homeImageBoxWrapper")
        homeImageBoxWrapper.style.setProperty("--toggle-opacity", "0")
    }


    const loader = useRef(null);

    const resetSearchInput = () => {
        setSearchInput('')
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchInput}`);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            setSearchInput('')
        }
    },[location])

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleImageLoad = (imageId) => {
        setLoadedImageIds((prevImageIds) => [...prevImageIds, imageId]);
        setIsLoading(false)
    };
    

    const fetchImages = async (page) => {
        if(!page || page >= 18) return
        try {
          const response = await fetch(`http://localhost:3001/api/search?page=${page}`);
          const data = await response.json();
      
          const newImages = data.hits.reduce(
            (columns, image, index) => {
              const aspectRatio = (image.imageHeight / image.imageWidth) * 100;
              columns[index % 3].push({ ...image, aspectRatio });
              return columns;
            },
            [[], [], []]
          );

          const removeDuplicates = (prev, current) => {
            const combined = [...prev, ...current];
            return combined.filter(
              (image, index, self) =>
                index === self.findIndex((t) => t.id === image.id)
            );
          };


          setAllImages((prevImages) => {
            return [
                removeDuplicates(prevImages[0], newImages[0]),
                removeDuplicates(prevImages[1], newImages[1]),
                removeDuplicates(prevImages[2], newImages[2]),
            ];
            });
        } catch (error) {
          console.error("Error fetching popular images:", error);
          setIsLoading(false)
        }
      };
      
      

      useEffect(() => {
        if (!loadingMoreImages) {
          setLoadingMoreImages(true);
          fetchImages(page);
        }
      }, [page]);
      


    useEffect(() => {
        if (page >= 18) return
    const observer = new IntersectionObserver(
        (entries) => {
        if (entries[0].isIntersecting && !loadingMoreImages) {
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

    useEffect(() => {
        if (loadingMoreImages) {
          const timer = setTimeout(() => {
            setLoadingMoreImages(false);
            fetchImages(page + 1)
          }, 2000);
      
          return () => {
            clearTimeout(timer);
          };
        }
      }, [loadingMoreImages]);


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
      
      const likeImage = (image) => {
        const updatedLikedImages = [...likedImages, image];
        setLikedImages(updatedLikedImages);
        localStorage.setItem("likedImages", JSON.stringify(updatedLikedImages));
    };

    const unLikeImage = (image) => {
        const updatedLikedImages = likedImages.filter(
            (likedImage) => likedImage.id !== image.id
        );
        setLikedImages(updatedLikedImages);
        localStorage.setItem("likedImages", JSON.stringify(updatedLikedImages));
    };
      
    const isImageLiked = useCallback((image) => {
        return likedImages.some(likedImage => likedImage.id === image.id);
    }, [likedImages]);


    return (
        <section className="homeWrapper">
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
                    <form className="heroImgSearchFormWrapper" onSubmit={(e) => handleSearchSubmit(e)}>
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
                                <button type="button" className='heroImgResetSearchInputBtn' onClick={resetSearchInput}>
                                    <svg className='heroImgClearBtn' viewBox="0 0 24 24" version="1.1" aria-hidden="false"><desc lang="en-US">An X shape</desc>
                                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 
                                    13.41 12 19 6.41Z"></path></svg>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className='endOfHeroImgWrapper'>
                    <span>Photo by <a className='heroImgLink' target='_blank' rel='noopener noreferrer' 
                    href='https://unsplash.com/@pinewatt'>Pine Watt</a></span>
                </div>
            </div>
            <div className="homeImagesResultsWrapper">
                <div className='homeImagesResultsContent'>
                    <div className="homeImagesResultsColumnContent">
                            {allImages[0].map((image, index) => (
                                <div className="homeImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <div className="homeImageContainer" 
                                    style={{ paddingBottom: loadedImageIds.includes(image.id) ? '0' : `${image.aspectRatio}%` }}>
                                        <img
                                        className="homeImage"
                                        src={image.webformatURL}
                                        onClick={() => handlePhotoPageNavigation(image.id)}
                                        width="100%"
                                        height="100%"
                                        onLoad={() => handleImageLoad(image.id)}
                                        />
                                    </div>
                                    <div className='homeImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='homeDownLoadBtn'disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}
                                        ><img className='homeDownLoadImg' src={download} /></button>
                                        {isImageLiked(image) ? (
                                            <button className='homeLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='homeLikeImg liked' src={like} />
                                            </button>
                                        ) : (
                                            <button className='homeLikeImgBtn' onClick={() => likeImage(image)}>
                                                <img className='homeLikeImg' src={like} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='homeImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='homeImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="homeImagesResultsColumnContent">
                            {allImages[1].map((image, index) => (
                                <div className="homeImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <div className="homeImageContainer"  
                                    style={{ paddingBottom: loadedImageIds.includes(image.id) ? '0' : `${image.aspectRatio}%` }}>
                                        <img
                                        className="homeImage"
                                        src={image.webformatURL}
                                        onClick={() => handlePhotoPageNavigation(image.id)}
                                        width="100%"
                                        height="100%"
                                        onLoad={() => handleImageLoad(image.id)}
                                        />
                                    </div>
                                    <div className='homeImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='homeDownLoadBtn' disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}
                                        ><img className='homeDownLoadImg' src={download} /></button>
                                        {isImageLiked(image) ? (
                                            <button className='homeLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='homeLikeImg liked' src={like} />
                                            </button>
                                        ) : (
                                            <button className='homeLikeImgBtn' onClick={() => likeImage(image)}>
                                                <img className='homeLikeImg' src={like} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='homeImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='homeImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="homeImagesResultsColumnContent">
                            {allImages[2].map((image, index) => (
                                <div className="homeImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <div className="homeImageContainer"  
                                    style={{ paddingBottom: loadedImageIds.includes(image.id) ? '0' : `${image.aspectRatio}%` }}>
                                        <img
                                        className="homeImage"
                                        src={image.webformatURL}
                                        onClick={() => handlePhotoPageNavigation(image.id)}
                                        width="100%"
                                        height="100%"
                                        onLoad={() => handleImageLoad(image.id)}
                                        />
                                    </div>
                                    <div className='homeImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='homeDownLoadBtn' disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}>
                                            <img className='homeDownLoadImg' src={download} /></button>
                                            {isImageLiked(image) ? (
                                            <button className='homeLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='homeLikeImg liked' src={like} />
                                            </button>
                                        ) : (
                                            <button className='homeLikeImgBtn' onClick={() => likeImage(image)}>
                                                <img className='homeLikeImg' src={like} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='homeImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='homeImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                    <div ref={loader} style={{ height: "1px", marginTop: "-1px" }}></div>
                </div>
                {loadingMoreImages && (
                            <div className="bottom-loader-wrapper">
                                <div className="bottom-loader"></div>
                            </div>
                            )}
            </div>
        </section>
    )
}

export default Home