import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideo,
  fetchVideo,
  createVideo,
  updateVideo,
} from "../../../store/videos";

export default function VideoForm() {
  const dispatch = useDispatch();
  const videoId = useParams().videoId;
  const video = useSelector((state) => getVideo(videoId)(state));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const formType = videoId ? "Update" : "Create";

  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideo(videoId));
      if (video) {
        setTitle(video.title);
        setDescription(video.description);
      }
    }
  }, [videoId, video]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (formType === "Update") {
        await dispatch(
          updateVideo({ id: videoId, title: title, description: description })
        );
      } else {
        await dispatch(createVideo({ title: title, description: description }));
      }
      setMessage(`${formType} Successful!`);
    } catch (err) {
      setMessage(`${formType} Failed!`);
    }
  }

  return (

    <form onSubmit={handleSubmit} className="video-form">
      <h1 className="video-form-title">{formType} Video</h1>
      <label className="video-form-label">
        Title
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="video-form-input"
        />
      </label>
      <label className="video-form-label">
        Description
        <textarea
          value={description}
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="video-form-textarea"
        />
      </label>
      <input
        type="submit"
        value={`${formType} Video`}
        className="video-form-submit"
      />
      <div className="video-form-message">{message}</div>
    </form>
  );
}
