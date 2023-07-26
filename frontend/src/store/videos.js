
import csrfFetch from "./csrf";
export const RECEIVE_VIDEOS = "videos/RECEIVE_VIDEOS";
export const RECEIVE_VIDEO = "videos/RECEIVE_VIDEO";
export const REMOVE_VIDEO = "videos/REMOVE_VIDEO";

export const getVideo = (videoId) => {
    return (state) => {
        if(state.videos && state.videos[videoId]){
            return state.videos[videoId];
        } else {
            return null;
        }
    }
};

export const getVideos = (state) => {
    if(!state.videos){
        return [];
    } else {
        return Object.values(state.videos)
    }
};

export const fetchVideos = () => async (dispatch) => {
    const response = await csrfFetch('/api/videos');
    const data = await response.json();

    dispatch({
        type: RECEIVE_VIDEOS,
        videos: data
    })
}

export const fetchVideo = (videoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${videoId}`);
    const data = await response.json();

    dispatch({
        type: RECEIVE_VIDEO,
        video: data
    })
}

export const createVideo = (video) => async (dispatch) => {
    const response = await csrfFetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    });
    if (parseInt(response.headers.get("Content-Length")) > 0) {
      const data = await response.json();

      dispatch({
        type: RECEIVE_VIDEO,
        video: data,
      });
    }
    return response;
  };

  export const updateVideo = (video) => async (dispatch) => {
    const response = await csrfFetch(`/api/videos/${video.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    });

    if (parseInt(response.headers.get("Content-Length")) > 0) {
      const data = await response.json();

      dispatch({
        type: RECEIVE_VIDEO,
        video: data,
      });
    }
    
    return response;
  };

export const deleteVideo = (videoId) => async (dispatch) => {
    await fetch(`/api/videos/${videoId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    });

    dispatch({
        type: REMOVE_VIDEO,
        videoId: videoId
    })
}

const videosReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){
        case RECEIVE_VIDEO:
            newState = {...newState, [action.video.id]: action.video}
            return newState;

        case RECEIVE_VIDEOS:
            newState = {...newState, ...action.videos}
            return newState;

        case REMOVE_VIDEO:
            delete newState[action.videoId]
            return newState;
        default:
            return state;
    }
}

export default videosReducer;
