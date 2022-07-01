import React from "react"
import PropTypes from "prop-types"

const Bookmark = ({ status, onBookmark }) => {
  return status.bookmark ? (
    <button onClick={() => onBookmark(status._id)}>
      <i className="bi bi-bookmark-check-fill"></i>
    </button>
  ) : (
    <button onClick={() => onBookmark(status._id)}>
      <i className="bi bi-bookmark"></i>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.object,
  onBookmark: PropTypes.func
}

export default Bookmark
