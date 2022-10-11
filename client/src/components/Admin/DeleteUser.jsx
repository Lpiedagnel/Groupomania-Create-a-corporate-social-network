import React from "react"
import { useDispatch } from "react-redux"
import { deleteUser } from "../../actions/user.actions"

const DeleteUser = (props) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    window.confirm(
      `Voulez-vous vraiment supprimer ${props.firstName} ${props.lastName} et tous ses messages ?`
    )
      ? dispatch(deleteUser(props.id))
      : null
  }

  return (
    <i
      onClick={() => handleDelete()}
      className="admin-card-user__delete fas fa-trash"
    ></i>
  )
}

export default DeleteUser
