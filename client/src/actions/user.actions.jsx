import axios from "axios"

export const GET_USER = "GET_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_BIO = "UPDATE_BIO"
export const UPDATE_JOB = "UPDATE_JOB"
export const FOLLOW_USER = "FOLLOW_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"
export const DELETE_USER = "DELETE_USER"

export const GET_USER_ERRORS = "GET_USER_ERRORS"

export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios({
      method: "post",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}api/user/upload`,
      data: data,
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors })
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" })
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
            })
        }
      })
      .catch((err) => console.log(err))
  }
}

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio })
      })
      .catch((err) => console.log(err))
  }
}

export const updateJob = (userId, job) => {
  return (dispatch) => {
    return axios({
      method: "put",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { job },
    })
      .then((res) => {
        dispatch({ type: UPDATE_JOB, payload: job })
      })
      .catch((err) => console.log(err))
  }
}

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } })
      })
      .catch((err) => console.log(err))
  }
}

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } })
      })
      .catch((err) => console.log(err))
  }
}

export const deleteUser = (userId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: { userId } })
      })
      .catch((err) => console.log(err))
  }
}
