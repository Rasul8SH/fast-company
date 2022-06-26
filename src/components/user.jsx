import React from "react"
import Quality from "./quality"
import Bookmark from "./bookmark"
import PropTypes from "prop-types"

const User = ({ user, onDelete, onBookmark }) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <Quality user={user} />
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <Bookmark user={user} onBookmark={onBookmark} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired
}

export default User
