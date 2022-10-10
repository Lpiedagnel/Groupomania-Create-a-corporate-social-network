import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty, timestampParser } from "../Utils"
import { NavLink } from "react-router-dom"
import { addPost, getPosts } from "../../actions/post.actions"

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [postPicture, setPostPicture] = useState(null)
  const [video, setVideo] = useState("")
  const [file, setFile] = useState()
  const userData = useSelector((state) => state.userReducer)
  const error = useSelector((state) => state.errorReducer.postError)
  const dispatch = useDispatch()

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData()
      data.append("posterId", userData._id)
      data.append("message", message)
      if (file) data.append("file", file)
      data.append("video", video)

      await dispatch(addPost(data))
      dispatch(getPosts())
      cancelPost()
    } else {
      alert("Veuillez entrer un message.")
    }
  }

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
    setVideo("")
  }

  const cancelPost = () => {
    setMessage("")
    setPostPicture("")
    setVideo("")
    setFile("")
  }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)

    const handleVideo = () => {
      let findLink = message.split(" ")
      for (let i = 0; i < findLink.length; i++) {
        // If the link was the copy of the URL
        if (
          findLink[i].includes("https://www.youtube") ||
          findLink[i].includes("https://youtube")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/")
          setVideo(embed.split("&")[0])
          findLink.splice(i, 1)
          setMessage(findLink.join(" "))
          // Doesn't allow picture with video
          setPostPicture("")
        }

        // If the link was generated with sharing option
        else if (findLink[i].includes("https://youtu.be/")) {
          let embed = findLink[i].replace(
            "https://youtu.be/",
            "https://www.youtube.com/embed/"
          )
          setVideo(embed)
          findLink.splice(i, 1)
          setMessage(findLink.join(" "))
          // Doesn't allow picture with video
          setPostPicture("")
        }
      }
    }
    handleVideo()
  }, [userData, message, video])

  return (
    <div className="post">
      {isLoading ? (
        <i className="post__loading fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="post__data">
            <p className="post__follow">
              <span className="post__span-follow">
                {userData.following ? userData.following.length : 0}
              </span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p className="post__follow">
              <span className="post__span-follow">
                {userData.followers ? userData.followers.length : 0}
              </span>{" "}
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink to="/profil">
            <div className="post__user-info">
              <img
                src={userData.picture}
                alt="user-img"
                className="post__user-avatar"
              />
            </div>
          </NavLink>
          <div className="post__form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="post__textarea"
              maxLength="500"
            />
            {/* message preview */}
            {message || postPicture || video.length > 20 ? (
              <li className="card">
                <div className="card__left">
                  <img
                    src={userData.picture}
                    alt="user-pic"
                    className="card__avatar"
                  />
                </div>
                <div className="card__right">
                  <div className="card__header">
                    <div className="card__name-section">
                      <h3 className="card__name-title">
                        {userData.firstName} {userData.lastName}
                      </h3>
                    </div>
                    <span className="card__date">
                      {timestampParser(Date.now())}
                    </span>
                  </div>
                  <div className="card__content">
                    <p className="card__message">{message}</p>
                    <img
                      src={postPicture}
                      alt=""
                      className="card__picture"
                    />
                    {video && (
                      <iframe
                        className="card__video"
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="post__footer">
              <div className="post__upload-container">
                {isEmpty(video) && (
                  <>
                    <label
                      className="post__label-file"
                      htmlFor="file-upload"
                    >
                      <i className="post__btn-file fas fa-image"></i>
                    </label>
                    <input
                      className="post__input-file"
                      type="file"
                      name="file"
                      id="file-upload"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        handlePicture(e)
                      }}
                    />
                  </>
                )}
                {video && (
                  <button
                    className="post__btn btn"
                    onClick={() => setVideo("")}
                  >
                    Supprimer vidéo
                  </button>
                )}
              </div>
              {!isEmpty(error.format) && <p className="post__error">{error.format}</p>}
              {!isEmpty(error.maxSize) && <p className="post__error">{error.maxSize}</p>}
              <div className="post__btn-file">
                {message || postPicture || video.length > 20 ? (
                  <button
                    onClick={cancelPost}
                    className="btn post__cancel"
                  >
                    Annuler message
                  </button>
                ) : null}
                <button
                  onClick={handlePost}
                  className="btn post__submit "
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NewPostForm
