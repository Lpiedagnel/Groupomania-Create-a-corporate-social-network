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
              <span>{userData.following ? userData.following.length : 0}</span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p className="post__follow">
              <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
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
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="post-form__textarea"
            />
            {/* message preview */}
            {message || postPicture || video.length > 20 ? (
              <li className="card__container">
                <div className="card__left">
                  <img
                    src={userData.picture}
                    alt="user-pic"
                    className="card__avatar"
                  />
                </div>
                <div className="card__right">
                  <div className="card__header">
                    <div className="card__username">
                      <h3>
                        {userData.firstName} {userData.lastName}
                      </h3>
                    </div>
                    <span className="card__date">
                      {timestampParser(Date.now())}
                    </span>
                  </div>
                  <div className="card__content">
                    <p className="card__text">{message}</p>
                    <img
                      src={postPicture}
                      alt=""
                      className="card__img"
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
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                  <i className="fas fa-image"></i>
                    <input
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
                  <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                )}
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button
                    onClick={cancelPost}
                    className="cancel"
                  >
                    Annuler message
                  </button>
                ) : null}
                <button
                  onClick={handlePost}
                  className="send"
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
