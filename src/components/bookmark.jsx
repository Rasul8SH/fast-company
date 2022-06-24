import React from "react";

const Bookmark = ({ user, onBookmark }) => {
  return (
    user.bookmark
      ? (
        <button onClick={() => onBookmark(user._id)}>
          <i className="bi bi-bookmark-check-fill"></i>
        </button>
      )
      : (
        <button onClick={() => onBookmark(user._id)}>
          <i className="bi bi-bookmark"></i>
        </button>
      )
  )
}

export default Bookmark