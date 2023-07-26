import { useState, useEffect } from "react";
import "./VideoForm.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  getVideo,
  fetchVideo,
  createVideo,
  updateVideo,
} from "../../../store/videos";

export default function VideoForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const videoId = useParams().videoId;
  const video = useSelector((state) => getVideo(videoId)(state));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const formType = videoId ? "Update" : "Upload";
  const [message, setMessage] = useState("");

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
    let errors = false;

    if (title.trim() === "") {
      setTitleError("Title is a required field.");
      errors = true;
    } else if (title.trim().length > 50) {
      setTitleError("Title must be less than 20 characters.");
      errors = true;
    } else {
      setTitleError(null);
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required.");
      errors = true;
    } else {
      setDescriptionError(null);
    }

    if (!errors) {
      try {
        if (formType === "Update") {
          await dispatch(
            updateVideo({ id: videoId, title: title, description: description })
          );
        } else {
          await dispatch(
            createVideo({ title: title, description: description })
          );
        }
        setMessage(`${formType} Successful!`);
        setTitle("");
        setDescription("");

      } catch (err) {
        setMessage(`${formType} Failed!`);
      }
    }
  }

  return (
    <div className="video-page-form-container">
      <div className="video-form-container">
        <form className="video-upload-form" onSubmit={handleSubmit}>
          <h1 className="video-form-title">{formType} Video</h1>
          <label className="video-upload-form-label">
            Title
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(null);
              }}
              className="video-form-input"
            />
            {titleError && <div className="error-message">{titleError}</div>}
          </label>

          <label className="video-upload-form-label">
            Description
            <textarea
              value={description}
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(null);
              }}
              className="video-form-textarea"
            />
            {descriptionError && (
              <div className="error-message">{descriptionError}</div>
            )}
            <div>{message}</div>
          </label>
          <input type="submit" value={`${formType} Video`} />
        </form>
      </div>
    </div>
  );
}
