import React from "react"
import { useDispatch, useSelector } from "react-redux"
import UploadImg from "./UploadImg"
import { useState } from "react"
import { updateBio, updateJob } from "../../actions/user.actions"
import { dateParser } from "../Utils"
import FollowHandler from "./FollowHandler"

const UpdateProfil = () => {
  const [bio, setBio] = useState("")
  const [job, setJob] = useState("")
  const [updateBioForm, setUpdateBioForm] = useState(false)
  const [updateJobForm, setUpdateJobForm] = useState(false)
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  const handleBioUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateBioForm(false)
  }

  const handleJobUpdate = () => {
    dispatch(updateJob(userData._id, job))
    setUpdateJobForm(false)
  }

  return (
    <div className="profil__container">
      <h1 className="profil__name">
        Profil de {userData.firstName} {userData.lastName}
      </h1>
      <div className="profil__update">
        <div className="profil__left-part">
          <h3 className="profil__title-section">Photo de profil</h3>
          <img
            src={userData.picture}
            alt="user-pic"
            className="profil__avatar"
          />
          <UploadImg />
        </div>

        <div className="profil__right-part">
        <div className="profil__job">
            <h3 className="profil__title-section">Poste au sein de Groupomania</h3>
            {updateJobForm === false && (
              <>
                <p onClick={() => setUpdateJobForm(!updateJobForm)}>{userData.job}</p>
                <button
                  className="profil__btn btn"
                  onClick={() => setUpdateJobForm(!updateJobForm)}
                >
                  Modifier poste
                </button>
              </>
            )}
            {updateJobForm && (
              <>
                <textArea
                  className="profil__area"
                  type="text"
                  defaultValue={userData.job}
                  onChange={(e) => setJob(e.target.value)}
                ></textArea>
                <button
                  className="profil__btn btn"
                  onClick={handleJobUpdate}
                >
                  Valider modification
                </button>
              </>
            )}
          </div>
          <div className="profil__bio">
            <h3 className="profil__title-section">Bio</h3>
            {updateBioForm === false && (
              <>
                <p onClick={() => setUpdateBioForm(!updateBioForm)}>{userData.bio}</p>
                <button
                  className="profil__btn btn"
                  onClick={() => setUpdateBioForm(!updateBioForm)}
                >
                  Modifier bio
                </button>
              </>
            )}
            {updateBioForm && (
              <>
                <textArea
                  className="profil__area"
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textArea>
                <button
                  className="profil__btn btn"
                  onClick={handleBioUpdate}
                >
                  Valider modification
                </button>
              </>
            )}
          </div>
          <h4 className="profil__info">
            Membre depuis le : {dateParser(userData.createdAt)}
          </h4>
          <h5
            className="profil__info"
            onClick={() => setFollowingPopup(true)}
          >
            Abonnement : {userData.following ? userData.following.length : ""}
          </h5>
          <h5
            className="profil__info"
            onClick={() => setFollowersPopup(true)}
          >
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>
      {/* PAUSE ICI */}
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span
              className="cross"
              onClick={() => setFollowingPopup(false)}
            >
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img
                          src={user.picture}
                          alt="user-pic"
                        />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}

      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span
              className="cross"
              onClick={() => setFollowersPopup(false)}
            >
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img
                          src={user.picture}
                          alt="user-pic"
                        />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfil
