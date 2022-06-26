import React from "react"
import PropTypes from "prop-types"

const Bookmark = ({ user, onBookmark }) => {
  return user.bookmark ? (
    <button onClick={() => onBookmark(user._id)}>
      <i className="bi bi-bookmark-check-fill"></i>
    </button>
  ) : (
    <button onClick={() => onBookmark(user._id)}>
      <i className="bi bi-bookmark"></i>
    </button>
  )
}

Bookmark.propTypes = {
  user: PropTypes.object.isRequired,
  onBookmark: PropTypes.func.isRequired
}

export default Bookmark
