import React from "react";
import videoImg1 from "../../../assets/Video_Image_1.jpeg";
import videoImg2 from "../../../assets/Video_Img_2.jpeg";
import videoImg3 from "../../../assets/Video_Img_3.jpeg";
import "./VideoList.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VideoForm  from '../VideoForm/VideoForm';
import VideoShowItem from '../VideoShowItem/VideoShowItem';
import { getVideos, fetchVideos } from '../../../store/videos';


const VideoList = () => {

  const dispatch = useDispatch();
  const videos = useSelector(getVideos);

  useEffect(() => {
      dispatch(fetchVideos());
  }, [dispatch])

  return (
    <section className="main-video-content">
      <div className="video-container">
        <img className="videoThumbnail" src={videoImg1} alt="thumbnail"></img>
        <div className="thumb-nail-info">
          <h4>Title:</h4>
          <h5>Description: </h5>
        </div>
      </div>

      <>
        <ul>
          {videos.map((video) => (
            <VideoShowItem video={video} />
          ))}
        </ul>
      </>
    </section>
  );
};

export default VideoList;
