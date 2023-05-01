import like from '../assets/like.png'
import download from '../assets/download.png'
import '../styles/Search.css'
import { useLocation  } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Search = ({ getLikedImages }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [loadingMoreImages, setLoadingMoreImages] = useState(false);
    const [page, setPage] = useState(0);
    const [allImages, setAllImages] = useState([[], [], []]);
    const [downloadDisabled, setDownloadDisabled] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false)
    const [loadedImageIds, setLoadedImageIds] = useState([]);
    const [likedImages, setLikedImages] = useState(() => {
        const savedLikedImages = localStorage.getItem("likedImages");
        return savedLikedImages ? JSON.parse(savedLikedImages) : [];
    });

    const navigate = useNavigate()
    
    const extractSearchTerm = (location) => {
        const match = location.pathname.match(/\/search\/(.+)/);
        return match ? match[1] : "";
      };

      const handlePhotoPageNavigation = (imageId) => {
        navigate(`/photos/${imageId}`);
    }

    const location = useLocation();
    const searchTerm = extractSearchTerm(location);
    
    useEffect(() => {
        getLikedImages(likedImages)
    },[likedImages])

    const handleHoverOn = (event) => {
        const searchImageBoxWrapper = event.target.closest(".searchImageBoxWrapper")
        searchImageBoxWrapper.style.setProperty("--toggle-opacity", "1")
    }

    const handleHoverOff = (event) => {
        const searchImageBoxWrapper = event.target.closest(".searchImageBoxWrapper")
        searchImageBoxWrapper.style.setProperty("--toggle-opacity", "0")
    }


    const loader = useRef(null);

    const handleImageLoad = (imageId) => {
        setLoadedImageIds((prevImageIds) => [...prevImageIds, imageId]);
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    };

    const fetchImages = async (page) => {
        if(!page || page >= 18) return
        try {
          const response = await fetch(`https://foto-folio.vercel.app/api/search?page=${page}&q=${searchTerm}`);
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

          if (data.hits.length === 0) {
            setIsLoading(false)
            setNoResultsFound(true)
          } else {
            setNoResultsFound(false)
          }
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
        setAllImages([[], [], []]);
        setPage(0);
      }, [searchTerm]);

      useEffect(() => {
        if (!loadingMoreImages) {
          setLoadingMoreImages(true);
          fetchImages(page);
        }
      }, [page]);
      


    useEffect(() => {
        if (page >= 18 || noResultsFound) return
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
          }, 2500);
      
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
        <section className="SearchWrapper">
            {isLoading &&(
                <div className="loader-wrapper">
                    <span className="loader"><span className="loader-inner"></span></span>
                </div>
            )}
            <div className="searchImagesResultsWrapper">
                <div className='searchImagesResultsContent'>
                    <div className="searchImagesResultsColumnContent">
                            {allImages[0].map((image, index) => (
                                <div className="searchImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <div className="searchImageContainer" 
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
                                    <div className='searchImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='searchDownLoadBtn'disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}
                                        ><img className='searchDownLoadImg' src={download} /></button>
                                        {isImageLiked(image) ? (
                                            <button className='searchLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='searchLikeImg liked' src={like} />
                                            </button>
                                        ) : (
                                            <button className='searchLikeImgBtn' onClick={() => likeImage(image)}>
                                                <img className='searchLikeImg' src={like} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='searchImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='searchImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="searchImagesResultsColumnContent">
                            {allImages[1].map((image, index) => (
                                <div className="searchImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <div className="searchImageContainer" 
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
                                    <div className='searchImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='searchDownLoadBtn' disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}
                                        ><img className='searchDownLoadImg' src={download} /></button>
                                        {isImageLiked(image) ? (
                                            <button className='searchLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='searchLikeImg liked' src={like} />
                                            </button>
                                        ) : (
                                            <button className='searchLikeImgBtn' onClick={() => likeImage(image)}>
                                                <img className='searchLikeImg' src={like} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='searchImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='searchImgTagsTxt'>{image.tags}</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className="searchImagesResultsColumnContent">
                            {allImages[2].map((image, index) => (
                                <div className="searchImageBoxWrapper" key={index} onMouseEnter={(event) => handleHoverOn(event)}
                                onMouseLeave={(event) => handleHoverOff(event)}>
                                    <div className="searchImageContainer" 
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
                                    <div className='searchImageBoxBtnWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <button className='searchDownLoadBtn' disabled={downloadDisabled} 
                                        onClick={() => downLoadImage(image.webformatURL)}>
                                            <img className='searchDownLoadImg' src={download} /></button>
                                            {isImageLiked(image) ? (
                                            <button className='searchLikeImgBtn liked' onClick={() => unLikeImage(image)}>
                                                <img className='searchLikeImg liked' src={like} />
                                            </button>
                                        ) : (
                                            <button className='searchLikeImgBtn' onClick={() => likeImage(image)}>
                                                <img className='searchLikeImg' src={like} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='searchImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                                        <span className='searchImgTagsTxt'>{image.tags}</span>
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
                {noResultsFound &&(
                    <div className='searchNoResultsWrapper'>
                        <span className='searchNoResultsTxt-1'>Sorry, we couldn't find any matches.</span>
                        <span className='searchNoResultsTxt-2'>Try a different search input and try again!</span>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Search