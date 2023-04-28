import like from '../assets/like.png'
import download from '../assets/download.png'
import '../styles/PhotoPage.css'
import {  } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PhotoPage = () => {

    const [image, setImage] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const extractSearchTerm = (location) => {
        const match = location.pathname.match(/\/photos\/(.+)/);
        return match ? match[1] : "";
      };

    const location = useLocation();
    const searchTerm = extractSearchTerm(location);

    const fetchImageById = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/image?id=${searchTerm}`);
          const data = await response.json();
      
          // Assuming you want to store the image details in the state.
          setImage(data.hits[0]);
        } catch (error) {
          console.error("Error fetching image by ID:", error);
          setIsLoading(false);
        }
      };

    useEffect(() => {
        fetchImageById()
        console.log(image)
    },[location])
      

    return (
        <div className='photoPageWrapper'>
            <div className='photoPageResultsWrapper'> 
                <div className='photoPageResultsContent'>
                    <img src={image.largeImageURL} />
                </div>
            </div>
        </div>
    )
}

export default PhotoPage