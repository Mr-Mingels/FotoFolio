import like from '../assets/like.png'
import download from '../assets/download.png'
import profilePicture from '../assets/profilePicture.png'
import '../styles/PhotoPage.css'
import {  } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const PhotoPage = () => {

    const [image, setImage] = useState([])
    const [downloadDisabled, setDownloadDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [likedImages, setLikedImages] = useState([]);
    const [relatedImages, setRelatedImages] = useState([])

    const extractSearchTerm = (location) => {
      const match = location.pathname.match(/\/photos\/(.+)/);
      return match ? match[1] : "";
    };

    const navigate = useNavigate()
    const location = useLocation();
    const searchTerm = extractSearchTerm(location);

    useEffect(() => {
      const savedLikedImages = localStorage.getItem("likedImages");
      const likedImagesArray = savedLikedImages ? JSON.parse(savedLikedImages) : [];
      setLikedImages(likedImagesArray);
    }, [image]);

    const handlePhotoPageNavigation = (imageId) => {
      setIsLoading(true)
      navigate(`/photos/${imageId}`);
      setTimeout(() => {
          setIsLoading(false)
      }, 2000);
  }


    const handleHoverOn = (event) => {
      const photoPageImageWrapper = event.target.closest(".photoPageImageWrapper")
      photoPageImageWrapper.style.setProperty("--toggle-opacity", "1")
    }

    const handleHoverOff = (event) => {
      const photoPageImageWrapper = event.target.closest(".photoPageImageWrapper")
      photoPageImageWrapper.style.setProperty("--toggle-opacity", "0")
    }
    
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000);
    }

    const fetchImageById = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/image?id=${searchTerm}`);
          const data = await response.json();
      

          setImage(data.hits[0]);
        } catch (error) {
          console.error("Error fetching image by ID:", error);
          setIsLoading(false);
        }
      };

    const fetchRelatedImages = async () => {
      if (!image) return
        try {
          const response = await fetch(`http://localhost:3001/api/search?&q=${image.tags}`);
          const data = await response.json();
      

          setRelatedImages(data.hits);
        } catch (error) {
          console.error("Error fetching image by ID:", error);
          setIsLoading(false);
        }
      };

    useEffect(() => {
        fetchImageById()
    },[location])

    useEffect(() => {    
      fetchRelatedImages()
    },[image])

    const downLoadImage = async (url) => {
      if (downloadDisabled) return;
    
      setDownloadDisabled(true);
      setTimeout(() => setDownloadDisabled(false), 3000);
    
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
        <div className='photoPageWrapper'>
          {isLoading &&(
                <div className="loader-wrapper">
                    <span className="loader"><span className="loader-inner"></span></span>
                </div>
            )}
            <div className='photoPageResultsWrapper'> 
                <div className='photoPageResultsContent'>
                  <div className='photoPageImageWrapper' onMouseEnter={(event) => handleHoverOn(event)}
                      onMouseLeave={(event) => handleHoverOff(event)}>
                    <img className='photoPageImage' src={image.largeImageURL} onLoad={handleLoad} />
                    <div className='photoPageImgBoxTagsWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                        <span className='photoPageImgTagsTxt'>{image.tags}</span>
                    </div>
                    <div className='photoPageImgBoxUserInfoWrapper' style={{ opacity: "var(--toggle-opacity)"}}>
                        <a className='photoPageUserProfileImgWrapper' target='_blank' rel='noopener noreferrer'
                          href={`https://pixabay.com/users/${image.user}-${image.user_id}/`}>
                            {image.userImageURL ? (
                                <img className='photoPageUserProfileImg' src={image.userImageURL} />
                            ) : (
                                <img className='photoPageUserProfileImg' src={profilePicture} />
                            )}
                            <span className='photoPageUserProlfileImgHoverElement'></span>
                          </a>
                          <span className='photoPageUserName'><a className='photoPageUserNameLink inImgBox' target='_blank' rel='noopener noreferrer'
                          href={`https://pixabay.com/users/${image.user}-${image.user_id}/`}>{image.user}</a>
                        </span>
                    </div>
                  </div>
                  <div className='photoPageInfoWrapper'>
                      <div className='photoPageUserInfoWrapper'>
                        <a className='photoPageUserProfileImgWrapper' target='_blank' rel='noopener noreferrer'
                        href={`https://pixabay.com/users/${image.user}-${image.user_id}/`}>
                          {image.userImageURL ? (
                            <img className='photoPageUserProfileImg' src={image.userImageURL} />
                          ) : (
                            <img className='photoPageUserProfileImg' src={profilePicture} />
                          )}
                          <span className='photoPageUserProlfileImgHoverElement'></span>
                        </a>
                        <span className='photoPageUserName'><a className='photoPageUserNameLink' target='_blank' rel='noopener noreferrer'
                        href={`https://pixabay.com/users/${image.user}-${image.user_id}/`}>{image.user}</a></span>
                      </div>
                      <div className='photoPageInfoBtnWrapper'>
                        {isImageLiked(image) ? (
                          <button className='photoPageLikeImageBtn liked' onClick={() => unLikeImage(image)}>
                              <img className='photoPageInfoBtnWrapperImg' src={like} />Image is Liked!
                          </button>
                        ) : (
                          <button className='photoPageLikeImageBtn' onClick={() => likeImage(image)}>
                              <img className='photoPageInfoBtnWrapperImg' src={like} />Like Image
                          </button>
                        )}
                        <button className='photoPageDownLoadImgBtn' onClick={() => downLoadImage(image.webformatURL)}>
                              <img className='photoPageInfoBtnWrapperImg' src={download} />Free Download
                          </button>
                      </div>
                      <h3 className='photoPageRelatedImagesTitle'>Related Images</h3>
                      <div className='photoPageRelatedImagesWrapper'>
                        <div className='photoPageRelatedImageBoxRow'>
                            <div className='photoPageRelatedImageBoxWrapper' id='relatedImg1' 
                            onClick={() => handlePhotoPageNavigation(relatedImages[0].id)}>
                              {relatedImages.length > 0 && relatedImages[0] && (
                                  <img className='photoPageRelatedImg' src={relatedImages[0].webformatURL}/>
                              )}
                              </div>
                              <div className='photoPageRelatedImageBoxWrapper' id='relatedImg2' 
                               onClick={() => handlePhotoPageNavigation(relatedImages[1].id)}>
                              {relatedImages.length > 0 && relatedImages[1] && (
                                  <img className='photoPageRelatedImg' src={relatedImages[1].webformatURL}/>
                              )}
                              </div>
                        </div>
                        <div className='photoPageRelatedImageBoxRow'>
                            <div className='photoPageRelatedImageBoxWrapper' id='relatedImg3'
                             onClick={() => handlePhotoPageNavigation(relatedImages[2].id)}>
                              {relatedImages.length > 0 && relatedImages[2] && (
                                  <img className='photoPageRelatedImg' src={relatedImages[2].webformatURL}/>
                              )}
                              </div>
                              <div className='photoPageRelatedImageBoxWrapper' id='relatedImg4'
                               onClick={() => handlePhotoPageNavigation(relatedImages[3].id)}>
                              {relatedImages.length > 0 && relatedImages[3] && (
                                  <img className='photoPageRelatedImg' src={relatedImages[3].webformatURL}/>
                              )}
                              </div>
                        </div>
                        <div className='photoPageRelatedImageBoxRow'>
                              <div className='photoPageRelatedImageBoxWrapper' id='relatedImg5'
                               onClick={() => handlePhotoPageNavigation(relatedImages[4].id)}>
                                {relatedImages.length > 0 && relatedImages[4] && (
                                    <img className='photoPageRelatedImg' src={relatedImages[4].webformatURL}/>
                                )}
                                </div>
                                <div className='photoPageRelatedImageBoxWrapper' id='relatedImg6'
                                onClick={() => handlePhotoPageNavigation(relatedImages[5].id)}>
                                {relatedImages.length > 0 && relatedImages[5] && (
                                    <img className='photoPageRelatedImg' src={relatedImages[5].webformatURL}/>
                                )}
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoPage