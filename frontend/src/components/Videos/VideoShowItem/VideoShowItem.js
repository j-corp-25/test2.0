import { Link } from 'react-router-dom';
import "../VideoIndex/VideoList.css";
import videoImg1 from "../../../assets/Video_Image_1.jpeg";
import videoImg2 from "../../../assets/Video_Img_2.jpeg";
import videoImg3 from "../../../assets/Video_Img_3.jpeg";


function VideoShowItem({ video }) {
  return (
    // <li>
    //   <h2>{video.title}</h2>
    //   <Link to={`/videos/${video.id}`}>
    //     View Video
    //   </Link>
    // </li>
    <section className="main-video-content">
      <div className="video-container">
        <img className="videoThumbnail" src={videoImg1}alt="thumbnail"></img>
        <div className="thumb-nail-info">
          <h4>Title: {video.title}</h4>
          <h5>Description: {video.description}</h5>
          <Link to={`/videos/${video.id}`}>
            View Video
          </Link>
        </div>
      </div>
    </section>
  );
}

export default VideoShowItem;
