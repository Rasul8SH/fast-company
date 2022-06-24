import React from "react"

const SearchStatus = ({ users }) => {
  return (
    <h2>
      <span className={"badge text-bg-" + (users.length > 0 ? "primary" : "danger")}>
        {users.length > 0
          ? `${users.length} человек тусанёт с тобой сегодня`
          : `Никто с тобой не тусанёт`}
      </span>
    </h2>
  )
}

export default SearchStatus