import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVideo, getVideo } from '../../../store/videos';

const VideoShow = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => getVideo(videoId)(state));

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);

  if (!video) {
    return null;
  }

  return (
    <div>
      <h1>{video.title}</h1>
      
      <p>{video.description}</p>
    </div>
  );
};

export default VideoShow;
