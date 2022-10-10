import React from "react"
import { useDispatch, useSelector } from "react-redux"
import UploadImg from "./UploadImg"
import { useState } from "react"
import { updateBio, updateJob } from "../../actions/user.actions"
import { dateParser, isEmpty } from "../Utils"
import FollowHandler from "./FollowHandler"

const UpdateProfil = () => {
  const [bio, setBio] = useState("")
  const [job, setJob] = useState("")
  const [updateBioForm, setUpdateBioForm] = useState(false)
  const [updateJobForm, setUpdateJobForm] = useState(false)
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()

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
            <h3 className="profil__title-section">
              Poste au sein de Groupomania
            </h3>
            {updateJobForm === false && (
              <>
                <p onClick={() => setUpdateJobForm(!updateJobForm)}>
                  {userData.job}
                </p>
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
                <p onClick={() => setUpdateBioForm(!updateBioForm)}>
                  {userData.bio}
                </p>
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
          <h5 className="profil__info">
            Abonnement : {userData.following ? userData.following.length : ""}
          </h5>
          <h5 className="profil__info">
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>
      { !isEmpty(userData.following) ?
      <div className="profil__follow">
        <h3 className="profil__title-section">Abonnements</h3>
        <ul className="profil__list">
          {usersData.map((user) => {
            for (let i = 0; i < userData.following.length; i++) {
              if (user._id === userData.following[i]) {
                return (
                  <li
                    key={user._id}
                    className="profil__item"
                  >
                    <img
                      className="profil__avatar-follow"
                      src={user.picture}
                      alt="user-pic"
                    />
                    <h4 className="profil__username-follow">
                      {user.firstName} {user.lastName}
                    </h4>
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
          })}
        </ul>
      </div>
      : null }
      {!isEmpty(userData.followers) ? (
        <div className="profil__follow">
          <h3 className="profil__title-section">Abonnés</h3>
          <ul className="profil__list">
            {usersData.map((user) => {
              for (let i = 0; i < userData.followers.length; i++) {
                if (user._id === userData.followers[i]) {
                  return (
                    <li
                      key={user._id}
                      className="profil__item"
                    >
                      <img
                        className="profil__avatar-follow"
                        src={user.picture}
                        alt="user-pic"
                      />
                      <h4 className="profil__username-follow">
                        {user.firstName} {user.lastName}
                      </h4>
                      <div className="profil__follow-handler">
                        <FollowHandler
                          idToFollow={user._id}
                          type={"suggestion"}
                        />
                      </div>
                    </li>
                  )
                }
              }
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default UpdateProfil
