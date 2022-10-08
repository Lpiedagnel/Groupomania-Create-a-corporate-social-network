import React from "react"
import { useDispatch } from "react-redux"
import { deletePost } from "../../actions/post.actions"

const DeleteCard = (props) => {
  const dispatch = useDispatch()

  const deleteQuote = () => {
    dispatch(deletePost(props.id))
  }

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote()
        }
      }}
    >
      <i class="card__delete-btn fa-solid fa-trash"></i>
    </div>
  )
}

export default DeleteCard
