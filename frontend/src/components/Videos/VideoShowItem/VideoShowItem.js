import { Link } from 'react-router-dom';

function VideoShowItem({ video }) {
  return (
    <li>
      <h2>{video.title}</h2>
      <Link to={`/videos/${video.id}`}>
        View Video
      </Link>
    </li>
  );
}

export default VideoShowItem;
