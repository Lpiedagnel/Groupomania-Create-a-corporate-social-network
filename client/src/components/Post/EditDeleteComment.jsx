import React from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteComment, editComment } from "../../actions/post.actions"
import { UidContext } from "../AppContext"

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState("")
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(editComment(postId, comment._id, text))
      setText("")
      setEdit(false)
    }
  }

  const handleDelete = () => dispatch(deleteComment(postId, comment._id))

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, comment.commenterId])

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
<i className="edit-comment__btn fas fa-pencil-alt"></i>
        </span>
      )}
      {isAuthor && edit && (
        <form
          action=""
          onSubmit={handleEdit}
          className="edit-comment__form"
        >
          <label
          className="edit-comment__label"
            htmlFor="text"
            onClick={() => {
              setEdit(!edit)
            }}
          >
            Editer
          </label>
          <br />
          <input
          className="edit-comment__input"
            type="text"
            name="text"
            onChange={(e) => {
              setText(e.target.value)
            }}
            defaultValue={comment.text}
          />
          <br />
          <div className="edit-comment__footer">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete()
                }
              }}
            >
            <i class="edit-comment__delete fas fa-trash"></i>
            </span>
            <input
            className="btn edit-comment__submit"
              type="submit"
              value="Valider modification"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default EditDeleteComment
