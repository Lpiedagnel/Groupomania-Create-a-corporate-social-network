import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadPicture } from "../../actions/user.actions"

const UploadImg = () => {
  const [file, setFile] = useState()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)

  const handlePicture = (e) => {
    e.preventDefault()
    // Check format
    if (
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      window.alert("Attention, l'image doit être au format JPG, JPEG ou PNG.")
      return setError("L'image doit être au format JPG, JPEG ou PNG.")
    } else if (file.size > 100000) {
      window.alert(
        "Il n'est pas possible de téléchargez une image dépassant 100 Ko dans la version de test de Groupomania."
      )
      return setError("La limite supportée par la version de test de Groupomania est 100 Ko.")
    } else {
      setError("")
      const data = new FormData()
      data.append("name", userData.firstName + userData.lastName)
      data.append("userId", userData._id)
      data.append("file", file)

      dispatch(uploadPicture(data, userData._id))
    }
  }

  return (
    <>
      <form
        action=""
        onSubmit={handlePicture}
        className="avatar"
      >
        <label
          className="avatar__label"
          htmlFor="file"
        >
          Cliquez ici pour changer d'image
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
          className="avatar__upload"
        />
        <br />
        {file && (
          <input
            type="submit"
            value="Envoyer"
            className="avatar__submit btn"
          />
        )}
      </form>
      <p className="avatar__error">{error}</p>
    </>
  )
}

export default UploadImg
