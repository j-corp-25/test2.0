import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideo, fetchVideo, createVideo, updateVideo } from '../../../store/videos'

export default function VideoForm(){
    const dispatch = useDispatch();
    const videoId = useParams().videoId;
    const video = useSelector(state => getVideo(videoId)(state));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const formType = videoId ? "Update" : "Create";

    useEffect(() => {
        if(videoId){
            dispatch(fetchVideo(videoId));
            if(video) {
                setTitle(video.title);
                setDescription(video.description);
            }
        }
    }, [videoId, video]);

    function handleSubmit(e){
        e.preventDefault();
        if(formType === "Update"){
            dispatch(updateVideo({id: videoId, title: title, description: description}));
        } else {
            dispatch(createVideo({title: title, description: description}));
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>{formType} Video</h1>
            <label>Title
                <input type="text" value={title} name="title" onChange={(e) => {setTitle(e.target.value)}} />
            </label>
            <label>Description
                <textarea value={description} name="description" onChange={(e) => {setDescription(e.target.value)}} />
            </label>
            {/* TODO: Handle file upload */}
            <input type="submit" value={`${formType} Video`} />
        </form>
    )
}
