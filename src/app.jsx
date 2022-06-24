import React, { useState } from "react"
import UsersList from "./components/usersList"
import SearchStatus from "./components/searchStatus"
import api from "./api"


const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (id) => {
    setUsers(users.filter(user => user._id !== id))
  }
  const handleToggleBookmark = (id) => {
    setUsers(users.map(item => {
      if (item._id === id) {
        item.bookmark = !item.bookmark
      }
      return item
    }))
  }

  return (
    <>
      <SearchStatus users={users} />
      <UsersList
        users={users}
        onDelete={handleDelete}
        onBookmark={handleToggleBookmark}
      />
    </>
  )
}

export default App